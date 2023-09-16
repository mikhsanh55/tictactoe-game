import { useState } from "react";

interface SquareProps {
  value: string | number | null;
  onSquareClick: any;
}

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="btn btn-outline-dark rounded-0 fs-4 fw-bold lh-base p-0"
      style={{ lineHeight: "54px", height: "54px", width: "54px" }}
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState<boolean>(true);
  const [squares, setSquares] = useState<number[] | string[] | null[]>(
    Array(9).fill(null)
  );

  function calculateWinner(squares: number[] | string[] | null[]) {
    // buat kemungkinan menangnya
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

    let winner = null;
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];

      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        winner = squares[a];
      }
    }

    return winner;
  }

  function handleClick(index: number): void {
    if (squares[index] || calculateWinner(squares)) return;
    const nextSquares = squares.slice();
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  // set the winner and
  // set the message for the next one to play
  const winner = calculateWinner(squares);
  const nextOnePlay = xIsNext ? "X" : "O";
  const isDraw = !winner && squares.every((square) => square !== null);
  let status = `Please ${nextOnePlay}, your turn`;

  if (winner) {
    status = `The winner: ${winner}`;
  } else if (isDraw) {
    status = `No one won`;
  }

  return (
    <>
      <strong>{status}</strong>
      <div className="d-flex justify-content-center">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="d-flex justify-content-center">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="d-flex justify-content-center">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
