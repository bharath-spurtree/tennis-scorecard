import React from "react";

export default function ScoreCard({ game, clickHandler, endGame }) {
    return (
        <>
            {game.map((row, index) => {
                return (
                    <tr key={index}>
                        <td>{row.player}</td>
                        {row.sets.map((set, idx) => {
                            return (
                                <td key={idx}>{set}</td>
                            )
                        })}
                        <td>{row.currentSet}</td>
                        <td>
                            <button onClick={() => clickHandler(index)} disabled={endGame}>+</button>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}