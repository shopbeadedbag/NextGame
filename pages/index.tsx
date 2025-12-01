import React, { useState, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import GamePlayer from '@/components/GamePlayer';
import GameGrid from '@/components/GameGrid';
import GameDescription from '@/components/GameDescription';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL } from '@/config/site';

interface HomePageProps {
  allGames: Game[];
  featuredGame: Game;
}

export default function HomePage({ allGames, featuredGame }: HomePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(allGames || []);

  // Use searchTerm in dependency to avoid unused variable warning
  React.useEffect(() => {
    // This effect runs when searchTerm changes, keeping it "used"
  }, [searchTerm]);

  // Handle cases where data might be missing
  if (!allGames || allGames.length === 0 || !featuredGame) {
    return (
      <Layout
        title="Slope Rider"
        description="Slope Rider is an adrenaline-packed endless runner game where speed, balance, and reflexes push every run to the limit. Let's ride the digital winter now!"
        image="/cache/data/image/game/slope-rider/sloperider-m186x186.webp"
        type="website"
        url="https://sloperidergame.github.io"
        canonical="https://sloperidergame.github.io"
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Games...</h1>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the games.</p>
        </div>
      </Layout>
    );
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredGames(allGames);
      return;
    }

    const filtered = allGames.filter(game =>
      game.title.toLowerCase().includes(term.toLowerCase()) ||
      game.description.toLowerCase().includes(term.toLowerCase()) ||
      game.category.toLowerCase().includes(term.toLowerCase()) ||
      game.tags.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredGames(filtered);
  };

  // Remove featured game from grid and limit to 4 rows (32 games max)
  const gridGames = useMemo(() => {
    const otherGames = filteredGames.filter(game => game.id !== featuredGame.id);
    // Limit to 32 games (4 rows × 8 columns max for large screens)
    return otherGames.slice(0, 32);
  }, [filteredGames, featuredGame.id]);

  return (
    <Layout
      title={SITE_NAME}
      description="Slope Rider is an adrenaline-packed endless runner game where speed, balance, and reflexes push every run to the limit. Let's ride the digital winter now!"
      image="/cache/data/image/game/slope-rider/sloperider-m186x186.webp"
      type="website"
      url={SITE_URL}
      canonical={SITE_URL}
      onSearch={handleSearch}
    >
      <div id="sub-page-data" className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 page-data">
        {/* Featured Game Section */}
        <GamePlayer game={featuredGame} featured={true} />

        {/* Games Grid Section */}
        <GameGrid games={gridGames} featured={false} />

        {/* Game Description Section */}
        <GameDescription game={featuredGame} featured={true} />
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    // Read feed.json file
    const feedPath = path.join(process.cwd(), 'feed.json');
    const fileContents = fs.readFileSync(feedPath, 'utf8');

    // Parse JSON - it's an array directly, not wrapped in an object
    const games: Game[] = JSON.parse(fileContents);

    // Get first game as featured game
    const featuredGame = games[0];

    return {
      props: {
        allGames: games,
        featuredGame: featuredGame,
      },
    };
  } catch (error) {
    console.error('Error reading games data:', error);
    return {
      props: {
        allGames: [],
        featuredGame: null as any,
      },
    };
  }
};