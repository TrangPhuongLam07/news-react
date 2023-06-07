import React from "react";
import "./css/footer.css";


export  default  function Footer(){
    return(
     <div className={"footer-page"}>
         <div className={"container"}>
            <div className={"non-tab"}>
                <h2 className={"logo-footer"}>Báo Giáo dục và Thời đại Online</h2>
                <h3 className={"title"}>BÁO GIÁO DỤC & THỜI ĐẠI</h3>
            </div>
             <div className={"primary"}>
                 <p className={"bold"}>
                     CƠ QUAN CỦA BỘ GIÁO DỤC VÀ ĐÀO TẠO - DIỄN ĐÀN TOÀN XÃ HỘI VÌ SỰ NGHIỆP GIÁO DỤC</p>
                 <p >Cơ quan chủ quản: BỘ GIÁO DỤC VÀ ĐÀO TẠO</p>
                 <p >
                     Số giấy phép 479/GP-BTTTT, cấp ngày 29/10/2020, ISSN 1859-2945.</p>
                 <p >
                     Tổng Biên tập: Triệu Ngọc Lâm.</p>
                 <p >
                     Phó Tổng Biên tập: Dương Thanh Hương.</p>
                 <p >
                     ® Ghi rõ nguồn “Báo Giáo dục &amp; Thời đại” khi phát hành lại thông tin từ website.
                     .</p>

             </div>

             <div className={"secondary"}>
                 <h3 className={"title bold"}>
                     TRỤ SỞ CHÍNH</h3>
                 <div className={"contract"}>
                     Tòa soạn: 15 - Hai Bà Trưng - Q.Hoàn Kiếm - Hà Nội.
                    < br></br>
                     Điện thoại:024 3936 9800
                 </div>
                 <h3 className={"title bold"}>

                     LIÊN HỆ QUẢNG CÁO, TRUYỀN THÔNG VÀ ĐẶT BÁO</h3>
                 <p>Phòng Truyền thông và Dự án</p>
                 <p>Phone:0886 059 988</p>
             </div>

         </div>

     </div>
    )
}