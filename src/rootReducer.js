import { SET_USER, LOGOUT_USER, NEXT_ROUND, SET_PLAYERS, ADD_SCORE, ROUND_ONE, END_GAME, ADD_ROUNDS } from "./actionTypes";
import cloneDeep from 'lodash/cloneDeep';

const INITIAL_STATE =
{
  user: null,
  round: 0,
  players: {},
  scores: {},
  endGame: false,
  multiplier: 0.1,
  finalRound: 10,
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
      stateDeepCopy.players = action.players
      return stateDeepCopy

    case ADD_SCORE:
      stateDeepCopy.scores = { ...stateDeepCopy.scores, [action.round]: action.scores }
      return stateDeepCopy

    case ROUND_ONE:
      stateDeepCopy.round = 1
      return stateDeepCopy

    case END_GAME:
      stateDeepCopy.endGame = true
      return stateDeepCopy

    case ADD_ROUNDS:
      stateDeepCopy.finalRound = stateDeepCopy.finalRound+2
      return stateDeepCopy

    default:
      return state;
  }
}

export default rootReducer;