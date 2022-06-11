import React, { useState } from "react";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";
import MainPageFooter from "../Footer/Footer";

const Wrapper = styled.div`
  margin: auto;
`;

const BodyWrapper = styled.div`
  position: relative;
  padding-top: 100px;
`;

function SharePage() {
  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper></BodyWrapper>
      <MainPageFooter />
    </Wrapper>
  );
}

export default SharePage;
