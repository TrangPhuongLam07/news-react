import {useState,useEffect} from "react";
import "./css/notfound.css"
export function NotFound() {
    useEffect(()=>{
        document.title = "Not Found"
    },[])

    return(
     <div className={"image-background"}>
         <div className={"container min-height-500"}>
             <div className={"title"}>Không tìm thấy trang..!</div>
             <div className={"title font-100"}>404</div>
             <div className={"title"}>Page Not Found...!</div>
             <div className={"width-100"}><a href={"/Trang-Chu"} className={"back"}>Quay về trang chủ</a></div>
         </div>
     </div>
    );
}