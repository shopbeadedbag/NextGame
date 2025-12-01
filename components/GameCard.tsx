import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { GameCardProps } from '@/types';

export default function GameCard({ game, featured = false }: GameCardProps) {
  const slug = game.title.toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  return (
    <Link href={`/game/${game.id}`} className="thumb-card group relative block h-full overflow-hidden rounded-xl bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md shadow-lg hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1.5 will-change-transform">
      <div className="w-full overflow-hidden aspect-[4/3]">
        <img
          src={game.thumb}
          alt={game.title}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <div className="px-2 py-2 title-game">
        <span className="text-sm md:text-base font-medium text-primary group-hover:text-primary-hover transition-colors duration-300 line-clamp-2">
          {game.title}
        </span>
      </div>
    </Link>
  );
}