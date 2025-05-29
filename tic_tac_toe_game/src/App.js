import React, { useState } from 'react';
import './App.css';

/**
 * Main TicTacToe Game Component
 * - Displays turn indicator
 * - Shows 3x3 grid
 * - Detects win/draw
 * - Allows restart
 */
function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <div className="logo">
              <span className="logo-symbol">*</span> KAVIA AI
            </div>
            <button className="btn" style={{ opacity: 0, pointerEvents: "none" }}>-</button>
          </div>
        </div>
      </nav>
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="container">
          <TicTacToeGame />
        </div>
      </main>
    </div>
  );
}

// PUBLIC_INTERFACE
function TicTacToeGame() {
  // Board is an array of 9 cells (initially null)
  const [board, setBoard] = useState(Array(9).fill(null));
  // true = X's turn, false = O's turn
  const [isXNext, setIsXNext] = useState(true);
  const winnerInfo = calculateWinner(board);
  const winner = winnerInfo?.winner;
  const line = winnerInfo?.line;
  const movesLeft = board.includes(null);
  const gameOver = !!winner || !movesLeft;

  // PUBLIC_INTERFACE
  function handleCellClick(index) {
    if (board[index] !== null || winner) return;
    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  }

  // PUBLIC_INTERFACE
  function handleRestart() {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  }

  // PUBLIC_INTERFACE
  function renderStatus() {
    if (winner) {
      return (
        <div className="ttt-status" style={{ color: "var(--base-light)", fontWeight: 600 }}>
          {`Winner: ${winner}`}
        </div>
      );
    }
    if (!movesLeft) {
      return (
        <div className="ttt-status" style={{ color: "var(--border-color)", fontWeight: 500 }}>
          Draw!
        </div>
      );
    }
    return (
      <div className="ttt-status">
        Next turn: <span style={{ color: "var(--base-light)", fontWeight: 500 }}>{isXNext ? "X" : "O"}</span>
      </div>
    );
  }

  return (
    <div className="ttt-main" style={{
      maxWidth: 320,
      margin: "0 auto",
      textAlign: "center",
      background: "var(--base-dark)",
      borderRadius: 14,
      padding: "2.5rem 2rem 2rem 2rem",
      boxShadow: "0 2px 24px 0 #0003"
    }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <div className="subtitle" style={{ color: "#fff", fontWeight: 500, marginBottom: 10 }}>
          TicTacToe Classic
        </div>
        {renderStatus()}
      </div>
      <GameBoard board={board} onCellClick={handleCellClick} winLine={line} />
      <div style={{ marginTop: "1.5rem" }}>
        <button className="btn btn-large" style={{
          background: "var(--base-light)", color: "#fff",
          letterSpacing: 1.1, border: "none", marginTop: 2
        }}
          onClick={handleRestart}
          disabled={!gameOver && board.every(cell => cell === null)}
        >
          Restart Game
        </button>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function GameBoard({ board, onCellClick, winLine }) {
  // Generates the 3x3 grid of cells
  function renderCell(i) {
    const value = board[i];
    const isWin = winLine?.includes(i);
    return (
      <button
        key={i}
        className="ttt-cell"
        onClick={() => onCellClick(i)}
        style={{
          background: "var(--base-light)",
          color: value === 'X' ? "#222" : "#007bff",
          border: isWin ? "2.5px solid #007bff" : "2px solid var(--border-color)",
          fontWeight: isWin ? 700 : 500,
          boxShadow: isWin ? "0 0 0 2px #007bff80" : undefined
        }}
        aria-label={`cell-${i}`}
      >
        {value}
      </button>
    );
  }
  return (
    <div className="ttt-board" style={{
      display: "grid",
      gridTemplateColumns: "repeat(3, 68px)",
      gridTemplateRows: "repeat(3, 68px)",
      gap: "10px",
      justifyContent: "center",
      alignItems: "center"
    }}>
      {Array(9).fill().map((_, i) => renderCell(i))}
    </div>
  );
}

// PUBLIC_INTERFACE
function calculateWinner(squares) {
  // All win lines
  const lines = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Cols
    [0,4,8], [2,4,6], // Diags
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
    ) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

export default App;