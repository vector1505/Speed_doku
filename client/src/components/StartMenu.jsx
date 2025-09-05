import React from 'react'
import { useNavigate } from 'react-router-dom'
import SudokuMasterApp from './SudokuMasterApp';

const StartMenu = () => {
  const navigate = useNavigate();
  const difficulties = [
    { name: "Easy", removed: 5, color: "text-green-600", icon: "⚡" },
    { name: "Medium", removed: 45, color: "text-yellow-600", icon: "⏱️" },
    { name: "Hard", removed: 50, color: "text-red-600", icon: "🔥" },
  ];

  const handleSelect = (level) => { 
    navigate("/Sudoku", { state: { removed: level.removed, difficulty: level.name } });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-purple-600">Speed_Doku</h1>
        <p className="text-gray-600 mt-2">
          Challenge your mind with classic Sudoku puzzles, with a speedy twist!
        </p>

        <div className="mt-10 bg-white shadow-md rounded-xl p-6 max-w-sm mx-auto">
          <h2 className="text-xl font-semibold mb-4">Choose Difficulty</h2>
          <div className="space-y-3">
            {difficulties.map((level) => (
              <button
                key={level.name}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg border transition"
                onClick={() => handleSelect(level)}
              >
                <div className="flex items-center gap-2">
                  <span className={level.color}>{level.icon}</span>
                  <span className="font-medium">{level.name}</span>
                </div>
                <span className="text-gray-500 text-sm">{level.removed} cells removed</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartMenu
