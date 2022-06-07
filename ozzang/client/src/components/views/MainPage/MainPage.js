import React, { useState } from "react";
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
  display: flex;
  float: left;
`;

function MainPage() {
  const [searchclothes, setSearch] = useState(""); // 검색을 위한 state
  const [searchCat, setsCategory] = useState("");
  const [searchSeason, setsSeason] = useState("");

  const onCategoryHandler = (event) => {
    setsCategory(event.currentTarget.value);
  };

  const onSeasonHandler = (event) => {
    setsSeason(event.currentTarget.value);
  };

  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };

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

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (searchclothes === "") {
      return alert("검색어를 입력하세요!");
    }
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
      <BodyWrapper>
        <form onSubmit={onSubmitHandler}>
          <div>
            <select value={searchCat} onChange={onCategoryHandler}>
              <option>상의</option>
              <option>아우터</option>
              <option>바지</option>
              <option>원피스</option>
              <option>스커트</option>
              <option>스니커즈</option>
              <option>신발</option>
              <option>가방</option>
              <option>스포츠</option>
              <option>모자</option>
              <option>액세서리</option>
            </select>
          </div>
          <div>
            <select value={searchSeason} onChange={onSeasonHandler}>
              <option>봄</option>
              <option>여름</option>
              <option>가을</option>
              <option>겨을</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              value={searchclothes}
              placeholder="Search"
              onChange={onSearchHandler}
            ></input>
            <button type="submit">Search</button>
          </div>
        </form>
        <div>
          <button onClick={null}>+</button>
        </div>

        <div></div>
      </BodyWrapper>
    </Wrapper>
  );
}

export default MainPage;
