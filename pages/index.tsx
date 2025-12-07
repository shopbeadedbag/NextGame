import React, { useMemo, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Layout from '@/components/Layout';
import GamePlayer from '@/components/GamePlayer';
import GameGrid from '@/components/GameGrid';
import GameDescription from '@/components/GameDescription';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, SITE_CONFIG, GAME_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';
import { loadAllGames } from '@/utils/gameData';

interface HomePageProps {
  // Only pass minimal data needed for the homepage
  featuredGame: Game;
  gridGames: Game[]; // Only 32 games for the grid
  totalGames: number;
}

export default function HomePage({ featuredGame, gridGames, totalGames }: HomePageProps) {
  const { setGames } = useSearch();

  // Set games in context when component mounts
  React.useEffect(() => {
    // For search context, we might need all games, but let's load them on demand
    // For now, we'll set the grid games which should be sufficient for search
    setGames(gridGames);
  }, [gridGames, setGames]);

  // Handle cases where data might be missing
  if (!gridGames || gridGames.length === 0 || !featuredGame) {
    return (
      <Layout
        title={SITE_NAME}
        description={GAME_CONFIG.description}
        image={GAME_CONFIG.ogImage}
        type="website"
        url={SITE_URL}
        canonical={SITE_URL}
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading Games...</h1>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the games.</p>
        </div>
      </Layout>
    );
  }

  // Generate structured data for homepage
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Website Schema
      {
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_URL,
        "description": GAME_CONFIG.description,
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      // Organization Schema
      {
        "@type": "Organization",
        "name": SITE_NAME,
        "url": SITE_URL,
        "logo": {
          "@type": "ImageObject",
          "url": `${SITE_URL}/favicon.png`,
          "width": 512,
          "height": 512
        },
        "description": GAME_CONFIG.description,
        "sameAs": [
          "https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots"
        ]
      },
      // WebPage Schema for Homepage
      {
        "@type": "WebPage",
        "name": SITE_NAME,
        "description": GAME_CONFIG.description,
        "url": SITE_URL,
        "mainEntity": {
          "@type": "ItemList",
          "name": "Free Online Games",
          "description": "Discover and play the best free online games",
          "url": SITE_URL,
          "numberOfItems": gridGames.length,
          "itemListElement": gridGames.slice(0, 10).map((game, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "VideoGame",
              "name": game.title,
              "description": game.description,
              "image": game.thumb,
              "url": `${SITE_URL}/game/${game.id}`,
              "genre": game.category,
              "keywords": game.tags,
              "applicationCategory": "Game",
              "operatingSystem": "Web Browser",
              "playMode": "SinglePlayer"
            }
          }))
        }
      }
    ]
  };

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </Head>
      <Layout
        title={GAME_CONFIG.title}
        description={GAME_CONFIG.description}
        image={GAME_CONFIG.ogImage}
        type="website"
        url={SITE_URL}
        canonical={SITE_URL}
        games={gridGames}
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
    </>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> = async () => {
  try {
    // Load all games
    const allGames = await loadAllGames();

    // Get first game as featured game
    const featuredGame = allGames[0];

    // Get 32 games for the grid (excluding featured game)
    const gridGames = allGames
      .filter(game => game.id !== featuredGame.id)
      .slice(0, 32);

    return {
      props: {
        featuredGame,
        gridGames,
        totalGames: allGames.length,
      },
    };
  } catch (error) {
    console.error('Error loading home page data:', error);
    return {
      props: {
        featuredGame: null as any,
        gridGames: [],
        totalGames: 0,
      },
    };
  }
};