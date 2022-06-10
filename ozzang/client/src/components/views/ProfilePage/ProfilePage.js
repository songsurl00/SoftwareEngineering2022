import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../_actions/user_action";
import MainPageHeader from "../MainPage/MainPageHeader";

const Wrapper = styled.div`
  margin: 0;
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  font-size: 20px;

  height: 100px;
  padding: 1rem;
  color: black;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  button {
    border: none;
    background: white;
    margin: 40px;
    font-size: 15px;
  }
`;

const BodyWrapper = styled.div`
  position: relative;
  padding-top: 100px;
  text-align: center;
  button {
    margin-top: 15px;
  }
`;

function ProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});
  const ClothesBtnHandler = (event) => {
    navigate("/main");
  };

  const ProfileBtnHandler = (event) => {
    navigate("/profile");
  };

  const StyleBtnHandler = (event) => {
    navigate("/style");
  };

  const ShareBtnHandler = (event) => {
    navigate("/share");
  };

  const FavBtnHandler = (event) => {
    navigate("/fav");
  };

  const LogoutBtnHandler = (event) => {
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Failed to logout");
      }
    });
  };

  useEffect(() => {
    const fetchUserInfoAsync = async () => {
      const response = await getUserInfo();
      const newUserInfo = response.payload;
      setUserInfo(newUserInfo);
    };
    fetchUserInfoAsync();
  }, []);

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <div>이메일</div>
        <div>{userInfo.email}</div>
        <div>사용자이름</div>
        <div>{userInfo.name}</div>
        <div>전화번호</div>
        <div>{userInfo.userTel}</div>
        <button onClick={LogoutBtnHandler}>로그아웃하기</button>
      </BodyWrapper>
    </Wrapper>
  );
}

export default ProfilePage;
