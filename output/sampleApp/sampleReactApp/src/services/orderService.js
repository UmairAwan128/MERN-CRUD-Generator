import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/orders"

export function getOrders() {
  return myhttp.get(apiEndPoint);
}

export function deleteOrder(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getOrder(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveOrder(order) {
  if (order._id) {
    const body = { ...order };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + order._id, body);
  }
  return myhttp.post(apiEndPoint, order);
}

