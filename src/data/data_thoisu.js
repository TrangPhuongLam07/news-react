import  {GetData} from "./getData";
const url = "https://giaoducthoidai.vn/thoi-su/"
export function getData(){
    return GetData(url);
}