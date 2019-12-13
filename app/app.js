import React from 'react';
import ReactDOM from 'react-dom';

import Game from 'components/Game';
import './styles.scss';

const GAME_BOARD_SIZE = 3;

ReactDOM.render(
  <Game size={GAME_BOARD_SIZE} />,
  document.getElementById('app'),
);
