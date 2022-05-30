import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux"
import "./GameBoard.css"
import { useNavigate } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { SimpleButton } from "../Button/Button"
import { TableHeader } from "../Header/Header"
import { SimpleModal } from "../Modal/Modal"
import { calcCurrentSet, calcIncrementSet } from "../../utils/gameBoard"
import { addGame, changeActiveSet, setEndGame, setResult } from "../../actions"

export default function GameBoard() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const board = useSelector(state => state.board)
    const { game, winningScore, data, headerSet, activeSet, endGame, result } = board;
    const [open, setOpen] = useState(false)

    useEffect(() => {
        endGame.status && setOpen(true)
        const runnerIndex = endGame.winner === 0 ? 1 : 0
        const winner = game[endGame.winner]
        const runner = game[runnerIndex]
        const sets = data.set
        const score = winner && winner.sets.reduce((final, set, idx) => final = final + `${set}-${runner.sets[idx]}${idx !== sets - 1 ? ', ' : ''}`, '')
        const res = winner && winner.player + ` Wins  ( ${score} ) `
        dispatch(setResult(res))
    }, [endGame, data.set, game, dispatch])

    useEffect(() => {
        open && setTimeout(() => {
            setOpen(false)
        }, 5000)
    }, [open])

    const onClickHandler = async (scoredPlayerIndex) => {
        const otherPlayerIndex = scoredPlayerIndex === 0 ? 1 : 0
        const scoredPlayer = game[scoredPlayerIndex]
        const otherPlayer = game[otherPlayerIndex]

        const { scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet } = await calcCurrentSet(scoredPlayer.currentSet, otherPlayer.currentSet)
        const { scoredPlayerSet, finishGame, setActive } = incrementSet && await calcIncrementSet(scoredPlayer.sets, data, activeSet, winningScore)
        setActive && dispatch(changeActiveSet(activeSet+1))

        let scoredPlayerElement = game[scoredPlayerIndex]
        scoredPlayerElement.currentSet = scoredPlayerCurrSet
        scoredPlayerElement.sets = incrementSet ? scoredPlayerSet : scoredPlayerElement.sets
        let otherPlayerElement = game[otherPlayerIndex]
        otherPlayerElement.currentSet = otherPlayerCurrSet

        dispatch(addGame(scoredPlayerIndex === 0 ? [scoredPlayerElement, otherPlayerElement] : [otherPlayerElement, scoredPlayerElement]))
        finishGame && dispatch(setEndGame({ status: true, winner: scoredPlayerIndex }))
    }

    return (
        <div className="board">
            <div className="container">
                <h1 className="board__header mb-lg">{data.name}</h1>
                {result && <h2 className="mtb-md">Game Result: {result}</h2>}

                <table className="board__table">
                    <TableHeader styleClass="board__head" headerSet={headerSet} />
                    <tbody className="board__body">
                        <ScoreCard game={game} clickHandler={onClickHandler} endGame={endGame.status || false} />
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