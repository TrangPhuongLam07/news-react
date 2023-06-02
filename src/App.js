import logo from './logo.svg';
import './App.css';

import React, { Component } from 'react';
import Parser from 'rss-parser';
import Header from "./component/Header";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import Home from "./component/Home"
import ListNews from "./component/HomePage";
import Footer from "./component/Footer";

function App() {
    return (
        <div className="">
            <header className="">
                <Header></Header>
                <ListNews></ListNews>
                <Footer></Footer>
            </header>
        </div>
    );
}

export default App;
