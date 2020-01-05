import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/categorys"

export function getCategorys() {
  return myhttp.get(apiEndPoint);
}

export function deleteCategory(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getCategory(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveCategory(category) {
  if (category._id) {
    const body = { ...category };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + category._id, body);
  }
  return myhttp.post(apiEndPoint, category);
}

