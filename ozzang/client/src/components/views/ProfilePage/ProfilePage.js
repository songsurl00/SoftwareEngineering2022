import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

function StylePage() {
  const navigate = useNavigate();

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

  return (
    <Wrapper>
      <NavWrapper>
        <h1>Ozzang</h1>
        <nav>
          <button onClick={ClothesBtnHandler}>Clothes</button>
          <button onClick={StyleBtnHandler}>Style</button>
          <button onClick={FavBtnHandler}>Favorite</button>
          <button onClick={ShareBtnHandler}>Share</button>
          <button onClick={ProfileBtnHandler}>Profile</button>
        </nav>
      </NavWrapper>
      <BodyWrapper>
        <button onClick={LogoutBtnHandler}>로그아웃하기</button>
      </BodyWrapper>
    </Wrapper>
  );
}

export default StylePage;
