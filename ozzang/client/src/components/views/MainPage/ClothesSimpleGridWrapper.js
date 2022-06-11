import React from "react";
import _ from "lodash";
import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 200px;
  margin: 0px 0px;
  padding: 4px 8px 12px 8px;
  overflow-x: scroll;
`;

const HorizontalCardWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const HorizontalCardBoard = styled.div`
position: absolute;
top: 0px;
left: 0px;
display: flex;
// width: 100%;
height: 100%;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 120px;
  height: 160px;
  flex: 0 0 120px;
  margin: 0px 12px 0px 0px;
  padding: 0px 0px 0px 0px;

  background-color: #f8f8f8;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);

  overflow: hidden;
`;

const CardImage = styled.div`
  position: relative;
  width: 100%;

  background-image: url(https://target.scene7.com/is/image/Target/GUEST_693c1197-393c-4aa5-a4e6-70ec71be5419?wid=315&hei=315&qlt=60&fmt=pjpeg);
  background-size: cover;
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
  height: 40px;
  flex: 0 0 40px;
  padding: 8px 8px;
  font-size: 14px;
  font-weight: 400;
  line-height: 24px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow:hidden;
`;

const ClothCard = (props) => {
  const { cloth } = props;
  return (
    <Card>
      <CardImage
        style={cloth.imgUrl && { backgroundImage: `url(${cloth.imgUrl})` }}
      >
      </CardImage>
      <CardTitle>{cloth.name}</CardTitle>
    </Card>
  );
};

const ClothesSimpleGridWrapper = (props) => {
  const { clothes } = props;

  return (
    <Wrapper>
      <HorizontalCardWrapper>
        <HorizontalCardBoard>
          {_.map(clothes, (cloth) => {
            return (
              <ClothCard
                cloth={cloth}
                key={cloth._id}
              />
            );
          })}
        </HorizontalCardBoard>
      </HorizontalCardWrapper>
    </Wrapper>
  );
};

export default ClothesSimpleGridWrapper;
