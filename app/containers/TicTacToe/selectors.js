import { createSelector } from 'reselect';
import { initialState } from './reducer';

import { PLAYER_X, PLAYER_O } from './constants';

const selectTicTacToeDomain = state => state.ticTacToe || initialState;

// Should I be using this somewhere?
const makeSelectTicTacToe = () =>
  createSelector(
    selectTicTacToeDomain,
    substate => substate,
  );

const selectBoardSize = createSelector(
  selectTicTacToeDomain,
  ({ boardSize }) => boardSize,
);

const selectCurrSquaresMap = createSelector(
  selectTicTacToeDomain,
  ({ gameSteps, stepNumber }) =>
    (gameSteps[stepNumber] && gameSteps[stepNumber].squaresMap) || new Map(),
);

const selectCurrStepNumber = createSelector(
  selectTicTacToeDomain,
  ({ stepNumber }) => stepNumber,
);

const selectGameSteps = createSelector(
  selectTicTacToeDomain,
  ({ gameSteps }) => gameSteps,
);

const selectIsCatsGame = createSelector(
  selectTicTacToeDomain,
  ({ boardSize, stepNumber, winner }) =>
    stepNumber === boardSize ** 2 && !winner,
);

const selectMaxBoardSize = createSelector(
  selectTicTacToeDomain,
  ({ maxBoardSize }) => maxBoardSize,
);

const selectMinBoardSize = createSelector(
  selectTicTacToeDomain,
  ({ minBoardSize }) => minBoardSize,
);

const selectNextPlayer = createSelector(
  selectTicTacToeDomain,
  ({ playerLabels, nextPlayer }) => playerLabels[nextPlayer],
);

const selectPlayerLabelOptions = createSelector(
  selectTicTacToeDomain,
  ({ playerLabelOptions }) => playerLabelOptions,
);

// Is this allowed? A selector that returns a function?
const selectSquareLabelForPlayer = createSelector(
  selectTicTacToeDomain,
  ({ playerLabels }) => player => playerLabels[player],
);

const selectXLabel = createSelector(
  selectTicTacToeDomain,
  ({ playerLabels }) => playerLabels[PLAYER_X],
);

const selectOLabel = createSelector(
  selectTicTacToeDomain,
  ({ playerLabels }) => playerLabels[PLAYER_O],
);

const selectWinner = createSelector(
  selectTicTacToeDomain,
  ({ playerLabels, winner }) => playerLabels[winner],
);

export default makeSelectTicTacToe;

// So many selectors! Is this normal?
export {
  selectBoardSize,
  selectCurrSquaresMap,
  selectCurrStepNumber,
  selectGameSteps,
  selectIsCatsGame,
  selectMaxBoardSize,
  selectMinBoardSize,
  selectNextPlayer,
  selectPlayerLabelOptions,
  selectSquareLabelForPlayer,
  selectXLabel,
  selectOLabel,
  selectWinner,
};
