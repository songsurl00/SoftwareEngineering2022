import React, { useCallback, useState } from "react";
import _ from "lodash";
import styled from "@emotion/styled";
import { updateFavorite } from "../../../_actions/user_action";

import { ReactComponent as HeartSvgIcon } from "../assets/heart_icon.svg";
import { useNavigate } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0px 0px 32px 0px;
`;

const WrapperTitle = styled.div`
  width: 960px;
  height: 40px;
  margin: 0px 0px 8px 0px;
  font-size: 18px;
  line-height: 40px;
  color: rgba(0, 0, 0, 0.5);
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 16px;

  width: 960px;
  height: 100%;
`;

const Card = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px 0px 8px 0px;

  background-color: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);

  overflow: hidden;

  cursor: pointer;

  transition: margin 0.1s, box-shadow 0.1s;

  &:hover {
    margin-top: -4px;
    margin-bottom: 4px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.5);
  }
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;

  background-image: url(https://target.scene7.com/is/image/Target/GUEST_693c1197-393c-4aa5-a4e6-70ec71be5419?wid=315&hei=315&qlt=60&fmt=pjpeg);
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border-bottom: 1px solid #d4d4d4;

  &::before {
    position: relative;
    display: block;
    content: "";
    width: 100%;
    padding-top: 100%;
  }
`;

const CardTitle = styled.div`
  width: 100%;
  padding: 8px 12px;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
`;

const CardInfo = styled.div`
  display: flex;
  width: 100%;
  padding: 0px 12px 0px 12px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
`;

const CardFavoriteButton = styled.div`
  position: absolute;
  bottom: -16px;
  right: 16px;
  width: 32px;
  height: 32px;
  padding: 3px 2px 1px 2px;

  border-radius: 48px;
  background-color: white;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
  z-index: 1;
  opacity: 0;
  transition: background-color .1s, color: .1s;;

  &:hover {
    background-color: #efefef;
  }

  .cloth-card-hover & {
    opacity: 1;
  }
  .cloth-card-fav & {
    color: white;
    background-color: #ff4747;
    opacity: 1;
  }
`;

const CardInfoContent = styled.div`
  position: relative;
  min-height: 24px;
  padding: 0px 12px 8px 0px;
  line-height: 16px;

  &::before {
    position: absolute;
    display: block;
    content: "";
    top: 7px;
    right: 5px;
    width: 2px;
    height: 2px;
    border-radius: 2px;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &:last-child {
    padding-right: 0px;
  }

  &:last-child::before {
    display: none;
  }
`;

const ClothCard = (props) => {
  const { cloth, clothIndex, updateCloth } = props;

  const [isHover, setIsHover] = useState(false);

  const onCardMouseOver = useCallback(() => {
    setIsHover(true);
  }, []);
  const onCardMouseOut = useCallback(() => {
    setIsHover(false);
  }, []);

  const onFavoriteButtonClick = useCallback(
    (event) => {
      updateFavorite(cloth);
      const newCloth = _.cloneDeep(cloth);
      newCloth.fav = !cloth.fav;
      updateCloth(clothIndex, newCloth);
      event.stopPropagation();
    },
    [cloth]
  );

  const navigate = useNavigate();

  const onCardClick = useCallback(() => {
    navigate(`/cloth/${cloth._id}`);
  }, []);

  return (
    <Card
      className={[
        isHover && "cloth-card-hover",
        cloth.fav && "cloth-card-fav",
      ].join(" ")}
      onClick={onCardClick}
      onMouseOver={onCardMouseOver}
      onMouseOut={onCardMouseOut}
    >
      <CardImage
        style={cloth.imgUrl && { backgroundImage: `url(${cloth.imgUrl})` }}
      >
        <CardFavoriteButton onClick={onFavoriteButtonClick}>
          <HeartSvgIcon />
        </CardFavoriteButton>
      </CardImage>
      <CardTitle>{cloth.name}</CardTitle>
      <CardInfo>
        <CardInfoContent>{cloth.category || "정보 없음"}</CardInfoContent>
        <CardInfoContent>{cloth.season || "정보 없음"}</CardInfoContent>
        <CardInfoContent>{cloth.brand || "정보 없음"}</CardInfoContent>
      </CardInfo>
      <CardInfo>
        <CardInfoContent>&#8361; {cloth.price} 원</CardInfoContent>
      </CardInfo>
    </Card>
  );
};

const ClothesGridWrapper = (props) => {
  const { clothes, setClothes } = props;

  const updateCloth = useCallback(
    (index, cloth) => {
      const newClothes = _.cloneDeep(clothes);
      newClothes[index] = cloth;
      setClothes(newClothes);
    },
    [clothes, setClothes]
  );
  return (
    <Wrapper>
      <WrapperTitle>옷 리스트 ({clothes.length}개 검색됨)</WrapperTitle>
      <GridWrapper>
        {_.map(clothes, (cloth, index) => {
          return (
            <ClothCard
              cloth={cloth}
              clothIndex={index}
              updateCloth={updateCloth}
              key={cloth._id}
            />
          );
        })}
      </GridWrapper>
    </Wrapper>
  );
};

export default ClothesGridWrapper;
