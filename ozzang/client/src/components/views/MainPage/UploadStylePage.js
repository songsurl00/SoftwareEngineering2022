import _ from "lodash";
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import MainPageHeader from "./MainPageHeader";

import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

import ClothesGridWrapper from "../MainPage/ClothesGridWrapper";
import { getClothes, uploadStyle } from "../../../_actions/user_action";

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

const UploaderContent = styled.div`
  display: flex;
  width: 100%;

  padding: 0px 0px 16px 0px;
  margin: 0px 0px 16px 0px;

  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const StyleInformationColumn = styled.div`
  flex: 1 0 0px;
`;

const StyleImageColumn = styled.div`
  flex: 0 0 320px;

  padding-right: 24px;
  margin-right: 24px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
`;

const BaseInformationWrapper = styled.div`
  width: 100%;

  padding: 16px 24px 24px 24px;
  background-color: white;

  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.4);
`;

const UploadStyleButton = styled.button`
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

function UploadStylePage() {
  const [clothes, setClothes] = useState([]);
  const [selectedClothes, setSelectedClothes] = useState([]);

  useEffect(() => {
    const fetchClothesList = async () => {
      let filter = {
        name: "",
        category: "",
        season: "",
        fav: "",
      };
      const response = await getClothes(filter);
      const newClothes = response.payload.clothes;
      setClothes(newClothes);
    };
    fetchClothesList();
  }, []);

  const onClothClick = (cloth) => {
    const clothIndex = _.findIndex(
      selectedClothes,
      (sel) => sel._id === cloth._id
    );
    if (clothIndex < 0) {
      selectedClothes.push(_.cloneDeep(cloth));
    } else {
      _.pullAt(selectedClothes, [clothIndex]);
    }
    setSelectedClothes(_.cloneDeep(selectedClothes));
  };

  const [style, setStyle] = useState({
    name: "",
    description: "",
    season: "봄",
    share: false,
  });

  const updateName = useCallback((event) => {
    const name = event.target.value;
    setStyle({ ...style, name });
  });

  const updateDescription = useCallback((event) => {
    const description = event.target.value;
    setStyle({ ...style, description });
  });

  const updateSeason = useCallback((event) => {
    const season = event.target.value;
    setStyle({ ...style, season });
  });

  const updateShare = useCallback((event) => {
    const share = event.target.value;
    setStyle({ ...style, share });
  });

  // 이미지 업로드을 위한 Base64 변환.
  const [fileName, setFileName] = useState("선택된 파일 없음");
  const [imageSrc, setImageSrc] = useState("");

  const encFileToBase64 = (fileBlob) => {
    setFileName(fileBlob.name);
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

  const navigate = useNavigate();

  const onSaveButtonClick = useCallback(
    (event) => {
      const selectedClothesID = selectedClothes.map((clothes) => clothes._id);
      console.log(selectedClothesID);
      let body = {
        img: imageSrc,
        ...style,
        clothesList: selectedClothesID,
      };
      console.log(body);
      uploadStyle(body);
      navigate("/style");
    },
    [style, selectedClothes, imageSrc]
  );

  return (
    <Wrapper>
      <MainPageHeader />
      <BodyWrapper>
        <UploaderWrapper>
          <BaseInformationWrapper>
            <UploaderTitle>기본 정보 입력하기</UploaderTitle>
            <UploaderContent>
              <StyleImageColumn>
                <div>
                  {imageSrc && (
                    <img
                      src={imageSrc}
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
              </StyleImageColumn>
              <StyleInformationColumn>
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="스타일 명"
                  value={style.name}
                  onChange={updateName}
                  variant="outlined"
                  fullWidth
                />
                <TextField
                  sx={{ minWidth: 320, marginRight: 2, marginBottom: "24px" }}
                  label="설명"
                  multiline
                  rows={5}
                  value={style.description}
                  onChange={updateDescription}
                  variant="outlined"
                  fullWidth
                />
                <FormControl sx={{ minWidth: 276, marginRight: 2 }}>
                  <InputLabel id="upload-style-page-season-label">
                    계절
                  </InputLabel>
                  <Select
                    labelId="upload-style-page-season-label"
                    value={style.season}
                    label="계절"
                    onChange={updateSeason}
                  >
                    <MenuItem value="봄">봄</MenuItem>
                    <MenuItem value="여름">여름</MenuItem>
                    <MenuItem value="가을">가을</MenuItem>
                    <MenuItem value="겨을">겨을</MenuItem>
                  </Select>
                </FormControl>
                <FormControl sx={{ minWidth: 276 }}>
                  <InputLabel id="upload-style-page-share-label">
                    공개여부
                  </InputLabel>
                  <Select
                    labelId="upload-style-page-share-label"
                    value={style.share}
                    label="공개여부"
                    onChange={updateShare}
                  >
                    <MenuItem value={false}>공개 안함</MenuItem>
                    <MenuItem value={true}>전체 공개</MenuItem>
                  </Select>
                </FormControl>
              </StyleInformationColumn>
            </UploaderContent>
            <UploaderTitle>
              옷 선택하기
              {selectedClothes.length
                ? `(${selectedClothes.length}개 선택됨)`
                : ""}
            </UploaderTitle>
            <UploaderContent>
              <ClothesGridWrapper
                clothes={clothes}
                setClothes={setClothes}
                onClothClick={onClothClick}
                selectedClothes={selectedClothes}
              />
            </UploaderContent>
            <UploadStyleButton onClick={onSaveButtonClick}>
              저장하기
            </UploadStyleButton>
          </BaseInformationWrapper>
        </UploaderWrapper>
      </BodyWrapper>
    </Wrapper>
  );
}

export default UploadStylePage;
