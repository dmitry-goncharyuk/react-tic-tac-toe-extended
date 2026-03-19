import { useState } from 'react';
import Board from './Board';
import '../styles.css';



function Game({ squaresNumber = 9 }) {
  const [history, setHistory] = useState([{ squares: Array(squaresNumber).fill(null), lastMoveIndex: null }]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove].squares;
  const [sortAsc, setSortAsc] = useState(true);
  const size = Math.sqrt(squaresNumber);

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
      const col = (lastMoveIndex % size) + 1;
      const row = Math.floor(lastMoveIndex / size) + 1;
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

export default Game;