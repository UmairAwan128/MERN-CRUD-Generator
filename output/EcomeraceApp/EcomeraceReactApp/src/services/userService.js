import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/user";

export function register(user) {
  return myhttp.post(apiEndPoint + "/register", {
    email: user.email,
    password: user.password,
    name: user.name
  });
}

export function getUsers() {
  return myhttp.get(apiEndPoint);
}

export function updateUser(user) {
    const body = { ...user };
    delete body._id;
    return myhttp.put(`${apiEndPoint}/${user._id}`, body);
}

export function updatePassword(user) {
  const body = { ...user };
  delete body._id;
  console.log("done");
  return myhttp.put(`${apiEndPoint}/updatePassword/${user._id}`, body);
}
