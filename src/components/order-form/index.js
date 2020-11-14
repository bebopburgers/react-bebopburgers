import React, {Component} from "react";
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import InputMask from 'react-input-mask';
import DatePicker from "react-datepicker";
import { registerLocale } from  "react-datepicker";
import {ru} from 'date-fns/esm/locale'

registerLocale('ru', ru)

class OrderForm extends Component {

    render() {
        const {
            orderMethod,
            name,
            phone,
            orderType,
            date,
            changeOrderMethod,
            handleChangeWithValidation,
            handleChange,
            changeOrderType,
            setDate
        } = this.props;

        return (
            <div className="order-form-wrapper">
                <form>
                    <div className="single">
                        <label>Способ получения <span className="important-field">*</span>
                            <select
                                className="form-field"
                                placeholder="Доставка"
                                onChange={(e) => changeOrderMethod(e)}
                            >
                                <option value="0" title="Доставка">Доставка</option>
                                <option value="1" title="Самовывоз">Самовывоз</option>
                            </select>
                        </label>
                    </div>
                    <div className="combiner">
                        <label className="name">Имя <span className="important-field">*</span>
                            <input
                                className={`form-field ${name.isValid === false ? 'field-error' : '' }`}
                                placeholder="Имя"
                                type="text"
                                name="name"
                                onChange={(e) => handleChangeWithValidation(e)}
                            />
                        </label>
                        <label className="phone">Номер телефона <span className="important-field">*</span>
                            <InputMask
                                className={`form-field ${phone.isValid === false ? 'field-error' : ''}`}
                                placeholder="Номер"
                                mask="+7 (999) 999-99-99"
                                name="phone"
                                onChange={(e) => handleChangeWithValidation(e)}
                            />
                        </label>
                    </div>
                    {
                        orderMethod.key === 0 &&
                        [<div key="street-ord" className="single">
                            <label className="street">Улица
                                <input
                                    className="form-field"
                                    placeholder="Введите улицу, следуя подсказкам"
                                    type="text"
                                    name="street"
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                        </div>,
                        <div key="house-ord" className="combiner">
                            <label className="house">Дом
                                <input
                                    className="form-field"
                                    placeholder="Дом"
                                    type="text"
                                    name="house"
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label className="block">Корпус
                                <input
                                    className="form-field"
                                    placeholder="Корпус"
                                    type="text"
                                    name="block"
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                        </div>,
                        <div key="flat-ord" className="combiner">
                            <label className="flat">Квартира
                                <input
                                    className="form-field"
                                    placeholder="Квартира"
                                    type="text"
                                    name="flat"
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                            <label className="entrance">Подьезд
                                <input
                                    className="form-field"
                                    placeholder="Подьезд"
                                    type="text"
                                    name="entrance"
                                    onChange={(e) => handleChange(e)}
                                />
                            </label>
                        </div>,
                        <div key="delivery-ord" className="single">
                            <label className="delivery-time">Время доставки <span className="important-field">*</span>
                                <select
                                    className="form-field"
                                    placeholder={orderMethod.value}
                                    onChange={(e) => changeOrderType(e)}
                                >
                                    <option value="0">Как можно быстрее</option>
                                    <option value="1">Выбрать время доставки</option>
                                </select>
                            </label>
                        </div>]
                    }
                    {
                        orderType.key === 1 &&
                            <div className="single">
                                <label className="date">Выберите дату и время доставки
                                    <DatePicker
                                        locale="ru"
                                        className="form-field date-pick"
                                        selected={date}
                                        showTimeSelect
                                        onChange={date => setDate(date)}
                                    />
                                </label>
                            </div>
                    }
                    <div className="single notes">
                        <h2>Детали</h2>
                        <label>Примечание к заказу
                            <textarea
                                className="form-notes form-field"
                                placeholder="Примечания к вашему заказу, например, особые пожелания отделу доставки."
                                type="text"
                                name="notes"
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    </div>
                </form>
            </div>
        )
    }
}

export default OrderForm;