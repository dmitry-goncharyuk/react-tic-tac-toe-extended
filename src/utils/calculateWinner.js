export default function calculateWinner(squares) {
  const size = Math.sqrt(squares.length);

  for (let i = 0; i < size; i++) {
    const start = i * size;
    const line = [];
    for (let j = 0; j < size; j++) line.push(start + j);
    
    if (line.every(idx => squares[idx] && squares[idx] === squares[line[0]])) {
      return { winner: squares[line[0]], line };
    }
  }

  for (let i = 0; i < size; i++) {
    const line = [];
    for (let j = 0; j < size; j++) line.push(i + j * size);
    
    if (line.every(idx => squares[idx] && squares[idx] === squares[line[0]])) {
      return { winner: squares[line[0]], line };
    }
  }

  const diag1 = [];
  for (let i = 0; i < size; i++) diag1.push(i * (size + 1));
  if (diag1.every(idx => squares[idx] && squares[idx] === squares[diag1[0]])) {
    return { winner: squares[diag1[0]], line: diag1 };
  }

  const diag2 = [];
  for (let i = 1; i <= size; i++) diag2.push(i * (size - 1));
  if (diag2.every(idx => squares[idx] && squares[idx] === squares[diag2[0]])) {
    return { winner: squares[diag2[0]], line: diag2 };
  }

  return null;
}