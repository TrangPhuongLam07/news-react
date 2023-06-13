import React, {useState,useEffect} from "react";
import result from "../data/rss";
import {getAllData} from "../data/getAllData";

import {FooterNewItem} from "./HomePage";
import "./css/main.css";
import {useParams} from "react-router-dom";

export function SearchPage(){
    const [data,setData] = useState([]);
    const params = useParams();
    const keyword = params.keyword;
    useEffect(()=>{
        document.title = "Tìm kiếm cho " +keyword
        if (keyword !== undefined && keyword !== ""){
            setData(result.filter(item => (item.title.toString().includes(keyword.toLowerCase()) || item.content.toString().includes(keyword.toLowerCase()))))
        }
    },[])

    console.log(getAllData(keyword))

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
                   {data.map((item)=>(
                       <div key ={item.id} className={""}>
                           <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={"/"}></FooterNewItem>
                       </div>

                   ))

                   }


               </div>
           }
           </div>
       </div>
    );
}