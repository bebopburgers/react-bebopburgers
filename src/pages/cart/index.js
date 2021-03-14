import './index.css';
import React, {Component} from "react";
import {connect} from 'react-redux';
import Header from "../../components/header";
import {
    decrementProductCount,
    getOrganizations,
    incrementProductCount,
    prepareToRemoveFromCart,
    removeFromCart,
    addPromoCode,
    addToCart,
    addToCartForSnapshot
} from "../../actions/dashboard";
import LoaderWrapper from "../../components/spinner";
import CartViewItem from "../../components/cart-view-item";
import Promo from "../../components/promo";
import {Link} from "react-router-dom";

class CartPage extends Component {
    state = {
        totalPrice: 0,
        promo: ""
    }

    componentDidMount() {
        const { getOrganizations, cart } = this.props;
        this.setState({ totalPrice: this.calculateTotalCartValues(cart) })
        getOrganizations();

        this.setDataFromSnapshot();
    }

    setDataFromSnapshot = () => {
        const { addToCartForSnapshot } = this.props;

        const cartSnapshot = JSON.parse(window.localStorage.getItem("cart-snapshot"));

        if (cartSnapshot == null) {
            return;
        }

        if (cartSnapshot.length < 1) {
            return;
        }

        for (let i = 0; i < cartSnapshot.length; i++) {
            addToCartForSnapshot(cartSnapshot[i]);
        }
    }

    calculateTotalCartValues = (cart) => {
        let totalPrice = 0;

        cart.map(x => {
            totalPrice = totalPrice + x.price;
        });

        return totalPrice;
    }

    addPromo = (value) => {
        this.setState({ promo: value });
    }

    setPromo = () => {
        const { addPromoCode } = this.props;
        addPromoCode(this.state.promo);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ totalPrice: this.calculateTotalCartValues(nextProps.cart) })
        window.localStorage.setItem("cart-snapshot", JSON.stringify(nextProps.cart))
    }

    componentWillUnmount() {
        window.localStorage.removeItem("cart-snapshot")
    }

    handleIncrementCount = (item) => {
        const { incrementProductCount } = this.props;
        incrementProductCount(item);
    }

    handleDecrementCount = (item) => {
        const { decrementProductCount } = this.props;
        decrementProductCount(item);
    }

    onRemoveFromCart = (item) => {
    }

    render() {
        const { logo, phone } = this.props.dashboard.organizations.length && this.props.dashboard.organizations[0];
        const {
            cart,
            prepareToRemoveFromCart,
            isLoading,
            removeFromCart,
            promo
        } = this.props;

        const { totalPrice } = this.state;

        if (isLoading) {
            return <LoaderWrapper/>
        }

        return (
            <div>
                <Header logo={logo} tel={phone} cart={cart} onRemove={prepareToRemoveFromCart}/>
                <div className="car-items-container">
                    { cart.length > 0 && <h1>Корзина</h1>}
                    <CartViewItem
                        cart={cart}
                        incrementProductCount={this.handleIncrementCount}
                        decrementProductCount={this.handleDecrementCount}
                        removeFromCart={removeFromCart}
                    />
                    { cart.length > 0 && [
                        <h1 key="promo-title">Промокод</h1>,
                        <div key="promo-block">
                            { !promo && <Promo onSetPromo={this.setPromo} onAddPromo={this.addPromo} key="promo"/> }
                            { promo && <p className="promo-title-message">Промокод добавлен</p> }
                            <div key="price" className="price">
                                <p>Сумма <span className="price-value">{totalPrice} ₽</span></p>
                            </div>
                        </div>,
                        <div key="navigation" className="cart-navigation">
                            <Link to="/dashboard" className="cart-navigation-back">
                                НАЗАД
                            </Link>
                            <Link to="/address" className="cart-navigation-order">
                                ОПЛАТА И ДОСТАВКА
                            </Link>
                        </div>]
                    }
                </div>
                { !cart.length && <b className="cart-title">Ваша корзина пока пуста.</b> }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dashboard: state.organizations,
        isLoading: state.organizations.isLoading || state.nomenclature.isLoading,
        cart: state.cart.products,
        promo: state.cart.promoIsAdded
    }
}

const mapDispatchToProps = {
    getOrganizations,
    prepareToRemoveFromCart,
    incrementProductCount,
    decrementProductCount,
    removeFromCart,
    addPromoCode,
    addToCart,
    addToCartForSnapshot
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);