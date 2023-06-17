import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {convertDate} from "./api/dateTime";
export class New extends React.Component{

 parser;

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
                            <Link to={`${this.state.page}${this.state.id}`} ><img className={"image-card"} src={this.state.image} alt={this.state.title}/></Link>
                        </div>
                        <div className={"col-6 pd-l-30 text-just"} >
                            <h5 className="card-title card-main"><Link to={`${this.state.page}${this.state.id}`} >{this.state.title}</Link></h5>
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
                <Link to={`${this.state.page}${this.state.id}`} ><img className={"card-img-top image-card_item"} src={this.state.image} alt={this.state.title}/></Link>
                <div className="card-body">
                    <h5 className={"card-title"}><Link to={`${this.state.page}${this.state.id}`} >{this.state.title}</Link></h5>
                    <label className={"story--time"}>{convertDate(this.state.date)}</label>
                </div>
            </div>
        );
    }
}


export class FooterNewItem extends React.Component {
     /*navigate = useNavigate();


     handleRedirect = () => {

       this.navigate("/Giao-Duc-Phap-Luat/:id");
         this.navigate("/Giao-Duc-Phap-Luat/:id"); // Chuyển hướng lần thứ hai
    };*/

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
                        <Link to={`${this.state.page}${this.state.id}`} ><img  className={"image-item"} src={this.state.image} alt={this.state.title}/></Link>
                    </div>
                    <div className={"col-8 body--news"}>
                        <div className={"title-news"}><Link to={`${this.state.page}${this.state.id}`} >{this.state.title}</Link></div>
                        <label className={"story--time"}>{convertDate(this.state.date)}</label>
                        {this.state.content && <div className={"title-content"}>{this.state.content.split(".")[0]}.</div>}
                    </div>
                </div>
            </div>

        );
    }
}