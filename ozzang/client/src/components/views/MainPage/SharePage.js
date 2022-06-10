import React, { useState } from "react";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";

const Wrapper = styled.div`
  margin: 0;
`;

const BodyWrapper = styled.div`
  position: relative;
  padding-top: 100px;
`;

function SharePage() {
  return (
    <Wrapper>
      <MainPageHeader/>
      <BodyWrapper></BodyWrapper>
    </Wrapper>
  );
}

export default SharePage;
