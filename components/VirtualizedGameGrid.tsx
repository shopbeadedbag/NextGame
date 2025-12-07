import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Game } from '@/types';
import GameCard from './GameCard';

interface VirtualizedGameGridProps {
  games: Game[];
  featured?: boolean;
  itemHeight?: number; // Height of each row in pixels
  overscan?: number; // Number of rows to render outside visible area
}

export default function VirtualizedGameGrid({
  games,
  featured = false,
  itemHeight = 280, // Estimated height of each game card row
  overscan = 3
}: VirtualizedGameGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollTop, setScrollTop] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);

  // Calculate items per row based on container width
  const [itemsPerRow, setItemsPerRow] = useState(8); // Default to 8 items per row

  // Calculate total rows
  const totalRows = Math.ceil(games.length / itemsPerRow);

  // Calculate visible range
  const startRow = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan);
  const endRow = Math.min(
    totalRows - 1,
    Math.ceil((scrollTop + containerHeight) / itemHeight) + overscan
  );

  // Calculate visible games
  const visibleGames = useMemo(() => {
    const startIndex = startRow * itemsPerRow;
    const endIndex = Math.min((endRow + 1) * itemsPerRow, games.length);
    return games.slice(startIndex, endIndex);
  }, [games, startRow, endRow, itemsPerRow]);

  // Calculate offset for padding
  const topOffset = startRow * itemHeight;
  const bottomOffset = (totalRows - endRow - 1) * itemHeight;

  // Handle scroll event
  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      setScrollTop(containerRef.current.scrollTop);
    }
  }, []);

  // Handle resize to update container height and items per row
  const handleResize = useCallback(() => {
    if (containerRef.current) {
      const width = containerRef.current.clientWidth;
      setContainerHeight(containerRef.current.clientHeight);

      // Calculate items per row based on container width
      if (width < 640) {
        setItemsPerRow(2); // 2 columns on mobile
      } else if (width < 768) {
        setItemsPerRow(4); // 4 columns on small screens
      } else if (width < 1024) {
        setItemsPerRow(6); // 6 columns on medium screens
      } else if (width < 1280) {
        setItemsPerRow(7); // 7 columns on large screens
      } else {
        setItemsPerRow(8); // 8 columns on extra large screens
      }
    }
  }, []);

  // Set up event listeners and initial measurements
  useEffect(() => {
    handleResize();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      window.addEventListener('resize', handleResize);

      return () => {
        container.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', handleResize);
      };
    }
  }, [handleScroll, handleResize]);

  if (!games || games.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No games found</p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="overflow-auto relative"
      style={{ height: '600px' }} // Fixed height for scrollable container
    >
      {/* Top padding */}
      {topOffset > 0 && <div style={{ height: `${topOffset}px` }} />}

      {/* Visible games grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-8 sm:gap-3 gap-3 md:gap-4 lg:gap-5 xl:gap-6">
        {visibleGames.map((game, index) => (
          <GameCard
            key={`${game.id}-${startRow * itemsPerRow + index}`}
            game={game}
            featured={featured}
          />
        ))}
      </div>

      {/* Bottom padding */}
      {bottomOffset > 0 && <div style={{ height: `${bottomOffset}px` }} />}

    </div>
  );
}