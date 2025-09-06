import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function generateBoard(removed = 40) {
  const base = 9;
  let board = Array.from({ length: base }, () => Array(base).fill(0));

  function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    let startRow = row - (row % 3);
    let startCol = col - (col % 3);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i + startRow][j + startCol] === num) return false;
      }
    }
    return true;
  }

  function solve(board) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  solve(board);

  let puzzle = board.map((row) => [...row]);
  let count = 0;
  while (count < removed) {
    let row = Math.floor(Math.random() * 9);
    let col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count++;
    }
  }
  return { puzzle, solution: board };
}


export default function SudokuMasterApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const removed = location.state?.removed || 40;
  const [boardData, setBoardData] = useState(() => generateBoard(removed));
  const [board, setBoard] = useState(boardData.puzzle);
  const [solution, setSolution] = useState(boardData.solution);
  const [startTime, setStartTime] = useState(Date.now());
  const [time, setTime] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [frozenTime, setFrozenTime] = useState(null);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    if (isWin) return;
    const timer = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 100));
    }, 100);
    return () => clearInterval(timer);
  }, [startTime, isWin]);

  function handleChange(row, col, value) {
    if (boardData.puzzle[row][col] !== 0 || isWin) return;
    if (/^[1-9]$/.test(value) || value === "") {
      let newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value === "" ? 0 : parseInt(value);
      setBoard(newBoard);
      checkWin(newBoard);
    }
  }

  function checkWin(currentBoard) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== solution[i][j]) return;
      }
    }
    setIsWin(true);
    setFrozenTime(time);
    setShowModal(true);
  }

  function handlePlayAgain() {
    const newData = generateBoard(removed);
    setBoardData(newData);
    setBoard(newData.puzzle);
    setSolution(newData.solution);
    setStartTime(Date.now());
    setTime(0);
    setIsWin(false);
    setFrozenTime(null);
    setShowModal(false);
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Sudoku Master</h1>
      <div className="text-lg mb-4">Time: {frozenTime !== null ? frozenTime : time}s</div>

      <div className="grid grid-cols-9 bg-gray-700 p-1 rounded">
        {board.map((row, i) =>
          row.map((cell, j) => {
            let borderClass = "w-14 h-14 text-center text-xl border bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 ";
            borderClass += "border-gray-400 ";
            if (j % 3 === 0) borderClass += "border-l-4 ";
            if (i % 3 === 0) borderClass += "border-t-4 ";
            if (j === 8) borderClass += "border-r-4 ";
            if (i === 8) borderClass += "border-b-4 ";
            return (
              <input
                key={`${i}-${j}`}
                value={cell === 0 ? "" : cell}
                onChange={(e) => handleChange(i, j, e.target.value)}
                className={borderClass}
                disabled={boardData.puzzle[i][j] !== 0}
              />
            );
          })
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">You Win!</h2>
            <p className="mb-2">Time: {frozenTime}s</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={() => {
                if (playerName.trim()) {
                  navigate("/");
                }
              }}
              className="w-full bg-purple-600 text-white py-2 rounded disabled:opacity-50"
              disabled={!playerName.trim()}
            >
              Go to Leaderboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
