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