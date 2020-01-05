import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/statuss"

export function getStatuss() {
  return myhttp.get(apiEndPoint);
}

export function deleteStatus(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getStatus(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveStatus(status) {
  if (status._id) {
    const body = { ...status };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + status._id, body);
  }
  return myhttp.post(apiEndPoint, status);
}

