import {getData as vanhoa} from "../data/data_vanhoa";
import {getData as thethao} from "../data/data_thethao";
import {getData as giaoduc} from "../data/data_giaoduc";
import result from "./rss";


export function getAllData(keyword){
    const items = [];
    items.push(...vanhoa().filter(item => (item.title.toString().includes(keyword) || item.content.toString().includes(keyword))))
    items.push(...thethao().filter(item => (item.title.toString().includes(keyword) || item.content.toString().includes(keyword))))
    items.push(...giaoduc().filter(item => (item.title.toString().includes(keyword) || item.content.toString().includes(keyword))))
    return items;
}
