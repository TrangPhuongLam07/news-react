import React from "react";
import result from "../data/rss";
import "./css/detail.css";
import "./css/main.css";
import {convertDate} from "./api/dateTime";
import {Link} from "react-router-dom";
class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state={listNew:result,indexItem:10}
        if(this.state.listNew==null) this.state.listNew = [];
    }

    load = ()=>{
        this.setState(state =>({
            ...state.listNew,
            indexItem:state.indexItem + 3
        }))
    }

    hide = () => {
        this.setState(state =>({
            ...state.listNew,
            indexItem:10
        }))
    }


    render() {
        document.title = "Trang chủ";
        let page = "/Trang-Chu/"
        console.log("rerender")
        return (
            <div className={"container mt-3"}>

                <div className={"warp warp-top"}>
                    <h2 className={"wrap-title"}>Tin mới nhất</h2>
                </div>

               <div>
                   {
                       this.state.listNew.slice(0,1).map((item) =>(
                       <div key ={item.id}  >
                         <New  id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date={item
                             .date} page ={page}></New>
                       </div>
                       ))
                   }
               </div>
                <div className={"warp"}>
                    <h2 className={"wrap-title"}> Mới cập nhật</h2>
                </div>
                <div className={"row mb-3 mt-3"}>
                    {this.state.listNew.slice(1,5).map((item)=>(
                            <div key ={item.id} className={"card-item col-3"}>
                                <NewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={page}></NewItem>
                            </div>

                    ))}
                </div>

                <div className={"container-fluid"}>
                    <div className={"warp"}>
                        <h2 className={"wrap-title"}> Tin khác</h2>
                    </div>
                    {this.state.listNew.slice(5,this.state.indexItem).map((item)=>(
                        <div key ={item.id} className={""}>
                            <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={page}></FooterNewItem>
                        </div>

                    ))}

                    <div className={"warp--btn__view"}>
                        {this.state.listNew.length > this.state.indexItem &&
                            <button onClick={this.load} className={"btn--load"}>Xem thêm</button>}
                        {this.state.listNew.length <= this.state.indexItem &&
                            <button onClick={this.hide} className={"btn--load"}>Hiển thị ít lại</button>}
                    </div>

                </div>

            </div>
        );
    }
}

export class New extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            title: this.props.title,
            link:this.props.link,
            content:this.props.content,
            image:this.props.image,
            date:this.props.date,
            page:this.props.page
        }
    }

    render() {
        return (
            // <div  className="col col-xs-12 col-sm-6 col-md-4 col-lg-3">
            //     <div className="card" >
            //         <img className="card-img-left" src= {this.state.image}
            //              alt="Card image cap"/>
            //         <div className="card-body">
            //             <h2><a href={this.state.link}>{this.state.title}</a></h2>
            //             <p className="card-text">{this.state.content}</p>
            //         </div>
            //     </div>
            // </div>
            <div>
                <div className={"container"}>

                    <div className="card-body row">
                        <div className={"col-6"}>
                            <a href={`${this.state.page}${this.state.id}`}> <img className={"image-card"} src={this.state.image} alt={this.state.title}/></a>
                        </div>
                        <div className={"col-6 pd-l-30 text-just"} >
                            <h5 className="card-title card-main"><a href={`${this.state.page}${this.state.id}`}>{this.state.title}</a></h5>
                            <label className={"story--time"}>{convertDate(this.state.date)}</label>
                            <p className="card-text">{this.state.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export class NewItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            title: this.props.title,
            link:this.props.link,
            content:this.props.content,
            image:this.props.image,
            date:this.props.date,
            page:this.props.page
        }
    }

    render() {
        return (
            <div className="card" >
                <a href={`${this.state.page}${this.state.id}`}><img className="card-img-top image-card_item" src={this.state.image}
                                                                    alt={this.state.image}/></a>
                <div className="card-body">
                    <h5 className={"card-title"}><a href={`${this.state.page}${this.state.id}`}>{this.state.title}</a></h5>
                    <label className={"story--time"}>{convertDate(this.state.date)}</label>
                </div>
            </div>
        );
    }
}

export class FooterNewItem extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            title: this.props.title,
            link:this.props.link,
            content:this.props.content,
            image:this.props.image,
            date:this.props.date,
            page:this.props.page
        }
    }
    render() {
        return (
            <div className={"mb-3 mt-3"}>
                <div  className={"row item-news home"}>
                    <div className={"col-4"}>
                        <a href={`${this.state.page}${this.state.id}`} > <img className={"image-item"} src={this.state.image} alt={this.state.title}/></a>
                    </div>
                    <div className={"col-8 body--news"}>
                        <div className={"title-news"}><a href={`${this.state.page}${this.state.id}`} >{this.state.title}</a></div>
                        <label className={"story--time"}>{convertDate(this.state.date)}</label>
                        {this.state.content && <div className={"title-content"}>{this.state.content.split(".")[0]}.</div>}
                    </div>
                </div>
            </div>

        );
    }
}


export default HomePage;
