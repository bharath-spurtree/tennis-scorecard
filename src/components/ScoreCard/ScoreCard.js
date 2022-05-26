import React from "react";
import "./ScoreCard.css";
import PropTypes from "prop-types"
import Icon from "../../assets/icons.svg"
import { SimpleButton } from "../Button/Button"

const ScoreCard = ({ game, clickHandler, endGame }) => (
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
                        <SimpleButton styleClass={`btn btn--secondary btn--right ${endGame === true && 'btn--disabled'}`} onClickHandler={() => clickHandler(index)} isDisabled={endGame}>
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

ScoreCard.propTypes = {
    game: PropTypes.array,
    clickHandler: PropTypes.func,
    endGame: PropTypes.object
}

ScoreCard.defaultProps = {
    game: [],
    endGame: {}
}

export default ScoreCard