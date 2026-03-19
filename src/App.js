import { useState  from 'react';
import Game from './components/Game';
import './styles.css';



export default function App() {

  let [squaresNumber, setSquaresNumber] = useState(9);
  return (
    <div className="app">
      <button onClick={() => setSquaresNumber(9)}>3x3</button>
      <button onClick={() => setSquaresNumber(16)}>4x4</button>
      <button onClick={() => setSquaresNumber(25)}>5x5</button>
      <button onClick={() => setSquaresNumber(100)}>10x10</button>

      <Game key={squaresNumber} squaresNumber={squaresNumber} />
    </div>
  );
}
