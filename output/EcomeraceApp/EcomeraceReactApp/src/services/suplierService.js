import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/supliers"

export function getSupliers() {
  return myhttp.get(apiEndPoint);
}

export function deleteSuplier(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getSuplier(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveSuplier(suplier) {
  if (suplier._id) {
    const body = { ...suplier };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + suplier._id, body);
  }
  return myhttp.post(apiEndPoint, suplier);
}

