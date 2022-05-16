import React, { useState, useEffect } from "react";
import "./GameBoard.css"
import { useLocation } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { calcCurrentSet, calcIncrementSet } from "../../utils/gameBoard"

export default function GameBoard() {
    const location = useLocation()
    const [data, setData] = useState({})
    const [game, setGame] = useState([])
    const [headerSet, setHeaderSet] = useState([])
    const [activeSet, setActiveSet] = useState(0)
    const [endGame, setEndGame] = useState({ })
    const [result, setResult] = useState('')

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
        setGame(gameSet)
        setData(location.state)
        setHeaderSet(set)
    }, [])

    useEffect(() => {
        const runnerIndex = endGame.winner === 0 ? 1 : 0
        const winner = game[endGame.winner]
        const runner = game[runnerIndex]
        const sets = data.set
        const score = winner && winner.sets.reduce((final, set, idx) => final = final + `${set}-${runner.sets[idx]}${idx !== sets-1 ? ', ' : ''}`, '')
        const res = winner && winner.player + " Wins "+ ` ( ${score} ) `
        setResult(res)
    }, [endGame])

    const onClickHandler = async (scoredPlayerIndex) => {
        const otherPlayerIndex = scoredPlayerIndex === 0 ? 1 : 0
        const scoredPlayer = game[scoredPlayerIndex]
        const otherPlayer = game[otherPlayerIndex]

        const { scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet } = await calcCurrentSet(scoredPlayer.currentSet, otherPlayer.currentSet)
        const { scoredPlayerSet, finishGame, setActive } = incrementSet && await calcIncrementSet(scoredPlayer.sets, data, activeSet)
        setActive && setActiveSet(prevSet => prevSet + 1)

        let scoredPlayerElement = game[scoredPlayerIndex]
        scoredPlayerElement.currentSet = scoredPlayerCurrSet
        scoredPlayerElement.sets = incrementSet ? scoredPlayerSet : scoredPlayerElement.sets
        let otherPlayerElement = game[otherPlayerIndex]
        otherPlayerElement.currentSet = otherPlayerCurrSet

        setGame(scoredPlayerIndex === 0 ? [scoredPlayerElement, otherPlayerElement] : [otherPlayerElement, scoredPlayerElement])
        finishGame && setEndGame({ status: true, winner: scoredPlayerIndex })
    }

    return (
        <div className="board">
            <div className="container">

                <h1 className="board__header">{data.name}</h1>

                <h2>Game Result: {result}</h2>

                <table className="board__table">
                    <thead className="board__head">
                        <tr>
                            <th>Player Name</th>
                            {headerSet.map((set, idx) => {
                                return (
                                    <th key={idx}>{set}</th>
                                )
                            })}
                            <th>Current Set</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody className="board__body">
                        <ScoreCard game={game} clickHandler={onClickHandler} endGame={endGame.status || false} />
                    </tbody>
                </table>

                <button className="btn btn--primary btn--right">Create Game</button>
            </div>
        </div>
    )
}