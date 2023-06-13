import React, {useState,useEffect,useRef} from "react";

import data from "../data/giaoduc_rss";
import {New, FooterNewItem} from "./HomePage.js";
import {getData} from "../data/data_vanhoa";

const CaculturePage = () => {
    // const[listNew,setListNew] = useState(data);
    const[numberNew,setNumberNew] = useState(5);
    const page ="/Van-Hoa/";
    const maxNew = useRef(5)

    useEffect(()=>{
        document.title = "Văn Hoá";
        console.log("re-render")

    },[])
    maxNew.current = getData().length;
    console.log("MaxNew" + maxNew.current)
    const  loadMore = () =>{
        setNumberNew(prevState => prevState + 3);
    }
    const reload = () =>{
        setNumberNew(5);
    }

    return (
        <div className={"container mt-3"}>
            <div className={"warp warp--kind"}>
                <h1 className={"wrap-title title-kind"}>Văn Hoá</h1>
            </div>

            <div className={"warp warp-top"}>
                <h2 className={"wrap-title"}>Tin nổi bật</h2>
            </div>

            <div>
                {
                    getData().slice(0,1).map((item) =>(
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
                {getData().slice(1,numberNew).map((item)=>(
                    <div key ={item.id} className={""}>
                        <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page={page}></FooterNewItem>
                    </div>

                ))}
                <div className={"warp--btn__view"}>
                    {numberNew < maxNew.current && <button onClick={loadMore} className={"btn--load"}>Xem thêm</button>}
                    {numberNew >= maxNew.current && <button onClick={reload} className={"btn--load"}>Hiển thị ít lại</button>}
                </div>

            </div>

        </div>
    );
};
export default  CaculturePage;