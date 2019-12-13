import React from 'react';
import PropTypes from 'prop-types';

import { join } from 'utils/string';
import './styles.scss';

class BoardStatus extends React.Component {
  // Are getters a common/acceptable pattern in React?
  get statusMessage() {
    const { winner, nextPlayer } = this.props;
    return winner ? `Winner: ${winner}` : `Next Player: ${nextPlayer}`;
  }

  // Are getters a common/acceptable pattern in React?
  get gameStepButtons() {
    return this.props.gameSteps.map((_, idx) => (
      // The linter doesn't like me using an index as the `key`.
      // What is the best practice here?
      <div key={Math.random()} className="mar-5b">
        <button
          type="button"
          className="BoardStatus-StepButton"
          onClick={() => this.props.jumpToStep(idx)}
        >
          {idx === 0 ? 'Go to Game Start' : `Go to Move #${idx}`}
        </button>
      </div>
    ));
  }

  render() {
    return (
      <div className={join('BoardStatus', this.props.className)}>
        <div className="BoardStatus-Message mar-20b">{this.statusMessage}</div>
        {this.gameStepButtons}
      </div>
    );
  }
}

BoardStatus.propTypes = {
  className: PropTypes.string,
  gameSteps: PropTypes.array.isRequired,
  jumpToStep: PropTypes.func.isRequired,
  nextPlayer: PropTypes.string.isRequired,
  winner: PropTypes.string.isRequired,
};

export default BoardStatus;
