import React from "react";
import './index.css';
import {NO_AVAILABLE_IMAGE} from "../../constants";

function Card(props) {
    return (
        <div key={`${props.id}${props.name}`} className="product-card">
            <img className="product-card-img" src={props.image ? props.image.imageUrl : NO_AVAILABLE_IMAGE} alt="img"/>
            <div className="product-card-content">
                <div className="product-card-title">
                    <p className="product-card-title-name">
                        <b>{props.name}</b>
                    </p>
                    <p className="product-card-title-weight">
                        {props.weight} г
                    </p>
                </div>
                <p className="product-card-description">
                    {props.description}
                </p>
                <div className="product-card-btn">
                    <p>
                        <b>{props.price} ₽</b>
                    </p>
                    <button onClick={() => props.onSelect(props)}>
                        +
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Card;
