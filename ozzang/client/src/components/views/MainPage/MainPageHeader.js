import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Header = styled.div`
position: fixed;
top: 0;
left: 0;
right: 0;

font-size: 24px;

height: 80px;
padding: 0px 16px;
color: black;
background: white;
font-weight: bold;
display: flex;
justify-content: space-between;
align-items: center;
z-index: 9999;
background-color: #248afd;
box-shadow: 0px 2px 8px rgba(0,0,0,.3);
`;

const HeaderTitle = styled.div`
padding: 16px 16px 24px 16px;
font-size: 40px;
line-height: 40px;
color: white;
`;

const HeaderTabWrapper = styled.div`
display: flex;
height: 100%;
`

const HeaderTab = styled.button`
position: relative;
margin: 0px 8px;
padding: 0px 24px;
border: none;
background: transparent;
font-size: 18px;
cursor: pointer;
color: white;

&::before {
  position: absolute;
  display: block;
  content: '';
  width: 100%;
  height: 0px;
  left: 0px;
  bottom: 0px;

  background-color: white;
  transition: height .2s;
}
&:hover::before {
  height: 4px;
}
`

function MainPageHeader() {
  const navigate = useNavigate();
  const getNavigateFunc = (endpoint) => {
    return () => { navigate(endpoint); };
  };

  return (
    <Header>
      <HeaderTitle>OZZANG</HeaderTitle>
      <HeaderTabWrapper>
        <HeaderTab onClick={getNavigateFunc("/main")}>Clothes</HeaderTab>
        <HeaderTab onClick={getNavigateFunc("/style")}>Style</HeaderTab>
        <HeaderTab onClick={getNavigateFunc("/fav")}>Favorite</HeaderTab>
        <HeaderTab onClick={getNavigateFunc("/share")}>Share</HeaderTab>
        <HeaderTab onClick={getNavigateFunc("/profile")}>Profile</HeaderTab>
      </HeaderTabWrapper>
    </Header>
  );
}

export default MainPageHeader;
