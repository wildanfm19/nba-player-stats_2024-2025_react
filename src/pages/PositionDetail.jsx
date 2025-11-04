import React, { useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import PlayersTable from '../components/PlayersTable'
import { usePlayers } from '../context/PlayersContext'

const PositionDetail = () => {
  const { pos } = useParams()
  const { players, loading } = usePlayers()

  // The dataset uses `pos` or `position` depending on backend; check both
  const normalizedPos = (pos || '').toUpperCase()

  const filtered = useMemo(() => {
    if (!normalizedPos) return players
    return players.filter((p) => {
      // Accept either `pos`, `position`, or `primaryPosition` fields
      const candidate = (p.pos || p.position || p.primaryPosition || '')
      return String(candidate).toUpperCase() === normalizedPos
    })
  }, [players, normalizedPos])

  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-8">
      {loading ? (
        <div className="flex flex-col items-center justify-center min-h-screen">
          <Fade in={loading}>
            <div className="flex flex-col items-center">
              <CircularProgress color="primary" size={56} />
              <p className="mt-3 text-gray-500">Loading players...</p>
            </div>
          </Fade>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link to="/position" className="text-sm text-blue-600">← Back</Link>
            <h2 className="text-2xl font-bold">{normalizedPos} — Players</h2>
            <div className="text-sm text-gray-600">({filtered.length} players)</div>
          </div>

          <PlayersTable players={filtered} />
        </div>
      )}
    </div>
  )
}

export default PositionDetail
