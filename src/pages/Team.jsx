import React, { useEffect, useState, useMemo } from 'react'
import axios from 'axios'
import PlayersTable from '../components/PlayersTable'
import nbaLogo from '../assets/images/nba-logo.png'
const teamLogos = import.meta.glob('../assets/images/teams/*.{png,jpg,svg}', { eager: true, as: 'url' });

function getLogoFor(code) {
  if (!code) return nbaLogo;
  const pngKey = `../assets/images/teams/${code}.png`;
  const svgKey = `../assets/images/teams/${code}.svg`;
  const jpgKey = `../assets/images/teams/${code}.jpg`;
  return teamLogos[pngKey] || teamLogos[svgKey] || teamLogos[jpgKey] || nbaLogo;
}

const teamNames = {
  ATL: 'Atlanta Hawks', BOS: 'Boston Celtics', BRK: 'Brooklyn Nets', CHA: 'Charlotte Hornets', CHI: 'Chicago Bulls',
  CLE: 'Cleveland Cavaliers', DAL: 'Dallas Mavericks', DEN: 'Denver Nuggets', DET: 'Detroit Pistons', GSW: 'Golden State Warriors',
  HOU: 'Houston Rockets', IND: 'Indiana Pacers', LAC: 'LA Clippers', LAL: 'Los Angeles Lakers', MEM: 'Memphis Grizzlies',
  MIA: 'Miami Heat', MIL: 'Milwaukee Bucks', MIN: 'Minnesota Timberwolves', NOP: 'New Orleans Pelicans', NYK: 'New York Knicks',
  OKC: 'Oklahoma City Thunder', ORL: 'Orlando Magic', PHI: 'Philadelphia 76ers', PHX: 'Phoenix Suns', POR: 'Portland Trail Blazers',
  SAC: 'Sacramento Kings', SAS: 'San Antonio Spurs', TOR: 'Toronto Raptors', UTA: 'Utah Jazz', WSH: 'Washington Wizards'
}

const Team = () => {
  const [players, setPlayers] = useState([])
  const [selectedTeam, setSelectedTeam] = useState(null) // team code, e.g. 'MIL'

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const res = await axios.get('http://localhost:8080/api/player/stats/all')
        setPlayers(res.data || [])
      } catch (err) {
        console.error('Error fetching players for teams', err)
      }
    }

    fetchPlayers()
  }, [])

  // list of teams (use mapping keys) sorted by full name
  const teamsList = useMemo(() => {
    return Object.entries(teamNames)
      .map(([code, name]) => ({ code, name }))
      .sort((a, b) => a.name.localeCompare(b.name))
  }, [])

  // players for the selected team
  const teamPlayers = useMemo(() => {
    if (!selectedTeam) return []
    return players.filter((p) => String(p.team).toUpperCase() === selectedTeam)
  }, [players, selectedTeam])

  const teamAggregate = useMemo(() => {
    if (!teamPlayers.length) return null
    const count = teamPlayers.length
    const sum = teamPlayers.reduce(
      (acc, p) => {
        acc.pts += Number(p.pts) || 0
        acc.ast += Number(p.ast) || 0
        acc.trb += Number(p.trb) || 0
        acc.fg += Number(p.fgPercent) || 0
        acc.three += Number(p.threePPercent) || 0
        acc.ft += Number(p.ftPercent) || 0
        return acc
      },
      { pts: 0, ast: 0, trb: 0, fg: 0, three: 0, ft: 0 }
    )

    return {
      count,
      avgPts: (sum.pts / count) || 0,
      avgAst: (sum.ast / count) || 0,
      avgTrb: (sum.trb / count) || 0,
      avgFg: (sum.fg / count) || 0,
      avg3P: (sum.three / count) || 0,
      avgFt: (sum.ft / count) || 0,
    }
  }, [teamPlayers])

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="text-2xl font-bold mb-4">Teams</h2>

  {/* Team list */}
      {!selectedTeam && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {teamsList.map((t) => (
            <button
              key={t.code}
              onClick={() => setSelectedTeam(t.code)}
              className="flex items-center gap-3 text-left p-3 border rounded hover:shadow-md cursor-pointer"
            >
              <img src={getLogoFor(t.code)} alt={`${t.code} logo`} className="w-10 h-10 object-contain" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-sm text-gray-500">{t.code}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Selected team view */}
      {selectedTeam && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <button onClick={() => setSelectedTeam(null)} className="px-3 py-1 rounded border mr-2 mb-2 cursor-pointer">← Back</button>
              <span className="text-xl font-semibold flex items-center gap-3">
                <img src={getLogoFor(selectedTeam)} alt={`${selectedTeam} logo`} className="w-10 h-10 object-contain" />
                <span>{teamNames[selectedTeam]} ({selectedTeam})</span>
              </span>
            </div>
            {teamAggregate && (
              <div className="text-sm text-gray-700">
                Players: {teamAggregate.count} • Avg PTS: {teamAggregate.avgPts.toFixed(1)} • Avg AST: {teamAggregate.avgAst.toFixed(1)} • Avg TRB: {teamAggregate.avgTrb.toFixed(1)}
              </div>
            )}
          </div>

          {/* Reuse PlayersTable to show roster/stats */}
          <PlayersTable players={teamPlayers} />
        </div>
      )}
    </div>
  )
}

export default Team