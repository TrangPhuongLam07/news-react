import React, {useState,useEffect} from "react";
import result from "../data/rss";
import {getAllData} from "../data/getAllData";

import {FooterNewItem} from "./HomePage";
import "./css/main.css";
import {useParams} from "react-router-dom";
import "./css/main.css";

export function SearchPage(){
    // const [data,setData] = useState([]);

    //Sử dụng state để lưu trữ số hiển thị đàu tiên trong trang
    const [maxNew,setMaxNew] = useState(5)
    const params = useParams();
    const keyword = params.keyword;
    useEffect(()=>{
        document.title = "Tìm kiếm cho " +keyword
        // if (keyword !== undefined && keyword !== ""){
        //     setData(result.filter(item => (item.title.toString().includes(keyword.toLowerCase()) || item.content.toString().includes(keyword.toLowerCase()))))
        // }
    },[])

    //Lấy ra dữ liệu của tất cả các trang
    let data = getAllData(keyword.toLowerCase());

    //Button hiển thị thêm tin
    const buttonLoad = () => {
        if (data.length >= 5){
            return (
            <div className={"warp--btn__view"}> <button onClick={()=> setMaxNew(prevState => prevState + 3)} className={"btn--load"}>Xem thêm</button></div>
            )}
    }
    //Button ẩn bớt tin
    const buttonLess = () => {
        return (
            <div className={"warp--btn__view"}> <button onClick={()=> setMaxNew(5)} className={"btn--load"}>Hiển thị ít hơn</button></div>
        )

    }
    console.log("re-render" + keyword)

    return (
       <div className={"container"} >
           <div className={"min-height-700"} >
           {data .length <=0 &&<div className={"warp"}>
               <h2 className={"wrap-title"}><i className={"fa fa-search icon"}></i> Không tìm thấy kết quả nào trùng khớp với "{keyword}"</h2>
           </div>}
           {data.length > 0 &&
               <div className={"container-fluid"}>
                   <div className={"warp"}>
                       <h2 className={"wrap-title"}><i className={"fa fa-search icon"}></i> Kết quả tìm kiếm của "{keyword}" có {data.length} kết quả phù hợp</h2>
                   </div>
                   {data.slice(0,maxNew).map((item)=>(
                       <div key ={item.id} className={""}>
                           <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={"/"}></FooterNewItem>
                       </div>

                   ))

                   }
                   {  data.length > maxNew && buttonLoad()}
                   {  data.length <= maxNew && buttonLess()}


               </div>
           }
           </div>
           <div className={"wrap--btn__sroll-top"}>
               {<button className={"btn btn__sroll-top"} onClick={()=>{window.scrollTo({top: 0, behavior: 'smooth'})}} >
                   <i className="fa fa-arrow-up mr-1" aria-hidden="true"></i>Trở về đầu</button>}
           </div>
       </div>
    );
}