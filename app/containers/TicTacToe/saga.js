import { put, takeEvery } from 'redux-saga/effects';

import {
  DEFAULT_BOARD_SIZE,
  INIT_GAME,
  SET_BOARD_SIZE,
  SET_O_LABEL,
  SET_X_LABEL,
} from './constants';
import { setBoardSize, setOLabel, setXLabel } from './actions';

export function* initGameSaga() {
  const boardSize = parseInt(getLocalStorageProp('boardSize'), 10);
  yield put(setBoardSize(boardSize || DEFAULT_BOARD_SIZE));

  const playerOLabel = getLocalStorageProp('playerOLabel');
  if (playerOLabel) {
    yield put(setOLabel(playerOLabel));
  }

  const playerXLabel = getLocalStorageProp('playerXLabel');
  if (playerXLabel) {
    yield put(setXLabel(playerXLabel));
  }
}

export function* setBoardSizeSaga({ payload: boardSize }) {
  setLocalStorageProp('boardSize', boardSize);
}

export function* setPlayerOLabelSaga({ payload: label }) {
  setLocalStorageProp('playerOLabel', label);
}

export function* setPlayerXLabelSaga({ payload: label }) {
  setLocalStorageProp('playerXLabel', label);
}

function setLocalStorageProp(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    console.warn('localStorage not available');
  }
}

function getLocalStorageProp(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    console.warn('localStorage is not available');
  }
}

export default function* ticTacToeSaga() {
  yield takeEvery(INIT_GAME, initGameSaga);
  yield takeEvery(SET_BOARD_SIZE, setBoardSizeSaga);
  yield takeEvery(SET_O_LABEL, setPlayerOLabelSaga);
  yield takeEvery(SET_X_LABEL, setPlayerXLabelSaga);
}
