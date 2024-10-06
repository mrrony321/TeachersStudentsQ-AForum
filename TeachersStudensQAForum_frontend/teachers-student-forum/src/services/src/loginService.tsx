// import ApiClient from "./httpService";
// import { ShowError, ShowToast } from "./toastAlertService";



// export function LoginService(email: string, password: string): Promise<any> {
//   return ApiClient.post("/login", { email_phone: email, password: password })
//     .then((response: any) => {
//       ShowToast(response.data.message)
//       return response?.data;
//     })
//     .catch((error: any) => {
//       error?.response?.data?.message ? ShowError(error?.response?.data?.message) : ShowError("Something went wrong")
//       return false;
//     });
// }

// export function SocialLogin(userObject:any):any{
//   return ApiClient.post("/sociallogin",userObject)
//   .then((response: any) => {
//     ShowToast(response.data.message)
//     return response?.data;
//   })
//   .catch((error: any) => {
//     ShowError(error?.response?.data?.message)
//   });
// }
