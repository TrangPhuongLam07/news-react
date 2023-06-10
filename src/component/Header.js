import React from "react";
import {result} from  "../data/rss.js"
import "./header.css"

function Header() {
       return(
          <header>
              <div className={"top-infor"}>
                  <div className={"container"}>
                      <div className={"phone"}>
                          <i className={"fa fa-mobile icon"} ></i>
                          <span>Đường dây nóng:</span>
                          <strong>094.333.058</strong>
                      </div>

                      <div className={"email"}>
                          <i className={"fa fa-envelope icon"} ></i>
                          <span>Email:</span>
                          <a href={ "mailto:phuongnguyen112002@gmail.com"}>phuongnguyen112002@gmail.com</a>
                      </div>

                  </div>
              </div>
              <div className={"container logo-header"}>
                  <div className={"logo"}></div>
                  <div className={"search"}>
                      <input type={"text"} className={"form-control txt-search"}/>
                      <i className={"fa fa-search icon"}></i>

                  </div>
                  <h2 className={"logo-gdtd"}>

                  </h2>
              </div>
              <div className={"header-nav"}>
                  <div className={"container"}>
                      <ul className={"menu"}>
                        <li className={"menu-item home"}>
                            <a className={"menu-link active"} href={"/Trang-Chu"}>Trang chủ</a>
                        </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Giáo dục</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Thời sự</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Giáo dục pháp luật</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Kết nối </a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Trao đổi </a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Học đường</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Nhân ái</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Thế giới </a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Sức khoẻ</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Media</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Văn hoá</a>
                          </li>
                          <li className={"menu-item"}>
                              <a className={"menu-link "} href={""}>Thể thao</a>
                          </li>
                      </ul>
                  </div>

              </div>
          </header>
       );

   }


export default Header;