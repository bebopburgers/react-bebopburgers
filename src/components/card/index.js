import React from "react";
import './index.css';
import {LOADING_IMAGE, NO_AVAILABLE_IMAGE} from "../../constants";
import LazyImage from "../lazy-image";

function Card({
  product,
  currentProductHoveredId,
  currentProductCount,
  onOpenModal,
  onSelect,
  onLeave,
  onHover
}) {
    return (
        <div key={`${product.id}${product.name}`} onClick={(e) => onOpenModal(e, product)} className="product-card">
            <LazyImage className="product-card-img" unloadedSrc={LOADING_IMAGE} src={product.image ? product.image.imageUrl : NO_AVAILABLE_IMAGE}/>
            <div className="product-card-content">
                <div className="product-card-title">
                    <p className="product-card-title-name">
                        <b>{product.name}</b>
                    </p>
                    <p className="product-card-title-weight">
                        {product.weight} г
                    </p>
                </div>
                <p className="product-card-description">
                    {product.description}
                </p>
                <div className="product-card-btn">
                    <p>
                        <b>{product.price} ₽</b>
                    </p>
                    <button onClick={() => onSelect(product)} onMouseLeave={() => onLeave()} onMouseEnter={() => onHover(product)}>
                        +
                    </button>
                    {
                        currentProductHoveredId === product.id &&
                            <div className="hover-info">
                                <p>в корзине {currentProductCount} шт.</p>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Card;
