import './index.css';
import React, {Component} from "react";
import { Link } from "react-router-dom";
import CartItem from "../cart-item";

class Header extends Component {
    state = {
        totalPrice: 0,
        cartIsActive: false,
        totalCartAmount: 0,
    }

    activateCart = () => {
        this.setState({ cartIsActive: true })
    }

    deactivateCart = () => {
        this.setState({ cartIsActive: false })
    }

    componentDidMount() {
        const { cart } = this.props;
        this.setState({ totalPrice: this.calculateTotalCartValues(cart) })
    }

    calculateTotalCartValues = (cart) => {
        let totalPrice = 0;
        let totalAmount = 0;

        cart && cart.map(x => {
            totalPrice = totalPrice + x.price;
            totalAmount = totalAmount + x.count;
        });

        this.setState({ totalCartAmount: totalAmount })

        return totalPrice;
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ totalPrice: this.calculateTotalCartValues(nextProps.cart) })
    }

    render() {
        const { logo, tel, cart, onRemove } = this.props;
        const { totalPrice, cartIsActive, totalCartAmount } = this.state;

        return (
            <div className="header">
                <div className="container custom-container">
                    <div className="logo">
                        <Link to="/dashboard">
                            <img src={logo} alt="logo"/>
                        </Link>
                    </div>
                    <div className="info">
                        <a className="info-tel" href={`tel:${tel}`}>{tel}</a>
                        {
                            cart &&
                            <div className="info-cart-wrapper" onMouseEnter={() => this.activateCart()} onMouseLeave={() => this.deactivateCart()}>
                                <div className={`cart-indicator ${cart && cart.length > 0 ? 'cart-not-empty' : 'cart-empty'}`}>{totalCartAmount}</div>
                                <Link to="/cart" className="cart">
                                    Корзина - {totalPrice} ₽
                                </Link>
                            </div>
                        }
                        <a href="#">
                            <img
                                className="profile"
                                src="https://www.weact.org/wp-content/uploads/2016/10/Blank-profile.png"
                                alt="profile"
                            />
                        </a>
                    </div>
                    {cart &&
                        <div
                            onMouseOver={() => this.activateCart()}
                            onMouseLeave={() => this.deactivateCart()}
                            className={`cart-data ${cartIsActive ? 'cart-data-active' : ''}`}
                        >
                            <div className="card-data-wrapper">
                                {
                                    !cart.length ? <p className="empty-message">КОРЗИНА ПУСТА.</p> :
                                        <CartItem onRemove={onRemove} cart={cart}/>
                                }
                            </div>
                            {
                                cart.length > 0 &&
                                <div className="cart-base-info">
                                    <div className="cart-base-info-price">
                                        <span><b>ПОДЫТОГ:</b></span>
                                        <span className="cart-base-info-price-value"><b>{totalPrice} ₽</b></span>
                                    </div>
                                    <div className="cart-base-info-btn">
                                        <Link to="/cart">
                                            ПРОСМОТР КОРЗИНЫ
                                        </Link>
                                    </div>
                                </div>
                            }
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default Header;