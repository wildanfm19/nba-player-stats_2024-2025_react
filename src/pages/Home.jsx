import { useEffect, useState, useMemo } from "react";
import "../App.css";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Fade from "@mui/material/Fade";

// Components
import PlayersTable from "../components/PlayersTable";

function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch player data from backend
  const fetchPlayers = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:8080/api/player/stats/all");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  const [query, setQuery] = useState('');

  // Debounce the user input so we don't filter on every keystroke
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 500); // 500ms debounce
    return () => clearTimeout(t);
  }, [query]);

  // Memoize filtered results so filtering only runs when players or debouncedQuery change
  const filteredPlayers = useMemo(() => {
    if (!debouncedQuery) return players;
    const q = debouncedQuery.toLowerCase();

    // Only match player names now (ignore team and rank for this search mode)
    return players.filter((p) => {
      if (!p || !p.player) return false;
      return p.player.toLowerCase().includes(q);
    });
  }, [players, debouncedQuery]);

  // Simple client-side pagination to avoid rendering massive tables at once
  const [page, setPage] = useState(1);
  const pageSize = 100; // fixed page size to avoid extra state

  useEffect(() => {
    // reset to first page when filter or pageSize changes
    setPage(1);
  }, [debouncedQuery, pageSize]);

  const pagedPlayers = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredPlayers.slice(start, start + pageSize);
  }, [filteredPlayers, page, pageSize]);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Fade in={loading}>
            <div className="flex flex-col items-center">
              <CircularProgress color="primary" size={60} />
              <p className="mt-4 text-gray-500 text-lg">
                Loading player data...
              </p>
            </div>
          </Fade>
        </div>
      ) : (
        <>
          <div className="mx-auto mt-6 mb-4 px-4 py-3 rounded-md text-gray-500 my-3">
            <h1 className="text-3xl font-bold text-center">
              NBA 2024 - 25 Player Leaderboard — Advanced Stats & Highlights
            </h1>
          </div>

          <div className="px-6 pb-4 max-w-4xl mx-auto">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search players</label>
              <div className="relative">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {query && (
                  <button
                    onClick={() => setQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                    aria-label="Clear"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="px-6 pb-10">
            <PlayersTable players={pagedPlayers} />

            {/* Pagination controls */}
            {filteredPlayers.length > pageSize && (
              <div className="mt-4 flex items-center justify-between max-w-4xl mx-auto">
                <div className="text-sm text-gray-600">Showing {Math.min(filteredPlayers.length, page * pageSize)} of {filteredPlayers.length}</div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border"
                  >Prev</button>
                  <div className="text-sm">Page {page} / {Math.max(1, Math.ceil(filteredPlayers.length / pageSize))}</div>
                  <button
                    onClick={() => setPage((p) => Math.min(Math.ceil(filteredPlayers.length / pageSize), p + 1))}
                    disabled={page >= Math.ceil(filteredPlayers.length / pageSize)}
                    className="px-3 py-1 rounded border"
                  >Next</button>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
