import { createSelector } from 'reselect';
import { initialState } from './reducer';

import { PLAYER_X, PLAYER_O } from './constants';

const selectGameDomain = state => state.game || initialState;

// Should I be using this somewhere?
const makeSelectGame = () =>
  createSelector(
    selectGameDomain,
    substate => substate,
  );

const selectBoardSize = createSelector(
  selectGameDomain,
  ({ boardSize }) => boardSize,
);

const selectCurrSquaresMap = createSelector(
  selectGameDomain,
  ({ gameSteps, stepNumber }) =>
    (gameSteps[stepNumber] && gameSteps[stepNumber].squaresMap) || new Map(),
);

const selectCurrStepNumber = createSelector(
  selectGameDomain,
  ({ stepNumber }) => stepNumber,
);

const selectGameSteps = createSelector(
  selectGameDomain,
  ({ gameSteps }) => gameSteps,
);

const selectIsCatsGame = createSelector(
  selectGameDomain,
  ({ boardSize, stepNumber, winner }) =>
    stepNumber === boardSize ** 2 && !winner,
);

const selectMaxBoardSize = createSelector(
  selectGameDomain,
  ({ maxBoardSize }) => maxBoardSize,
);

const selectMinBoardSize = createSelector(
  selectGameDomain,
  ({ minBoardSize }) => minBoardSize,
);

const selectNextPlayer = createSelector(
  selectGameDomain,
  ({ squareLabels, nextPlayer }) => squareLabels[nextPlayer],
);

const selectPlayerLabelOptions = createSelector(
  selectGameDomain,
  ({ playerLabelOptions }) => playerLabelOptions,
);

// Is this allowed? A selector that returns a function?
const selectSquareLabelForPlayer = createSelector(
  selectGameDomain,
  ({ squareLabels }) => player => squareLabels[player],
);

const selectXLabel = createSelector(
  selectGameDomain,
  ({ squareLabels }) => squareLabels[PLAYER_X],
);

const selectOLabel = createSelector(
  selectGameDomain,
  ({ squareLabels }) => squareLabels[PLAYER_O],
);

const selectWinner = createSelector(
  selectGameDomain,
  ({ squareLabels, winner }) => squareLabels[winner],
);

export default makeSelectGame;

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
