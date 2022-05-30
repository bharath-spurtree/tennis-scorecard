export const calcCurrentSet = async (scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet = false) => {
    switch (scoredPlayerCurrSet) {
        case 0:
        case 15: scoredPlayerCurrSet = scoredPlayerCurrSet + 15; break;
        case 30: scoredPlayerCurrSet = scoredPlayerCurrSet + 10; break;
        case 40:
            if (scoredPlayerCurrSet === otherPlayerCurrSet) {
                scoredPlayerCurrSet = 'D';
                otherPlayerCurrSet = 'D';
            }
            else if (scoredPlayerCurrSet > otherPlayerCurrSet) {
                scoredPlayerCurrSet = 0;
                otherPlayerCurrSet = 0;
                incrementSet = true
            }
            break;
        case 'A': scoredPlayerCurrSet = 0; otherPlayerCurrSet = 0; incrementSet = true; break;
        case 'D': if (otherPlayerCurrSet !== 'A')
            scoredPlayerCurrSet = 'A';
        else {
            scoredPlayerCurrSet = 'D'
            otherPlayerCurrSet = 'D'
        }
            break;
        default: break;
    }
    return { scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet }
}

export const calcIncrementSet = async (scoredPlayerSet, data, activeSet, winningScore) => {
    let set = scoredPlayerSet[activeSet] + 1;
    let finishGame = false, setActive = false
    scoredPlayerSet = [...scoredPlayerSet.slice(0, activeSet), set, ...scoredPlayerSet.slice(activeSet + 1)]
    if (set > 5) {
        const currentScore = scoredPlayerSet.reduce((total, s) => total + s, 0)
        if (currentScore >= winningScore)
            finishGame = true
    }
    if (set > 5 && parseInt(data.set) === activeSet + 1) {
        finishGame = true
    }
    else if (set > 5) {
        setActive = true
    }

    return { scoredPlayerSet, finishGame, setActive }
}

export const addPoint = async (scoredPlayerIndex, game, data, activeSet, winningScore) => {
    const otherPlayerIndex = scoredPlayerIndex === 0 ? 1 : 0
    const scoredPlayer = game[scoredPlayerIndex]
    const otherPlayer = game[otherPlayerIndex]

    const { scoredPlayerCurrSet, otherPlayerCurrSet, incrementSet } = await calcCurrentSet(scoredPlayer.currentSet, otherPlayer.currentSet)
    const { scoredPlayerSet, finishGame, setActive } = incrementSet && await calcIncrementSet(scoredPlayer.sets, data, activeSet, winningScore)

    scoredPlayer.currentSet = scoredPlayerCurrSet
    scoredPlayer.sets = incrementSet ? scoredPlayerSet : scoredPlayer.sets
    otherPlayer.currentSet = otherPlayerCurrSet

    return {
        activeSet: setActive ? activeSet + 1 : activeSet,
        game: scoredPlayerIndex === 0 ? [scoredPlayer, otherPlayer] : [otherPlayer, scoredPlayer],
        endGame: finishGame ? { status: true, winner: scoredPlayerIndex } : { status: false }
    }
}

export const setResultMethod = (game, endGame, data) => {
    const runnerIndex = endGame.winner === 0 ? 1 : 0
    const winner = game[endGame.winner]
    const runner = game[runnerIndex]
    const sets = data.set
    const score = winner && winner.sets.reduce((final, set, idx) => final = final + `${set}-${runner.sets[idx]}${idx !== sets - 1 ? ', ' : ''}`, '')
    const res = winner && winner.player + ` Wins  ( ${score} ) `
    return res
}