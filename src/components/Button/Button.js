import React from "react"
import './Button.css';

export const SimpleButton = ({onClickHandler, classNames, children, isDisabled=false}) => (
    <button onClick={onClickHandler} className={classNames} disabled={isDisabled}>
        {children}
    </button>
)