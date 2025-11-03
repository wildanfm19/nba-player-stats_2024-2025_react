import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

// Components
import Header from './components/Header';
import Nav from './components/Nav';
import PlayerShow from './components/playerShow';
import PlayersTable from './components/PlayersTable';


function App() {
  const [players, setPlayers] = useState([]);

  // Fetch player data from backend
  const fetchPlayers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/player/stats/all");
      setPlayers(response.data);
    } catch (error) {
      console.error("Error fetching players:", error);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // We'll render all players using the MUI table PlayerShow component

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Header */}
  

      {/* Unified top bar: Header (left) + Nav (right) with matching background */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-blue-900 via-blue-800 to-blue-400 border-b border-gray-300 shadow-lg">
        <div className="mx-auto flex items-center justify-between px-6 py-4 text-white topbar-text-shadow">
          <Header />
          <Nav />
        </div>
      </div>

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-blue-700 mt-6 mb-4">
        NBA Player Stats 2025
      </h1>

      {/* Players Table (MUI) */}
      <div className="px-6 pb-10">
        <PlayersTable players={players} />
      </div>
    </div>
  );
}

export default App;
