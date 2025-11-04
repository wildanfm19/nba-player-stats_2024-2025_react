import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import pointGuardPhoto from '../assets/images/position/PG.jpg'
import shootingGuardPhoto from '../assets/images/position/SG.jpg'
import smallForwardPhoto from '../assets/images/position/SF.jpg'
import powerForwardPhoto from '../assets/images/position/PF.jpg'
import centerPhoto from '../assets/images/position/C.jpg'

const positions = [
  { key: 'PG', label: 'Point Guard', photo: pointGuardPhoto },
  { key: 'SG', label: 'Shooting Guard'  , photo: shootingGuardPhoto},
  { key: 'SF', label: 'Small Forward' , photo: smallForwardPhoto},
  { key: 'PF', label: 'Power Forward' , photo : powerForwardPhoto},
  { key: 'C', label: 'Center' , photo: centerPhoto},
]

const Card = ({ pos }) => {
  const [imgError, setImgError] = useState(false)
  const imageSrc = pos.photo || ''
  

  return (
    <Link
      to={`/position/${pos.key}`}
      className="group block rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-2xl transform hover:-translate-y-1 transition-all w-full"
    >
      
      <div
        className="relative w-full bg-gray-200 overflow-hidden"
        style={{ aspectRatio: '16 / 9' }}
      >
        {imageSrc && !imgError ? (
          <>
            <img
              src={imageSrc}
              alt={pos.label}
              onError={() => setImgError(true)}
              loading="lazy"
              className="relative z-10 w-full h-full object-cover object-center block bg-gray-100"
            />
           
          </>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-3xl font-bold text-gray-700">{pos.key}</div>
          </div>
        )}
        {/* Hover text (appears on hover) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 pointer-events-none z-40">
          <div className="text-6xl font-extrabold text-white opacity-0 transform translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">{pos.key}</div>
          <div className="text-lg text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{pos.label}</div>
        </div>
      </div>
    </Link>
  )
}

const Position = () => {
  return (
    <div className="min-h-screen bg-white text-gray-800 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Browse by Position</h1>

        {/* First row: up to 3 cards as a grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {positions.slice(0, 3).map((pos) => (
            <Card key={pos.key} pos={pos} />
          ))}
        </div>

        {/* Second row: remaining cards centered */}
        {positions.length > 3 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-6">
            {positions.slice(3).map((pos) => (
              <div className="w-full sm:w-5/12" key={pos.key}>
                <Card pos={pos} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Position