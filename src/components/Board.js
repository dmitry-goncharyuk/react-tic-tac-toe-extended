import calculateWinner from '../utils/calculateWinner';
import '../styles.css';
import Square from './Square'; 

export default function Board({ xIsNext, squares, onPlay }) {

  const size = Math.sqrt(squares.length);

    const boardStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${size}, 1fr)`,
    gap: '2px',
    width: size * 60 + 'px',
    margin: '20px auto'
  };

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
      squares.filter((v) => !!v).length === squares.length ?
        "Draw" :
        `Next player: ${xIsNext ? "X" : "O"}`
    );

return (
    <>
      <div className="status">{status}</div>
      <div style={boardStyle}>
        {squares.map((square, i) => (
          <Square
            key={i}
            value={squares[i]}
            onSquareClick={() => handleClick(i)}
            highlight={winningLine.includes(i)}
          />
        ))}
      </div>
    </>
  );
}
