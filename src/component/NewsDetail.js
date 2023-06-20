import React, {useEffect, useState} from 'react';
import {useLocation, useParams} from "react-router-dom";
import NewsAnother from "./NewAnother";
import * as newsRSS from "../data/NewsRSS"
import {NewSpeak, TextToSpeech, TTS, TTSSpeech, VoiceRSS} from "./NewSpeak";
import "./css/detail.css";
import "./css/main.css";

const NewsDetail = (props) => {
    console.log("1news: ----")
    const [newsContent, setNewsContent] = useState({});
    const {id} = useParams();
    const result = newsRSS.getNews(props.url)
    console.log("id: ----" + id)
    useEffect(() => {
        console.log("2news: ----")
        fetchNewsContent().then(() => {
            console.log("Detail news in useEffect")
        });
        //Luôn hiển thị ở đầu trang
        //Dùng id làm tham số cho effect để effect biết là 2 url là khác nhau
        //Không có là không có routing được
        window.scrollTo(0, 0);
    }, [id]);
    const fetchNewsContent = async () => {
        const CORS_PROXY = 'https://giaoducthoidai.vn/';

        const response = await fetch(CORS_PROXY + id);
        const htmlString = await response.text();
        // Lấy thông tin chi tiết từ HTML
        // Ví dụ, sử dụng thư viện DOMParser hoặc regex để trích xuất thông tin

        // Ví dụ sử dụng DOMParser
        const parser = new DOMParser();
        const data = parser.parseFromString(htmlString, 'text/html');

        //Lấy thông tin cơ bản của tin tức
        let title = data.querySelector('.article .article__title')
        let author = data.querySelector('.article .article__meta .author')
        let time = data.querySelector('.article .article__meta .time')
        let heading = data.querySelector('.article .article__sapo')
        let firstImg = data.querySelector('.article .picture .pic img')
        let imgList = data.querySelectorAll('.media-content .cms-body img')
        for (const e of imgList) {
            console.log("Image ----" + e.innerHTML)
        }
        //Kiểm tra thông tin cơ bản
        if (title != undefined) title = title.textContent
        else title = ""
        if (author != undefined) author = author.textContent
        else author = ""
        if (time != undefined) time = time.textContent
        else time = ""
        if (heading != undefined) heading = heading.textContent
        else heading = ""
        if (firstImg != undefined) firstImg = firstImg.getAttribute('src')
        else firstImg = ""
        try {
            // Lấy thông tin và kiểm tra nội dung của tin tức
            let count = 0;
            let list = data.querySelector('.article .article__body');

            const elements = [];
            if (list != undefined) {
                let items = list.children
                console.log("items--" + items)
                console.log("Size---" + items.length)
                for (const e of items) {
                    console.log("Element---------" + e.tagName)
                    switch (e.tagName) {
                        case 'P': {
                            if (e.querySelector('strong') != undefined) {
                                const itemObject = {
                                    index: count++,
                                    type: "strong",
                                    src: "",
                                    text: e.textContent
                                }
                                elements.push(itemObject)
                                console.log("child e -" + e.innerHTML)
                                break
                            } else {
                                const itemObject = {
                                    index: count++,
                                    type: "text",
                                    src: "",
                                    text: e.textContent
                                }
                                elements.push(itemObject)
                                console.log("child e -" + e.innerHTML)
                                break
                            }

                        }
                        case 'TABLE': {
                            let img = e.querySelector('tbody tr td img')

                            if (e.getAttribute('class').localeCompare('picture') === 0) {
                                let tr = e.querySelectorAll('tbody tr')
                                let captions = e.getElementsByClassName('caption')
                                let caption
                                //kiem tra caption
                                for (const c of captions) {
                                    if (c != undefined) {
                                        caption = c.textContent
                                    } else {
                                        caption = ""
                                    }
                                }


                                const itemObject = {
                                    index: count++,
                                    type: "img",
                                    src: img.getAttribute('data-src'),
                                    text: caption
                                }
                                elements.push(itemObject)
                                console.log("child e -" + img.getAttribute('data-src'))
                                console.log("child e -" + caption)
                                break
                            } else if (e.getAttribute('class').localeCompare('video') === 0) {
                                let video = e.querySelectorAll('source')
                                for (const v of video) {
                                    console.log("e video =======" + v.getAttribute('src'));
                                    if (v != undefined) {
                                        const itemObject = {
                                            index: count++,
                                            type: "video",
                                            src: v.getAttribute('src'),
                                            text: ""
                                        }
                                        elements.push(itemObject)
                                        console.log("Video success==========")
                                    }
                                }

                            }
                            break
                        }

                        case 'DIV': {
                            if (e.getAttribute('class').localeCompare('notebox ncenter cms-note') === 0) {
                                console.log("success=======")
                                let noteList = e.querySelectorAll('.notebox p')
                                for (const e of noteList) {
                                    console.log("note=======" + e.textContent)
                                    const itemObject = {
                                        index: count++,
                                        type: "note",
                                        src: "",
                                        text: e.textContent
                                    }

                                    elements.push(itemObject)
                                    break
                                }
                            }
                        }

                        case 'H1', 'H2': {
                            if (e.tagName.localeCompare('H1') === 0) {
                                const itemObject = {
                                    index: count++,
                                    type: "h1",
                                    src: "",
                                    text: e.textContent
                                }
                                elements.push(itemObject)
                                console.log("h1-----" + e.textContent)
                                break
                            } else if (e.tagName.localeCompare('H2') === 0) {
                                const itemObject = {
                                    index: count++,
                                    type: "h2",
                                    src: "",
                                    text: e.textContent
                                }
                                console.log("h2-------" + e.textContent)
                                elements.push(itemObject)
                                break
                            }

                        }
                        case 'BLOCKQUOTE': {
                            if (e.tagName.localeCompare('BLOCKQUOTE') === 0) {

                                const itemObject = {
                                    index: count++,
                                    type: "quote",
                                    src: "",
                                    text: e.textContent
                                }
                                console.log("quote-------" + e.textContent)
                                elements.push(itemObject)
                                break
                            }
                        }
                        default: {
                            console.log("Done");
                            break
                        }
                    }

                }
            }
            //Trường hợp trang tin tức chỉ có ảnh
            else if (imgList != undefined) {
                const item = data.querySelector('.media-content .text-wrap');
                title = item.querySelector('.article__title ').textContent;
                author = item.querySelector('.author-wrap .author').textContent
                time = item.querySelector('.time').textContent

                for (const i of imgList) {
                    let src = i.getAttribute('src');
                    let text = i.getAttribute('title');
                    if (text != undefined) {
                        const itemObject = {
                            index: count++,
                            type: "img",
                            src: src,
                            text: text
                        }
                        elements.push(itemObject)
                    }

                }
            }

//Tạo ra đối tượng để lấy thông tin cần thiết
            const myObject = {
                title: title,
                author: author,
                heading: heading,
                time: time,
                srcImg: firstImg,
                items: elements
            }

            setNewsContent(myObject);

        } catch (error) {
            console.error('Error fetching news content:', error);
            /*console.log('error')*/
        }
    };

//chức năng hiển thị theo từng element
    function news(item) {
        switch (item.type) {
            case 'text': {
                return (
                    <p className={"content"}>{item.text}</p>
                );
                break
            }
            case 'strong': {
                return (
                    <p><strong>{item.text}</strong></p>
                );
                break
            }
            case 'img': {
                return (
                    <div className={"warp--image"}>
                        <img className={"main--image"} src={item.src} alt={item.src}/>
                        {
                            item.text !== "" &&
                            <div className={"detail--image"}>{item.text}</div>
                        }

                    </div>
                );
                break
            }
            case 'note': {
                return (
                    <div className={"note-box"}>
                        <p>{item.text}</p>
                    </div>
                );
                break
            }
            case 'quote': {
                return (
                    <blockquote className={"blockquote"}>
                        <p>{item.text}</p>
                    </blockquote>
                );
                break
            }
            case 'video': {
                return (
                    <div>
                        <div className={"warp--image"}>
                            <video className={"main--image"} controls data-html5-video>
                                <source src={item.src} type="video/mp4"/>
                            </video>
                            <p className={"detail--image video--des__margin"}>{item.text}</p>
                        </div>
                    </div>
                );
                break
            }
            case 'h1': {
                return (
                    <h1 className={"content bold"}>{item.text}</h1>
                );
                break
            }
            case 'h2': {
                return (
                    <h2 className={"content bold"}>{item.text}</h2>
                );
                break
            }
            default: {
                console.log("Done news ---------");
                break
            }
        }
    }

    const getTextNews = () => {
        let textNews = "";
        let object = Object.keys(newsContent)
        console.log("title---------------" + newsContent[object])
        let items = newsContent[object[5]];

        Object.keys(newsContent).forEach((key, index = 5) => {
            items = newsContent[key]
            for (const i of items) {
                if (i.type == "text") {
                    textNews += i.text;
                    break;
                }
            }
        });
        console.log("textNews --" + textNews)
        return textNews
    }
    return (

        <div className={"detail"}>
            <div>
                <div className={"container"}>
                    <div className={"heading-news"}>
                        {console.log("1-----")}
                        <h1 className={"title"}>{newsContent.title}</h1>
                        <div className={"warp--author"}>
                            <div className={"author"}>Tác giả : {newsContent.author}</div>
                            <div className={"author"}>Ngày đăng: {newsContent.time}</div>
                        </div>
                        <div className={"time"} id="time">
                            <VoiceRSS text={getTextNews()}></VoiceRSS>
                        </div>
                        <h5 className={"title--heading"}>{newsContent.heading}</h5>
                        {/*Hiện image đầu tiên*/}
                        <div className={"warp--image"}>
                            <img className={"main--image"} src={newsContent.srcImg} alt={newsContent.srcImg}/>
                            <div className={"detail--image"}>Ảnh minh hoạ</div>

                        </div>


                    </div>

                    <div className={"main--content"}>
                        {newsContent.items !== undefined &&
                            newsContent.items.map((item, index) => (
                                <div key={index}>
                                    {news(item)}

                                </div>
                            ))}
                        <div>

                        </div>

                    </div>

                </div>
                <div className={"container-fluid"}>
                    <div className={"warp"}>
                        <h2 className={"wrap-title"}>Tin khác</h2>
                    </div>
                    <div className={"mb-3 mt-3"}>

                    </div>

                    <NewsAnother news={result} pageName={props.urlPage} count={5}></NewsAnother>

                </div>
            </div>
        </div>

    );
};

export default NewsDetail;