import { put, select, takeEvery } from 'redux-saga/effects';

import {
  DEFAULT_BOARD_SIZE,
  INIT_GAME,
  SET_BOARD_SIZE,
  SET_O_LABEL,
  SET_X_LABEL,
} from './constants';
import { initGame, setBoardSize, setOLabel, setXLabel } from './actions';
import { selectBoardSize } from './selectors';

export function* initGameSaga() {
  let boardSize;
  try {
    boardSize = parseInt(localStorage.getItem('boardSize'), 10);
  } catch (e) {
    console.warn('localStorage is not available');
  }

  yield put(setBoardSize(boardSize || DEFAULT_BOARD_SIZE));

  try {
    const playerOLabel = localStorage.getItem('playerOLabel');
    const playerXLabel = localStorage.getItem('playerXLabel');

    if (playerOLabel) {
      yield put(setOLabel(playerOLabel));
    }

    if (playerXLabel) {
      yield put(setXLabel(playerXLabel));
    }
  } catch (e) {
    console.warn('localStorage is not available');
  }
}

export function* setBoardSizeSaga({ payload: boardSize }) {
  try {
    localStorage.setItem('boardSize', boardSize);
  } catch (e) {
    console.warn('localStorage not available');
  }

  const currBoardSize = yield select(selectBoardSize);
  if (boardSize !== currBoardSize) {
    return yield put(initGame());
  }
}

export function* setPlayerOLabelSaga({ payload: label }) {
  try {
    localStorage.setItem('playerOLabel', label);
  } catch (e) {
    console.warn('localStorage not available');
  }
}

export function* setPlayerXLabelSaga({ payload: label }) {
  try {
    localStorage.setItem('playerXLabel', label);
  } catch (e) {
    console.warn('localStorage not available');
  }
}

export default function* ticTacToeSaga() {
  yield takeEvery(INIT_GAME, initGameSaga);
  yield takeEvery(SET_BOARD_SIZE, setBoardSizeSaga);
  yield takeEvery(SET_O_LABEL, setPlayerOLabelSaga);
  yield takeEvery(SET_X_LABEL, setPlayerXLabelSaga);
}
