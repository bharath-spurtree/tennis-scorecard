import React from "react"
import { createPortal } from 'react-dom';
import { SimpleButton } from "../Button/Button"
import "./Modal.css"

export const SimpleModal = ({ isOpen, closeModal }) => {
    const close = () => {
        closeModal()
    }

    if (!isOpen) return null;
    return createPortal(
        <div className="alert">
            Game ended. Please check results
            <SimpleButton styleClass="btn btn--small ml-sm" onClickHandler={close}>Close</SimpleButton>
        </div>, document.body)
}