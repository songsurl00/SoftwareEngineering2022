import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import MainPageHeader from "../MainPage/MainPageHeader";
import MainPageFooter from "../Footer/Footer";
import { TextField } from "@mui/material";

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

const RegisterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 480px;

  padding: 0px 24px 16px 24px;
  background-color: white;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
`;

const RegisterTitle = styled.div`
  width: 100%;
  height: 64px;

  font-size: 18px;
  font-weight: 600;
  line-height: 64px;
`;

const RegisterRow = styled.div`
  width: 100%;
  padding: 8px 0px;
`;

const RegisterButton = styled.button`
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

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // state 생성
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [Name, setName] = useState("");
  const [usertel, setuserTel] = useState("");

  // handler 생성
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };
  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };
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

    if (Email === "") {
      return alert("이메일을 입력하세요!");
    }
    if (Password === "") {
      return alert("비밀번호를 입력하세요!");
    }
    if (Password.length < 8) return alert("비밀번호가 너무 짧습니다.");
    if (ConfirmPassword === "") {
      return alert("비밀번호 확인을 입력하세요!");
    }
    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }
    if (Name === "") {
      return alert("이름을 입력하세요!");
    }
    if (usertel === "") {
      return alert("전화번호를 입력하세요!");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      userTel: usertel,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate("/login");
      } else {
        alert("Failed to sign up");
      }
    });
  };

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <RegisterWrapper>
          <RegisterTitle>옷짱 회원가입</RegisterTitle>
          <RegisterRow>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="Email"
              value={Email}
              onChange={onEmailHandler}
              variant="outlined"
              type="email"
              fullWidth
            ></TextField>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="Password"
              value={Password}
              onChange={onPasswordHandler}
              variant="outlined"
              type="password"
              fullWidth
            ></TextField>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="Confirm Password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
              variant="outlined"
              type="password"
              fullWidth
            ></TextField>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="Name"
              value={Name}
              onChange={onNameHandler}
              variant="outlined"
              type="text"
              fullWidth
            ></TextField>
            <TextField
              sx={{ minWidth: 400, marginBottom: "30px" }}
              label="Tel"
              value={usertel}
              onChange={onUserTelHandler}
              variant="outlined"
              type="tel"
              fullWidth
            ></TextField>
          </RegisterRow>
          <RegisterButton onClick={onSubmitHandler}>회원가입</RegisterButton>
        </RegisterWrapper>
      </BodyWrapper>
      <MainPageFooter />
    </Wrapper>
  );
}

export default RegisterPage;
