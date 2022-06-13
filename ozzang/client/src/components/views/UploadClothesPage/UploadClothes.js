import React, { useEffect, useState, useCallback } from "react";
import { uploadClothes } from "../../../_actions/user_action";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import MainPageHeader from "../MainPage/MainPageHeader";
import MainPageFooter from "../Footer/Footer";

// Material UI
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
// import DatePicker from "@mui/x-date-pickers-pro/DatePicker";

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

const UploaderWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 960px;
  padding: 24px 0px;
`;

const UploaderTitle = styled.div`
  width: 100%;

  margin: 0px 0px 24px 0px;
  font-size: 22px;
  font-weight: 500;
  line-height: 32px;

  color: rgba(0, 0, 0, 0.8);
`;

const BaseInformationWrapper = styled.div`
  width: 100%;

  padding: 16px 24px 24px 24px;
  background-color: white;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
`;

const UploaderContent = styled.div`
  display: flex;
  width: 100%;

  padding: 0px 0px 16px 0px;
  margin: 0px 0px 16px 0px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const ClothesInformationColumn = styled.div`
  flex: 1 0 0px;
`;

const ClothesImageColumn = styled.div`
  flex: 0 0 320px;

  padding-right: 24px;
  margin-right: 24px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const UploadClothesButton = styled.button`
  display: block;
  width: 160px;
  height: 48px;

  padding: 0px;
  margin: 0px 0px 0px auto;
  font-size: 16px;
  font-weight: 500;
  line-height: 48px;

  border: none;
  border-radius: 8px;
  color: white;
  background-color: #71c02b;
  cursor: pointer;

  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.2);
  }
`;

// -------------------------------------------------

const InputWrapper = styled.div`
  margin: auto;
  margin: 10px;
`;
const UploadBox = styled.form`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: auto;
  max-width: 500px;

  margin-top: 20px;
  padding: 32px;

  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 20px 0 rgba(0, 0, 0, 0.15);
  label {
    margin-top: 15px;
    text-align: left;
    width: 100%;
  }
  input {
    width: 100%;
    border: 1px solid grey;
    border-radius: 5px;
  }

  select {
    width: 100%;
    border: 1px solid grey;
    border-radius: 5px;
  }

  button {
    margin-top: 20px;
  }
`;

function UploadClothesPage() {
  // useEffect(() => {
  //   const clothesInfo = async () => {
  //     let setClothesInfo = {
  //       name= "",
  //       brand= "",
  //       price= "",
  //     };
  //   };
  // });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState({});

  // 이미지 업로드을 위한 Base64 변환.
  const [ImageSrc, setImageSrc] = useState("");

  const encFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const [Name, setName] = useState("");
  const [Brand, setBrand] = useState("");
  const [Price, setPrice] = useState("");
  const [Category, setCategory] = useState("상의");
  const [Season, setSeason] = useState("봄");
  const [PurchasePlace, setPurchasePlace] = useState("");
  const [PurchaseDate, setPurchaseDate] = useState("");

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };
  const onBrandHandler = (event) => {
    setBrand(event.currentTarget.value);
  };
  const onPriceHandler = (event) => {
    setPrice(event.currentTarget.value);
  };
  const onCategoryHandler = useCallback((event) => {
    setCategory(event.target.value);
  });
  const onSeasonHandler = useCallback((event) => {
    setSeason(event.target.value);
  });
  const onPurchasePlaceHandler = (event) => {
    setPurchasePlace(event.currentTarget.value);
  };
  const onPurchaseDateHandler = (event) => {
    setPurchaseDate(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Name === "") {
      return alert("옷 이름을 입력하세요!");
    }

    let body = {
      name: Name,
      brand: Brand,
      price: Price,
      category: Category,
      season: Season,
      purchasePlace: PurchasePlace,
      purchaseDate: PurchaseDate,
      img: ImageSrc,
    };
    uploadClothes(body).then((response) => {
      if (response.payload.success) {
        navigate("/main");
      } else {
        alert("Failed to Upload");
      }
    });
  };

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <UploaderWrapper>
          <BaseInformationWrapper>
            <UploaderTitle>옷 정보 입력하기</UploaderTitle>
            <UploaderContent>
              <ClothesImageColumn>
                <div>
                  {ImageSrc && (
                    <img
                      src={ImageSrc}
                      alt="preview-img"
                      style={{
                        width: "295px",
                        height: "295px",
                        marginBottom: "16px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    encFileToBase64(e.target.files[0]);
                  }}
                />
              </ClothesImageColumn>
              <ClothesInformationColumn>
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="옷 이름"
                  value={Name}
                  onChange={onNameHandler}
                  variant="outlined"
                  fullWidth
                ></TextField>
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="브랜드 명"
                  value={Brand}
                  onChange={onBrandHandler}
                  variant="outlined"
                  fullWidth
                ></TextField>
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="가격(숫자만 입력)"
                  value={Price}
                  onChange={onPriceHandler}
                  variant="outlined"
                  fullWidth
                ></TextField>
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="구매장소"
                  value={PurchasePlace}
                  onChange={onPurchasePlaceHandler}
                  variant="outlined"
                  fullWidth
                ></TextField>
                <TextField
                  type="date"
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label=" "
                  value={PurchaseDate}
                  onChange={onPurchaseDateHandler}
                  variant="outlined"
                  fullWidth
                ></TextField>
                <FormControl sx={{ minWidth: 276, marginRight: 2 }}>
                  <InputLabel id="upload-clothes-page-category-label">
                    카테고리
                  </InputLabel>
                  <Select
                    labelId="upload-clothes-page-category-label"
                    value={Category}
                    label="카테고리"
                    onChange={onCategoryHandler}
                  >
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
                <FormControl sx={{ minWidth: 276 }}>
                  <InputLabel id="upload-clothes-page-season-label">
                    계절
                  </InputLabel>
                  <Select
                    labelId="upload-clothes-page-season-label"
                    value={Season}
                    label="공개여부"
                    onChange={onSeasonHandler}
                  >
                    <MenuItem value="봄">봄</MenuItem>
                    <MenuItem value="여름">여름</MenuItem>
                    <MenuItem value="가을">가을</MenuItem>
                    <MenuItem value="겨울">겨울</MenuItem>
                  </Select>
                </FormControl>
              </ClothesInformationColumn>
            </UploaderContent>
            <UploadClothesButton onClick={onSubmitHandler}>
              등록하기
            </UploadClothesButton>
          </BaseInformationWrapper>
        </UploaderWrapper>
        <MainPageFooter />
      </BodyWrapper>
    </Wrapper>
  );
}
export default UploadClothesPage;
