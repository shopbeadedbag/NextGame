import React from 'react';
import { Game } from '@/types';
import GameCard from './GameCard';

interface GameGridProps {
  games: Game[];
  featured?: boolean;
}

export default function GameGrid({ games, featured = false }: GameGridProps) {
  if (!games || games.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No games found</p>
      </div>
    );
  }

  return (
    <div className="text-center mb-8 space-y-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 sm:gap-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
        {games.map((game) => (
          <GameCard
            key={game.id}
            game={game}
            featured={featured}
          />
        ))}
      </div>

      <div className="mt-8 mb-6 hidden">
        <div className="rounded-lg rounded-b-none overflow-hidden bg-gray-100">
          <div className="text-center text-gray-500/50 text-sm px-3 py-0">
            Advertisement
          </div>
        </div>
      </div>
    </div>
  );
}