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

    case "DECREMENT":
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
}

export default rootReducer;