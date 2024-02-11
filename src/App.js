import { useState } from "react";

function Square({ value, onClick, isWinner }) {
  const style = { color: isWinner ? "red" : "lightgrey" };
  return (
    <button className="square" onClick={onClick} style={style}>
      {value}
    </button>
  );
}

export default function Board() {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = isXNext ? "X" : "O";
    setSquares(nextSquares);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(initialSquares);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${isXNext ? "X" : "O"}`;

  return (
    <>
      <div className="status">{status}</div>
      {Array(3).fill(null).map((_, i) => (
        <div className="board-row" key={i}>
          {Array(3).fill(null).map((_, j) => {
            const index = 3 * i + j;
            return (
              <Square
                key={index}
                value={squares[index]}
                onClick={() => handleClick(index)}
                isWinner={winner && winner === squares[index]}
              />
            );
          })}
        </div>
      ))}
      <button onClick={resetGame} id="resetBtn">Start Over</button>
    </>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
