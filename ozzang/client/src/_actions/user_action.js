import _ from "lodash";
import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  UPLOAD_CLOTHES,
  USER_INFO,
  FAV_UPDATE,
  CLOTHES_LISTING,
  UPLOAD_STYLE,
  STYLE_LISTING,
} from "./types";

// 로그인
export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  return { type: LOGIN_USER, payload: request };
}

// 회원가입
export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return { type: REGISTER_USER, payload: request };
}

// 페이지 권한 확인
export function auth() {
  const request = axios
    .post("/api/users/auth")
    .then((response) => response.data);
  return { type: AUTH_USER, payload: request };
}

// 옷 업로드
export async function uploadClothes(dataToSubmit) {
  const request = await axios.post("/api/clothes/upload", dataToSubmit);
  return { type: UPLOAD_CLOTHES, payload: request.data };
}

// 현재 로그인한 사용자 정보 불러오기
export async function getUserInfo() {
  const request = await axios.get("/api/users/getUserInfo");
  return { type: USER_INFO, payload: request.data };
}

// 즐겨찾기 등록 해제
export async function updateFavorite(dataToSubmit) {
  const request = await axios.post("/api/clothes/updateFav", dataToSubmit);
  return { type: FAV_UPDATE, payload: request.data };
}

// 옷 목록 조회
export async function getClothes(filter) {
  // const params = _.pickBy(filter, _.identity);
  const request = await axios.get("/api/clothes/listing", { params: filter });
  return { type: CLOTHES_LISTING, payload: request.data };
}

// 스타일 업로드
export async function uploadStyle(dataToSubmit) {
  const request = await axios.post("/api/style/upload", dataToSubmit);
  return { type: UPLOAD_STYLE, payload: request.data };
}

//스타일 조회
export async function getStyle(dataToSubmit) {
  const request = await axios.get("/api/style/listing", {
    params: dataToSubmit,
  });
  return { type: STYLE_LISTING, payload: request.data };
}
