import React, {useEffect, useState} from "react";
import request from "request-promise";
import * as cheerio from "cheerio";
import {New} from "./HomePage";
import {convertDate} from "./api/dateTime";

export const SuckhoePage = React.memo(()=>{
    const[data,setData] = useState([]);
    const page ="/Suc-Khoe/";
    useEffect(() =>{
        request("https://giaoducthoidai.vn/suc-khoe/", (error, response, html) => {
            if(!error && response.statusCode == 200) {
                const $ = cheerio.load(html); // load HTML
                const job = $('body').find('.item-primary .story')
                let items = []

                job.each( (index,el)=>{
                    let heading = $(el).find('.story__heading > a');
                    let title = heading.text()
                    let link = heading.attr('href')
                    let image = $(el).find(".story__thumb").find("img").attr('data-src')
                    let date = $(el).find('.story__time').attr('datetime');
                    let content = $(el).find('.story__summary.story__shorten').text()
                    let splitLink = (link+"").split("/")
                    link = splitLink[splitLink.length - 1];

                    if(image === undefined){
                        image =  $(el).find(".story__thumb").find("img").attr('src')
                    }

                    console.log("Date Data:" + $(el).find('.story__time').attr('datetime'))

                    let item = {
                        id : link,
                        title: title,
                        link: link,
                        content:content,
                        image : (image+"").replace("/220x145",""),
                        date: date
                    }
                    items.push(item);


                    // console.log(title)
                    // console.log(link)
                    // console.log()
                    // console.log(date)
                    // console.log(content)




                })
                setData(items)

            }else {
                console.log("Error")
                console.log(error);
            }
        })
    },[])
    return(
        <div className={"container mt-3"}>
            <div className={"warp warp--kind"}>
                <h1 className={"wrap-title title-kind"}>Giáo dục</h1>
            </div>

            <div className={"warp warp-top"}>
                <h2 className={"wrap-title"}>Tin nổi bật</h2>
            </div>

            <div>
                {
                    data.slice(0,1).map((item) =>(
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
                <div className={"mb-3 mt-3"}>
                    {data.slice(1,5).map((item)=>(
                        <div key={item.id} className={"row item-news"}>
                            <div className={"col-3"}>
                                <a href={`/Thoi-Su/${item.id}`} > <img className={"image-item"} src={item.image} alt={item.image}/></a>
                            </div>
                            <div className={"col-9 body--news"}>
                                <div className={"title-news"}><a href={`/Thoi-Su/${item.id}`} >{item.title}</a></div>
                                <label className={"story--time"}>{convertDate(item.date)}</label>
                                <div className={"title-content"}>{item.content.split(".")[0]}.</div>
                            </div>
                        </div>

                    ))}
                </div>


            </div>


        </div>
    )
})