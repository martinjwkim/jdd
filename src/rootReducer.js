const INITIAL_STATE =
{
  round: 0,
  players: {},
  scores: {},
  endGame: false,
  multiplier: 0.1,
  finalRound: 10,
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "NEXT_ROUND":
      return { ...state, round: state.round + 1 };

    case "SET_PLAYERS":
      return { ...state, players: action.players };

    case "ADD_SCORE":
      return { ...state, scores: {...state.scores, [action.round]: action.scores} };
    
    default:
      return state;
  }
}

export default rootReducer;