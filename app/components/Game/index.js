import React from 'react';
import PropTypes from 'prop-types';

import BoardGrid from 'components/BoardGrid';
import BoardStatus from 'components/BoardStatus';
import { join } from 'utils/string';
import {
  buildInitialSquaresMap,
  buildWinningCombinations,
  computeWinningValue,
} from './utils';

class Game extends React.Component {
  constructor(props) {
    super(props);

    const initialSquaresMap = buildInitialSquaresMap(props.size);
    const squareIds = Array.from(initialSquaresMap.keys());

    // This never changes; should it be in the `state`?
    this.winningSquareIdCombos = buildWinningCombinations(squareIds);

    this.state = {
      gameSteps: [{ squaresMap: initialSquaresMap }],
      isXNext: true,
      stepNumber: 0,
      winner: null,
    };
  }

  clickSquare(squareId) {
    const gameSteps = this.state.gameSteps.slice(0, this.state.stepNumber + 1);
    const newSquaresMap = new Map(gameSteps[gameSteps.length - 1].squaresMap);

    if (this.state.winner || newSquaresMap.get(squareId) !== null) {
      return;
    }

    newSquaresMap.set(squareId, this.state.isXNext ? 'X' : 'O');
    const stepNumber = this.state.stepNumber + 1;

    this.setState(() => ({
      stepNumber,
      gameSteps: gameSteps.concat({ squaresMap: newSquaresMap }),
      isXNext: stepNumber % 2 === 0,
      winner: computeWinningValue(newSquaresMap, this.winningSquareIdCombos),
    }));
  }

  jumpToStep(stepNumber) {
    const { squaresMap } = this.state.gameSteps[stepNumber];
    this.setState(() => ({
      stepNumber,
      isXNext: stepNumber % 2 === 0,
      winner: computeWinningValue(squaresMap, this.winningSquareIdCombos),
    }));
  }

  render() {
    const { squaresMap } = this.state.gameSteps[this.state.stepNumber];
    return (
      <div
        className={join(
          'flexrow items-start content-center',
          this.props.className,
        )}
      >
        <BoardGrid
          className={this.state.winner ? 'BoardGrid--finished' : ''}
          squaresMap={squaresMap}
          clickSquare={id => this.clickSquare(id)}
        />
        <BoardStatus
          className="mar-20l"
          winner={this.state.winner}
          gameSteps={this.state.gameSteps}
          nextPlayer={this.state.isXNext ? 'X' : 'O'}
          jumpToStep={i => this.jumpToStep(i)}
        />
      </div>
    );
  }
}

Game.propTypes = {
  className: PropTypes.string,
  size: PropTypes.number.isRequired,
};

export default Game;
