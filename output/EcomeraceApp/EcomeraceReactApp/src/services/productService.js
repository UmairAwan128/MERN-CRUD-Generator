import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/products"

export function getProducts() {
  return myhttp.get(apiEndPoint);
}

export function deleteProduct(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getProduct(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveProduct(product) {
  if (product._id) {
    const body = { ...product };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + product._id, body);
  }
  return myhttp.post(apiEndPoint, product);
}

