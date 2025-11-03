import { useEffect, useState } from "react";
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

          <div className="px-6 pb-10">
            <PlayersTable players={players} />
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
