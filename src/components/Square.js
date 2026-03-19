import '../styles.css';

export default function Square({ value, onSquareClick, highlight }) {

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