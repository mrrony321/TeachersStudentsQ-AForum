import ApiClient from "./httpService";
import { ShowError, ShowToast } from "./toastAlertService";



export function SearchService(type: string, district: string, startTime: string, endTime: string, date: string, duration: number): Promise<any> {
  return ApiClient.post("/slot/search", { type: type, district: district, start_time: startTime, end_time: endTime, date: date, duration: duration })
    .then((response: any) => {
      ShowToast(response.data.message)
      return response?.data;
    })
    .catch((error: any) => {
      error?.response?.data?.message ? ShowError(error?.response?.data?.message) : ShowError("Something went wrong")
      return false;
    });
}