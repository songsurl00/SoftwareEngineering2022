import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  justifycontent: center;
  alignitems: center;
  width: 100%;
  height: 100vh;
`;

const Title = styled.h2``;

function LandingPage() {
  const navigate = useNavigate();

  const onClickHandler = () =>
    axios.get("/api/users/logout").then((response) => {
      if (response.data.success) {
        navigate("/login");
      } else {
        alert("Failed to logout");
      }
    });

  return (
    <Wrapper>
      <Title>시작 페이지</Title>
      <button onClick={onClickHandler}>logout</button>
    </Wrapper>
  );
}

export default LandingPage;
