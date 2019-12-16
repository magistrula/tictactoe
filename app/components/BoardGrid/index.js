import React from 'react';
import PropTypes from 'prop-types';

import './styles.scss';

function Square(id, value, label, style, clickSquare) {
  // Are inline styles common/acceptable in React?
  // Is this the right way to do it?
  return (
    <button
      className="BoardGrid-Square"
      type="button"
      key={id}
      onClick={() => clickSquare(id)}
      style={style}
    >
      {label}
    </button>
  );
}

function SquaresCollection(squaresMap, getSquareLabel, clickSquare) {
  const numCols = Math.sqrt(squaresMap.size);
  const squareEntries = Array.from(squaresMap.entries());

  return squareEntries.map(([squareId, squareValue], idx) => {
    const style = { gridColumnStart: (idx % numCols) + 1 };
    const label = getSquareLabel(squareValue);
    return Square(squareId, squareValue, label, style, clickSquare);
  });
}

// Should this be TicTacToe/BoardGrid?
function BoardGrid({
  className,
  clickSquare,
  isCatsGame,
  isWon,
  getSquareLabel,
  squaresMap,
}) {
  const squares = SquaresCollection(squaresMap, getSquareLabel, clickSquare);
  const variant =
    (isWon && 'BoardGrid--won') || (isCatsGame && 'BoardGrid--catsGame');

  // What is the best way to support passing className into components?
  // What if we want to do this as a rule on the wrapping div of all components?
  return <div className={`BoardGrid ${variant} ${className}`}>{squares}</div>;
}

BoardGrid.propTypes = {
  className: PropTypes.string,
  clickSquare: PropTypes.func.isRequired,
  isCatsGame: PropTypes.bool.isRequired,
  isWon: PropTypes.bool.isRequired,
  getSquareLabel: PropTypes.func.isRequired,
  squaresMap: PropTypes.instanceOf(Map).isRequired,
};

export default BoardGrid;
