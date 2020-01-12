import myhttp from "./httpService";
import { apiUrl } from "../CRUDAppConfigs.json";

const apiEndPoint = apiUrl + "/customers"

export function getCustomers() {
  return myhttp.get(apiEndPoint);
}

export function deleteCustomer(id) {
  return myhttp.delete(apiEndPoint + "/" + id);
}

export function getCustomer(id) {
  return myhttp.get(apiEndPoint + "/" + id);
}

export function saveCustomer(customer) {
  if (customer._id) {
    const body = { ...customer };
    delete body._id;
    return myhttp.put(apiEndPoint + "/" + customer._id, body);
  }
  return myhttp.post(apiEndPoint, customer);
}

