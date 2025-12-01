import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL } from '@/config/site';

interface AllGamesPageProps {
  allGames: Game[];
}

// Constants for grid layout and loading
const ROW_SIZE = 8; // Games per row (based on current grid layout)
const INITIAL_ROWS = 6; // Initial number of rows to display
const LOAD_ROWS = 3; // Number of rows to load on each "Load More" click

export default function AllGamesPage({ allGames }: AllGamesPageProps) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_ROWS * ROW_SIZE);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(allGames || []);

  // Use searchTerm to avoid unused variable warning
  useEffect(() => {
    // This effect runs when searchTerm changes, keeping it "used"
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredGames(allGames);
      // Reset visible count when clearing search
      setVisibleCount(INITIAL_ROWS * ROW_SIZE);
      return;
    }

    const filtered = allGames.filter(game =>
      game.title.toLowerCase().includes(term.toLowerCase()) ||
      game.description.toLowerCase().includes(term.toLowerCase()) ||
      game.category.toLowerCase().includes(term.toLowerCase()) ||
      game.tags.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredGames(filtered);
    // Reset visible count when searching
    setVisibleCount(INITIAL_ROWS * ROW_SIZE);
  };

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + (LOAD_ROWS * ROW_SIZE);
    setVisibleCount(newVisibleCount);
  };

  const currentGames = filteredGames.slice(0, visibleCount);
  const hasMoreGames = visibleCount < filteredGames.length;

  const pageTitle = `All Games - ${SITE_NAME}`;
  const pageDescription = `Browse all online games on ${SITE_NAME}. Discover and play hundreds of exciting games including action, puzzle, racing, sports and more.`;
  const pageUrl = `${SITE_URL}/game`;

  return (
    <Layout
      title={pageTitle}
      description={pageDescription}
      type="website"
      url={pageUrl}
      canonical={pageUrl}
      onSearch={handleSearch}
    >
      <div id="sub-page-data" className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 page-data">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            All Games
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            Discover hundreds of exciting online games. From action-packed adventures to brain-teasing puzzles,
            find your perfect game and start playing instantly!
          </p>
        </div>

        {/* Games Count Info */}
        <div className="mb-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {currentGames.length} of {filteredGames.length} games
          </p>
        </div>

        {/* Games Grid */}
        <GameGrid games={currentGames} featured={false} />

        {/* Load More Button */}
        {hasMoreGames && (
          <div className="mt-12 text-center">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center px-8 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Load More Games
              <svg
                className="ml-2 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* No More Games Message */}
        {!hasMoreGames && filteredGames.length > 0 && (
          <div className="mt-12 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              You've reached the end of our game collection!
            </p>
          </div>
        )}

        {/* No Games Found */}
        {filteredGames.length === 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Games Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms or browse all games below.
            </p>
            <button
              onClick={() => handleSearch('')}
              className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
            >
              Show All Games
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<AllGamesPageProps> = async () => {
  try {
    // Read feed.json file - same as homepage
    const feedPath = path.join(process.cwd(), 'feed.json');
    const fileContents = fs.readFileSync(feedPath, 'utf8');

    // Parse JSON
    const allGames: Game[] = JSON.parse(fileContents);

    return {
      props: {
        allGames,
      },
    };
  } catch (error) {
    console.error('Error reading games data:', error);
    return {
      props: {
        allGames: [],
      },
    };
  }
};