import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  margin: 0;
`;

const NavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  font-size: 20px;

  height: 100px;
  padding: 1rem;
  color: black;
  background: white;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 1;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  button {
    border: none;
    background: white;
    margin: 40px;
    font-size: 15px;
  }
`;

const BodyWrapper = styled.div`
  position: relative;
  padding-top: 100px;
`;

function FavPage() {
  const navigate = useNavigate();

  const onClothesBtnHandler = (event) => {
    navigate("/main");
  };

  const onProfileBtnHandler = (event) => {
    navigate("/profile");
  };

  const onStyleBtnHandler = (event) => {
    navigate("/style");
  };

  const onShareBtnHandler = (event) => {
    navigate("/share");
  };

  const onFavBtnHandler = (event) => {
    navigate("/fav");
  };

  return (
    <Wrapper>
      <NavWrapper>
        <h1>Ozzang</h1>
        <nav>
          <button onClick={onClothesBtnHandler}>Clothes</button>
          <button onClick={onStyleBtnHandler}>Style</button>
          <button onClick={onFavBtnHandler}>Favorite</button>
          <button onClick={onShareBtnHandler}>Share</button>
          <button onClick={onProfileBtnHandler}>Profile</button>
        </nav>
      </NavWrapper>
      <BodyWrapper></BodyWrapper>
    </Wrapper>
  );
}

export default FavPage;
