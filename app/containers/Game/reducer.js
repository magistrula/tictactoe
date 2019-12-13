import {
  CLICK_SQUARE,
  DEFAULT_BOARD_SIZE,
  INIT_GAME,
  JUMP_TO_STEP,
  MAX_BOARD_SIZE,
  MIN_BOARD_SIZE,
  PLAYER_X,
  PLAYER_O,
  PLAYER_LABEL_OPTIONS,
  SET_X_LABEL,
  SET_O_LABEL,
} from './constants';
import {
  buildInitialSquaresMap,
  buildWinningCombinations,
  computeNextPlayerForGameStep,
  computeWinningValue,
} from './utils';

export const initialState = {
  boardSize: DEFAULT_BOARD_SIZE,
  gameSteps: [],
  maxBoardSize: MAX_BOARD_SIZE,
  minBoardSize: MIN_BOARD_SIZE,
  nextPlayer: computeNextPlayerForGameStep(0),
  playerLabelOptions: PLAYER_LABEL_OPTIONS,
  squareLabels: {
    [PLAYER_X]: PLAYER_LABEL_OPTIONS[0],
    [PLAYER_O]: PLAYER_LABEL_OPTIONS[1],
  },
  stepNumber: 0,
  winner: null,
  winningSquareIdCombos: [],
};

const HANDLERS = {
  [CLICK_SQUARE]: (state, squareId) => {
    const gameSteps = state.gameSteps.slice(0, state.stepNumber + 1);
    const newSquaresMap = new Map(gameSteps[gameSteps.length - 1].squaresMap);

    if (state.winner || newSquaresMap.get(squareId) !== null) {
      return state;
    }

    newSquaresMap.set(squareId, state.nextPlayer);
    const stepNumber = state.stepNumber + 1;

    return {
      ...state,
      stepNumber,
      gameSteps: gameSteps.concat({ squaresMap: newSquaresMap }),
      nextPlayer: computeNextPlayerForGameStep(stepNumber),
      winner: computeWinningValue(newSquaresMap, state.winningSquareIdCombos),
    };
  },

  [INIT_GAME]: (state, boardSize) => {
    const initialSquaresMap = buildInitialSquaresMap(boardSize);
    const squareIds = Array.from(initialSquaresMap.keys());
    return {
      ...initialState,
      boardSize,
      gameSteps: [{ squaresMap: initialSquaresMap }],
      winningSquareIdCombos: buildWinningCombinations(squareIds),
    };
  },

  [JUMP_TO_STEP]: (state, stepNumber) => {
    const { squaresMap } = state.gameSteps[stepNumber];
    return {
      ...state,
      stepNumber,
      nextPlayer: computeNextPlayerForGameStep(stepNumber),
      winner: computeWinningValue(squaresMap, state.winningSquareIdCombos),
    };
  },

  [SET_X_LABEL]: (state, label) => ({
    ...state,
    squareLabels: {
      [PLAYER_X]: label,
      [PLAYER_O]: state.squareLabels[PLAYER_O],
    },
  }),

  [SET_O_LABEL]: (state, label) => ({
    ...state,
    squareLabels: {
      [PLAYER_X]: state.squareLabels[PLAYER_X],
      [PLAYER_O]: label,
    },
  }),
};

const gameReducer = (state = initialState, action) =>
  HANDLERS[action.type] ? HANDLERS[action.type](state, action.payload) : state;

export default gameReducer;
