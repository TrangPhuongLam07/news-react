import {getData as vanhoa} from "../data/data_vanhoa";
import {getData as thethao} from "../data/data_thethao";
import {getData as giaoduc} from "../data/data_giaoduc";
import  {getData as thoisu} from "./data_thoisu";
import  {getData as hocduong} from "./data_hocduong";
import result from "./rss";


export function getAllData(keyword){
    const items = [];
    items.push(...vanhoa().filter(item => (item.title.toString().toLowerCase().includes(keyword) || item.content.toString().toLowerCase().includes(keyword))))
    items.push(...thethao().filter(item => (item.title.toString().toLowerCase().includes(keyword) || item.content.toString().toLowerCase().includes(keyword))))
    items.push(...giaoduc().filter(item => (item.title.toString().toLowerCase().includes(keyword) || item.content.toString().toLowerCase().includes(keyword))))
    items.push(...thoisu().filter(item => (item.title.toString().toLowerCase().includes(keyword) || item.content.toString().toLowerCase().includes(keyword))))
    items.push(...hocduong().filter(item => (item.title.toString().toLowerCase().includes(keyword) || item.content.toString().toLowerCase().includes(keyword))))

    result.forEach(item => {
        if(items.filter(fil => fil.id === item.id).length ==0 &&(item.title.toString().includes(keyword) || item.content.toString().includes(keyword))){
            items.push(item)
        }
    })

    return items;
}
