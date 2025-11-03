import React from 'react'
import { Link } from 'react-router-dom'
import nbaLogo from '../assets/images/nba-logo.png'

const positions = [
  { key: 'PG', label: 'Point Guard' },
  { key: 'SG', label: 'Shooting Guard' },
  { key: 'SF', label: 'Small Forward' },
  { key: 'PF', label: 'Power Forward' },
  { key: 'C', label: 'Center' },
]

const Position = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Browse by Position</h1>

        {/* First row: up to 3 cards as a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.slice(0, 3).map((pos) => (
            <Link
              key={pos.key}
              to={`/position/${pos.key}`}
              className="group block rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white"
            >
              <div className="flex items-center gap-6 p-4">
                {/* Large photo area on the left */}
                <div className="w-40 h-40 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img src={nbaLogo} alt="logo" className="w-full h-full object-cover" />
                </div>

                {/* Textual content on the right */}
                <div className="flex-1">
                  <div className="text-4xl font-extrabold text-black tracking-tight">{pos.key}</div>
                  <div className="text-lg text-gray-600 mt-1">{pos.label}</div>
                  <div className="mt-4 text-sm text-gray-500 opacity-70">Click to view all {pos.label} players in a table.</div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Second row: remaining cards centered */}
        {positions.length > 3 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            {positions.slice(3).map((pos) => (
              <Link
                key={pos.key}
                to={`/position/${pos.key}`}
                className="group block rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all bg-white w-full sm:w-auto max-w-2xl"
              >
                <div className="flex items-center gap-6 p-4">
                  <div className="w-40 h-40 shrink-0 rounded-md overflow-hidden bg-gray-100 flex items-center justify-center">
                    <img src={nbaLogo} alt="logo" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="text-4xl font-extrabold text-black tracking-tight">{pos.key}</div>
                    <div className="text-lg text-gray-600 mt-1">{pos.label}</div>
                    <div className="mt-4 text-sm text-gray-500 opacity-70">Click to view all {pos.label} players in a table.</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Position