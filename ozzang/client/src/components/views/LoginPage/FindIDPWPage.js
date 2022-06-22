import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";

import MainPageHeader from "../MainPage/MainPageHeader";
import MainPageFooter from "../Footer/Footer";
import { TextField } from "@mui/material";
import { getEmail } from "../../../_actions/user_action";

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
  width: 100%;
  height: 100%;
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

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
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

const FindButton = styled.button`
  display: block;
  width: 160px;
  height: 48px;

  padding: 0px;
  margin: 0px 0px 0px auto;
  font-size: 16px;
  font-weight: 500;
  line-height: 48px;

  border: none;
  border-radius: 8px;
  color: white;
  background-color: #71c02b;
  cursor: pointer;

  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
  }
`;

function IDPWFindPage() {
  const dispatch = useDispatch();

  // state 생성
  const [Name, setName] = useState("");
  const [usertel, setuserTel] = useState("");

  // handler 생성
  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onUserTelHandler = (event) => {
    setuserTel(event.currentTarget.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    // refresh 를 방지해서 다음으로 해야할 작업 수행에 방해가 없도록 한다.
    // 해당 코드가 없다면, refresh가 진행되어 state 값이 비게 된다.

    if (Name === "") {
      return alert("이름을 입력하세요!");
    }
    if (usertel === "") {
      return alert("전화번호를 입력하세요!");
    }

    let body = {
      name: Name,
      userTel: usertel,
    };

    dispatch(getEmail(body)).then((response) => {
      if (response.payload.success) {
        alert(`가입하신 이메일은 ${response.payload.user.email} 입니다.`);
      } else {
        alert("입력한 정보와 일치하는 사용자가 없습니다.");
      }
    });
  };

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <ProfileWrapper>
          <ProfileTitle>E-MAIL 찾기</ProfileTitle>
          <ProfileRow>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="가입시 입력한 이름"
              value={Name}
              onChange={onNameHandler}
              variant="outlined"
              type="text"
              fullWidth
            ></TextField>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="가입시 입력한 전화번호(-제외)"
              value={usertel}
              onChange={onUserTelHandler}
              variant="outlined"
              type="tel"
              fullWidth
            ></TextField>
          </ProfileRow>
          <FindButton onClick={onSubmitHandler}>E-MAIL 찾기</FindButton>
        </ProfileWrapper>
      </BodyWrapper>
      <MainPageFooter />
    </Wrapper>
  );
}

export default IDPWFindPage;
