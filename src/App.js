// import { useState } from "react";

// function Square({ val, squareClick, isWinner }) {
//   var weiStyle = { color: isWinner ? "red" : "lightgrey" };
//   return (
//     <button className="square" onClick={squareClick} style={{ ...weiStyle }}>
//       {val}
//     </button>
//   );
// }

// export default function Board() {
//   const initialSquares= Array(9).fill(null);
//   const [square, setSquare] = useState(Array(9).fill(null));
//   const [xo, setxo] = useState(true);
//   // square -> main data
//   function handleClick(i) {
//     if (square[i] || calculateWinner(square)) {
//       // for (let s = 0; s < square.length; s++) {
//       // let sty_cond = square[s] == square[i];
//       // var some = sty_cond ? { color: "red" } : { color: "white" };
//       //   return;
//       // }
//       return;
//     }
//     const nextsq = square.slice();
//     if (xo) nextsq[i] = "X";
//     else nextsq[i] = "O";
//     setSquare(nextsq);
//     setxo(!xo);
//   }
//   const resetGame = () => {
//     setSquare(initialSquares);
//     setxo(!xo);
//   }

//   const weiner = calculateWinner(square);
//   let stat;
//   if (weiner) {
//     stat = `winner : ${weiner}`;
//   } else stat = `player turn : ${xo ? "X" : "O"}`;
//   return (
//     <>
//       <div className="status">{stat}</div>
//       <div className="board-row">
//         <Square
//           val={square[0]}
//           squareClick={() => handleClick(0)}
//           isWinner={weiner && weiner === square[0]}
//           // className="red-light"
//         />
//         <Square
//           val={square[1]}
//           squareClick={() => handleClick(1)}
//           isWinner={weiner && weiner === square[1]}
//           // style={some}
//         />
//         <Square
//           val={square[2]}
//           squareClick={() => handleClick(2)}
//           isWinner={weiner && weiner === square[2]}
//           // style={some}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           val={square[3]}
//           squareClick={() => handleClick(3)}
//           isWinner={weiner && weiner === square[3]}
//           // style={some}
//         />
//         <Square
//           val={square[4]}
//           squareClick={() => handleClick(4)}
//           isWinner={weiner && weiner === square[4]}
//           // style={some}
//         />
//         <Square
//           val={square[5]}
//           squareClick={() => handleClick(5)}
//           isWinner={weiner && weiner === square[5]}
//           // style={some}
//         />
//       </div>
//       <div className="board-row">
//         <Square
//           val={square[6]}
//           squareClick={() => handleClick(6)}
//           isWinner={weiner && weiner === square[6]}
//           // style={some}
//         />
//         <Square
//           val={square[7]}
//           squareClick={() => handleClick(7)}
//           isWinner={weiner && weiner === square[7]}
//           // style={some}
//         />
//         <Square
//           val={square[8]}
//           squareClick={() => handleClick(8)}
//           isWinner={weiner && weiner === square[8]}
//           // style={some}
//         />
//       </div>
//       <button onClick={resetGame} id="resetBtn">startover</button>
//     </>
//   );
// }

// function calculateWinner(Square) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (Square[a] && Square[a] === Square[b] && Square[a] === Square[c]) {
//       return Square[a];
//     }
//   }
//   return null;
// }
// // () => {
// // if (val == "X") setVal("O");
// // else setVal("X");
// // added nested folder but doesnt show for committing 

// // restructure it and rebuild -> keep the app.js and css files and build again for deployment 



// new optimized code >>>>>

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
