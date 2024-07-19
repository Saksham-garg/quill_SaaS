import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function convertIntoAscii(data:string){
  return data.replace(/[^\x00-\x7F]+/g,"")
}