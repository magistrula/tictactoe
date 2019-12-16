import {
  CLICK_SQUARE,
  DEFAULT_BOARD_SIZE,
  INIT_GAME,
  JUMP_TO_STEP,
  SET_BOARD_SIZE,
  SET_O_LABEL,
  SET_X_LABEL,
} from './constants';

export function clickSquare(squareId) {
  return {
    type: CLICK_SQUARE,
    payload: squareId,
  };
}

export function initGame(boardSize) {
  return {
    type: INIT_GAME,
    payload: boardSize || DEFAULT_BOARD_SIZE,
  };
}

export function jumpToStep(stepNumber) {
  return {
    type: JUMP_TO_STEP,
    payload: stepNumber,
  };
}

export function setBoardSize(boardSize) {
  return {
    type: SET_BOARD_SIZE,
    payload: boardSize,
  };
}

export function setXLabel(label) {
  return {
    type: SET_X_LABEL,
    payload: label,
  };
}

export function setOLabel(label) {
  return {
    type: SET_O_LABEL,
    payload: label,
  };
}
