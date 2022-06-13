import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";
import MainPageHeader from "./MainPageHeader";
import ClothesGridWrapper from "./ClothesGridWrapper";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import { ReactComponent as PlusSvgIcon } from "../assets/plus_icon.svg";
import { getFavClothes } from "../../../_actions/user_action";

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

const FilterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 960px;
  height: 88px;
  margin: 0px 0px 16px 0px;
  padding: 16px 20px 4px 20px;
  border-radius: 0px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

const NewClothesButton = styled.button`
  position: fixed;
  right: 64px;
  bottom: 32px;

  width: 72px;
  height: 72px;

  padding: 20px;
  margin: 0px;

  font-size: 32px;
  line-height: 72px;

  border: 0px;
  border-radius: 72px;

  background-color: #f5a623;
  cursor: pointer;

  transition: box-shadow 0.1s;

  &:hover {
    box-shadow: 0px 1px 8px rgba(0, 0, 0, 0.5);
  }
`;

const StyledPlusSvgIcon = styled(PlusSvgIcon)`
  float: left;
  width: 32px;
  height: 32px;
  color: white;
`;

function FavPage() {
  const [searchclothes, setSearch] = useState(""); // 검색을 위한 state
  const [searchCat, setsCategory] = useState("");
  const [searchSeason, setsSeason] = useState("");

  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    const fetchClothesList = async () => {
      const response = await getFavClothes();
      const newClothes = response.payload.clothes;
      setClothes(newClothes);
    };
    fetchClothesList();
  }, []);

  const onCategoryHandler = (event) => {
    setsCategory(event.target.value);
  };
  const onSeasonHandler = (event) => {
    setsSeason(event.target.value);
  };
  const onSearchHandler = (event) => {
    setSearch(event.currentTarget.value);
  };

  const navigate = useNavigate();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (searchclothes === "") {
      return alert("검색어를 입력하세요!");
    }
  };

  const PlusBtnHandler = (event) => {
    navigate("/uploadclothes");
  };

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <FilterWrapper>
          <FormControl sx={{ minWidth: 160, marginRight: 2 }}>
            <InputLabel id="main-page-category-filter-label">
              카테고리
            </InputLabel>
            <Select
              labelId="main-page-category-filter-label"
              value={searchCat}
              label="카테고리"
              onChange={onCategoryHandler}
            >
              <MenuItem value="">선택 안함</MenuItem>
              <MenuItem value="상의">상의</MenuItem>
              <MenuItem value="아우터">아우터</MenuItem>
              <MenuItem value="바지">바지</MenuItem>
              <MenuItem value="원피스">원피스</MenuItem>
              <MenuItem value="스커트">스커트</MenuItem>
              <MenuItem value="스니커즈">스니커즈</MenuItem>
              <MenuItem value="신발">신발</MenuItem>
              <MenuItem value="가방">가방</MenuItem>
              <MenuItem value="스포츠">스포츠</MenuItem>
              <MenuItem value="모자">모자</MenuItem>
              <MenuItem value="액세서리">액세서리</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 120, marginRight: 2 }}>
            <InputLabel id="main-page-season-filter-label">계절</InputLabel>
            <Select
              labelId="main-page-season-filter-label"
              value={searchSeason}
              label="계절"
              onChange={onSeasonHandler}
            >
              <MenuItem value="">선택 안함</MenuItem>
              <MenuItem value="봄">봄</MenuItem>
              <MenuItem value="여름">여름</MenuItem>
              <MenuItem value="가을">가을</MenuItem>
              <MenuItem value="겨울">겨울</MenuItem>
            </Select>
          </FormControl>
          <TextField
            sx={{ minWidth: 320, float: "right", marginLeft: "auto" }}
            label="검색어"
            variant="outlined"
            value={searchclothes}
            onChange={onSearchHandler}
          />
        </FilterWrapper>
        <ClothesGridWrapper clothes={clothes} setClothes={setClothes} />

        <NewClothesButton onClick={PlusBtnHandler}>
          <StyledPlusSvgIcon />
        </NewClothesButton>
      </BodyWrapper>
    </Wrapper>
  );
}

export default FavPage;
