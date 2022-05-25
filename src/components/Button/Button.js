import React from "react"
import './Button.css';

const SimpleButtonComponent = ({onClickHandler, styleClass, children, isDisabled=false}) => (
    <button onClick={onClickHandler} className={styleClass} disabled={isDisabled}>
        {children}
    </button>
)

export const SimpleButton = React.memo(SimpleButtonComponent)

