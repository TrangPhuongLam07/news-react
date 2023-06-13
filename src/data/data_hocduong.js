import  {GetData} from "./getData";
const url = "https://giaoducthoidai.vn/hoc-duong/"
export function getData(){
    return GetData(url);
}