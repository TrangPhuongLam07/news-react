import  {GetData} from "./getData";
const url = "https://giaoducthoidai.vn/giao-duc/"
export function getData(){
    return GetData(url);
}