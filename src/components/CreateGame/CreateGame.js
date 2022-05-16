import React, { useState } from "react";
import './CreateGame.css';
import { useNavigate } from "react-router-dom"

export default function CreateGame(props) {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [set, setSet] = useState(3)
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        navigate('/board', { state: { name, set, players: [player1, player2] } })
    }

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <div className="form__main">
                <div>
                    <label htmlFor="name">Game Name</label>
                    <input type="text" value={name} id="name" onChange={(e) => setName(e.target.value)} />
                </div>
                <div>
                    <label>Number of Sets</label>
                    <select name="" value={set} onChange={(e) => setSet(e.target.value)}>
                        <option value="3">3</option>
                        <option value="5">5</option>
                        <option value="7">7</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="player1">Player 1</label>
                    <input type="text" id="player1" value={player1} onChange={(e) => setPlayer1(e.target.value)} />
                </div>
                <div>
                    <label>Player 2</label>
                    <input type="text" id="player2" value={player2} onChange={(e) => setPlayer2(e.target.value)} />
                </div>
                <button type="submit">Create Game</button>
            </div>
        </form>
    )
}