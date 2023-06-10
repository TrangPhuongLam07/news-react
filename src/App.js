import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import Parser from 'rss-parser';
import Header from "./component/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Home from "./component/Home"
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import  {Routes,Route} from  'react-router-dom'
import  {HomeDetail} from './component/HomeDetail.js'

function App() {
    return (
        <div className="">
            <header className="">
                <Header></Header>
                    <Routes>
                        <Route path={"/"} element={<HomePage />}/>
                        <Route path={"/Trang-Chu"} element={<HomePage />}> </Route>
                        <Route path={"/Trang-Chu/:id"} element ={<HomeDetail />} />
                    </Routes>
                <Footer></Footer>
            </header>
        </div>


    );
}

export default App;
