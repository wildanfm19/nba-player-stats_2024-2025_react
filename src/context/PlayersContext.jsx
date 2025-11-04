import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import axios from 'axios'

const PlayersContext = createContext(null)

export const usePlayers = () => {
  const ctx = useContext(PlayersContext)
  if (!ctx) throw new Error('usePlayers must be used within PlayersProvider')
  return ctx
}

export const PlayersProvider = ({ children }) => {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const fetchPlayers = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await axios.get(`${API_BASE_URL}/api/player/stats/all`)
      const data = (res.data || []).map((p) => ({
        ...p,
        _normalizedName: (p.player || '')?.normalize ? p.player.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : (p.player || '').toLowerCase(),
      }))
      setPlayers(data)
    } catch (err) {
      console.error('Failed to fetch players in PlayersProvider', err)
      setError(err)
    } finally {
      setLoading(false)
    }
  }, [API_BASE_URL])

  useEffect(() => {
    fetchPlayers()
  }, [fetchPlayers])

  const value = { players, loading, error, refetch: fetchPlayers }

  return <PlayersContext.Provider value={value}>{children}</PlayersContext.Provider>
}

export default PlayersContext
