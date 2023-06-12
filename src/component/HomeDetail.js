import React, {useEffect,useState} from "react";
import {json, useParams} from "react-router-dom";
import * as cheerio from 'cheerio'
import  request from 'request-promise'
import "./css/detail.css";
import "./css/main.css";
import result from "../data/rss";
import {convertDate} from "./api/dateTime";
import {NotFound} from "./NotFound";
import Text_to_speech from "./api/text_to_speech";



export const  HomeDetail = React.memo(() =>{
    const [posts,setPosts] = useState({})
    const  [listNews,setListNews] = useState(result)
    const [error,setError] = useState(null)


    const baseUrl = "https://giaoducthoidai.vn/";
    const params = useParams();
    const id = params.id;
    console.log("Id:" + id)
useEffect( () => {
        request(baseUrl + id, (error, response, html) => {
           if (!error && response.statusCode === 200) {
               console.log(baseUrl + id);
               const $ = cheerio.load(html); // load HTML
               const title = $('body').find('.article .article__title').text();
               const author = $('body').find('.article .article__meta .author').text();
               const time = $('body').find('.article .article__meta .time').text();
               const heading = $('body').find('.article .article__sapo').text();
               var image = $('body').find('.article .picture .pic').find('img').attr("src");
               const body = $('body').find('.article .article__body > p');
               const listImage =$('body').find('.article .article__body > .picture');
               const listVideo = $('body').find('.article .article__body > .video');
               const headingBody = $('.article ').find('.article__body > h1,h2');
               const noteBook = $('body').find('.article .article__body > .notebox');

               const onlyImage = $('body').find('.media-content .cms-body img');

               console.log(onlyImage)


               //Kiểm tra nếu ảnh lấy ra lỗi thì sẽ lấy ảnh từ rss
               if(image === undefined || !image.toString().startsWith("http://")){
                  var myItem = result.find((item) => item.id == id);
                  console.log(result);
                  console.log(myItem)
                  // console.log("Item:"+myItem.image)
                  if(myItem !== undefined){
                      image = myItem.image;
                  }
               }

               const items = [];

               if(onlyImage !== undefined){
                   var location ;
                   var src;
                   var text;
                   var myItem = {}
                   onlyImage.each((index,el) => {
                       location = $(el).index();
                       src = $(el).attr('src');
                       text = $(el).attr("title");

                       if(text !== undefined){
                           myItem = {
                               index : location,
                               type : "only_image",
                               src : src,
                               text:text
                           }
                           items.push(myItem);
                       }

                       console.log($(el).attr('src').replace("160x100/",""));
                       console.log($(el).attr("title"));
                   })
               }
               //Kiểm tra nếu tin có nhiều ảnh sẽ lấy vị trí mỗi ảnh để thêm vào tin
               if(listImage !== undefined){
                   listImage.each((index,el) => {

                       var location = $(el).index()
                       var src = $(el).find(".pic").find("img").attr("data-src");
                       var text = $(el).find(".caption").text();

                       var item = {
                           index : location,
                           type : "image",
                           src : src,
                           text:text
                       }
                       items.push(item)
                   })
               }
               //Kiểm tra sự tồn tại h1
               if(headingBody !== undefined){
                   let index;
                   let item;
                   headingBody.each((index,el)=>{
                       item = $(el);
                       index = item.index();
                       let myItem = {
                           index:index,
                           type:"h1",
                           src:"",
                           text:item.text()
                       }
                       items.push(myItem);
                   })
               }

               //Kiểm tra phần notebook của tin

               if(noteBook !== undefined){
                   let myItem ={}
                   noteBook.each((index,el) => {
                       myItem = {
                           index:$(el).index(),
                           type:"note",
                           src:"",
                           text:$(el).text()
                       }
                       items.push(myItem)
                   })
               }
                //Kiểm tra phần video
                if(listVideo !== undefined){
                    listVideo.each((index,el) => {
                        var location = $(el).index();
                        var src = $(el).find("source ").attr("src");
                        var text = $(el).find(".caption").find("p").text()

                        var item = {
                            index:location,
                            type:"video",
                            src:src,
                            text:text
                        }
                        items.push(item);
                    })
                }


                if(body !== undefined){
                    let myItem = {};
                    let item;
                    let index;
                    body.each((index,el) => {
                        item = $(el);
                        index = item.index();
                        if(item.find('strong').text() === ""){

                            myItem =  {
                                index : index,
                                type :"text",
                                src :"",
                                text:item.text()
                            }
                        }else {
                            console.log("Strong:" + item.find('strong').text())
                            myItem =  {
                                index : index,
                                type :"strong",
                                src :"",
                                text:item.text()
                            }

                        }
                        items.push(myItem);
                    })
                }

               // for(var i= 0; i < body.length;i++){
               //
               //     var item = $(body[i]);
               //     var myItem = {};
               //     var index = item.index();
               //
               //     if(item.find('strong').text() === ""){
               //
               //        myItem =  {
               //             index : index,
               //             type :"text",
               //             src :"",
               //             text:item.text()
               //         }
               //     }else {
               //         console.log("Strong:" + item.find('strong').text())
               //         myItem =  {
               //             index : index,
               //             type :"strong",
               //             src :"",
               //             text:item.text()
               //         }
               //
               //     }
               //     items.push(myItem);
               // }
               //Săp xếp lại mảng để thêm vào bảng tin
               items.sort((a,b)=> {
                   return a.index > b.index ? 1 : -1;
               })



               const object = {
                   title: title,
                   author:author,
                   heading:heading,
                   image:image,
                   time:time

               }
               const myObject = {
                   title: title,
                   author:author,
                   heading:heading,
                   image:image,
                   time:time,
                   news:items
               }
                console.log("Object:" + myObject);
               setPosts(myObject);

               document.title = object.title;


               console.log("OK");
               console.log(object);


           } else {
               console.log("Error")
              setError(true);
           }
       });


   },[]);


   //xây dựng compoent để hiển thị
   const line = (item => {
       if(item.type === "text"){
           return (
             <p className={"content"}>{item.text}</p>
           );
       }else if(item.type === "video"){
           return (
               <div>
                   <div className={"warp--image"}>
                       <video className={"main--image"} controls data-html5-video>
                           <source src={item.src} type="video/mp4" />
                       </video>
                       <p className= {"detail--image video--des__margin"} >{item.text}</p>
                   </div>
               </div>
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
       else if(item.type === "only_image"){
           return (
               <div className={"warp--image"}>
                   <img className={"main--image"} src={item.src} alt={item.src}/>
                   {
                       item.text !== "" &&
                       <div className={"detail--image"}>{item.text}</div>
                   }

               </div>
           );
       }
   });




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
                           <div className={"time"}>

                            {/*<Text_to_speech text={posts.title +"\n" +posts.heading +"\n"*/}
                            {/*    + posts.news.map(item => {*/}
                            {/*        return item.text +"\n";*/}
                            {/*    })*/}

                            {/*}></Text_to_speech>*/}
                           </div>
                           <h5 className={"title--heading"}>{posts.heading}</h5>
                           <div className={"warp--image"}>
                               <img className={"main--image"} src={posts.image} alt={posts.image}/>
                               <div className={"detail--image"}>Ảnh minh hoạ</div>

                           </div>

                       </div>

                        <div className={"main--content"}>
                            {posts.news.map((item,index)=>(
                                // (item.type === "text" && <p key={index} className={"content"}>{item.text}</p>)
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
                                        <a href={`/Trang-Chu/${item.id}`} > <img className={"image-item"} src={item.image} alt={item.image}/></a>
                                    </div>
                                    <div className={"col-9 body--news"}>
                                        <div className={"title-news"}><a href={`/Trang-Chu/${item.id}`} >{item.title}</a></div>
                                        <label className={"story--time"}>{convertDate(item.date)}</label>
                                        <div className={"title-content"}>{item.content.split(".")[0]}.</div>
                                    </div>
                                </div>

                            ))}
                        </div>
                    </div>
                </div>
            }
            {
                error && <NotFound>Không tìm thấy</NotFound>
            }
        </div>
    );
})
