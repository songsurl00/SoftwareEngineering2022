import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { getUserInfo } from "../../../_actions/user_action";
import MainPageHeader from "../MainPage/MainPageHeader";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 80px 0px 0px 0px;
  background: #eeeeee;
`;

const BodyWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 32px;
`;

const ProfileWrapper = styled.div`
display: flex;
flex-direction: column;
width: 480px;

padding: 0px 24px 16px 24px;
background-color: white;

box-shadow: 0px 1px 4px rgba(0,0,0,.4);
`;

const ProfileTitle = styled.div`
width: 100%;
height: 64px;

font-size: 18px;
font-weight: 600;
line-height: 64px;
`;

const ProfileRow = styled.div`
width: 100%;
padding: 8px 0px;
`;

const ProfileRowTitle = styled.div`
width: 100%;
height: 16px;

font-size: 14px;
line-height: 16px;
color: #888888;
`;

const ProfileRowContent = styled.div`
width: 100%;
height: 32px;

font-size: 18px;
line-height: 32px;
`;


const LogoutButton = styled.button`
width: 160px;
height: 48px;
padding: 0px;
margin: 64px 0px 0px 0px;
font-size: 18px;
font-weight: 500;
line-height: 48px;
color: white;
border: none;
border-radius: 8px;
background-color: #f5a623;
cursor: pointer;

transition: box-shadow .2s;

&:hover {
  box-shadow: 0px 1px 4px rgba(0,0,0,.5);
}
`;

const WithdrawButton = styled.button`
width: 160px;
height: 48px;
padding: 0px;
margin: 32px 0px 0px 0px;
font-size: 18px;
font-weight: 500;
line-height: 48px;
color: white;
border: none;
border-radius: 8px;
background-color: #ff4747;
cursor: pointer;

transition: box-shadow .2s;

&:hover {
  box-shadow: 0px 1px 4px rgba(0,0,0,.5);
}
`;

function ProfilePage() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({});

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
        <ProfileWrapper>
          <ProfileTitle>내 프로필</ProfileTitle>
          <ProfileRow>
            <ProfileRowTitle>이메일</ProfileRowTitle>
            <ProfileRowContent>{userInfo.email}</ProfileRowContent>
          </ProfileRow>
          <ProfileRow>
            <ProfileRowTitle>사용자이름</ProfileRowTitle>
            <ProfileRowContent>{userInfo.name}</ProfileRowContent>
          </ProfileRow>
          <ProfileRow>
            <ProfileRowTitle>전화번호</ProfileRowTitle>
            <ProfileRowContent>{userInfo.userTel || '전화번호 없음'}</ProfileRowContent>
          </ProfileRow>
        </ProfileWrapper>
        <LogoutButton onClick={LogoutBtnHandler}>로그아웃하기</LogoutButton>
        <WithdrawButton>탈퇴하기</WithdrawButton>

      </BodyWrapper>
    </Wrapper>
  );
}

export default ProfilePage;
