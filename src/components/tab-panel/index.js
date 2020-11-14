import * as PropTypes from "prop-types";
import React from "react";

export const TabPanel = function (props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            className="inner-tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};