import { put, select, takeEvery } from 'redux-saga/effects';

import { SET_BOARD_SIZE } from './constants';
import { initGame } from './actions';
import {
  selectCurrStepNumber,
  selectMaxBoardSize,
  selectMinBoardSize,
} from './selectors';

export function* setBoardSizeSaga({ payload: boardSize }) {
  if (!boardSize) {
    return;
  }

  const minBoardSize = yield select(selectMinBoardSize);
  const maxBoardSize = yield select(selectMaxBoardSize);
  if (
    typeof boardSize !== 'number' ||
    boardSize < minBoardSize ||
    boardSize > maxBoardSize
  ) {
    return window.alert('Please enter a number between 3 and 10');
  }

  const stepNumber = yield select(selectCurrStepNumber);
  if (
    stepNumber === 0 ||
    window.confirm(`Start a new ${boardSize}x${boardSize} game?`)
  ) {
    return yield put(initGame(boardSize));
  }
}

export default function* gameSaga() {
  yield takeEvery(SET_BOARD_SIZE, setBoardSizeSaga);
}
