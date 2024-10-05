import { ShowError, ShowToast } from "./toastAlertService";
import ApiClient from "./httpService";
export const configJSON = require("./config");
export function ResendOtp(token: string): Promise<any> {
  return ApiClient.post("/otp/resend", { token: token })
    .then((response) => {
      ShowToast(response.data.message)
      return response?.data
    }).catch((error) => {
      error?.response?.data?.message ? ShowError(error?.response?.data?.message) : ShowError("Something went wrong")
      return false;
    })
}


export function ValidateOtp(token: string, otp: string): Promise<any> {
  return ApiClient.post("/otp", { token: token, otp: otp })
    .then((response) => {
      ShowToast(response.data.message)
      return response?.data
    }).catch((error) => {
      error?.response?.data?.message ? ShowError(error?.response?.data?.message) : ShowError("Something went wrong")
      return false
    })
}