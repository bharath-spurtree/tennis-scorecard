import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import "./GameBoard.css"
import { useNavigate } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { SimpleButton } from "../Button/Button"
import { TableHeader } from "../Header/Header"
import { SimpleModal } from "../Modal/Modal"
import { setResult } from "../../actions"

export default function GameBoard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const board = useSelector(state => state.board)
    const { data, headerSet, endGame, result } = board;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        endGame.status && setOpen(true)
        dispatch(setResult())
    }, [endGame])

    useEffect(() => {
        open && setTimeout(() => {
            setOpen(false)
        }, 4000)
    }, [open])

    return (
        <div className="board">
            <div className="container">
                <h1 className="board__header mb-lg">{data.name}</h1>
                {result && <h2 className="mtb-md">Game Result: {result}</h2>}

                <table className="board__table">
                    <TableHeader styleClass="board__head" headerSet={headerSet} />
                    <tbody className="board__body">
                        <ScoreCard />
                    </tbody>
                </table>

                <SimpleButton onClickHandler={() => navigate("/")} styleClass="btn btn--primary btn--right mt-md">
                    Create Game
                </SimpleButton>

                <SimpleModal isOpen={open} closeModal={() => setOpen(false)} />
            </div>
        </div>
    )
}