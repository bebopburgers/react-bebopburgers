import React, {Component} from 'react';
import {connect} from "react-redux";
import Header from "../../components/header";
import OrderForm from "../../components/order-form";
import { getOrganizations } from "../../actions/dashboard";
import LoaderWrapper from "../../components/spinner";
import './index.css';
import CartItem from "../../components/cart-item";
import {Footer} from "../../components/footer";
import {createOrder, resetOrder} from "../../actions/order";
import OrderSuccess from "../../components/order-success";

const orderMethods = [
    "Доставка",
    "Самовывоз"
]

const orderTypes = [
    "Как можно быстрее",
    "Выбрать время доставки"
]

const VALIDATION_FLAG = "name";

class Order extends Component {

    componentDidMount() {
        const { getOrganizations, cart } = this.props;
        this.setState({ totalPrice: this.calculateTotalCartValues(cart) })
        getOrganizations();
    }

    state = {
        totalPrice: 0,
        paymentMethod: 'cash',
        orderMethod: { key: 0, value: "Доставка" },
        orderType: { key: 0, value: "Как можно быстрее" },
        isSelfService: false,
        date: new Date(),
        name: {
            value: "",
            isValid: undefined,
        },
        phone: {
            value: "",
            isValid: undefined,
        },
        street: "",
        house: "",
        block: "",
        flat: "",
        entrance: "",
        notes: ""
    }

    changeOrderMethod = (e) => {
        const { value } = e.target;
        const { isSelfService } = this.state;

        if (+value === 1) {
            this.setState({
                orderType: { key: 0, value: "Как можно быстрее" },
                isSelfService: true,
                street: "",
                house: "",
                block: "",
                flat: "",
                entrance: "",
                date: new Date(),
            });
        }

        this.setState({ orderMethod: { key: +value, value: orderMethods[value] }, isSelfService: !isSelfService});
    }

    changeOrderType = (e) => {
        const { value } = e.target;
        this.setState({ orderType: { key: +value, value: orderTypes[value] }});
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.order.isPaid) {
            this.setState({
                totalPrice: 0,
                paymentMethod: 'cash',
                orderMethod: { key: 0, value: "Доставка" },
                orderType: { key: 0, value: "Как можно быстрее" },
                isSelfService: false,
                date: new Date(),
                name: {
                    value: "",
                    isValid: undefined,
                },
                phone: {
                    value: "",
                    isValid: undefined,
                },
                street: "",
                house: "",
                block: "",
                flat: "",
                entrance: "",
                notes: ""
            })
        }
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

    setDate = (date) => {
        this.setState({ date: date })
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
        const { createOrder } = this.props;
        createOrder(this.state);
    }

    render() {
        const { logo, phone } = this.props.dashboard.organizations.length && this.props.dashboard.organizations[0];
        const { isLoading, cart, order, resetOrder } = this.props;
        const { totalPrice, orderMethod, name, orderType, date, paymentMethod } = this.state;

        if (isLoading) {
            return <LoaderWrapper/>
        }

        const isValid = this.state.phone.isValid !== undefined && this.state.phone.isValid && name.isValid !== undefined && name.isValid;

        return (
            <div className="order">
                <Header logo={logo} tel={phone} cart={undefined}/>
                <OrderSuccess isPaid={order.isPaid} onReset={resetOrder} order={order} />
                <OrderForm
                    orderMethod={orderMethod}
                    name={name}
                    phone={this.state.phone}
                    orderType={orderType}
                    date={date}
                    setDate={this.setDate}
                    handleChange={this.handleChange}
                    changeOrderType={this.changeOrderType}
                    changeOrderMethod={this.changeOrderMethod}
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
        order: state.order
    }
}

const mapDispatchToProps = {
    getOrganizations,
    createOrder,
    resetOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Order);
