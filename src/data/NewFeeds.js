import React, { useEffect, useState } from 'react';
import Parser from 'rss-parser';
import ImgParser from 'html-react-parser';
import { New} from "../component/NewBodyVer2";
import NewsAnother from "../component/NewAnother";
import * as news from "../data/NewsRSS"
import {useLocation} from "react-router-dom";


 export const NewsFeed = (props) => {
    const [articles, setArticles] = useState([]);
    let result =[];
    useEffect(() => {
        fetchNewsFeed().then(() => {

            console.log("NewFeeds----")});
    }, []);

    const fetchNewsFeed = async () => {
        try {
            const parser = new Parser();
            const feed = await parser.parseURL(props.url); // Replace with the URL of the RSS feed
            setArticles(feed.items);
            console.log("Size: "+articles.length)
            console.log(feed.items)


        } catch (error) {
            console.error('Error fetching news feed:', error);
        }
    };
    //xử lý feeds lấy ra attributes cần thiết
     for (let i = 0; i < articles.length; i++) {

         let id = articles[i].guid.split("/");
         let image = "";
         //xử lý ảnh khi fetching
         try {
             image = ImgParser(articles[i].content)[0].props.children.props.src.toString().replace("/80x80", "")
         } catch {
             image = "Lỗi Ảnh"
         }

         let object = {
             id: id[id.length - 1],
             title: articles[i].title,
             link: articles[i].link,
             content: articles[i].contentSnippet,
             image: image,
             date: articles[i].pubDate
         }
         result.push(object)
     }
     console.log("Result: " + result.length)
     const getNews = () => {
         return result
     }
     document.title = props.namePage;
     let page = props.urlPage;
     return (
         <div className={"container mt-3"}>
             <div className={"warp warp--kind"}>
                 <h1 className={"wrap-title title-kind"}>{props.namePage}</h1>
             </div>

             <div className={"warp warp-top"}>
                 <h2 className={"wrap-title"}>Tin mới nhất</h2>
             </div>

             <div>
                 {result!=undefined&&result.slice(props.start,props.end).map((item) =>(
                         <div key ={item.id}  >
                             <New  id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date={item
                                 .date} page ={page}></New>
                         </div>
                     ))}
             </div>


             <div className={"container-fluid"}>
                 <div className={"warp"}>
                     <h2 className={"wrap-title"}> Tin khác</h2>
                 </div>
                 <NewsAnother news={result} pageName ={page} count={props.end}></NewsAnother>
             </div>

         </div>
     );
};

export default NewsFeed;
