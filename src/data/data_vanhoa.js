import  {GetData} from "./getData";
const url = "https://giaoducthoidai.vn/van-hoa/"
export function getData(){
    return GetData(url);
}