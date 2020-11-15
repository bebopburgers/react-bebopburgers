import Backdrop from "@material-ui/core/Backdrop";
import Modal from "@material-ui/core/Modal";
import React from "react";
import './index.css';
import {NO_AVAILABLE_IMAGE} from "../../constants";

const ModalWrapper = (props) => {
    const { modalIsOpen, onClose, onSetModifier, onSetToCart, currentProduct, totalPrice } = props;

    if (!currentProduct) {
        return false
    }

    return (
        <Modal
            aria-labelledby="spring-modal-title"
            aria-describedby="spring-modal-description"
            className="custom-modal"
            disableAutoFocus={true}
            disableRestoreFocus={true}
            open={modalIsOpen}
            onClose={onClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className="modal-content">
                <div className="modal-content-image">
                    <img src={currentProduct.image ? currentProduct.image.imageUrl : NO_AVAILABLE_IMAGE} alt="img"/>
                </div>
                <div className="modal-content-description">
                    <button className="modal-content-description-close" onClick={() => onClose()}>
                        <img src="https://icons-for-free.com/iconfiles/png/512/close+cross+delete+exit+remove+icon-1320085939816384527.png" alt="cross"/>
                    </button>
                    <div className="modal-content-description-info">
                        <b>{currentProduct.name}</b>
                        <p>{currentProduct.description}</p>
                        <div className="modal-content-description-info-options">
                            {currentProduct.groupedModifiersMapped.map((it, idx) =>
                                <div key={`${it.category.id}${idx}`}>
                                    <h4>{it.category.name}</h4>
                                    <ul>
                                        {it.additionals.map(x =>
                                            <li key={`${x.id}${x.name}`}>
                                                <input type="checkbox" onClick={(e) => onSetModifier(x, e)}/>
                                                {x.name} + {x.price} ₽
                                            </li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                    <button className="modal-content-description-in-cart" onClick={() => onSetToCart()}>В КОРЗИНУ ЗА {totalPrice} ₽</button>
                </div>
            </div>
        </Modal>
    )
}

export default ModalWrapper;
