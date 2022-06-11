import React, { useState } from "react";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 80px 0px 0px 0px;
  background: #eeeeee;
`;

const BodyWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow-y: scroll;
`;
function ClothesDetailPage() {
  return (
    <Wrapper>
      <MainPageHeader/>
      <BodyWrapper></BodyWrapper>
    </Wrapper>
  );
}

export default ClothesDetailPage;
