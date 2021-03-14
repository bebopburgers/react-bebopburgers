import React, {Component} from "react";
import './index.css';
import "react-datepicker/dist/react-datepicker.css";
import InputMask from 'react-input-mask';
import {registerLocale} from "react-datepicker";
import {ru} from 'date-fns/esm/locale'
import 'react-awesome-time-picker/assets/index.css';
import 'react-dadata/dist/react-dadata.css';

registerLocale('ru', ru)

class OrderForm extends Component {
    render() {
        const {
            name,
            phone,
            handleChangeWithValidation,
            handleChange,
        } = this.props;

        return (
            <div className="order-form-wrapper">
                <form>
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
                    <div className="notes">
                        <h2>Детали</h2>
                        <br/>
                        <label>Примечание к заказу
                            <textarea
                                className="form-notes form-field"
                                placeholder="Примечания к вашему заказу, например, особые пожелания отделу доставки."
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