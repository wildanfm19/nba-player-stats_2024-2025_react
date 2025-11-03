import React from 'react';

const PlayerShow = ({ player }) => {
	if (!player) return null; // defensive guard

	return (
		<div className="bg-gray-800 shadow-md rounded-2xl p-4 border border-gray-700 hover:shadow-lg transition-all duration-300 text-white">
			<div className="flex justify-between items-center mb-2">
				<h2 className="text-xl font-semibold">
					#{player.rk} {player.player}
				</h2>
				<span className="text-sm font-medium text-gray-300">{player.team}</span>
			</div>

			<p className="text-sm text-gray-300 mb-1">
				<span className="font-semibold">Position:</span> {player.pos} |{' '}
				<span className="font-semibold">Age:</span> {player.age}
			</p>

			<p className="text-sm text-gray-300 mb-3">
				<span className="font-semibold">PTS:</span> {player.pts} |{' '}
				<span className="font-semibold">AST:</span> {player.ast} |{' '}
				<span className="font-semibold">REB:</span> {player.trb}
			</p>

			<div className="text-xs text-gray-300">
				<p><span className="font-semibold">FG%:</span> {player.fgPercent}</p>
				<p><span className="font-semibold">3P%:</span> {player.threePPercent}</p>
				<p><span className="font-semibold">FT%:</span> {player.ftPercent}</p>
			</div>

			{player.awards && (
				<div className="mt-3 bg-blue-700 text-white text-xs font-medium px-2 py-1 rounded">
					Awards: {player.awards}
				</div>
			)}
		</div>
	);
};

export default PlayerShow;
