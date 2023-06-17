import React, { useState } from 'react';
import {FooterNewItem} from "./NewBody";

const NewsAnother = (props) => {
    const [visibleNews, setVisibleNews] = useState(3); // Số lượng tin tức hiển thị ban đầu
    const allNews = props.news; // Danh sách tin tức đầy đủ

    const handleLoadMore = () => {
        setVisibleNews(prevVisibleNews => prevVisibleNews + 3); // Tăng số lượng tin tức hiển thị lên 3
    };

    return (
        <div>
            {allNews!=undefined&&allNews.slice(0, visibleNews).map(item  => (

                <div key ={item.id} className={""}>
                <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={props.pageName}></FooterNewItem>
                </div>
            ))}
            <div className={"warp--btn__view"}>
                {visibleNews < allNews.length && (
                    <button className={"btn--load"} onClick={handleLoadMore} >Xem thêm</button>
                )}
            </div>

        </div>
    );
};

export default NewsAnother;