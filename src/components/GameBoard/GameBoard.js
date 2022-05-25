import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux"
import "./GameBoard.css"
import { useNavigate, useLocation } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { SimpleButton } from "../Button/Button"
import { TableHeader } from "../Header/Header"
import { calcCurrentSet, calcIncrementSet } from "../../utils/gameBoard"
import { addGame, changeWinnigScore, changeData, changeHeader, changeActiveSet, setEndGame, setResult } from "../../actions"

export default function GameBoard() {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const board = useSelector(state => state.board)
    const { game, winningScore, data, headerSet, activeSet, endGame, result } = board;

    useEffect(() => {
        let setArray = []
        let set = []
        for (let i = 0; i < location.state.set; i++) {
            setArray.push(0)
            set.push(i + 1)
        }
        let gameSet = location.state.players.map((player) => {
            return { player, sets: setArray, currentSet: 0 }
        })
        let score = ((parseInt(location.state.set) + 1) / 2) * 6
        dispatch(addGame(gameSet))
        dispatch(changeData(location.state))
        dispatch(changeHeader(set))
        dispatch(changeWinnigScore(score))
    }, [location.state, dispatch])

    useEffect(() => {
        const runnerIndex = endGame.winner === 0 ? 1 : 0
        const winner = game[endGame.winner]
        const runner = game[runnerIndex]
        const sets = data.set
        const score = winner && winner.sets.reduce((final, set, idx) => final = final + `${set}-${runner.sets[idx]}${idx !== sets - 1 ? ', ' : ''}`, '')
        const res = winner && winner.player + ` Wins  ( ${score} ) `
        dispatch(setResult(res))
    }, [endGame, data.set, game, dispatch])

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
                <h1 className="board__header">{data.name}</h1>
                {result && <h2>Game Result: {result}</h2>}

                <table className="board__table">
                    <TableHeader styleClass="board__head" headerSet={headerSet} />
                    <tbody className="board__body">
                        <ScoreCard game={game} clickHandler={onClickHandler} endGame={endGame.status || false} />
                    </tbody>
                </table>

                <SimpleButton onClickHandler={() => navigate("/")} styleClass="btn btn--primary btn--right">
                    Create Game
                </SimpleButton>
            </div>
        </div>
    )
}