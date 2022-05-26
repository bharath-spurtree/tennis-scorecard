import React from "react"
import PropTypes from "prop-types"
import './Button.css';

const SimpleButtonComponent = ({onClickHandler, styleClass, children, isDisabled}) => (
    <button onClick={onClickHandler} className={styleClass} disabled={isDisabled}>
        {children}
    </button>
)

SimpleButtonComponent.propTypes = {
    onClickHandler: PropTypes.func,
    styleClass: PropTypes.string,
    children: PropTypes.any,
    isDisabled: PropTypes.bool
}

SimpleButtonComponent.defaultProps = {
    isDisabled: false
}

export const SimpleButton = React.memo(SimpleButtonComponent)