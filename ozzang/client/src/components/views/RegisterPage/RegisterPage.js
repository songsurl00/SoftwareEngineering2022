import React, { useState } from "react";
import { registerUser } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        <input type="email" value={Email} onChange={onEmailHandler} />
        <label>Password</label>
        <input type="password" value={Password} onChange={onPasswordHandler} />
        <label>Confirm Password</label>
        <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        />
        <label>Name</label>
        <input type="text" value={Name} onChange={onNameHandler} />
        <label>UserTel</label>
        <input type="tel" value={userTel} onChange={onUserTelHandler} />

        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
