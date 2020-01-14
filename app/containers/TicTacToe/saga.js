import { put, select, takeEvery } from 'redux-saga/effects';

import { DEFAULT_BOARD_SIZE, INIT_GAME, SET_BOARD_SIZE } from './constants';
import { initGame, setBoardSize } from './actions';
import { selectBoardSize } from './selectors';

export function* initGameSaga() {
  let boardSize;
  try {
    boardSize = parseInt(localStorage.getItem('boardSize'), 10);
  } catch (e) {
    console.warn('localStorage is not available');
  }

  return yield put(setBoardSize(boardSize || DEFAULT_BOARD_SIZE));
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

export default function* ticTacToeSaga() {
  yield takeEvery(INIT_GAME, initGameSaga);
  yield takeEvery(SET_BOARD_SIZE, setBoardSizeSaga);
}
