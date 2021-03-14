import React, {Component} from "react";
import './index.css';
import './../../components/order-form/index.css';
import Header from "../../components/header";
import {addToCartForSnapshot, getOrganizations} from "../../actions/dashboard";
import {createOrder, resetOrder} from "../../actions/order";
import {connect} from "react-redux";
import {Footer} from "../../components/footer";
import {AddressSuggestions} from "react-dadata";
import {Link} from "react-router-dom";
import moment from "moment";
import {
    addToDeliveryForSnapshot,
    getDeliveryPrice,
    resetDelivery,
    resetDeliveryForSnapshot
} from "../../actions/address";
import {DADATA_LOCATIONS} from "../../constants";

const orderMethods = [
    "Доставка",
    "Самовывоз"
]

const orderTypes = [
    "Как можно быстрее",
    "Выбрать время доставки"
]

class Address extends Component {

    state = {
        value:'',
        valid: false,
        dadata: { value: '', valid: false },
        orderMethod: { key: 1, value: "Самовывоз" },
        orderType: { key: 0, value: "Как можно быстрее" },
        time: undefined,
        isSelfService: true,
        day: undefined
    };

    setValue = (value) => {
        this.calculateDeliveryPrice(value)
    }

    componentDidMount() {
        const { getOrganizations, cart, resetDeliveryForSnapshot } = this.props;
        this.setState({ totalPrice: this.calculateTotalCartValues(cart) })
        getOrganizations();
        resetDeliveryForSnapshot();

        this.setDataFromSnapshot();
    }

    componentWillReceiveProps(nextProps, nextContext) {
        this.setState({ totalPrice: this.calculateTotalCartValues(nextProps.cart) })
        window.localStorage.setItem("cart-snapshot", JSON.stringify(nextProps.cart))
    }

    componentWillUnmount() {
        window.localStorage.removeItem("cart-snapshot");
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

    changeOrderType = (e) => {
        const { value } = e.target;
        this.setState({ orderType: { key: +value, value: orderTypes[value] }});
    }

    setTime = (time) => {
        this.setState({ time: time.format("HH:mm") })
    }

    setDay = (day) => {
        const { value } = day.target;

        if (value === "2") {
            this.setState({ day: moment().add(1, "d").format("YYYY-MM-DD") })
        } else {
            this.setState({ day: moment().format("YYYY-MM-DD") })
        }
    }

    changeOrderMethod = (e) => {
        const { value } = e.target;
        const { isSelfService } = this.state;

        this.setState({ ...this.state, orderMethod: { key: +value, value: orderMethods[+value] }, isSelfService: !isSelfService })
    }

    handleInputChange = (e) => {
        // this.setState(() => ({ valid: e.target.value.length > 3 } ))
        if (e.keyCode === 8) {
            this.props.resetDelivery();
            // console.log(e.keyCode, 'enter press here! ')
        }
    }

    calculateDeliveryPrice = (dadata) => {
        const { cart } = this.props;

        let totalPrice = 0;

        cart.map((item) => {
            totalPrice += item.price;
        });

        this.setState(state => ({ ...state, valid: dadata.value.length > 3, dadata: {...dadata } }))

        this.props.getDeliveryPrice(dadata, totalPrice);
    }

    render() {
        const { logo, phone } = this.props.dashboard.organizations.length && this.props.dashboard.organizations[0];
        const { dadata, orderMethod, day, time, orderType } = this.state;
        const { delivery, cart } = this.props;

        return (
            <div className="address">
                <Header logo={logo} tel={phone} cart={undefined}/>
                <div className="container">
                    <div className="wrapper-dadata">
                        <div className="address-container">
                            <div className="single">
                                <label>Способ получения <span className="important-field">*</span>
                                    <select
                                        className="form-field"
                                        placeholder="Доставка"
                                        value={orderMethod.key}
                                        onChange={(e) => this.changeOrderMethod(e)}
                                    >
                                        <option value="0" title="Доставка">Доставка</option>
                                        <option value="1" title="Самовывоз">Самовывоз</option>
                                    </select>
                                </label>
                            </div>
                            {orderMethod.key === 0 &&
                            <div className="dadata-container">
                                <label className="street">Адрес
                                    <span className="important-field"> *</span>
                                    <AddressSuggestions
                                        hintClassName="form-field"
                                        token="ead77968219865b5e1b964f6d396fe56ea614896"
                                        value={dadata}
                                        filterLocations={DADATA_LOCATIONS}
                                        onChange={(sug) => this.calculateDeliveryPrice(sug)}
                                        inputProps={{
                                            onKeyUp: (e) => this.handleInputChange(e),
                                        }}
                                    />
                                </label>
                                <div className="single">
                                    <label className="delivery-time">Время доставки
                                        <input type="text" value="Сегодня, как можно быстрее"/>
                                    </label>
                                </div>
                                {/*<div key="delivery-ord" className="single">*/}
                                {/*    <label className="delivery-time">Время доставки <span className="important-field">*</span>*/}
                                {/*        <select*/}
                                {/*            className="form-field"*/}
                                {/*            placeholder={orderMethod.value}*/}
                                {/*            value={orderType.key}*/}
                                {/*            onChange={(e) => this.changeOrderType(e)}*/}
                                {/*        >*/}
                                {/*            <option value="0">Как можно быстрее</option>*/}
                                {/*            <option value="1">Выбрать время доставки</option>*/}
                                {/*        </select>*/}
                                {/*    </label>*/}
                                {/*</div>*/}
                                {/*{orderType.key === 1 &&*/}
                                {/*<div className="combiner date-combiner">*/}
                                {/*    <label className="date date-left">День*/}
                                {/*        <select className="form-field date-pick" onChange={(day) => this.setDay(day)}>*/}
                                {/*            <option value="1">Сегодня</option>*/}
                                {/*            <option value="2">Завтра</option>*/}
                                {/*        </select>*/}
                                {/*    </label>*/}
                                {/*    <label className="date date-right">Время*/}
                                {/*        <TimePicker*/}
                                {/*            placeholder="Время:"*/}
                                {/*            className="time-p"*/}
                                {/*            showSecond={false}*/}
                                {/*            onChange={time => this.setTime(time)}*/}
                                {/*            minuteStep={30}/>*/}
                                {/*    </label>*/}
                                {/*</div>*/}
                                {/*}*/}
                            </div>}
                            {orderMethod.key === 1 ?
                            <div>
                                <Link
                                    to="/order"
                                    className="calculate-delivery">
                                    Далее
                                </Link>
                            </div> :
                            <div>
                                <div>
                                    {delivery.delivery && <p className="delivery-price">Доставка: {delivery.delivery.delivery_price} P</p>}
                                    { delivery.delivery ? <Link to="/order" className="calculate-delivery">Далее</Link> :
                                    <button disabled={true} className="calculate-delivery disabled">Далее</button>}
                                </div>
                            </div>}

                            {/*// !dadata ?*/}
                            {/*// <span className="calculate-delivery disabled">Рассчитать доставку</span> :*/}
                            {/*// !delivery.delivery ?*/}
                            {/*//     <button*/}
                            {/*//         onClick={() => this.calculateDeliveryPrice()}*/}
                            {/*//         className="calculate-delivery">*/}
                            {/*//         Рассчитать доставку*/}
                            {/*//     </button> :*/}
                            {/*//     <div>*/}
                            {/*//         {delivery.delivery && <p className="delivery-price">Доставка: {delivery.delivery.delivery_price} P</p>}*/}
                            {/*//         <Link to="/order" className="calculate-delivery">Далее</Link>*/}
                            {/*//     </div>*/}
                            {/*// }*/}
                        </div>
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
        isLoading: state.organizations.isLoading || state.nomenclature.isLoading || state.order.isLoading || state.delivery.isLoading,
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
    getDeliveryPrice,
    addToDeliveryForSnapshot,
    resetDeliveryForSnapshot,
    resetDelivery,
}

export default connect(mapStateToProps, mapDispatchToProps)(Address);
