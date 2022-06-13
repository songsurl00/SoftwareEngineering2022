import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

import MainPageHeader from "../MainPage/MainPageHeader";
import MainPageFooter from "../Footer/Footer";

const Wrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  margin-top: 130px;
  font-size: 30px;
`;

const InputWrapper = styled.div`
  margin: auto;
  margin: 10px;
`;

const RegisterBox = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  max-width: 500px;

  margin-top: 20px;
  padding: 32px;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  label {
    margin-top: 15px;
    text-align: left;
    width: 100%;
  }
  input {
    width: 100%;
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
  const [userTel, setuserTel] = useState("");

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
    if (userTel === "") {
      return alert("전화번호를 입력하세요!");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      usertel: userTel,
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
      <Title>옷짱 회원가입</Title>
      <InputWrapper>
        <RegisterBox onSubmit={onSubmitHandler}>
          <label>이메일</label>
          <input type="email" value={Email} onChange={onEmailHandler} />
          <label>비밀번호</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
          />
          <label>비밀번호 확인</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
          />
          <label>이름</label>
          <input type="text" value={Name} onChange={onNameHandler} />
          <label>전화번호</label>
          <input type="tel" value={userTel} onChange={onUserTelHandler} />

          <br />
          <button type="submit">회원가입하기</button>
        </RegisterBox>
      </InputWrapper>
      <MainPageFooter />
    </Wrapper>
  );
}

export default RegisterPage;
