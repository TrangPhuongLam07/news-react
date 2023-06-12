
import './App.css';

import React, { Component } from 'react';
import Parser from 'rss-parser';
import Header from "./component/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import  {Routes,Route} from  'react-router-dom'
import  {HomeDetail} from './component/HomeDetail.js'
import EducationPage from "./component/Education";
import {SearchPage} from "./component/Search";
import {NotFound} from "./component/NotFound";
import CaculturePage from "./component/CulturePage";
import SportPage from "./component/SportPage";


function App() {
    return (
        <div className="">
            <header className="">
                <Header></Header>
                    <Routes>
                        <Route path={"/"} element={<HomePage />}/>
                        <Route path={"/:id"} element={<HomeDetail />}/>
                        <Route path={"/Trang-Chu"} element={<HomePage />}> </Route>
                        <Route path={"/Trang-Chu/:id"} element ={<HomeDetail />} />

                        <Route path={"/Giao-Duc"} element={<EducationPage />}> </Route>
                        <Route path={"/Giao-Duc/:id"} element ={<HomeDetail />} />
                        <Route path={"/Van-Hoa"} element={<CaculturePage />}> </Route>
                        <Route path={"/Van-Hoa/:id"} element ={<HomeDetail />} />
                        <Route path={"/The-Thao"} element={<SportPage />}> </Route>
                        <Route path={"/The-Thao/:id"} element ={<HomeDetail />} />
                        <Route path={"/Search/:keyword"} element ={<SearchPage />} />
                        <Route path={"*"} element ={<NotFound />} />
                    </Routes>
                <Footer></Footer>
            </header>
        </div>


    );
}

export default App;
