import React from 'react';
import '../../pages/cart/index.css';

export const CartViewItem = (props) => {
    const {
        cart,
        decrementProductCount,
        incrementProductCount,
        removeFromCart
    } = props;

    return (
        <ul className="car-items-container-list">
            {
                cart.map(it =>
                    <li key={`${it.uuid}${it.name}`} className="car-items-container-list-item">
                        <div className="cart-item cart-item-image">
                            <img src={it.products.image.imageUrl} alt="product-image"/>
                        </div>
                        <div className="cart-item-content">
                            <span>{it.products.name}</span>
                            {it.products.modifiers.length > 0 &&
                            <ul>
                                { it.modifiers.map(m => {
                                    console.log(m)
                                    return <li key={`${m.id}${m.name}`}>{m.name}</li>
                                }) }
                            </ul>
                            }
                        </div>
                        <div className="cart-item-amount">
                            <button
                                className="cart-item-amount-decrement"
                                disabled={it.count === 1}
                                onClick={() => decrementProductCount(it)}
                            >
                                -
                            </button>
                            <span>{it.count}</span>
                            <button
                                className="cart-item-amount-increment"
                                onClick={() => incrementProductCount(it)}
                            >
                                +
                            </button>
                        </div>
                        <div className="cart-item cart-item-price">
                            <span>
                                {it.price} ₽
                            </span>
                        </div>
                        <div className="cart-item cart-item-remove">
                            <button onClick={() => removeFromCart(it)}>
                                x
                            </button>
                        </div>
                    </li>)
            }
        </ul>
    )
}

export default CartViewItem;