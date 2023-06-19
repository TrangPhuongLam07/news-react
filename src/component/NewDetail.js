
import React, {useEffect, useState} from "react";
import "./css/detail.css";
import "./css/main.css";
import data from "../data/thoisu_rss";
import {useParams} from "react-router-dom";
import request from "request-promise";
import cheerio from "cheerio";
import {convertDate} from "./api/dateTime";



export const NewDetail = React.memo(()=>{
    const [posts,setPosts] = useState([])
    const  [listNews,setListNews] = useState(data)
    const [backToTop,setBackToTop] = useState(false)

    const baseUrl = "https://giaoducthoidai.vn/";
    const params = useParams();
    const id = params.id;
    console.log("id: "+ id)
    useEffect(()=>{
        window.addEventListener("scroll",()=>{
            if(window.scrollY > 100){
                setBackToTop(true)
            }else{
                setBackToTop(false)
            }
        })
        request(baseUrl+id, (error, response, html) => {
            if(!error && response.statusCode === 200) {
                const $ = cheerio.load(html);

                let title = $('body').find('.article .article__title').text();
                let author = $('body').find('.article .article__meta .author').text();
                let time = $('body').find('.article .article__meta .time').text();
                let heading = $('body').find('.article .article__sapo').text();
                let image = $('body').find('.article .picture .pic').find('img').attr("src");
                const body = $('body').find('.article .article__body > p');
                const listImage =$('body').find('.article .article__body > .picture');
                const listVideo = $('body').find('.article .article__body > .video');
                const headingBody = $('.article ').find('.article__body > h1,h2');
                const noteBook = $('body').find('.article .article__body > .notebox');
                const qouteBlock = $('body').find('.article .article__body blockquote');

                console.log("Qoute Block:" + qouteBlock.text() + qouteBlock.index());

                const items = [];
                //kiểm tra phần Trích dẫn khối trong tin
                //nếu khác undifined và vị trí khác -1
                //thì dùng .each() để lấy lần lượt các phần tử trong phần qouteBlock và đánh vị trí cho nó
                if(qouteBlock !== undefined && qouteBlock.index() != -1){
                    let myItem = {};
                    if(qouteBlock !== undefined){
                        qouteBlock.each((index,el) => {
                            var item = {
                                index : $(el).index(),
                                type : "quote",
                                src : "",
                                text:$(el).text()
                            }
                            items.push(item);
                        })
                    }
                }
                //Kiểm tra nếu tin có nhiều ảnh sẽ lấy vị trí mỗi ảnh để thêm vào tin
                if(listImage !== undefined && listImage.index() != -1){
                    listImage.each((index,el) => {
                        var item = {
                            index : $(el).index(),
                            type : "image",
                            src : $(el).find(".pic").find("img").attr("data-src"),
                            text:$(el).find(".caption").text()
                        }
                        items.push(item)
                    })
                }

                //Kiểm tra sự tồn tại h1 và đánh vị trí cho nó
                if(headingBody !== undefined && headingBody.index()!=-1){
                    headingBody.each((index,el)=>{
                        var item = {
                            index:$(el),
                            type:"h1",
                            src:"",
                            text:$(el).text()
                        }
                        items.push(item);
                    })
                }

                //Kiểm tra phần notebook của tin và đánh vị trí cho nó
                if(noteBook !== undefined && noteBook.index() != -1){
                    noteBook.each((index,el) => {
                        var item = {
                            index:$(el).index(),
                            type:"note",
                            src:"",
                            text:$(el).text()
                        }
                        items.push(item)
                    })
                }

                if(body !== undefined){
                    var item = {}
                    body.each((index,el) => {

                        if($(el).find('strong').text() === ""){
                            //Kiem tra xem co phai la the strong k
                            item =  {
                                index : $(el).index(),
                                type :"text",
                                src :"",
                                text:$(el).text()
                            }
                        }else {
                            item =  {
                                index : $(el).index(),
                                type :"strong",
                                src :"",
                                text:$(el).text()
                            }

                        }
                        items.push(item);
                    })
                }

                //Săp xếp lại mảng dựa trên index để thêm vào bảng tin
                items.sort((a,b)=> {
                    return a.index > b.index ? 1 : -1;
                })

                const obj ={
                    title: title,
                    author:author,
                    heading:heading,
                    image:image,
                    time:time,
                    news:items
                }

                console.log("Object:" + obj);
                setPosts(obj);

                document.title = obj.title;


            }
            else {
                console.log(error);
            }
        })

    },[])
    //xây dựng component để hiển thị
    const line = (item => {
        if(item.type === "text"){
            return (
                <p className={"content"}>{item.text}</p>
            );
        }else if(item.type === "image"){
            return (
                <div className={"warp--image"}>
                    <img className={"main--image"} src={item.src} alt={item.src}/>
                    {
                        item.text !== "" &&
                        <div className={"detail--image"}>{item.text}</div>
                    }

                </div>
            );
        }else if(item.type === "strong") {
            return (
                <p><strong >{item.text}</strong></p>
            );
        }
        else if(item.type === "h1") {
            return (
                <h1 className={"content bold"}>{item.text}</h1>
            );
        }else if(item.type === "note") {
            return (
                <div className={"note-box"}>
                    <p>{item.text}</p>
                </div>
            );
        }
        else if(item.type === "quote"){
            return (
                <blockquote className={"blockquote"}>
                    <p>{item.text}</p>
                </blockquote>
            );
        }
    });
    const scrollUp = () =>{
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    }
    return(
        <div className={"detail"}>
            {posts !== null && posts.news !== undefined
                &&  <div>
                    <div className={"container"}>
                        <div className={"heading-news"}>
                            <h1 className={"title"}>{posts.title}</h1>
                            <div className={"warp--author"}>
                                <div className={"author"}>Tác giả : {posts.author}</div>
                                <div className={"author"}>Ngày đăng: {posts.time}</div>
                            </div>

                            <h5 className={"title--heading"}>{posts.heading}</h5>
                            {posts.image !== "" &&
                                <div className={"warp--image"}>
                                    <img className={"main--image"} src={posts.image} alt={posts.image}/>
                                    <div className={"detail--image"}>Ảnh minh hoạ</div>

                                </div>
                            }

                        </div>

                        <div className={"main--content"}>
                            {posts.news.map((item,index)=>(
                                <div key={index}>
                                    {line(item)}
                                </div>
                            ))}
                        </div>

                    </div>
                    <div className={"container-fluid"}>
                        <div className={"warp"}>
                            <h2 className={"wrap-title"}>Tin khác</h2>
                        </div>
                        <div className={"mb-3 mt-3"}>
                            {listNews.filter(a => a.id !== id).slice(1,5).map((item)=>(
                                <div key={item.id} className={"row item-news"}>
                                    <div className={"col-3"}>
                                        <a href={`/Thoi-Su/${item.id}`} > <img className={"image-item"} src={item.image} alt={item.image}/></a>
                                    </div>
                                    <div className={"col-9 body--news"}>
                                        <div className={"title-news"}><a href={`/Thoi-su/${item.id}`} >{item.title}</a></div>
                                        <label className={"story--time"}>{convertDate(item.date)}</label>
                                        <div className={"title-content"}>{item.content.split(".")[0]}.</div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>

                    <div >
                        {backToTop && (
                            <button style={{position: "fixed",
                                            bottom: "50px",
                                            right: "50px",
                                            height: "50px",
                                            width: "50px",
                                            fontSize: "50px",
                                            }}
                                    onClick={scrollUp}
                            >
                                ^
                            </button>
                        )}
                    </div>
                </div>
            }

        </div>
    )
})


