import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GameCardProps } from '@/types';

const GameCard = React.memo(({ game, featured = false }: GameCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const slug = game.title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <Link href={`/game/${game.id}`} className="thumb-card group relative block h-full overflow-hidden rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1.5 will-change-transform">
      <div className="w-full overflow-hidden aspect-[4/3] relative">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
        )}
        {imageError ? (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <Image
            src={game.thumb}
            alt={game.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className={`object-cover transition-transform duration-300 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="px-2 py-2 title-game">
        <span className="text-sm md:text-base font-medium text-white group-hover:text-white transition-colors duration-300 line-clamp-2">
          {game.title}
        </span>
      </div>
    </Link>
  );
});

GameCard.displayName = 'GameCard';

export default GameCard;