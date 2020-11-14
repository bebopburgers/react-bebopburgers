import React from "react";
import './index.css'

const Promo = (props) => {
    const { onAddPromo, onSetPromo } = props;

    return (
        <div className="promo">
            <input
                onChange={(e) => onAddPromo(e.target.value)}
                placeholder="Код купона"
                className="promo-field"
                type="text"
            />
            <button onClick={() => onSetPromo()}>ПРИМЕНИТЬ</button>
        </div>
    )
}

export default Promo;