import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import BoardControls from 'components/BoardControls';
import BoardGrid from 'components/BoardGrid';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import {
  clickSquare as _clickSquare,
  initGame as _initGame,
  jumpToStep as _jumpToStep,
  setBoardSize as _setBoardSize,
  setXLabel as _setXLabel,
  setOLabel as _setOLabel,
} from './actions';
import reducer from './reducer';
import saga from './saga';
import {
  selectBoardSize,
  selectCurrSquaresMap,
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
} from './selectors';

function TicTacToe({
  boardSize,
  className,
  clickSquare,
  initGame,
  jumpToStep,
  currSquaresMap,
  gameSteps,
  getSquareLabel,
  isCatsGame,
  maxBoardSize,
  minBoardSize,
  nextPlayer,
  playerLabelOptions,
  setBoardSize,
  setXLabel,
  setOLabel,
  xLabel,
  oLabel,
  winner,
}) {
  useInjectReducer({ key: 'ticTacToe', reducer });
  useInjectSaga({ key: 'ticTacToe', saga });

  if (!currSquaresMap.size) {
    initGame();
  }

  return (
    <div
      className={`d-flex align-items-start justify-content-center ${className}`}
    >
      <BoardGrid
        clickSquare={clickSquare}
        squaresMap={currSquaresMap}
        getSquareLabel={squareValue => getSquareLabel(squareValue)}
        isCatsGame={isCatsGame}
        isWon={!!winner}
      />

      <BoardControls
        className="ml-5"
        boardSize={boardSize}
        gameSteps={gameSteps}
        jumpToStep={jumpToStep}
        maxBoardSize={maxBoardSize}
        minBoardSize={minBoardSize}
        nextPlayer={nextPlayer}
        playerLabelOptions={playerLabelOptions}
        setBoardSize={setBoardSize}
        setXLabel={setXLabel}
        setOLabel={setOLabel}
        xLabel={xLabel}
        oLabel={oLabel}
        winner={winner}
      />
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  boardSize: selectBoardSize,
  currSquaresMap: selectCurrSquaresMap,
  gameSteps: selectGameSteps,
  isCatsGame: selectIsCatsGame,
  maxBoardSize: selectMaxBoardSize,
  minBoardSize: selectMinBoardSize,
  nextPlayer: selectNextPlayer,
  getSquareLabel: selectSquareLabelForPlayer,
  playerLabelOptions: selectPlayerLabelOptions,
  xLabel: selectXLabel,
  oLabel: selectOLabel,
  winner: selectWinner,
});

const mapDispatchToProps = {
  clickSquare: _clickSquare,
  initGame: _initGame,
  jumpToStep: _jumpToStep,
  setBoardSize: _setBoardSize,
  setXLabel: _setXLabel,
  setOLabel: _setOLabel,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

TicTacToe.propTypes = {
  boardSize: PropTypes.number,
  className: PropTypes.string,
  clickSquare: PropTypes.func.isRequired,
  initGame: PropTypes.func.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  currSquaresMap: PropTypes.instanceOf(Map),
  gameSteps: PropTypes.array.isRequired,
  getSquareLabel: PropTypes.func.isRequired,
  isCatsGame: PropTypes.bool.isRequired,
  maxBoardSize: PropTypes.number.isRequired,
  minBoardSize: PropTypes.number.isRequired,
  nextPlayer: PropTypes.string.isRequired,
  playerLabelOptions: PropTypes.array.isRequired,
  setBoardSize: PropTypes.func.isRequired,
  setXLabel: PropTypes.func.isRequired,
  setOLabel: PropTypes.func.isRequired,
  xLabel: PropTypes.string.isRequired,
  oLabel: PropTypes.string.isRequired,
  winner: PropTypes.string,
};

export default compose(withConnect)(TicTacToe);
