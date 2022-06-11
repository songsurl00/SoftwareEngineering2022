import _ from "lodash";
import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";

import { getStyle } from "../../../_actions/user_action";

import ClothesSimpleGridWrapper from "../MainPage/ClothesSimpleGridWrapper";

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

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
  align-items: center;
  width: 960px;
  height: 88px;
  min-height: 88px;
  padding: 0px 24px;
  border-radius: 0px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
  background-color: white;
`;

const StyledToggleButton = styled(ToggleButton)`
font-family: 'Noto Sans KR';
font-size: 14px;
font-weight: 400;
height: 48px;
line-height: 46px;
color: #666666;
border-color: rgba(0,0,0,.2);

&.Mui-selected, &.Mui-selected:hover {
  color: white;
  background-color: #248afd;
}
`;

const NewStyleButton = styled.button`
width: 160px;
height: 48px;
padding: 0px;
margin-left: auto;

font-size: 16px;
line-height: 48px;
color: white;
border: none;
border-radius: 8px;

background-color: #f5a623;
cursor: pointer;

transition: box-shadow .1s;

&:hover {
  box-shadow: 0px 1px 3px rgba(0, 0, 0, .4);
}

`;


const StyleRowWrapper = styled.div`
display: flex;
flex-direction: column;
width: 960px;


`;

const StyleRowWrapperTitle = styled.div`
width: 100%;

margin: 16px 0px 8px 0px;
font-size: 18px;
line-height: 40px;
color: rgba(0,0,0,.4);
`

const StyleRowDiv = styled.div`
position: relative;

display: flex;
width: 100%;

padding : 16px 16px 0px 16px;
margin: 0px 0px 24px 0px;

background-color: white;
box-shadow: 0px 1px 4px rgba(0,0,0,.3);

`;
const StyleDeleteButton = styled.div`
position: absolute;

top: 16px;
right: 16px;

padding: 0px 12px;
font-size: 14px;
line-height: 32px;

opacity: 0;

border-radius: 4px;

background-color: #ff4747;
color: white;

cursor: pointer;

transition: opacity .1s;

*:hover > & {
  opacity: 1;
}
`

const StyleImageWrapper = styled.div`
width: 360px;
flex: 0 0 360px;
margin-right: 16px;
`;
const StyleImage = styled.img`
width: 360px;
height: 360px;
object-fit: cover;
`;
const StyleInfoWrapper = styled.div`
display: flex;
flex-direction: column;
flex: 1 0 0px;
`;
const StyleInfoTitle = styled.div`
margin: 0px 0px 12px 0px;
font-size: 24px;
font-weight: 500;
line-height: 32px;
`;
const StyleInfoContentTitle = styled.div`
margin: 0px 0px 0px 0px;
font-size: 14px;
line-height: 24px;
color: rgba(0,0,0,.5);
`;
const StyleInfoContentDescription = styled.div`
margin: 0px 0px 16px 0px;
font-size: 16px;
font-weight: 400;
line-height: 24px;
`;

const StyleInfoContentTable = styled.div`
display: flex;
width: 100%;

`;
const StyleInfoContentColumn = styled.div`
flex: 1 0 0px;
`;

const StyleInforRowSeparator = styled.div`
width: 100%;
height: 1px;
margin: 0px 0px 16px 0px;

background-color: rgba(0,0,0,.2);
`;


const StyleRow = (props) => {
  const {style} = props;

  return (
    <StyleRowDiv>
      <StyleDeleteButton>삭제하기</StyleDeleteButton>
      <StyleImageWrapper>
        <StyleImage src={style.imgUrl}/>
      </StyleImageWrapper>
      <StyleInfoWrapper>
        <StyleInfoTitle>{style.name}</StyleInfoTitle>
        <StyleInfoContentTitle>설명</StyleInfoContentTitle>
        <StyleInfoContentDescription>{style.description}</StyleInfoContentDescription>
        <StyleInfoContentTable>
          <StyleInfoContentColumn>
            <StyleInfoContentTitle>계절</StyleInfoContentTitle>
            <StyleInfoContentDescription>{style.season}</StyleInfoContentDescription>
          </StyleInfoContentColumn>
          <StyleInfoContentColumn>
            <StyleInfoContentTitle>공개여부</StyleInfoContentTitle>
            <StyleInfoContentDescription>{style.share ? '공개' : '비공개'}</StyleInfoContentDescription>
          </StyleInfoContentColumn>
          <StyleInfoContentColumn>
            <StyleInfoContentTitle>등록한 사람</StyleInfoContentTitle>
            <StyleInfoContentDescription>{style.useremail}</StyleInfoContentDescription>
          </StyleInfoContentColumn>
        </StyleInfoContentTable>
        <StyleInforRowSeparator/>
        <ClothesSimpleGridWrapper clothes={style.clotheslist || []}/>
      </StyleInfoWrapper>
    </StyleRowDiv>
  )
};


function StylePage() {
  const [seasonFilter, setSeasonFilter] = useState("all");
  const [styles, setStyles] = useState([]);
  
  const navigate = useNavigate();

  const moveToUploadStyle = useCallback(() => {
    navigate('/uploadStyles');
  });

  useEffect(() => {
    const getStyleFromServer = async () => {
      const response = await getStyle();
      console.log(response)
      setStyles(response.payload.style)
    };
    getStyleFromServer();
  }, []);


  const updateSeasonFilter = useCallback((event) => {
    const newSeasonFilter = event.target.value;
    console.log(newSeasonFilter)
      setSeasonFilter(event.target.value)
  });


  return (
    <Wrapper>
      <MainPageHeader/>
      <BodyWrapper>
        <FilterWrapper>
          <ToggleButtonGroup
            value={seasonFilter}
            onChange={updateSeasonFilter}
            variant="outlined"
          >
            <StyledToggleButton sx={{width: 64}} value="all">전체</StyledToggleButton>
            <StyledToggleButton sx={{width: 64}} value="봄">봄</StyledToggleButton>
            <StyledToggleButton sx={{width: 64}} value="여름">여름</StyledToggleButton>
            <StyledToggleButton sx={{width: 64}} value="가을">가을</StyledToggleButton>
            <StyledToggleButton sx={{width: 64}} value="겨울">겨울</StyledToggleButton>
          </ToggleButtonGroup>
          <NewStyleButton onClick={moveToUploadStyle}>스타일 만들기</NewStyleButton>
        </FilterWrapper>
        <StyleRowWrapper>
          <StyleRowWrapperTitle>스타일 리스트 ({styles.length}개 검색됨)</StyleRowWrapperTitle>
          {
            _.map(styles, (style) => {
              return <StyleRow style={style}/>
            })
          }
        </StyleRowWrapper>
      </BodyWrapper>
    </Wrapper>
  );
}

export default StylePage;
