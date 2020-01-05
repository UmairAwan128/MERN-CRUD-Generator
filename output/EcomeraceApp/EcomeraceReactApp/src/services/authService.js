import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";
import jwtDecode from "jwt-decode";

const apiEndPoint = apiUrl + "/user";
const tokkenKey = "token";

export async function login(email, password) {
  const { data: jwt } = await myhttp.post(apiEndPoint + "/login", { email, password });
  return localStorage.setItem(tokkenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokkenKey);
}

export function getJwt() {
  return localStorage.getItem(tokkenKey);
}

export function isUserLoggedIn() {
  return localStorage.getItem(tokkenKey) !== null ? true:false;
}

export function getUserLocalData() {
  const jwt = localStorage.getItem(tokkenKey);
  const user = jwtDecode(jwt);
  return user;
}

export async function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokkenKey);
    const user = jwtDecode(jwt);
    const userDetails = await myhttp.get(apiEndPoint + "/" + user._id); 
    return  userDetails;
  
  } catch (ex) {
    return null;
  } 
}

myhttp.setJwt(getJwt());

export default {
  login,
  logout,
  getCurrentUser,
  getJwt,
  isUserLoggedIn
};
