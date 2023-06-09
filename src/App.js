import logo from './logo.svg';
import './App.css';

import React, {Component} from 'react';
import Parser from 'rss-parser';
import Header from "./component/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import {Routes, Route} from 'react-router-dom'
import {HomeDetail} from './component/HomeDetail.js'
import {NewDetail} from './component/NewDetail.js'
import EducationPage from "./component/Education";
import {SearchPage} from "./component/Search";
import {NotFound} from "./component/NotFound";
import ThoisuPage from "./component/ThoisuPage";
import HocduongPage from "./component/HocduongPage"
import CaculturePage from "./component/CulturePage";
import SportPage from "./component/SportPage";
import NewsFeed from "./data/NewFeeds";
import {ThegioiPage} from "./component/ThegioiPage";
import {SuckhoePage} from "./component/SuckhoePage"
import NewsDetail from "./component/NewsDetail";

function App() {
    return (
        <div className="">
            <header className="">
                <Header></Header>
                <Routes>
                    <Route path={"/"} element={<HomePage/>}/>
                    <Route path={"/:id"} element={<HomeDetail/>}/>
                    <Route path={"/Trang-Chu"} element={<HomePage/>}> </Route>
                    <Route path={"/Trang-Chu/:id"} element={<HomeDetail/>}/>

                    <Route path={"/Giao-Duc"} element={<EducationPage/>}> </Route>
                    <Route path={"/Giao-Duc/:id"} element={<HomeDetail/>}/>
                    <Route path={"/Van-Hoa"} element={<CaculturePage/>}> </Route>
                    <Route path={"/Van-Hoa/:id"} element={<HomeDetail/>}/>
                    <Route path={"/The-Thao"} element={<SportPage/>}> </Route>
                    <Route path={"/The-Thao/:id"} element={<HomeDetail/>}/>
                    <Route path={"/Search/:keyword"} element={<SearchPage/>}/>
                    <Route path={"*"} element={<NotFound/>}/>

                    <Route path={"/Thoi-Su"} element={<ThoisuPage/>}> </Route>
                    <Route path={"/Thoi-su/:id"} element={<NewDetail/>}/>
                    <Route path={"/Hoc-Duong"} element={<HocduongPage/>}> </Route>
                    <Route path={"/Hoc-Duong/:id"} element={<HomeDetail/>}/>
                    <Route path={"/The-Gioi"} element={<ThegioiPage/>}> </Route>
                    <Route path={"/The-Gioi/:id"} element={<NewDetail/>}/>
                    <Route path={"/Suc-Khoe"} element={<SuckhoePage/>}> </Route>
                    <Route path={"/Suc-Khoe/:id"} element={<NewDetail/>}/>

                    <Route path={"/Giao-Duc-Phap-Luat"} element={
                        <NewsFeed url="https://giaoducthoidai.vn/rss/phap-luat-phap-luat-8.rss"
                                  namePage="Giáo Dục Và Pháp Luật"
                                  urlPage="/Giao-Duc-Phap-Luat/" start={1} end={4}/>}> </Route>
                    <Route path={"/Giao-Duc-Phap-Luat/:id"} element={
                        <NewsDetail urlPage="/Giao-Duc-Phap-Luat/"
                                    url="https://giaoducthoidai.vn/rss/phap-luat-phap-luat-8.rss"/>}/>

                    <Route path={"/Ket-Noi"} element={
                        <NewsFeed url="https://giaoducthoidai.vn/rss/ket-noi-2.rss"
                                  namePage="Kết Nối" urlPage="/Ket-Noi/" start={5} end={8}/>}> </Route>
                    <Route path={"/Ket-Noi/:id"}
                           element={<NewsDetail urlPage="/Ket-Noi/"
                                                url="https://giaoducthoidai.vn/rss/ket-noi-2.rss"/>}/>

                    <Route path={"/Trao-Doi"} element={
                        <NewsFeed url="https://giaoducthoidai.vn/rss/trao-doi-3.rss"
                                  namePage="Trao Đổi"
                                  urlPage="/Trao-Doi/" start={9} end={12}/>}> </Route>
                    <Route path={"/Trao-Doi/:id"}
                           element={<NewsDetail urlPage="/Trao-Doi/"
                                                url="https://giaoducthoidai.vn/rss/trao-doi-3.rss"/>}/>

                    <Route path={"/Nhan-Ai"} element={
                        <NewsFeed url="https://giaoducthoidai.vn/rss/nhan-ai-13.rss"
                                  namePage="Nhân Ái"
                                  urlPage="/Nhan-Ai/" start={13} end={16}/>}> </Route>
                    <Route path={"/Nhan-Ai/:id"}
                           element={<NewsDetail urlPage="/Nhan-Ai/"
                                                url="https://giaoducthoidai.vn/rss/nhan-ai-13.rss"/>}/>

                    <Route path={"/Media"} element={
                        <NewsFeed url="https://giaoducthoidai.vn/rss/video-media-14.rss"
                                  namePage="Media"
                                  urlPage="/Media/" start={17} end={20}/>}> </Route>
                    <Route path={"/Media/:id"}
                           element={<NewsDetail urlPage="/Media/"
                                                url="https://giaoducthoidai.vn/rss/video-media-14.rss"/>}/>
                </Routes>
                <Footer></Footer>
            </header>
        </div>


    );
}

export default App;
