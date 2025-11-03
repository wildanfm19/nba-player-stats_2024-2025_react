import { useEffect, useState, useMemo, useTransition } from "react";
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
      // Precompute a normalized name to make subsequent searches much cheaper
      const data = (response.data || []).map((p) => ({ ...p, _normalizedName: (p.player || '').normalize && p.player.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() }));
      setPlayers(data);
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
  const [_isPending, startTransition] = useTransition();

  // normalize function: remove diacritics and lower-case for reliable matching
  const normalize = (s) => {
    if (!s) return "";
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  };

  // Debounce the user input so we don't filter on every keystroke
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query), 500); // 500ms debounce
    return () => clearTimeout(t);
  }, [query]);

  // Memoize filtered results so filtering only runs when players or debouncedQuery change
  // To avoid recomputing diacritic stripping for every player on each filter, we'll rely on
  // a precomputed `_normalizedName` field added when players are fetched.
  const filteredPlayers = useMemo(() => {
    if (!debouncedQuery) return players;

    const q = normalize(debouncedQuery);

    // Only match player names now (ignore team and rank for this search mode)
    return players.filter((p) => {
      if (!p || !p.player) return false;
      // use precomputed normalized name when available
      const nameNorm = p._normalizedName || normalize(p.player);
      return nameNorm.includes(q);
    });
  }, [players, debouncedQuery]);

  // Simple client-side pagination to avoid rendering massive tables at once
  const [page, setPage] = useState(1);
  const pageSize = 30; // smaller page size to reduce DOM render cost

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
                  onChange={(e) => {
                    const v = e.target.value;
                    // Mark this update as low-priority so typing stays responsive
                    startTransition(() => setQuery(v));
                  }}
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
              <div className="mt-4 max-w-4xl mx-auto">
                <div className="flex items-center justify-center gap-4">
                  <div className="text-sm text-gray-600"><strong>Showing {Math.min(filteredPlayers.length, page * pageSize)} of {filteredPlayers.length}</strong></div>

                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-3 py-1 rounded border cursor-pointer bg-black text-white"
                  >Prev</button>

                  <div className="text-sm text-gray-600">Page {page} / {Math.max(1, Math.ceil(filteredPlayers.length / pageSize))}</div>

                  <button
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => setPage((p) => Math.min(Math.ceil(filteredPlayers.length / pageSize), p + 1))}
                    disabled={page >= Math.ceil(filteredPlayers.length / pageSize)}
                    className="px-3 py-1 rounded border cursor-pointer bg-black text-white"
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
