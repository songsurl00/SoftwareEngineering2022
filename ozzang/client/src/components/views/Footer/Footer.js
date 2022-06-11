import React from "react";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Footer = styled.div`
  margin-top: auto;
  width: 100%;
  min-height: 240px;
  padding: 20px 0;
  color: #555b66;
  background-color: #282d32;

  ul {
    padding: 0;
    list-style: none;
    line-height: 1.6;
    font-size: 14px;
    margin-bottom: 0;

    a {
      color: #248afd;
      text-decoration: none;
      opacity: 0.8;
    }
  }
  .item {
    margin-bottom: 36px;
    color: red;
  }
`;
const Title = styled.div`
  color: #c7ccd6;
  margin-top: 0;
  margin-bottom: 16px;
  font-weight: bold;
  font-size: 30px;
`;
const FooterContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Row = styled.div`
  display: flex;
`;
const Col = styled.div`
  width: 320px;
  text-align: center;

  li {
    color: #808080;
    font-size: 15px;
  }

  p {
    color: #808080;
  }
`;

function MainPageFooter() {
  return (
    <Footer>
      <FooterContainer>
        <Row>
          <Col className="item">
            <Title>About Ozzang</Title>
            <ul>
              <li>
                <p>
                  SangMyung Univ. Computer Science.
                  <br /> SoftwareEngineering. Project
                </p>
              </li>
              <li>
                <a href="https://github.com/PMtHk/SoftwareEngineering2022/">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </Col>

          <Col className="item">
            <Title>Developers</Title>
            <ul>
              <li>나주엽</li>
              <li>문정호</li>
              <li>송수근</li>
              <li>이주헌</li>
              <li>정용훈</li>
            </ul>
          </Col>
        </Row>
      </FooterContainer>
    </Footer>
  );
}

export default MainPageFooter;
