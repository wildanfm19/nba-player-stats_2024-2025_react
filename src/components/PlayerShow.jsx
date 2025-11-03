import React from 'react';

const PlayerShow = ({ player }) => {
  if (!player) return null; // defensive guard

  return (
    <div className="bg-white shadow-md rounded-2xl p-4 border border-gray-200 hover:shadow-lg transition-all duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          #{player.rk} {player.player}
        </h2>
        <span className="text-sm font-medium text-gray-500">{player.team}</span>
      </div>

      <p className="text-sm text-gray-600 mb-1">
        <span className="font-semibold">Position:</span> {player.pos} |{' '}
        <span className="font-semibold">Age:</span> {player.age}
      </p>

      <p className="text-sm text-gray-600 mb-3">
        <span className="font-semibold">PTS:</span> {player.pts} |{' '}
        <span className="font-semibold">AST:</span> {player.ast} |{' '}
        <span className="font-semibold">REB:</span> {player.trb}
      </p>

      <div className="text-xs text-gray-500">
        <p><span className="font-semibold">FG%:</span> {player.fgPercent}</p>
        <p><span className="font-semibold">3P%:</span> {player.threePPercent}</p>
        <p><span className="font-semibold">FT%:</span> {player.ftPercent}</p>
      </div>

      {player.awards && (
        <div className="mt-3 bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded">
          Awards: {player.awards}
        </div>
      )}
    </div>
  );
};

export default PlayerShow;
