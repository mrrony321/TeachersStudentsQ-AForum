import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

function makeKey(partOne: string, partTwo: any): string {
  const tKey: string = partOne + "_" + partTwo;
  return tKey;
}

export function ssSet(sKeyPart1: string, sKeypart2: string, value: any): void {
  value = typeof value === "string" ? value : JSON.stringify(value);
  sessionStorage.setItem(makeKey(sKeyPart1, sKeypart2), value);
}

export function ssGet(sKeyPart1: string, sKeypart2: string): string {
  return sessionStorage.getItem(makeKey(sKeyPart1, sKeypart2)) ?? "";
}

export function sessionRemove(sKeyPart1: string, sKeypart2: string): void {
  sessionStorage.removeItem(makeKey(sKeyPart1, sKeypart2));
}

export function localSet(
  sKeyPart1: string,
  sKeypart2: string,
  value: any
): void {
  value = typeof value === "string" ? value : JSON.stringify(value);
  secureLocalStorage.setItem(makeKey(sKeyPart1, sKeypart2), value);
}

export function localGet(sKeyPart1: string, sKeypart2: string): any {
  return secureLocalStorage.getItem(makeKey(sKeyPart1, sKeypart2));
}

export function localRemove(sKeyPart1: string, sKeypart2: string): void {
  secureLocalStorage.removeItem(makeKey(sKeyPart1, sKeypart2));
}

export function NavigateToPath(path:string){
  const navigate = useNavigate();
  navigate(path);
}
