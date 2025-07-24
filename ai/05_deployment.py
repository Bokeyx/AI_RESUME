from flask import Flask, request, jsonify
import joblib
import re
import nltk
from sklearn.feature_extraction.text import TfidfVectorizer
from langdetect import detect
from googletrans import Translator
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import os
from nltk.tokenize import sent_tokenize, word_tokenize

# ----------------- NLTK 필수 리소스 -----------------
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)

# ----------------- 모델·벡터라이저 로딩 -----------------
base_dir = os.path.dirname(os.path.abspath(__file__))
paths = {
    'knn_model': os.path.join(base_dir, 'model', 'knn_model.pkl'),
    'tfidf_vectorizer': os.path.join(base_dir, 'model', 'tfidf_vectorizer.pkl'),
    'label_map': os.path.join(base_dir, 'model', 'label_map.pkl'),
    'label_map_ko': os.path.join(base_dir, 'model', 'label_map_ko.pkl')
}

knn_model        = joblib.load(paths['knn_model'])
tfidf_vectorizer = joblib.load(paths['tfidf_vectorizer'])
label_map        = joblib.load(paths['label_map'])
label_map_ko     = joblib.load(paths['label_map_ko'])

tokenizer        = AutoTokenizer.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")
sentiment_model  = AutoModelForSequenceClassification.from_pretrained("nlptown/bert-base-multilingual-uncased-sentiment")
translator       = Translator()

# ----------------- 전처리 및 유틸 함수 -----------------
def preprocess_text(text):
    text = text.lower()
    text = re.sub(r'<[^>]+>', '', text)
    text = re.sub(r'[^a-zA-Z가-힣\s]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def detect_language(text):
    try:
        return detect(text)
    except:
        return 'unknown'

def get_sentiment(text, lang):
    try:
        if lang == 'ko':
            try:
                text = translator.translate(text, src='ko', dest='en').text
            except:
                return 50, 'neutral'

        sentences = sent_tokenize(text)
        scores = []
        for s in sentences:
            if len(s.strip()) < 5:
                continue
            inputs  = tokenizer(s, return_tensors="pt", truncation=True)
            outputs = sentiment_model(**inputs)
            probs   = torch.nn.functional.softmax(outputs.logits, dim=1)
            score   = sum([(i + 1) * p for i, p in enumerate(probs[0])])
            scores.append(score.item())

        if not scores:
            return 50, 'neutral'

        avg      = sum(scores) / len(scores)
        percent  = int(avg * 20)
        label_id = int(round(avg)) - 1
        label    = ['very negative', 'negative', 'neutral', 'positive', 'very positive'][max(0, min(label_id, 4))]
        return percent, label
    except:
        return 50, 'neutral'

def extract_skills(text):
    skills_list = [
        'python', '파이썬', 'java', '자바', 'c++', 'c언어', 'c#', 'c샵', 'javascript', '자바스크립트',
        'html', 'css', 'typescript', 'go', 'golang', 'r', 'ruby', 'php', 'swift', 'kotlin',
        'sql', 'mysql', 'oracle', 'mongodb', 'postgresql',
        'excel', '엑셀', 'pandas', 'numpy', 'matplotlib', 'seaborn',
        'machine learning', '머신러닝', 'deep learning', '딥러닝',
        'ai', '인공지능', 'natural language processing', 'nlp', '자연어 처리',
        'tensorflow', 'keras', 'pytorch', 'scikit-learn',
        'git', 'github', 'docker', 'kubernetes', 'aws', 'gcp', 'azure',
        'communication', '커뮤니케이션', 'leadership', '리더십', 'presentation', '프레젠테이션',
        'teamwork', '팀워크', 'problem solving', '문제 해결', 'critical thinking', '비판적 사고',
        'project management', '프로젝트 관리', 'agile', 'scrum', 'jira',
        'data analysis', '데이터 분석', 'data visualization', '데이터 시각화',
        'modeling', '모델링', 'business analysis', '업무 분석',
        'statistics', '통계', 'data mining', '데이터 마이닝'
    ]
    text_lower = text.lower()
    return list({skill for skill in skills_list if skill.lower() in text_lower}) or ["None"]

def extract_education(text):
    edu_keywords = ['bachelor', 'master', 'ph.d', 'phd', 'university', 'college',
                    '학사', '석사', '박사', '대학교', '대학', '전공', '학점', '졸업', '성적']
    sentences = sent_tokenize(text)
    return [s.strip() for s in sentences if any(k in s.lower() for k in edu_keywords)] or ["Unknown"]

def extract_experience(text):
    exp_keywords = ['experience', 'years', 'worked', 'employed', 'project',
                    '회사', '근무', '경험', '프로젝트']
    edu_filter = ['대학교', '대학', '전공', '졸업', '학점', '석사', '박사',
                  'university', 'college']
    sentences = sent_tokenize(text)
    return [s.strip() for s in sentences
            if any(k in s.lower() for k in exp_keywords)
            and not any(e in s.lower() for e in edu_filter)] or ["Not specified"]

def extract_keywords(text, num_keywords=5):
    lang = detect_language(text)
    words = word_tokenize(text.lower())

    if lang == 'ko':
        stopwords_ko = ['은', '는', '이', '가', '에', '에서', '을', '를', '의',
                        '과', '와', '도', '으로', '이다', '있다']
        words = [w for w in words if w not in stopwords_ko and len(w) > 1]
    else:
        words = [w for w in words if w.isalpha()
                 and w not in nltk.corpus.stopwords.words('english')]

    freq = nltk.FreqDist(words)
    return [word for word, count in freq.most_common(num_keywords)]

def compute_overall_score(positivity_score, skills, word_count):
    return round(
        0.4 * positivity_score +
        0.3 * min(len(skills), 10) * 10 +
        0.3 * min(word_count / 200, 1) * 100
    )

# ---------- 수정 ①: 거리 계산 함수 ----------
def compute_match_confidence(knn_model, vector,
                             max_dist=3.5,          # 수정: 2.0 → 3.5
                             k=3):                  # 수정: 최근접 이웃 수 3
    distances, _ = knn_model.kneighbors(vector, n_neighbors=k)
    distance = distances[0].mean()                 # 수정: k개 평균
    normalized = max(0, min(1, 1 - distance / max_dist))
    return round(normalized * 100)

def map_confidence_label(score):
    if score >= 80:
        return "High"
    elif score >= 60:
        return "Medium"
    else:
        return "Low"

# ----------------- 메인 엔드포인트 -----------------
@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    text = data['text']
    clean_text = preprocess_text(text)
    lang = detect_language(text)

    vector        = tfidf_vectorizer.transform([clean_text])
    job_index     = knn_model.predict(vector)[0]
    job_label     = label_map.get(job_index, "Unknown")
    job_label_ko  = label_map_ko.get(job_label, job_label)

    skills             = extract_skills(text)
    education          = extract_education(text)
    experience         = extract_experience(text)
    positivity_score, positivity_label = get_sentiment(text, lang)
    keywords           = extract_keywords(text)
    char_count         = len(text)
    word_count         = len(word_tokenize(text))
    sentence_count     = len(sent_tokenize(text))

    overall_score         = compute_overall_score(positivity_score, skills, word_count)
    match_confidence      = compute_match_confidence(knn_model, vector)  # ⬆k=3 로 적용
    match_confidence_label = map_confidence_label(match_confidence)

    return jsonify({
        'category'             : job_label_ko,
        'skills'               : skills,
        'education'            : education,
        'experience'           : experience,
        'lang'                 : lang,
        'positivity_score'     : positivity_score,
        'positivity_label'     : positivity_label,
        'keywords'             : keywords,
        'char_count'           : char_count,
        'word_count'           : word_count,
        'sentence_count'       : sentence_count,
        'overall_score'        : overall_score,
        'match_confidence'     : match_confidence,
        'match_confidence_label': match_confidence_label
    })

# ----------------- 실행 -----------------
if __name__ == '__main__':
    app.run(debug=True)
