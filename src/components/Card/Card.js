import React from "react";
import "./Card.css"
const Card = ({id,title,tag,userId,status,priority})=>{
    return(
        <div className="cardDiv">
            <div className="topDiv">
                <span className="cardId">{id}</span>
                <div className="cardImageDiv"></div>
            </div>
            <div className="midDiv">
                <span className="cardTitle">{title}</span>
            </div>
            <div className="bottomDiv">
                <div></div>
                <div className="tagDiv">
                    <div></div>
                    <span className="tag">{tag}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;