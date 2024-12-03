import React from "react";
import "../components/Travel.css";
const Travel=(props)=>{
    return(
        <>
        <div className={props.cName}>
            <img alt="resort" src={props.imgSrc}/>
        </div>
        <div className="img-text">
            <h1>{props.title}</h1>
            <p>{props.desc}</p>
            <a href={props.url} className={props.btnClass}>{props.buttonText}</a>    
        </div>
        </>
    )
}
export default Travel;