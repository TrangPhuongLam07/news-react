import {useEffect,useState} from "react";
import  {useParams} from "react-router-dom";
import * as cheerio from 'cheerio'
import  request from 'request-promise'
import "./css/detail.css";
import result from "../data/rss";


export const  HomeDetail = () =>{
    const [post,setPost] = useState({});
    const [news,setNews]= useState([]);
    const baseUrl = "https://giaoducthoidai.vn/";
    const params = useParams();
    console.log(news)

    const id = params.id;
   useEffect( () => {
        request(baseUrl + id, (error, response, html) => {
           if (!error && response.statusCode === 200) {
               console.log(baseUrl + id);
               const $ = cheerio.load(html); // load HTML
               const title = $('body').find('.article .article__title').text();
               const author = $('body').find('.article .article__meta .author').text();
               const heading = $('body').find('.article .article__sapo').text();
               var image = $('body').find('.article .picture .pic').find('img').attr("src");
               const body = $('body').find('.article .article__body').find('p');
               if(image === null || !image.toString().startsWith("http://")){
                  var myItem = result.find(item => item.id == id);
                  image = myItem.image.toString();
               }
               console.log("Image:" + image);

               const items = []
               for(var i= 0; i < body.length;i++){

                   var item = $(body[i]);
                   if(item.find('strong') !== null){
                       items.push(item.text());
                   }
               }
               setNews(items);
               const object = {
                   title: title,
                   author:author,
                   heading:heading,
                   image:image,

               }
               setPost(object)
               console.log("OK");
               console.log(object)

           } else {
               console.log("Error")
               console.log(error);
           }
       });
   },[]);

    return(
        <div className={"detail"}>
            {post !== null
            &&
                <div className={"container"}>
                   <div className={"heading-news"}>
                       <h1 className={"title"}>{post.title}</h1>
                       <div className={"warp--author"}>
                           <div className={"author"}>Tác giả : {post.author}</div>
                       </div>
                       <h5 className={"title--heading"}>{post.heading}</h5>
                       <div className={"warp--image"}><img className={"main--image"} src={post.image}/></div>

                   </div>

                    <div className={"main--content"}>
                        {news.map((item,index)=>(
                            <p key={index} className={"content"}>{item}</p>
                        ))}
                    </div>

                </div>
            }
        </div>
    );
}
