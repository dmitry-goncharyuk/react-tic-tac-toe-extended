import { useState } from 'react';

function Board({ xIsNext, squares, onPlay }) {

  const size = Math.sqrt(squares.length);

  function handleClick(i) {

    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i);
  }

  const result = calculateWinner(squares);
  const winner = result?.winner;
  const winningLine = result?.line || [];

  let status = winner ?
    "Winner: " + winner :
    (
      squares.filter((v) => !!v).length === 9 ?
        "Draw" :
        `Next player: ${xIsNext ? "X" : "O"}`
    );

  const rowOffsets = squares.slice().map((_, index) => (index % size) === 0 ? index : null).filter((v) => v !== null);
  const colOffsets = squares.slice().filter((_, index) => index < size).map((_, index) => index);

  return (
    <>
      <div className="status">{status}</div>
      {rowOffsets.map((rowStart) => (
        <div key={rowStart} className="board-row">
          {colOffsets.map((offset) => {
            const i = rowStart + offset;
            return (
              <Square
                key={i}
                value={squares[i]}
                onSquareClick={() => handleClick(i)}
                highlight={winningLine.includes(i)}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([{ squares: Array(9).fill(null), lastMoveIndex: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [sortAsc, setSortAsc] = useState(true);

  function handlePlay(nextSquares, moveIndex) {
    const nextHistory = [...history.slice(0, currentMove + 1), { squares: nextSquares, lastMoveIndex: moveIndex }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const movesIndices = history.map((_, index) => index);
  if (!sortAsc) {
    movesIndices.reverse();
  }

  const moves = movesIndices.map((move) => {
    const lastMoveIndex = history[move].lastMoveIndex;
    let description;

    if (move > 0) {
      const col = (lastMoveIndex % 3) + 1;
      const row = Math.floor(lastMoveIndex / 3) + 1;
      const coords = `(row: ${row}, col: ${col})`;

      description = move === currentMove
        ? `You are at move #${move} ${coords}`
        : `Go to move #${move} ${coords}`;
    } else {
      description = 'Go to game start';
    }

    let element;
    if (move === currentMove) {
      element = <div>{description}</div>;
    } else {
      element = <button onClick={() => jumpTo(move)}>{description}</button>
    }

    return (
      <li key={move}>
        {element}
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <button onClick={() => setSortAsc(!sortAsc)}>Sort</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick, highlight }) {

  const style = {
    backgroundColor: highlight ? "yellow" : "white"
  };

  return (
    <button
      className="square"
      onClick={onSquareClick}
      style={style}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

