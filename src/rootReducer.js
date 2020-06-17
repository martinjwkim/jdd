const INITIAL_STATE =
{
  round: 0,
  players: {
    player1: "Player 1",
    player2: "Player 2",
    player3: "Player 3",
    player4: "Player 4"
  },
  endGame: false,
  multiplier: 0.1,
  finalRound: 10,
};

function rootReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, count: state.count + 1 };

    case "DECREMENT":
      return { ...state, count: state.count - 1 };

    default:
      return state;
  }
}

export default rootReducer;