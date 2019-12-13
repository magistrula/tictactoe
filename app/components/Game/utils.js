export function buildInitialSquaresMap(boardSize) {
  const numSquares = boardSize ** 2;
  const squareIds = new Array(numSquares).fill(null).map((_, idx) => idx);
  return squareIds.reduce(
    (acc, squareId) => acc.set(squareId, null),
    new Map(),
  );
}

export function buildWinningCombinations(squareIds) {
  const boardWidth = Math.sqrt(squareIds.length);

  const rowCombos = new Array(boardWidth).fill(null).map((_, idx) => {
    const start = idx * boardWidth;
    return squareIds.slice(start, start + boardWidth);
  });

  const colCombos = squareIds.reduce((acc, id, idx) => {
    const accIdx = idx % boardWidth;
    acc[accIdx] = acc[accIdx] ? acc[accIdx].concat(id) : [id];
    return acc;
  }, new Array(boardWidth).fill(null));

  const diagCombos = squareIds.reduce(
    (acc, id, idx, arr) => {
      if (idx === 0 || idx === arr.length - 1 || idx % (boardWidth + 1) === 0) {
        acc[0].push(id);
      } else if (idx % (boardWidth - 1) === 0) {
        acc[1].push(id);
      }

      return acc;
    },
    [[], []],
  );

  return [...rowCombos, ...colCombos, ...diagCombos];
}

export function computeWinningValue(squaresMap, winningCombos) {
  let winningValue = null;

  for (let comboIdx = 0; comboIdx < winningCombos.length; comboIdx += 1) {
    const winningIds = winningCombos[comboIdx];

    for (let squareIdx = 0; squareIdx < winningIds.length; squareIdx += 1) {
      const squareId = winningIds[squareIdx];
      const value = squaresMap.get(squareId);

      if (value && (!winningValue || value === winningValue)) {
        winningValue = value;
      } else {
        winningValue = null;
        break;
      }

      if (squareIdx === winningIds.length - 1) {
        return winningValue;
      }
    }
  }

  return null;
}
