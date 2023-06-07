import React, {Component} from "react";
import Parser from "rss-parser";
import "./css/main.css"


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: []
        };
    }

    componentDidMount() {
        let parser = new Parser();
        parser.parseURL('https://giaoducthoidai.vn/rss/home.rss', (err, feed) => {
            this.setState({
                items: feed.items

            });
            console.log(feed.items);
        });
    }

    render() {
        return (
            <div className={""}>
                {this.state.items.map(item => (
                    <div>
                        <div className={"container"}>
                            {/*<div key={item.guid}>*/}
                            {/*    <h2><a href={item.link}>{item.title}</a></h2>*/}
                            {/*    <p>{item.content}</p>*/}
                            {/*    <img src={item.image}/>*/}
                            {/*</div>*/}
                            <div className="card-body row">
                                <div className={"col-6 image-card"}>
                                    <img alt={"Image"} src={"https://photo-cms-giaoducthoidai.epicdn.me/560x315/Uploaded/2023/uobunua/2023_05_22/tt-do-don-doan-isef-4085.jpg"}/>
                                </div>
                                <div className={"col-6 pd-l-30"} >
                                    <h5 className="card-title"><a href={item.link}>{item.title}</a></h5>
                                    <p className="card-text">{item.content}.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}
export  default  Home;