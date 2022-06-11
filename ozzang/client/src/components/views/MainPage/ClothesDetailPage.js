import React, { useEffect, useState, useCallback } from "react";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ReactComponent as HeartSvgIcon } from "../assets/heart_icon.svg";
import { deleteClothes } from "../../../_actions/user_action";

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

const ContentWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 960px;
  padding-top: 32px;
`;

const ClothImageWrapper = styled.div`
  position: relative;
  flex: 0 0 360px;
  margin-right: 24px;
`;

const CardFavoriteButton = styled.div`
  position: absolute;
  bottom: 16px;
  right: 16px;
  width: 32px;
  height: 32px;
  padding: 3px 2px 1px 2px;

  border-radius: 48px;
  background-color: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
  z-index: 1;
  opacity: 0;

  &.cloth-card-fav {
    color: white;
    background-color: #ff4747;
    opacity: 1;
  }
`;

const ClothImage = styled.div`
  width: 100%;
  padding-top: 100%;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
`;

const ClothContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  flex: 1 0 0px;

  background-color: white;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
`;

const ClothInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0px 24px 16px 24px;
`;

const ClothInfoTitle = styled.div`
  width: 100%;
  height: 64px;
  padding: 16px 0px;
  font-size: 20px;
  line-height: 32px;
  font-weight: 500;
`;

const ClothInfoRow = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  padding: 0px 0px 8px 0px;
  font-size: 15px;
  line-height: 32px;
`;

const ClothInfoRowTitle = styled.div`
  flex: 0 0 72px;
  font-weight: 400;
  text-align: left;
  color: #666666;
`;
const ClothInfoRowContent = styled.div`
  flex: 1 0 0px;
  padding-left: 8px;
  font-size: 18px;
`;

const ClothButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;

  width: 100%;
  height: 49px;
  border-top: 1px solid #dddddd;
  background-color: #eeeeee;
`;

const ClothChangeButton = styled.button`
  flex: 0 0 120px;
  font-size: 16px;
  line-height: 48px;
  color: white;
  background-color: #71c02b;
  border: none;
  cursor: pointer;
`;

const ClothDeleteButton = styled.button`
  flex: 0 0 120px;
  font-size: 16px;
  line-height: 48px;
  color: white;
  background-color: #ff4747;
  border: none;
  cursor: pointer;
`;

const ClothesDetailPage = () => {
  const params = useParams();
  const [cloth, setCloth] = useState({});

  useEffect(() => {
    const getCloth = async () => {
      const response = await axios.get(`/api/clothes/${params.cloth_id}`);
      const newCloth = response?.data?.cloth;
      console.log(newCloth);
      setCloth(newCloth);
    };
    getCloth();
  }, []);

  const navigate = useNavigate();

  const onChangeButtonClick = useCallback(
    (event) => {
      navigate(`/updateClothes/${cloth._id}`);
    },
    [cloth]
  );
  const onDeleteButtonClick = useCallback(
    (event) => {
      deleteClothes(cloth);
      navigate("/main");
    },
    [cloth]
  );

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <ContentWrapper>
          <ClothImageWrapper>
            <CardFavoriteButton className={cloth?.fav && "cloth-card-fav"}>
              <HeartSvgIcon />
            </CardFavoriteButton>
            <ClothImage
              style={{
                backgroundImage: cloth.imgUrl && `url(${cloth.imgUrl})`,
              }}
            />
          </ClothImageWrapper>
          <ClothContentWrapper>
            <ClothInfoWrapper>
              <ClothInfoTitle>{cloth.name || "-"}</ClothInfoTitle>
              <ClothInfoRow>
                <ClothInfoRowTitle>카테고리</ClothInfoRowTitle>
                <ClothInfoRowContent>
                  {cloth.category || "-"}
                </ClothInfoRowContent>
              </ClothInfoRow>
              <ClothInfoRow>
                <ClothInfoRowTitle>계절</ClothInfoRowTitle>
                <ClothInfoRowContent>{cloth.season || "-"}</ClothInfoRowContent>
              </ClothInfoRow>
              <ClothInfoRow>
                <ClothInfoRowTitle>가격</ClothInfoRowTitle>
                <ClothInfoRowContent>{cloth.price || "-"}</ClothInfoRowContent>
              </ClothInfoRow>
              <ClothInfoRow>
                <ClothInfoRowTitle>브랜드</ClothInfoRowTitle>
                <ClothInfoRowContent>{cloth.brand}</ClothInfoRowContent>
              </ClothInfoRow>
              <ClothInfoRow>
                <ClothInfoRowTitle>구매일자</ClothInfoRowTitle>
                <ClothInfoRowContent>
                  {cloth.purchaseDate || "-"}
                </ClothInfoRowContent>
              </ClothInfoRow>
              <ClothInfoRow>
                <ClothInfoRowTitle>구매장소</ClothInfoRowTitle>
                <ClothInfoRowContent>
                  {cloth.purchasePlace || "-"}
                </ClothInfoRowContent>
              </ClothInfoRow>
            </ClothInfoWrapper>
            <ClothButtonWrapper>
              <ClothChangeButton onClick={onChangeButtonClick}>
                수정하기
              </ClothChangeButton>
              <ClothDeleteButton onClick={onDeleteButtonClick}>
                삭제하기
              </ClothDeleteButton>
            </ClothButtonWrapper>
          </ClothContentWrapper>
        </ContentWrapper>
      </BodyWrapper>
    </Wrapper>
  );
};

export default ClothesDetailPage;
