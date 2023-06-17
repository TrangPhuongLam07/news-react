import React, {useState} from 'react';
/*import {FooterNewItem} from "./NewBody";*/
import {FooterNewItem} from "./NewBodyVer2";

const NewsAnother = (props) => {
    const [visibleNews, setVisibleNews] = useState(3); // Số lượng tin tức hiển thị ban đầu
    const allNews = props.news; // Danh sách tin tức đầy đủ

    const handleLoadMore = () => {
        setVisibleNews(prevVisibleNews => prevVisibleNews + 3); // Tăng số lượng tin tức hiển thị lên 3
    };

    const setNews = (count) => {
        setVisibleNews(count); // Tăng số lượng tin tức hiển thị lên 3
    };

    return (
        <div>
            {allNews != undefined && allNews.slice(props.count, visibleNews + props.count).map(item => (

                <div key={item.id} className={""}>
                    {/* <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={props.pageName}></FooterNewItem>*/}
                    <FooterNewItem id={item.id} title={item.title} link={item.link} content={item.content}
                                   image={item.image} date={item.date} page={props.pageName}></FooterNewItem>

                </div>
            ))}
            <div className={"warp--btn__view"}>
                {visibleNews < allNews.length && (
                    <button className={"btn--load"} onClick={handleLoadMore}>Xem thêm</button>)}
                {visibleNews >= allNews.length && (
                    <button className={"btn--load"} onClick={()=>setVisibleNews(3)}>Hiển thị ít lại</button>)}
            </div>

        </div>
    );
};

export default NewsAnother;