import React, {useState, useRef} from "react";
import {result} from "../data/rss.js"
import "./css/header.css"
import {Link} from "react-router-dom";
import {SpeechVoice} from "./SpeechVoice";
//import SearchBar from "./SearchBar";

const listItem = [
    {
        id: 1,
        name: "Trang Chủ",
        href: "/Trang-Chu"
    },
    {
        id: 2,
        name: "Giáo dục",
        href: "/Giao-Duc"
    },
    {
        id: 3,
        name: "Thời sự",
        href: "/Thoi-Su"
    },
    {
        id: 4,
        name: "Giáo dục pháp luật",
        href: "/Giao-Duc-Phap-Luat"
    },
    {
        id: 5,
        name: "Kết nối",
        href: "/Ket-Noi"
    },

    {
        id: 6,
        name: "Trao đổi",
        href: "/Trao-Doi"
    },
    {
        id: 7,
        name: "Học đường",
        href: "/Hoc-Duong"
    },
    {
        id: 8,
        name: "Nhân ái",
        href: "/Nhan-Ai"
    },
    {
        id: 9,
        name: "Thế giới",
        href: "/The-Gioi"
    },
    {
        id: 10,
        name: "Sức Khoẻ",
        href: "/Suc-Khoe"
    }
    ,
    {
        id: 11,
        name: "Media",
        href: "/Media"
    }
    ,
    {
        id: 12,
        name: "Văn Hoá",
        href: "/Van-Hoa"
    }
    ,
    {
        id: 13,
        name: "Thể Thao",
        href: "/The-Thao"
    }

]

function Header() {
    const [active, setActive] = useState(-1);
    console.log(active);
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            document.getElementById("search-button").click();
        }
    }

    return (
        <header>
            <div className={"top-infor"}>
                <div className={"container"}>
                    <div className={"phone"}>
                        <i className={"fa fa-mobile icon"}></i>
                        <span>Đường dây nóng:</span>
                        <strong>094.333.058</strong>
                    </div>

                    <div className={"email"}>
                        <i className={"fa fa-envelope icon"}></i>
                        <span>Email:</span>
                        <a href={"mailto:phuongnguyen112002@gmail.com"}>phuongnguyen112002@gmail.com</a>
                    </div>

                </div>
            </div>
            <div className={"container logo-header"}>
                <div className={"logo"}></div>
                <div className={"search"}>
                    <input id={"search"} type={"text"} className={"form-control txt-search"}
                           onKeyPress={handleKeyPress}/>
                    <button id={"search-button"} onClick={Search}><i className={"fa fa-search icon"} onClick={() => {
                        Search();
                        setActive(0);
                    }
                    }></i></button>

                </div>
                {/*<SearchBar placeholder={"Enter a Search"} data={result}></SearchBar>*/}

                <SpeechVoice></SpeechVoice>
                <h2 className={"logo-gdtd"}>

                </h2>
            </div>

            <div className={"header-nav"}>
                <div className={"container"}>
                    <ul className={"menu"}>
                        {listItem.map((item, index) => (
                            <li key={item.id} className={"menu-item home"}>
                                <Link className={"menu-link " + (active == item.id ? "active" : "")}
                                      onClick={() => setActive(item.id)} to={item.href}>{item.name}</Link>
                            </li>
                        ))}
                        {/*<li className={"menu-item home"}>*/}
                        {/*    <a className={"menu-link "}  href={"/Trang-Chu"}>Trang chủ</a>*/}
                        {/*</li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={"/Giao-Duc"}>Giáo dục</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Thời sự</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Giáo dục pháp luật</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Kết nối </a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Trao đổi </a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Học đường</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Nhân ái</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Thế giới </a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Sức khoẻ</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Media</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Văn hoá</a>*/}
                        {/*  </li>*/}
                        {/*  <li className={"menu-item"}>*/}
                        {/*      <a className={"menu-link "} href={""}>Thể thao</a>*/}
                        {/*  </li>*/}
                    </ul>
                </div>

            </div>
        </header>
    );

}

function Search() {
    let keyword = document.getElementById("search").value
    if (keyword != "") {
        document.location.href = "/Search/" + keyword;
    }
}



export default React.memo(Header);