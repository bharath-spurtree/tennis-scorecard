import React, { useState } from "react";
import './CreateGame.css';
import { useNavigate } from "react-router-dom"

export default function CreateGame() {
    const navigate = useNavigate()
    const [name, setName] = useState('')
    const [set, setSet] = useState(3)
    const [player1, setPlayer1] = useState('')
    const [player2, setPlayer2] = useState('')
    const [valName, setValName] = useState('')
    const [valPlayer1, setValPlayer1] = useState('')
    const [valPlayer2, setValPlayer2] = useState('')

    const onFormSubmit = (e) => {
        e.preventDefault()
        if(name === '') {
            setValName('Please enter Game name')
        }
        else if(player1 === '') {
            setValPlayer1('Please enter Player 1 name')
        }
        else if(player2 === '') {
            setValPlayer2('Please enter Player 2 name')
        }
        else
            navigate('/board', { state: { name, set, players: [player1, player2] } })
    }

    return (
        <form className="form" onSubmit={onFormSubmit}>
            <div className="container form__main">
                <h1>CREATE TENNIS GAME</h1>
                <div className="form__inner">
                    <div className="form__group">
                        <label htmlFor="name">Game Name:</label>
                        <input type="text" value={name} id="name" onChange={(e) => { setValName(''); setName(e.target.value)}} />
                        {valName !== '' && <div className="form__message">{valName}</div>}
                    </div>
                    <div className="form__group">
                        <label>Number of Sets:</label>
                        <select name="" value={set} onChange={(e) => setSet(e.target.value)}>
                            <option value="3">3</option>
                            <option value="5">5</option>
                            <option value="7">7</option>
                        </select>
                    </div>
                    <div className="form__group">
                        <label htmlFor="player1">Player 1:</label>
                        <input type="text" id="player1" value={player1} onChange={(e) => { setValPlayer1(''); setPlayer1(e.target.value)}} />
                        {valPlayer1 !== '' && <div className="form__message">{valPlayer1}</div>}
                    </div>
                    <div className="form__group">
                        <label>Player 2:</label>
                        <input type="text" id="player2" value={player2} onChange={(e) => { setValPlayer2(''); setPlayer2(e.target.value)}} />
                        {valPlayer2 !== '' && <div className="form__message">{valPlayer2}</div>}
                    </div>
                    <button type="submit" className="btn btn--primary">Create Game</button>
                </div>
            </div>
        </form>
    )
}