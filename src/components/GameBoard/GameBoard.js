import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"
import ScoreCard from "../ScoreCard/ScoreCard";
import { calcCurrentSet } from "../../utils/gameBoard"

export default function GameBoard() {
    const location = useLocation()
    const [data, setData] = useState({})
    const [game, setGame] = useState([])
    const [headerSet, setHeaderSet] = useState([])
    const [activeSet, setActiveSet] = useState(0)
    const [endGame, setEndGame] = useState({ status: false })

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
        const runnerIndex = endGame.winnerIndex === 0 ? 1 : 0
        const winner = game[endGame.winnerIndex]
        const runnner = game[runnerIndex]

        const sets = data.set
    }, [endGame])

    const onClickHandler = async (scoredPlayerIndex) => {
        const otherPlayerIndex = scoredPlayerIndex === 0 ? 1 : 0
        const scoredPlayer = game[scoredPlayerIndex]
        const otherPlayer = game[otherPlayerIndex]

        const {scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet} = await calcCurrentSet(scoredPlayer.currentSet, otherPlayer.currentSet)
        const scoredPlayerSet = incrementSet && await calcIncrementSet(scoredPlayer.sets, scoredPlayerIndex)

        let scoredPlayerElement = game[scoredPlayerIndex]
        scoredPlayerElement.currentSet = scoredPlayerCurrSet
        scoredPlayerElement.sets = incrementSet ? scoredPlayerSet : scoredPlayerElement.sets
        let otherPlayerElement = game[otherPlayerIndex]
        otherPlayerElement.currentSet = otherPlayerCurrSet

        setGame(scoredPlayerIndex === 0 ? [scoredPlayerElement, otherPlayerElement] : [otherPlayerElement, scoredPlayerElement])
    }

    const calcIncrementSet = (scoredPlayerSet, winnerIndex) => {
        let winningScore = 6 * (data.set + 1) / 2 
        let set = scoredPlayerSet[activeSet] + 1;
        scoredPlayerSet = [...scoredPlayerSet.slice(0, activeSet), set, ...scoredPlayerSet.slice(activeSet + 1)] 
        if(set > 5) {
            console.log(winningScore)
            const currentScore = scoredPlayerSet.reduce((total, s) => total + s, 0)
            console.log(currentScore)
            if(currentScore >= winningScore) 
                setEndGame({status: true, winner: winnerIndex})
        }
        if(set > 5 && data.set === activeSet + 1) {
            setEndGame({ status: true, winner: winnerIndex })
        } 
        else if(set > 5) {
            setActiveSet(prevSet => prevSet + 1)
        }

        return scoredPlayerSet
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    {headerSet.map((set) => {
                        return (
                            <th>{set}</th>
                        )
                    })}
                    <th>Current Set</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <ScoreCard game={game} clickHandler={onClickHandler} endGame={endGame.status} />
            </tbody>
        </table>
    )
}