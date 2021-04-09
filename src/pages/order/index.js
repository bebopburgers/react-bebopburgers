import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../../components/header";
import OrderForm from "../../components/order-form";
import {addToCartForSnapshot, getOrganizations} from "../../actions/dashboard";
import LoaderWrapper from "../../components/spinner";
import './index.css';
import CartItem from "../../components/cart-item";
import {Footer} from "../../components/footer";
import {createOrder, resetOrder} from "../../actions/order";
import OrderSuccess from "../../components/order-success";
import {addToDeliveryForSnapshot} from "../../actions/address";

const VALIDATION_FLAG = "name";

class Order extends Component {

    state = {
        totalPrice: 0,
        paymentMethod: 'cash',
        name: {
            value: "",
            isValid: undefined,
        },
        phone: {
            value: "",
            isValid: undefined,
        },
        notes: ""
    }

    componentDidMount() {
        const { getOrganizations, cart } = this.props;
        this.setState({ totalPrice: this.calculateTotalCartValues(cart) })
        getOrganizations();

        this.setDataFromSnapshot();
    }

    componentWillUnmount() {
        window.localStorage.removeItem("cart-snapshot");
        window.localStorage.removeItem("delivery");
    }

    setDataFromSnapshot = () => {
        const { addToCartForSnapshot, addToDeliveryForSnapshot } = this.props;

        const cartSnapshot = JSON.parse(window.localStorage.getItem("cart-snapshot"));
        const deliverySnapshot = JSON.parse(window.localStorage.getItem("delivery"));

        if (deliverySnapshot == null) {
            return;
        }

        if (cartSnapshot == null) {
            return;
        }

        if (cartSnapshot.length < 1) {
            return;
        }

        for (let i = 0; i < cartSnapshot.length; i++) {
            addToCartForSnapshot(cartSnapshot[i]);
        }
        addToDeliveryForSnapshot(deliverySnapshot);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.order.isPaid) {
            this.setState({
                totalPrice: 0,
                paymentMethod: 'cash',
                name: {
                    value: "",
                    isValid: undefined,
                },
                phone: {
                    value: "",
                    isValid: undefined,
                },
                notes: ""
            })
        }

        this.setState({ totalPrice: this.calculateTotalCartValues(nextProps.cart) })

        window.localStorage.setItem("cart-snapshot", JSON.stringify(nextProps.cart));
        window.localStorage.setItem("delivery", JSON.stringify(nextProps.delivery.delivery));
    }

    validate = (name, value) => {
        if (name === VALIDATION_FLAG) {
            const regex = /[А-яЁё][-А-яЁё]+/;
            return regex.test(value);
        }

        const regex = /^(8|\+?\d{1,3})?[ -]?\(?(\d{3})\)?[ -]?(\d{3})[ -]?(\d{2})[ -]?(\d{2})$/
        return regex.test(value);
    }

    handleChangeWithValidation = (e) => {
        if (e.type === 'focus' || e.type === 'blur') {
            return;
        }
        const { name, value } = e.target;
        this.setState({ [name]: { value: value, isValid: this.validate(name, value) } })
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    calculateTotalCartValues = (cart) => {
        let totalPrice = 0;

        cart.map(x => {
            totalPrice = totalPrice + x.price;
        });

        return totalPrice;
    }

    changePaymentType = (e) => {
        const { value } = e.target;

        this.setState({ paymentMethod: value })
    }

    createOrder = () => {
        const { createOrder, delivery } = this.props;
        createOrder({
            ...this.state,
            address: {
                ...delivery.address,
                entrance: delivery.entrance,
                flat: delivery.flat
            },
            delivery: delivery.delivery && delivery.delivery.delivery_price || 0
        });
    }

    render() {
        const { logo, phone } = this.props.dashboard.organizations.length && this.props.dashboard.organizations[0];
        const { isLoading, cart, order, resetOrder, delivery } = this.props;
        const { totalPrice, name, paymentMethod } = this.state;

        if (isLoading) {
            return <LoaderWrapper/>
        }

        const isValid = this.state.phone.isValid !== undefined && this.state.phone.isValid && name.isValid !== undefined && name.isValid;

        return (
            <div className="order">
                <Header logo={logo} tel={phone} cart={undefined}/>
                <OrderSuccess isPaid={order.isPaid} onReset={resetOrder} order={order} />
                <OrderForm
                    name={name}
                    phone={this.state.phone}
                    handleChange={this.handleChange}
                    handleChangeWithValidation={this.handleChangeWithValidation}
                />
                <div className="order-products">
                    <h2>Ваш заказ</h2>
                    <CartItem cart={cart}/>
                    <div className="order-price">
                        <span className="order-price-title">
                            Сумма
                        </span>
                        <span className="order-price-value">
                            {totalPrice} ₽
                        </span>
                    </div>
                    {delivery.delivery && <div className="order-price">
                        <span className="order-price-title">
                            <p>Доставка:</p>
                        </span>
                        <span className="order-price-value">
                            {delivery.delivery && delivery.delivery.delivery_price} ₽
                        </span>
                    </div>}
                    <div className="payment-type">
                        <div className="payment-item">
                            <input
                                type="radio"
                                checked={paymentMethod === 'cash' && 'checked'}
                                id="choiceOne"
                                name="payment"
                                value="cash"
                                onChange={(e) => this.changePaymentType(e)}
                            />
                            <label htmlFor="choiceOne">Наличными</label>
                        </div>
                        <div className="payment-item">
                            <input
                                type="radio"
                                checked={paymentMethod === 'bank' && 'checked'}
                                id="choiceTwo"
                                name="payment"
                                value="bank"
                                onChange={(e) => this.changePaymentType(e)}
                            />
                            <label htmlFor="choiceTwo">Банковской картой</label>
                        </div>
                    </div>
                    <div className="confirm-order">
                        <button
                            className={isValid ? '' : 'disabled'}
                            disabled={!isValid}
                            onClick={() => this.createOrder()}
                        >
                            ПОДТВЕРДИТЬ ЗАКАЗ
                        </button>
                    </div>
                </div>
                <Footer/>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        dashboard: state.organizations,
        isLoading: state.organizations.isLoading || state.nomenclature.isLoading || state.order.isLoading,
        cart: state.cart.products,
        order: state.order,
        delivery: state.delivery
    }
}

const mapDispatchToProps = {
    getOrganizations,
    createOrder,
    resetOrder,
    addToCartForSnapshot,
    addToDeliveryForSnapshot
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
