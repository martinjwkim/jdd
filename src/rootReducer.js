import { SET_USER, LOGOUT_USER, RESET_GAME, NEXT_ROUND, SET_PLAYERS, ADD_SCORE, ROUND_ONE, END_GAME, ADD_ROUNDS } from "./actionTypes";
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE =
{
  user: null,
  round: 1,
  players: {},
  scores: {},
  endGame: false,
  multiplier: 0.1,
  finalRound: 10,
  playAgain: false,
};

function rootReducer(state = INITIAL_STATE, action) {

  let stateDeepCopy = cloneDeep(state);

  switch (action.type) {
    case SET_USER:
      stateDeepCopy.user = action.user
      return stateDeepCopy

    case LOGOUT_USER:
      stateDeepCopy.user = null
      return stateDeepCopy

    case NEXT_ROUND:
      stateDeepCopy.round = stateDeepCopy.round + 1
      return stateDeepCopy

    case SET_PLAYERS:
      let players = {
        player1: action.players.player1, 
        player2: action.players.player2, 
        player3: action.players.player3, 
        player4: action.players.player4}
      stateDeepCopy.players = players
      return stateDeepCopy

    case ADD_SCORE:
      stateDeepCopy.scores = { ...stateDeepCopy.scores, [action.round]: action.scores }
      return stateDeepCopy

    case ROUND_ONE:
      stateDeepCopy.round = 1
      return stateDeepCopy

    case END_GAME:
      stateDeepCopy.endGame = true
      stateDeepCopy.playAgain = true
      return stateDeepCopy

    case ADD_ROUNDS:
      stateDeepCopy.finalRound = stateDeepCopy.finalRound+2
      return stateDeepCopy

    case RESET_GAME:
      stateDeepCopy.round = 1
      stateDeepCopy.finalRound = 10
      stateDeepCopy.endGame = false
      stateDeepCopy.scores = {}
      stateDeepCopy.playAgain = false
      return stateDeepCopy

    default:
      return state;
  }
}

export default rootReducer;