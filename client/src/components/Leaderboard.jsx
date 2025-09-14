import React, { useMemo, useEffect, useCallback, useReducer } from "react";
import { useLocation } from "react-router-dom";


const API_URL = "http://localhost:3000";


const initialState = {
  scores: [],
  loading: true,
  error: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, scores: action.payload, error: null };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

export default function Leaderboard() {
  const location = useLocation();
  const newScore = location.state?.newScore;
  const [state, dispatch] = useReducer(reducer, initialState);

  const addScoreAndFetch = useCallback(async () => {
    dispatch({ type: "FETCH_START" });
    try {
      if (newScore && newScore.name && typeof newScore.time === "number") {
        await fetch(`${API_URL}/add`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newScore)
        });
      }
      const res = await fetch(`${API_URL}/leaderboard`);
      if (!res.ok) throw new Error("Failed to fetch leaderboard");
      const data = await res.json();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_ERROR", payload: err.message });
    }
  }, [newScore]);

  useEffect(() => {
    addScoreAndFetch();
  }, [addScoreAndFetch]);

  const sortedScores = useMemo(() => [...state.scores].sort((a, b) => a.time - b.time), [state.scores]);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Leaderboard</h1>
      {state.loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : state.error ? (
        <p className="text-lg text-red-600">{state.error}</p>
      ) : sortedScores.length === 0 ? (
        <p className="text-lg text-gray-600">No scores yet. Play a game first!</p>
      ) : (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Time (s)</th>
              </tr>
            </thead>
            <tbody>
              {sortedScores.map((entry, index) => (
                <tr
                  key={entry._id || index}
                  className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
                >
                  <td className="py-2 px-4 font-medium">{index + 1}</td>
                  <td className="py-2 px-4">{entry.name}</td>
                  <td className="py-2 px-4">{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
