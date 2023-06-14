import React from "react";
import data from "../data/hocduong_rss";
import {convertDate} from "./api/dateTime";

class ThoisuPage extends React.Component {
    constructor(props) {
        super(props);
        this.state={listNew:data}
        if(this.state.listNew==null) this.state.listNew = [];
    }

    render() {
        document.title = "Học đường";
        let page = "/Hoc-Duong/"
        return (
            <div className={"container mt-3"}>
                <div className={"warp warp--kind"}>
                    <h1 className={"wrap-title title-kind"}>Học đường </h1>
                </div>

                <div className={"warp warp-top"}>
                    <h2 className={"wrap-title"}>Tin mới nhất</h2>
                </div>

                <div>
                    {
                        this.state.listNew.slice(35,36).map((item) =>(
                            <div key ={item.id}  >
                                <New  id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date={item
                                    .date} page ={page}></New>
                            </div>
                        ))
                    }
                </div>


                <div className={"container-fluid"}>
                    <div className={"warp"}>
                        <h2 className={"wrap-title"}> Tin khác</h2>
                    </div>
                    {this.state.listNew.slice(37,41).map((item)=>(
                        <div key ={item.id} className={""}>
                            <FooterNewItem   id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image} date ={item.date} page ={page}></FooterNewItem>
                        </div>

                    ))}
                    <div className={"warp--btn__view"}>
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


export default ThoisuPage;