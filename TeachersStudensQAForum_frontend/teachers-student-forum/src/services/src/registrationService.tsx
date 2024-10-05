import { ShowError, ShowToast } from "./toastAlertService";
import ApiClient from "./httpService";
export const configJSON = require("./config");

export function RegistrationService(name: string, email: string, password: string, phone: string, address: string) {
  return ApiClient.post("/customer/register", { name: name, email: email, password: password, mobile: phone, city: address })
    .then((response) => {
      ShowToast(response.data.message)
      return response?.data
    }).catch((error) => {
      error?.response?.data?.message ? ShowError(error?.response?.data?.message) : ShowError("Something went wrong")
      return false;
    })
}

export function CompanyRegistrationService(companyObject:any):any{
  return ApiClient.post("/company/register",companyObject)
  .then((response: any) => {
    ShowToast(response.data.message)
    return response?.data;
  })
  .catch((error: any) => {
    ShowError(error?.response?.data?.message);
  });
}
