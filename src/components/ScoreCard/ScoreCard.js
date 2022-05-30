import React from "react";
import "./ScoreCard.css";
import Icon from "../../assets/icons.svg"
import { SimpleButton } from "../Button/Button"
import { useDispatch ,useSelector } from "react-redux"
import { addPointAction } from "../../actions/index"

const ScoreCard = () => {
    const dispatch = useDispatch()
    const {game, endGame} = useSelector(state => state.board)

    const clickHandler = (index) => {
        dispatch(addPointAction(index))
    }

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
                            <SimpleButton styleClass={`btn btn--secondary btn--right ${endGame.status === true && 'btn--disabled'}`} onClickHandler={() => clickHandler(index)} isDisabled={endGame.status}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink" className="icon">
                                    <use xlinkHref={`${Icon}#icon-plus`} />
                                </svg>
                            </SimpleButton>
                        </td>
                    </tr>
                )
            })}
        </>
    )
}

export default ScoreCard