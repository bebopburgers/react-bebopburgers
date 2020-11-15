import React, {Component} from "react";
import './index.css';
import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";

import Moment from 'react-moment';
import {Link} from "react-router-dom";


class OrderSuccess extends Component {

    componentWillUnmount() {
        const { onReset } = this.props;
        onReset();
    }

    render() {
        const { isPaid } = this.props;
        const { createdOrder } = this.props.order;

        if (!isPaid) {
            return '';
        }

        return (
            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className="custom-modal"
                open={isPaid}
                onClose={() => {}}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <div className="order-success">
                    <div className="success-container">
                        <div className="container-title">
                            <p>Спасибо. Ваш заказ был принят.</p>
                            <p>Если Вы не получили подтверждения в течении 15 минут, просим связаться по телефону +7 (863) 308 48 50</p>
                        </div>
                        <div className="order-info">
                            <div className="order-info-item">
                                <p className="order-info-item-title">
                                    Номер заказа:
                                </p>
                                <p className="order-info-item-desc">
                                    {createdOrder.number}
                                </p>
                            </div>
                            <div className="order-info-item">
                                <p className="order-info-item-title">
                                    Дата:
                                </p>
                                <p className="order-info-item-desc">
                                    <Moment format="DD.MM.YYYY" date={createdOrder.deliveryDate} />
                                </p>
                            </div>
                            <div className="order-info-item">
                                <p className="order-info-item-title">
                                    Всего:
                                </p>
                                <p className="order-info-item-desc">
                                    {createdOrder.sum} ₽
                                </p>
                            </div>
                            <div className="order-info-item">
                                <p className="order-info-item-title">
                                    Метод оплаты:
                                </p>
                                <p className="order-info-item-desc">
                                    {createdOrder && createdOrder.payments.length && createdOrder.payments[0].paymentType.name}
                                </p>
                            </div>
                        </div>
                        <div className="status-container">
                            <p>
                                Статус заказа: {createdOrder.status}
                            </p>
                            <p>
                                Номер заказа: {createdOrder.number}
                            </p>
                        </div>
                        <div className="order-products-info">
                            <p className="order-products-info-title">
                                ИНФОРМАЦИЯ О ЗАКАЗЕ
                            </p>
                            <div className="order-products-info-description">
                                <p>
                                    ТОВАР
                                </p>
                                <p>
                                    ИТОГО
                                </p>
                            </div>
                            <ul className="order-products-list">
                                {
                                    createdOrder.items.map((i, idx) =>
                                        <li key={`${i.id}${i.name}${idx}`} className="order-products-sub-item">
                                            <span className="cr-item cr-item-left">
                                                <p>{i.name} x{i.amount}</p>
                                                <ul className="cr-item-left-list">
                                                    {
                                                        i.modifiers.length > 0 && i.modifiers.map(m =>
                                                            <li key={`${m.id}${m.groupName}`}>
                                                                <span className="modifier">{m.groupName} ({m.sum} ₽):</span> {m.name}
                                                            </li>
                                                        )

                                                    }
                                                </ul>
                                            </span>
                                            <span className="cr-item cr-item-right">
                                                {i.sum} ₽
                                            </span>
                                        </li>
                                    )
                                }
                            </ul>
                            <div className="prices">
                                <div className="prices-item">
                                    <p className="prices-item-title">
                                        Подытог:
                                    </p>
                                    <p className="prices-item-description prices-item-description-sum">
                                        {createdOrder.sum} ₽
                                    </p>
                                </div>
                                <div className="prices-item">
                                    <p className="prices-item-title">
                                        Метод оплаты:
                                    </p>
                                    <p className="prices-item-description">
                                        {createdOrder && createdOrder.payments.length && createdOrder.payments[0].paymentType.name}
                                    </p>
                                </div>
                                <div className="prices-item">
                                    <p className="prices-item-title">
                                        Всего:
                                    </p>
                                    <p className="prices-item-description prices-item-description-sum">
                                        {createdOrder.sum} ₽
                                    </p>
                                </div>
                            </div>
                            <div className="notes">
                                <div className="notes-item">
                                    <p className="notes-item-title">
                                        ПРИМЕЧАНИЕ:
                                    </p>
                                    <p className="notes-item-description notes-item-description-text">
                                        {createdOrder.comment}
                                    </p>
                                </div>
                            </div>
                            <div className="return-navigation">
                                <Link to="/dashboard">
                                    ЗАКАЗАТЬ ЕЩЕ
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default OrderSuccess;