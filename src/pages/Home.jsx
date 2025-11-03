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

    // map official team abbreviations to full names (extendable)
    const teamNames = {
      ATL: 'Atlanta Hawks', BOS: 'Boston Celtics', BKN: 'Brooklyn Nets', CHA: 'Charlotte Hornets', CHI: 'Chicago Bulls',
      CLE: 'Cleveland Cavaliers', DAL: 'Dallas Mavericks', DEN: 'Denver Nuggets', DET: 'Detroit Pistons', GSW: 'Golden State Warriors',
      HOU: 'Houston Rockets', IND: 'Indiana Pacers', LAC: 'LA Clippers', LAL: 'Los Angeles Lakers', MEM: 'Memphis Grizzlies',
      MIA: 'Miami Heat', MIL: 'Milwaukee Bucks', MIN: 'Minnesota Timberwolves', NOP: 'New Orleans Pelicans', NYK: 'New York Knicks',
      OKC: 'Oklahoma City Thunder', ORL: 'Orlando Magic', PHI: 'Philadelphia 76ers', PHX: 'Phoenix Suns', POR: 'Portland Trail Blazers',
      SAC: 'Sacramento Kings', SAS: 'San Antonio Spurs', TOR: 'Toronto Raptors', UTA: 'Utah Jazz', WSH: 'Washington Wizards'
    };

    // common aliases / nicknames mapping to abbreviations (lowercase keys)
    const aliasMap = {
      'bucks': 'MIL', 'milwaukee': 'MIL', 'milwaukee bucks': 'MIL',
      'warriors': 'GSW', 'golden state': 'GSW', 'golden state warriors': 'GSW',
      'lakers': 'LAL', 'clippers': 'LAC', 'suns': 'PHX', 'heat': 'MIA',
      'celtics': 'BOS', 'bulls': 'CHI', 'nets': 'BKN', 'raptors': 'TOR', 'knicks': 'NYK'
    };

    // helper to normalize team code or full name, and check aliases
    const teamMatchesQuery = (teamValue) => {
      if (!teamValue) return false;
      const code = String(teamValue).toUpperCase();
      const full = (teamNames[code] || teamValue).toLowerCase();
      const simple = String(teamValue).toLowerCase();

      // direct substring match against full name or raw value
      if (full.includes(q) || simple.includes(q)) return true;

      // alias map (exact or partial) — check if query maps to an abbreviation that equals the row code
      if (aliasMap[q]) {
        return aliasMap[q] === code;
      }

      // also check if any alias key is contained in the query or full name (helps with multi-word queries)
      for (const [alias, abbr] of Object.entries(aliasMap)) {
        if (q.includes(alias) && abbr === code) return true;
        if (full.includes(alias) && abbr === code) return true;
      }

      // finally, allow matching against the code itself
      return code.includes(q.toUpperCase());
    };

    return players.filter((p) => {
      const nameMatch = p.player && p.player.toLowerCase().includes(q);
      const rankMatch = p.rk && String(p.rk).includes(q);
      const teamMatch = teamMatchesQuery(p.team);

      return nameMatch || teamMatch || rankMatch;
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
                  placeholder="Search by name, team or rank..."
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
