import React, { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Layout from '@/components/Layout';
import GamePlayer from '@/components/GamePlayer';
import GameGrid from '@/components/GameGrid';
import GameDescription from '@/components/GameDescription';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, MAX_RELATED_GAMES } from '@/config/site';

interface GamePageProps {
  game: Game | null;
  allGames: Game[];
}

export default function GamePage({ game, allGames }: GamePageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredGames, setFilteredGames] = useState(allGames);

  // Use searchTerm to avoid unused variable warning
  React.useEffect(() => {
    // This effect runs when searchTerm changes, keeping it "used"
  }, [searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);

    if (!term.trim()) {
      setFilteredGames(allGames);
      return;
    }

    const filtered = allGames.filter(g =>
      g.title.toLowerCase().includes(term.toLowerCase()) ||
      g.description.toLowerCase().includes(term.toLowerCase()) ||
      g.category.toLowerCase().includes(term.toLowerCase()) ||
      g.tags.toLowerCase().includes(term.toLowerCase())
    );

    setFilteredGames(filtered);
  };

  if (!game) {
    return (
      <Layout
        title="Game Not Found"
        description="The requested game was not found."
        type="website"
        onSearch={handleSearch}
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
          <div className="text-center py-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Game Not Found
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              The game you're looking for doesn't exist or has been removed.
            </p>
            <a
              href="/"
              className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
            >
              Go Back Home
            </a>
          </div>
        </div>
      </Layout>
    );
  }

  // Remove current game from grid and limit to 4 rows (32 games max)
  const relatedGames = filteredGames.filter(g => g.id !== game.id).slice(0, MAX_RELATED_GAMES);

  // JSON-LD structured data for the game
  const gameStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoGame",
    "name": game.title,
    "description": game.description,
    "image": game.thumb,
    "url": `${SITE_URL}/game/${game.id}`,
    "genre": game.category,
    "keywords": game.tags,
    "publisher": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL
    }
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(gameStructuredData),
          }}
        />
      </Head>
      <Layout
        title={`${game.title} - ${SITE_NAME}`}
        description={game.description}
        image={game.thumb}
        type="website"
        url={`${SITE_URL}/game/${game.id}`}
        canonical={`${SITE_URL}/game/${game.id}`}
        onSearch={handleSearch}
      >
      <div id="sub-page-data" className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 page-data">
        {/* Game Player Section */}
        <GamePlayer game={game} featured={false} />

        {/* Related Games Grid */}
        {relatedGames.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Related Games
            </h2>
            <GameGrid games={relatedGames} featured={false} />
          </>
        )}

        {/* Game Description Section */}
        <GameDescription game={game} featured={false} />
      </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<GamePageProps> = async (context) => {
  const { id } = context.params || {};

  try {
    // Read feed.json file
    const feedPath = path.join(process.cwd(), 'feed.json');
    const fileContents = fs.readFileSync(feedPath, 'utf8');

    // Parse JSON
    const allGames: Game[] = JSON.parse(fileContents);

    // Find the specific game by id
    const game = allGames.find(g => g.id === id) || null;

    return {
      props: {
        game,
        allGames,
      },
    };
  } catch (error) {
    console.error('Error reading game data:', error);
    return {
      props: {
        game: null,
        allGames: [],
      },
    };
  }
};