import React, { useMemo, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


const API_URL = "http://localhost:3000";


export default function Leaderboard() {
  const location = useLocation();
  const newScore = location.state?.newScore;
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function addScoreAndFetch() {
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
        setScores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    addScoreAndFetch();
  }, []);

  const sortedScores = [...scores].sort((a, b) => a.time - b.time);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-purple-600 mb-6">Leaderboard</h1>
      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
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
