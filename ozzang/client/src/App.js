// App.js -> Routing 관련 일 처리
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import MainPage from "./components/views/MainPage/MainPage";
import ClothesDetailPage from "./components/views/MainPage/ClothesDetailPage";
import UploadClothesPage from "./components/views/UploadClothesPage/UploadClothes";
import UploadStylesPage from "./components/views/MainPage/UploadStylePage";
import Auth from "./hoc/auth";
import ProfilePage from "./components/views/ProfilePage/ProfilePage";
import StylePage from "./components/views/MainPage/StylePage";
import SharePage from "./components/views/MainPage/SharePage";
import UpdateClothesPage from "./components/views/UploadClothesPage/UpdateClothes";

const AuthProfilePage = Auth(ProfilePage, true);
const AuthLandingPage = Auth(LandingPage, null); // 랜딩페이지->메인페이지로 변경해서 사용안함.
const AuthLoginPage = Auth(LoginPage, false);
const AuthRegisterPage = Auth(RegisterPage, false);
const AuthMainPage = Auth(MainPage, true);
const AuthClothesDetailPage = Auth(ClothesDetailPage, true);
const AuthStylePage = Auth(StylePage, true);
const AuthSharePage = Auth(SharePage, true);
const AuthUploadClothesPage = Auth(UploadClothesPage, true);
const AuthUpdateClothesPage = Auth(UpdateClothesPage, true);
const AuthUploadStylesPage = Auth(UploadStylesPage, true);
function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
         matches the current URL. Use a <Switch> any time
         you have multiple routes, but you want only one
         of them to render at a time
         */}
        <Routes>
          <Route path="/" element={<AuthMainPage />} />
          <Route path="/login" element={<AuthLoginPage />} />
          <Route path="/register" element={<AuthRegisterPage />} />
          <Route path="/main" element={<AuthMainPage />} />
          <Route path="/cloth/:cloth_id" element={<AuthClothesDetailPage />} />
          <Route path="/uploadClothes" element={<AuthUploadClothesPage />} />
          <Route path="/uploadStyles" element={<AuthUploadStylesPage />} />
          <Route path="/profile" element={<AuthProfilePage />} />
          <Route path="/findAccount" />
          <Route path="/share" element={<AuthSharePage />} />
          <Route path="/style" element={<AuthStylePage />} />
          <Route
            path="/updateClothes/:cloth_id"
            element={<AuthUpdateClothesPage />}
          />
          {/* findaccount 아직 연결 안함. */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
