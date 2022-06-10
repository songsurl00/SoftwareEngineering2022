import axios from "axios";
import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  UPLOAD_CLOTHES,
  USER_INFO,
  FAV_UPDATE,
} from "./types";

export function loginUser(dataToSubmit) {
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);
  return { type: LOGIN_USER, payload: request };
}

export function registerUser(dataToSubmit) {
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);
  return { type: REGISTER_USER, payload: request };
}

export function auth() {
  const request = axios
    .post("/api/users/auth")
    .then((response) => response.data);
  return { type: AUTH_USER, payload: request };
}

export async function uploadClothes(dataToSubmit) {
  const request = await axios.post("/api/clothes/upload", dataToSubmit);
  return { type: UPLOAD_CLOTHES, payload: request.data };
}

// 현재 로그인한 사용자 정보 불러오기
export async function getUserInfo() {
  const request = await axios.get("/api/users/getUserInfo");
  return { type: USER_INFO, payload: request.data };
}

export async function updateFavorite(dataToSubmit) {
  const request = await axios.post("/api/clothes/updateFav", dataToSubmit);
  return { type: FAV_UPDATE, payload: request.data };
}
