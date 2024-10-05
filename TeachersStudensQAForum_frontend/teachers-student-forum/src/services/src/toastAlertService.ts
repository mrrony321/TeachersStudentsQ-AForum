import Swal, { SweetAlertIcon, SweetAlertPosition } from "sweetalert2";

export interface ToastOptions {
  title: string;
  text?: string;
  position?: SweetAlertPosition;
  autoCloseTime?: number;
  icon?: SweetAlertIcon;
  isToast?: boolean;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  showCancelButton?: boolean;
  confirmButtonText?: string;
}

export function ShowDynamicToast(options: ToastOptions) {
  Swal.fire({
    title: options.title,
    text: options.text,
    toast: options.isToast ?? true,
    position: options.position ?? "top-end",
    timer: options.isToast ? 3000 : undefined,
    icon: options.icon ?? "success",
    showCloseButton: options.showCloseButton ?? true,
    showConfirmButton: options.showConfirmButton ?? false,
    confirmButtonColor: "#6CD52C",
    showCancelButton: options.showCancelButton,
    confirmButtonText: options.confirmButtonText,
  });
}

export function ShowToast(message:string){
  Swal.fire({
    title: message,
    toast: true,
    position: "top-end",
    timer: 3000,
    icon: "success",
    showCloseButton: true,
    showConfirmButton: false,
  });
}

export function ShowError(message:string){
  Swal.fire({
    title: message,
    toast: true,
    position: "top-end",
    timer: 5000,
    icon: "error",
    showCloseButton: true,
    showConfirmButton: false,
  });
}

export function ShowAlert(message:string){
  Swal.fire({
    title: "Are you sure!!",
    text: message,
    icon: "warning",
    showCloseButton: true,
    showConfirmButton: true,
    confirmButtonColor: "#6CD52C",
    showCancelButton: true,
    confirmButtonText: "Yes,Do it",
  });
}
