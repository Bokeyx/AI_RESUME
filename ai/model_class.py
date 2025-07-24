import pandas as pd
import numpy as np
import os
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler, MinMaxScaler, RobustScaler
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.svm import SVC
from sklearn.neighbors import KNeighborsClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, classification_report
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
import joblib
import warnings
import json

warnings.filterwarnings('ignore', category=FutureWarning)
warnings.filterwarnings('ignore', category=UserWarning)

class ResumeScreeningModel:
    def __init__(self, n_jobs=-1):
        self.n_jobs = n_jobs
        self.models = {
            'LogisticRegression': LogisticRegression(max_iter=1000, solver='liblinear'),
            'NaiveBayes': MultinomialNB(),
            'RandomForest': RandomForestClassifier(random_state=42),
            'GradientBoosting': GradientBoostingClassifier(random_state=42),
            'SVM': SVC(probability=True, random_state=42),
            'KNN': KNeighborsClassifier(n_neighbors=5),
            'DecisionTree': DecisionTreeClassifier(random_state=42),
            'XGBoost': XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42),
            'LightGBM': LGBMClassifier(random_state=42, verbosity=-1)
        }
        self.scalers = {
            'Standard': StandardScaler(),
            'MinMax': MinMaxScaler(),
            'Robust': RobustScaler(),
            'None': None
        }
        self.param_grids = {
            'LogisticRegression': {'C': [0.01, 0.1, 1.0, 10.0, 100.0]},
            'RandomForest': {
                'n_estimators': [50, 100, 200, 300],
                'max_depth': [None, 10, 20, 30],
                'min_samples_split': [2, 5, 10]
            },
            'GradientBoosting': {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.01, 0.05, 0.1],
                'max_depth': [3, 5, 7],
                'min_samples_split': [2, 5, 10]
            },
            'SVM': {'C': [0.1, 1.0, 10.0], 'gamma': ['scale', 'auto', 0.1, 1.0]},
            'XGBoost': {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.01, 0.05, 0.1],
                'max_depth': [3, 5, 7],
                'subsample': [0.8, 1.0]
            },
            'LightGBM': {
                'n_estimators': [50, 100, 200],
                'learning_rate': [0.01, 0.05, 0.1],
                'num_leaves': [31, 50, 100]
            }
        }
        self.best_model = None
        self.best_scaler = None
        self.best_params = None
        self.model_results = {}

    def preprocess_data(self, data, features, target_column='label', scaler_type='Standard'):
        X = features
        y = data[target_column]
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
        X_train, X_val, y_train, y_val = train_test_split(X_train, y_train, test_size=0.25, stratify=y_train, random_state=42)  # Validation set 추가
        scaler = self.scalers.get(scaler_type)

        if scaler_type != 'None' and scaler:
            if hasattr(X_train, 'tocsr'):
                dense_needed = isinstance(scaler, (StandardScaler, RobustScaler))
                X_train_scaled = scaler.fit_transform(X_train.toarray() if dense_needed else X_train)
                X_val_scaled = scaler.transform(X_val.toarray() if dense_needed else X_val)
                X_test_scaled = scaler.transform(X_test.toarray() if dense_needed else X_test)
            else:
                X_train_scaled = scaler.fit_transform(X_train)
                X_val_scaled = scaler.transform(X_val)
                X_test_scaled = scaler.transform(X_test)
        else:
            X_train_scaled, X_val_scaled, X_test_scaled = X_train, X_val, X_test

        return X_train_scaled, X_val_scaled, X_test_scaled, y_train, y_val, y_test, scaler

    def train_model(self, model, X_train, y_train, model_name, scoring):
        if model_name in self.param_grids:
            grid = GridSearchCV(model, self.param_grids[model_name], cv=3, scoring=scoring, n_jobs=self.n_jobs)
            grid.fit(X_train, y_train)
            return grid.best_estimator_, grid.best_params_
        else:
            model.fit(X_train, y_train)
            return model, {}

    def evaluate_model(self, model, X_train, X_val, X_test, y_train, y_val, y_test, model_name, scaler_type):
        y_train_pred = model.predict(X_train)
        y_val_pred = model.predict(X_val)
        y_test_pred = model.predict(X_test)

        train_f1 = f1_score(y_train, y_train_pred, average='weighted')
        val_f1 = f1_score(y_val, y_val_pred, average='weighted')
        test_f1 = f1_score(y_test, y_test_pred, average='weighted')

        results = {
            'accuracy': accuracy_score(y_test, y_test_pred),
            'precision': precision_score(y_test, y_test_pred, average='weighted'),
            'recall': recall_score(y_test, y_test_pred, average='weighted'),
            'f1': test_f1,
            'train_f1': train_f1,
            'val_f1': val_f1,
            'test_f1': test_f1,
            'report': classification_report(y_test, y_test_pred, output_dict=True)
        }

        # 과대적합/과소적합 판단
        overfit_diff = train_f1 - val_f1
        if train_f1 < 1.0 and 0.0 <= overfit_diff <= 0.1:
            results['usable'] = 'Y'
            results['overfit_status'] = '일반화'
            print(f"-*** {model_name} with {scaler_type} ***-")
            print(f"훈련 F1: {train_f1:.4f}, 검증 F1: {val_f1:.4f}, 테스트 F1: {test_f1:.4f}, 과대적합 차이: {overfit_diff:.4f}")
            print("사용 가능한 모델입니다 (일반화).\n")
        else:
            results['usable'] = 'N'
            print(f"-*** {model_name} with {scaler_type} ***-")
            print(f"훈련 F1: {train_f1:.4f}, 검증 F1: {val_f1:.4f}, 테스트 F1: {test_f1:.4f}, 과대적합 차이: {overfit_diff:.4f}")
            if train_f1 >= 1.0:
                print("훈련 F1 1.0으로 과대적합, 사용 불가능한 모델입니다.\n")
            elif overfit_diff > 0.1:
                print("과대적합으로 사용 불가능한 모델입니다.\n")
            elif overfit_diff < 0.0:
                print("과소적합으로 사용 불가능한 모델입니다.\n")
            results['overfit_status'] = '과대적합' if train_f1 >= 1.0 or overfit_diff > 0.1 else '과소적합'

        return results

    def train_and_evaluate(self, X_train, X_val, X_test, y_train, y_val, y_test, current_scaler_type, scoring, exclude_models=[]):
        results = {}
        for model_name, model in self.models.items():
            if model_name in exclude_models:
                continue
            if model_name == 'NaiveBayes' and current_scaler_type in ['Standard', 'Robust']:
                continue
            try:
                needs_dense = isinstance(model, (GradientBoostingClassifier, SVC, KNeighborsClassifier))
                X_train_final = X_train.toarray() if hasattr(X_train, 'tocsr') and needs_dense else X_train
                X_val_final = X_val.toarray() if hasattr(X_val, 'tocsr') and needs_dense else X_val
                X_test_final = X_test.toarray() if hasattr(X_test, 'tocsr') and needs_dense else X_test
                trained_model, best_params = self.train_model(model, X_train_final, y_train, model_name, scoring)
                metrics = self.evaluate_model(trained_model, X_train_final, X_val_final, X_test_final, y_train, y_val, y_test, model_name, current_scaler_type)
                metrics.update({'params': best_params, 'model_instance': trained_model})
                results[model_name] = metrics
                print(f"{model_name} - F1: {metrics['f1']:.4f}, Usable: {metrics['usable']}, Status: {metrics['overfit_status']}")
            except Exception as e:
                results[model_name] = {'error': str(e), 'f1': 0}
        return results

    def select_best_model(self, results):
        best_model, best_f1 = None, -1
        for model_name, metrics in results.items():
            if 'f1' in metrics and metrics['f1'] > best_f1 and metrics.get('usable') == 'Y':
                best_f1 = metrics['f1']
                best_model = (model_name, metrics)
        if best_model:
            self.best_model = best_model[1]['model_instance']
            self.best_params = best_model[1]['params']
            return best_model
        else:
            raise ValueError("No usable model results found.")

    def train_with_best_scaler(self, data, features, target_column='label', scoring='f1_weighted', exclude_models=[]):
        best_f1 = -1
        best_overall = None
        for scaler_type in self.scalers:
            print(f"\n===== Scaler: {scaler_type} =====")
            try:
                X_train, X_val, X_test, y_train, y_val, y_test, scaler = self.preprocess_data(data, features, target_column, scaler_type)
                results = self.train_and_evaluate(X_train, X_val, X_test, y_train, y_val, y_test, scaler_type, scoring, exclude_models)
                model_name, metrics = self.select_best_model(results)
                if metrics['f1'] > best_f1:
                    best_f1 = metrics['f1']
                    self.best_scaler = scaler
                    self.model_results = results
                    best_overall = {
                        'model': model_name,
                        'scaler': scaler_type,
                        'metrics': metrics
                    }
            except Exception as e:
                print(f"Error with scaler {scaler_type}: {e}")
        if best_f1 < 0:
            raise RuntimeError("No successful training with any scaler.")
        print(f"\n=== Best Model: {best_overall['model']} | Scaler: {best_overall['scaler']} ===")
        print(f"F1 Score: {best_overall['metrics']['f1']:.4f}, Usable: {best_overall['metrics']['usable']}, Status: {best_overall['metrics']['overfit_status']}")
        return best_overall

    def predict(self, X):
        if not self.best_model:
            raise ValueError("Model not trained.")
        X_final = X
        if self.best_scaler:
            if hasattr(X, 'tocsr'):
                dense = isinstance(self.best_scaler, (StandardScaler, RobustScaler))
                X_final = self.best_scaler.transform(X.toarray() if dense else X)
            else:
                X_final = self.best_scaler.transform(X)
        if hasattr(X_final, 'tocsr') and isinstance(self.best_model, (GradientBoostingClassifier, SVC, KNeighborsClassifier)):
            X_final = X_final.toarray()
        return self.best_model.predict(X_final)

    def predict_proba(self, X):
        if not hasattr(self.best_model, 'predict_proba'):
            raise TypeError("Model does not support predict_proba.")
        X_final = X
        if self.best_scaler:
            if hasattr(X, 'tocsr'):
                dense = isinstance(self.best_scaler, (StandardScaler, RobustScaler))
                X_final = self.best_scaler.transform(X.toarray() if dense else X)
            else:
                X_final = self.best_scaler.transform(X)
        return self.best_model.predict_proba(X_final)

    def save_model(self, model_path='best_model.pkl', scaler_path='best_scaler.pkl', result_path='model_metrics.json'):
        if not self.best_model:
            raise ValueError("No model to save.")
        joblib.dump(self.best_model, model_path)
        if self.best_scaler:
            joblib.dump(self.best_scaler, scaler_path)
        if self.model_results:
            with open(result_path, 'w') as f:
                json.dump(self.model_results, f, indent=4)

    def load_model(self, model_path='best_model.pkl', scaler_path='best_scaler.pkl'):
        self.best_model = joblib.load(model_path)
        if os.path.exists(scaler_path):
            self.best_scaler = joblib.load(scaler_path)