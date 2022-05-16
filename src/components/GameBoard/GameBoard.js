import React, { useState, useEffect } from "react";
import "./GameBoard.css"
import { useLocation } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { calcCurrentSet } from "../../utils/gameBoard"

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
        const { scoredPlayerSet, finishGame } = incrementSet && await calcIncrementSet(scoredPlayer.sets)

        let scoredPlayerElement = game[scoredPlayerIndex]
        scoredPlayerElement.currentSet = scoredPlayerCurrSet
        scoredPlayerElement.sets = incrementSet ? scoredPlayerSet : scoredPlayerElement.sets
        let otherPlayerElement = game[otherPlayerIndex]
        otherPlayerElement.currentSet = otherPlayerCurrSet

        setGame(scoredPlayerIndex === 0 ? [scoredPlayerElement, otherPlayerElement] : [otherPlayerElement, scoredPlayerElement])
        finishGame && setEndGame({ status: true, winner: scoredPlayerIndex })
    }

    const calcIncrementSet = (scoredPlayerSet) => {
        let winningScore = 6 * (data.set + 1) / 2
        let set = scoredPlayerSet[activeSet] + 1;
        let finishGame = false
        scoredPlayerSet = [...scoredPlayerSet.slice(0, activeSet), set, ...scoredPlayerSet.slice(activeSet + 1)]
        if (set > 5) {
            const currentScore = scoredPlayerSet.reduce((total, s) => total + s, 0)
            if (currentScore >= winningScore)
                finishGame = true
        }
        if (set > 5 && data.set === activeSet + 1) {
            finishGame = true
        }
        else if (set > 5) {
            setActiveSet(prevSet => prevSet + 1)
        }

        return { scoredPlayerSet, finishGame }
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
            </div>
        </div>
    )
}