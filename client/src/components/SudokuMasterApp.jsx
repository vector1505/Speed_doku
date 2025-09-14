import React, { useCallback, useEffect, useReducer, useRef } from "react";
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
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
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

const initialState = {
  boardData: null,
  board: null,
  solution: null,
  startTime: null,
  time: 0,
  isWin: false,
  showModal: false,
  frozenTime: null,
  playerName: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "NEW_GAME":
      return {
        ...state,
        boardData: action.payload,
        board: action.payload.puzzle,
        solution: action.payload.solution,
        startTime: Date.now(),
        time: 0,
        isWin: false,
        showModal: false,
        frozenTime: null,
        playerName: "",
      };
    case "SET_BOARD":
      return { ...state, board: action.payload };
    case "SET_WIN":
      return { ...state, isWin: true, frozenTime: state.time, showModal: true };
    case "SET_TIME":
      return { ...state, time: action.payload };
    case "SET_MODAL":
      return { ...state, showModal: action.payload };
    case "SET_PLAYER_NAME":
      return { ...state, playerName: action.payload };
    default:
      return state;
  }
}

export default function SudokuMasterApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const removed = location.state?.removed || 40;
  const [state, dispatch] = useReducer(reducer, initialState);
  const timerRef = useRef();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    const data = generateBoard(removed);
    dispatch({ type: "NEW_GAME", payload: data });
    return () => {
      isMounted.current = false;
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [removed]);

  useEffect(() => {
    if (state.isWin) return;
    timerRef.current = setInterval(() => {
      if (isMounted.current) {
        dispatch({ type: "SET_TIME", payload: Math.floor((Date.now() - state.startTime) / 100) });
      }
    }, 100);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state.startTime, state.isWin]);

  const handleChange = useCallback((row, col, value) => {
    if (!state.boardData || state.boardData.puzzle[row][col] !== 0 || state.isWin) return;
    if (/^[1-9]$/.test(value) || value === "") {
      let newBoard = state.board.map((r) => [...r]);
      newBoard[row][col] = value === "" ? 0 : parseInt(value);
      dispatch({ type: "SET_BOARD", payload: newBoard });
      checkWin(newBoard);
    }
  }, [state.board, state.boardData, state.isWin, state.solution]);

  const checkWin = useCallback((currentBoard) => {
    if (!state.solution) return;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (currentBoard[i][j] !== state.solution[i][j]) return;
      }
    }
    dispatch({ type: "SET_WIN" });
  }, [state.solution]);

  const handlePlayAgain = useCallback(() => {
    const newData = generateBoard(removed);
    dispatch({ type: "NEW_GAME", payload: newData });
  }, [removed]);

  const handleGoLeaderboard = useCallback(() => {
    if (state.playerName.trim()) {
      navigate("/leaderboard");
    }
  }, [state.playerName, navigate]);

  if (!state.boardData) return null;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Sudoku Master</h1>
      <div className="text-lg mb-4">Time: {state.frozenTime !== null ? state.frozenTime : state.time}s</div>
      <div className="grid grid-cols-9 bg-gray-700 p-1 rounded">
        {state.board.map((row, i) =>
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
                disabled={state.boardData.puzzle[i][j] !== 0}
              />
            );
          })
        )}
      </div>
      {state.showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4">You Win!</h2>
            <p className="mb-2">Time: {state.frozenTime}s</p>
            <input
              type="text"
              placeholder="Enter your name"
              value={state.playerName}
              onChange={e => dispatch({ type: "SET_PLAYER_NAME", payload: e.target.value })}
              className="w-full mb-4 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleGoLeaderboard}
              className="w-full bg-purple-600 text-white py-2 rounded disabled:opacity-50"
              disabled={!state.playerName.trim()}
            >
              Go to Leaderboard
            </button>
            <button
              onClick={handlePlayAgain}
              className="w-full mt-2 bg-gray-300 text-gray-800 py-2 rounded"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
