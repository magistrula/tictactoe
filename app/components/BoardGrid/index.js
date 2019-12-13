import React from 'react';
import PropTypes from 'prop-types';

import { join } from 'utils/string';
import './styles.scss';

// Should this be Game/BoardGrid?
class BoardGrid extends React.Component {
  // Is this a common/acceptable pattern in React?
  get squares() {
    const { squaresMap } = this.props;
    const numCols = Math.sqrt(squaresMap.size);
    const squareEntries = Array.from(squaresMap.entries());

    // Are inline styles common/acceptable in React?
    // Is this the right way to do it?
    return squareEntries.map(([squareId, squareValue], idx) => (
      <button
        type="button"
        key={squareId}
        className="BoardGrid-Square"
        style={{ gridColumnStart: (idx % numCols) + 1 }}
        onClick={() => this.props.clickSquare(squareId)}
      >
        {squareValue}
      </button>
    ));
  }

  render() {
    // What is the best way to support passing className into components?
    // What if we want to do this as a rule on the wrapping div of all components?
    return (
      <div className={join('BoardGrid', this.props.className)}>
        {this.squares}
      </div>
    );
  }
}

BoardGrid.propTypes = {
  className: PropTypes.string,
  clickSquare: PropTypes.func.isRequired,
  squaresMap: PropTypes.instanceOf(Map).isRequired,
};

export default BoardGrid;
