import React from "react";
import * as RssData from "../data/giao_duc_phap_luat_rss";
import "./css/detail.css";
import "./css/main.css";
import {convertDate} from "./api/dateTime";

import { Link } from "react-router-dom";
import {FooterNewItem, New} from "./NewBody";
class EducationAndLawPage extends React.Component {
    constructor(props) {
        super(props);
       ;
        this.state={listNew: RssData.getNews("phap-lua")}
        if(this.state.listNew==null) this.state.listNew = [];
    }


    render() {
        document.title = "Giáo dục và pháp luật";
        let page = "/Giao-Duc-Phap-Luat/"
        return (
            <div className={"container mt-3"}>
                <div className={"warp warp--kind"}>
                    <h1 className={"wrap-title title-kind"}>Giáo dục và pháp luật</h1>
                </div>

                <div className={"warp warp-top"}>
                    <h2 className={"wrap-title"}>Tin mới nhất</h2>
                </div>

                <div>
                    {
                        this.state.listNew.slice(2,3).map((item) =>(
                            <div key ={item.id}  >
                                <New  id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date={item
                                    .date} page ={page}></New>
                            </div>
                        ))
                    }
                </div>


                <div className={"container-fluid"}>
                    <div className={"warp"}>
                        <h2 className={"wrap-title"}> Tin khác</h2>
                    </div>
                    {this.state.listNew.slice(10,15).map((item)=>(
                        <div key ={item.id} className={""}>
                            <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={page}></FooterNewItem>
                        </div>

                    ))}
                    <div className={"warp--btn__view"}>
                    </div>
                </div>

            </div>
        );
    }
}




export default EducationAndLawPage;
