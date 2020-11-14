import React from "react";
import './index.css';

const CartItem = (props) => {
    const { cart, onRemove } = props;
    return (
        <ul className="cart-list">
            {
                cart.map(it =>
                    <li key={it.uuid} className="cart-list-item">
                        <div className="cart-list-item-image">
                            <img src={it.products.image.imageUrl} alt=""/>
                        </div>
                        <div className="cart-list-item-text">
                            <p>{it.products.name}</p>
                            <ul className="cart-list-item-modifiers">
                                {
                                    it.modifiers.map(m => <li key={m.id}>{m.name}</li>)
                                }
                            </ul>
                            <p>{it.count}x <span className="cart-list-item-text-price">{it.price} ₽</span></p>
                        </div>
                        {
                            onRemove &&
                                <div className="cart-list-item-btn">
                                    <button onClick={() => onRemove(it)}>x</button>
                                </div>
                        }
                    </li>
                )
            }
        </ul>
    )
}

export default CartItem;