import React, {useState,useEffect} from "react";
import data from "../data/giaoduc_rss";
import {New, FooterNewItem} from "./HomePage.js";

const EducationPage = () => {
    const[listNew,setListNew] = useState(data);
    const page ="/Giao-Duc/";

    useEffect(()=>{
        document.title = "Giáo dục";
    },[])

    return (
        <div className={"container mt-3"}>
            <div className={"warp warp--kind"}>
                <h1 className={"wrap-title title-kind"}>Giáo dục</h1>
            </div>

            <div className={"warp warp-top"}>
                <h2 className={"wrap-title"}>Tin mới nhất</h2>
            </div>

            <div>
                {
                    listNew.slice(0,1).map((item) =>(
                        <div key ={item.id}  >
                            <New  id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date={item
                                .date} page={page}></New>
                        </div>
                    ))
                }
            </div>

            <div className={"container-fluid"}>
                <div className={"warp"}>
                    <h2 className={"wrap-title"}> Tin khác</h2>
                </div>
                {listNew.slice(1,5).map((item)=>(
                    <div key ={item.id} className={""}>
                        <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page={page}></FooterNewItem>
                    </div>

                ))}

            </div>

        </div>
    );
};
export default EducationPage;