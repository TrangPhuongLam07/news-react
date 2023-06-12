import  {GetData} from "./getData";
const url = "https://giaoducthoidai.vn/the-thao/"
export function getData(){
    return GetData(url);
}