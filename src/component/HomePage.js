import React, {Component} from "react";
import result from "../data/rss";
import "./main.css"
class ListNews extends React.Component {
    constructor(props) {
        super(props);
        this.state={listNew:result}
        if(this.state.listNew==null) this.state.listNew = [];
    }

    render() {
        return (
            <div className={"container mt-3"}>

               <div>
                   {
                       this.state.listNew.slice(0,1).map((item) =>(
                       <div >
                         <New key ={item.id} id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image}></New>
                       </div>
                       ))
                   }
               </div>
                <div className={"warp"}>
                    <h2 className={"wrap-title"}>Tin khác</h2>
                </div>
                <div className={"row mb-3 mt-3"}>
                    {this.state.listNew.slice(1).map((item)=>(
                            <div className={"card-item col-3"}>
                                <NewItem key ={item.id} id={item.id} title={item.title} link={item.link} content={item.content}  image ={item.image}></NewItem>
                            </div>

                    ))}
                </div>


            </div>
        );
    }
}

class New extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            title: this.props.title,
            link:this.props.link,
            content:this.props.content,
            image:this.props.image
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
                        <img className={"image-card"} src={this.state.image}/>
                    </div>
                    <div className={"col-6 pd-l-30 text-just"} >
                        <h5 className="card-title card-main"><a href={this.state.link}>{this.state.title}</a></h5>
                        <p className="card-text">{this.state.content}</p>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}

class NewItem extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            id:this.props.id,
            title: this.props.title,
            link:this.props.link,
            content:this.props.content,
            image:this.props.image
        }
    }

    render() {
        return (
                <div className="card" >
                    <img className="card-img-top image-card_item" src={this.state.image}
                         alt="Card image cap"/>
                    <div className="card-body">
                        <h5 className={"card-title"}><a href={this.state.link}>{this.state.title}</a></h5>
                    </div>
                </div>
        );
    }
}

export default ListNews;