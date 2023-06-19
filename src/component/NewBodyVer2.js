import {Link, useNavigate} from 'react-router-dom';
import {convertDate} from "./api/dateTime";
import React from "react";

export function New(props) {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate(`${props.page}${props.id}`);
    };

    return (
        <div>
            <div className={"container"}>

                <div className="card-body row">
                    <div className={"col-6"}>
                        {/*<Link to={`${props.page}${props.id}`} ><img className={"image-card"} src={props.image} alt={props.title}/></Link>*/}
                        <img onClick={handleRedirect} className={"image-card"} src={props.image} alt={props.title}/>
                    </div>
                    <div className={"col-6 pd-l-30 text-just"} >
                       {/* <h5 className="card-title card-main"><Link to={`${props.page}${props.id}`} >{props.title}</Link></h5>*/}
                        <h5 onClick={handleRedirect} className="card-title card-main">{props.title}</h5>
                        <label className={"story--time"}>{convertDate(props.date)}</label>
                        <p className="card-text">{props.content}</p>
                    </div>
                </div>
            </div>
        </div>

    );
}

export function NewItem(props) {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`${props.page}${props.id}`);
    };

    return (
        <div className="card" >
            {/*<Link to={`${props.page}${props.id}`} ><img className={"card-img-top image-card_item"} src={props.image} alt={props.title}/></Link>*/}
            <img onClick={handleRedirect} className={"card-img-top image-card_item"} src={props.image} alt={props.title}/>
            <div className="card-body">
                {/*<h5 className={"card-title"}><Link to={`${props.page}${props.id}`} >{props.title}</Link></h5>*/}
                <h5 onClick={handleRedirect} className={"card-title"}>{props.title}</h5>
                <label className={"story--time"}>{convertDate(props.date)}</label>
            </div>
        </div>

    );
}
export function FooterNewItem(props) {
    const navigate = useNavigate();
    const handleRedirect = () => {
        navigate(`${props.page}${props.id}`);
    };

    return (
        <div className={"mb-3 mt-3"}>
            <div  className={"row item-news home"}>
                <div className={"col-4"}>
                    {/* <Link to={`${props.page}${props.id}`} ><img onClick={handleRedirect} className={"image-item"} src={props.image} alt={props.title}/></Link>*/}
                    <img onClick={handleRedirect} className={"image-item"} src={props.image} alt={props.title}/>
                </div>
                <div className={"col-8 body--news"}>
                    {/* <div className={"title-news"}><Link to={`${props.page}${props.id}`} >{props.title}</Link></div>*/}
                    <div onClick={handleRedirect} className={"title-news"}>{props.title}</div>
                    <label className={"story--time"}>{convertDate(props.date)}</label>
                    {props.content && <div className={"title-content"}>{props.content.split(".")[0]}.</div>}
                </div>
            </div>
        </div>

    );
}
