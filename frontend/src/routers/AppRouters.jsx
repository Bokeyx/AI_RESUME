import { Route, Routes } from "react-router-dom";
import SubmitPage from "../pages/SubmitPage";
import Layout from "../components/common/Layout";
import MyPage from "../pages/MyPage";
import HistoryPage from "../pages/HistoryPage";
import ResumeResultPage from "../pages/ResumeResultPage";
import CoverLetterResultPage from "../pages/CoverLetterResultPage";
import LegalContents from "../pages/LegalContents";

const AppRouters = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/home" element={<SubmitPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/result">
          <Route path="resume" element={<ResumeResultPage/>} />  
          <Route path="coverletter" element={<CoverLetterResultPage />} />  
        </Route>
        <Route path="/history" element={<HistoryPage />} />
      </Route>
        <Route path="/legalcontents" element={<LegalContents />} />
    </Routes>
  )
}

export default AppRouters; 