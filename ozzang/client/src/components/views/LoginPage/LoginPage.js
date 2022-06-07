import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../../_actions/user_action";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import logo from "../../../assets/logo.png";

const ImgWrapper = styled.div`
  margin-top: 150px;
  text-align: center;

  img {
    width: 350px;
    height: 350px;
  }
`;

const OuterWrapper = styled.div`
  width:100%
  height:100%
  position: absolute;
  left: 50%;
  top: 50%;
  margin: -145px 0 0 -160px;
`;

const InnerWrapper = styled.div`
  width: 320px;
  margin: 0 auto;
`;

const Fieldset = styled.fieldset`
  border: 0;
`;

const LoginBox = styled.form`
  margin: 35px 0 0;
  border-radius: 3px;
  background-color: #fff;
  box-sizing: border-box;
`;

const InputText = styled.div`
  position: relative;
  width: 100%;
  margin: 10;
  padding: 18px 19px 19px;
  box-sizing: border-box;
  border: 1px solid #ddd;

  input {
    background-color: white;
    cursor: text;
    border-top: 1px solid #ddd;
    display: block;
    width: 100%;
    height: 100%;
    font-size: 16px;
    border: none;
  }
`;

const Label = styled.label`
  position: absolute;
  width: 0;
  height: 0;
  overflow: hidden;
  line-height: 0;
  text-indent: -9999px;
`;

const BtnLogin = styled.button`
  margin: 20px 0 0;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-size: 20px;
  color: #fff;
  background-color: #000;
  line-height: 1.5;
`;

const FindWrapper = styled.div`
  padding: 10px 0 0;
`;

const BtnRegister = styled.button`
  background-color: #fff;
  border: none;
`;

const BtnFindAccount = styled.button`
  background-color: #fff;
  border: none;
`;

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    // refresh 를 방지해서 다음으로 해야할 작업 수행에 방해가 없도록 한다.
    // 해당 코드가 없다면, refresh가 진행되어 state 값이 비게 된다.

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate("/main");
        // login 성공 -> landingPage로 이동
      } else {
        alert("Error");
      }
    });
  };
  const RegBtnHandler = () => navigate("/register");
  const findBtnHandler = () => navigate("/findAccount");
  // findAccount 미구현.

  return (
    <OuterWrapper>
      <ImgWrapper>
        <img src={logo}></img>
      </ImgWrapper>
      <InnerWrapper>
        <Fieldset>
          <LoginBox onSubmit={onSubmitHandler}>
            <InputText>
              <Label for="EMAIL_LOGIN"></Label>
              <input
                type="Email"
                value={Email}
                placeholder="Email"
                onChange={onEmailHandler}
              ></input>
            </InputText>
            <InputText>
              <Label for="PW_LOGIN"></Label>
              <input
                type="password"
                value={Password}
                placeholder="Password"
                onChange={onPasswordHandler}
              ></input>
            </InputText>
            <BtnLogin>로그인</BtnLogin>
          </LoginBox>

          <FindWrapper>
            <BtnRegister onClick={RegBtnHandler}>회원가입</BtnRegister>
            <BtnFindAccount onClick={findBtnHandler}>
              Email/비밀번호 찾기
            </BtnFindAccount>
          </FindWrapper>
        </Fieldset>
      </InnerWrapper>
    </OuterWrapper>
  );
}

export default LoginPage;
