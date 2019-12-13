import React from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';
import { range } from 'lodash';

import './styles.scss';

function SizeDropdown(currSize, minSize, maxSize, setSize) {
  const dropdownItems = range(minSize, maxSize + 1).map(size => (
    <Dropdown.Item
      key={size}
      active={currSize === size}
      onSelect={() => setSize(size)}
    >
      {size} x {size}
    </Dropdown.Item>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">
        {currSize} x {currSize}
      </Dropdown.Toggle>
      <Dropdown.Menu className="BoardControls-Menu">
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function LabelsDropdown(currValue, options, onSelect) {
  const dropdownItems = options.map(option => (
    <Dropdown.Item
      key={option}
      className="BoardControls-LabelOption text-center"
      active={currValue === option}
      onSelect={() => onSelect(option)}
    >
      {option}
    </Dropdown.Item>
  ));

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">{currValue}</Dropdown.Toggle>
      <Dropdown.Menu className="BoardControls-Menu BoardControls-Menu--labels">
        {dropdownItems}
      </Dropdown.Menu>
    </Dropdown>
  );
}

function GameStepButtons(gameSteps, jumpToStep) {
  // The linter doesn't like me using an index as the `key`.
  // What is the best practice here?
  return gameSteps.map((_, idx) => (
    <div key={Math.random()}>
      <Button variant="link" size="sm" onClick={() => jumpToStep(idx)}>
        {idx === 0 ? 'Go to Game Start' : `Go to Move #${idx}`}
      </Button>
    </div>
  ));
}

function BoardControls({
  boardSize,
  className,
  gameSteps,
  jumpToStep,
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
  const statusMessage = winner ? `Winner: ${winner}` : `Next: ${nextPlayer}`;
  const gameStepButtons = GameStepButtons(gameSteps, jumpToStep);
  return (
    <div className={`d-flex ml-4 ${className}`}>
      <div className="BoardControls-inputs">
        <div className="BoardControls-Message mb-3">{statusMessage}</div>

        <div className="mb-2">Board Size</div>
        {SizeDropdown(boardSize, minBoardSize, maxBoardSize, setBoardSize)}

        <div className="mt-3 mb-2">Player 1</div>
        {LabelsDropdown(xLabel, playerLabelOptions, setXLabel)}

        <div className="mt-3 mb-2">Player 2</div>
        {LabelsDropdown(oLabel, playerLabelOptions, setOLabel)}
      </div>

      <div className="ml-4">{gameStepButtons}</div>
    </div>
  );
}

BoardControls.propTypes = {
  boardSize: PropTypes.number,
  className: PropTypes.string,
  gameSteps: PropTypes.array.isRequired,
  jumpToStep: PropTypes.func.isRequired,
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

export default BoardControls;
