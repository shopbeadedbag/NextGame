import React, { useState, useEffect } from 'react';
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
import { useSearch } from '@/contexts/SearchContext';

interface GamePageProps {
  game: Game | null;
  allGames: Game[];
}

export default function GamePage({ game, allGames }: GamePageProps) {
  const { setGames } = useSearch();

  // Set games in context when component mounts
  useEffect(() => {
    setGames(allGames);
  }, [allGames, setGames]);

  if (!game) {
    return (
      <Layout
        title="Game Not Found"
        description="The requested game was not found."
        type="website"
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
  const relatedGames = allGames.filter(g => g.id !== game.id).slice(0, MAX_RELATED_GAMES);

  // Get popular games (excluding current game) - top 32 games by simple criteria
  // Use a stable sorting algorithm to avoid hydration errors
  const popularGames = allGames
    .filter(g => g.id !== game.id)
    .sort((a, b) => {
      // Sort by title length first, then by title alphabetically for stable sorting
      const lengthDiff = (100 - a.title.length) - (100 - b.title.length);
      if (lengthDiff !== 0) return lengthDiff;
      return a.title.localeCompare(b.title);
    })
    .slice(0, 32); // 4 rows × 8 games per row

  // Generate breadcrumb list
  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": SITE_NAME,
        "item": SITE_URL
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Games",
        "item": `${SITE_URL}/game`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": game.title,
        "item": `${SITE_URL}/game/${game.id}`
      }
    ]
  };

  // Generate complete structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      // Website Schema
      {
        "@type": "WebSite",
        "name": SITE_NAME,
        "url": SITE_URL,
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
        "sameAs": [
          "https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots"
        ]
      },
      // WebPage Schema
      {
        "@type": "WebPage",
        "name": `${game.title} - ${SITE_NAME}`,
        "description": game.description,
        "url": `${SITE_URL}/game/${game.id}`,
        "mainEntity": {
          "@type": "VideoGame",
          "name": game.title,
          "description": game.description,
          "image": game.thumb,
          "url": `${SITE_URL}/game/${game.id}`,
          "genre": game.category,
          "keywords": game.tags,
          "applicationCategory": "Game",
          "operatingSystem": "Web Browser",
          "playMode": "SinglePlayer",
          "publisher": {
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL
          },
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.2",
            "ratingCount": "500",
            "bestRating": "5",
            "worstRating": "1"
          }
        }
      },
      // VideoGame Schema
      {
        "@context": "https://schema.org",
        "@type": "VideoGame",
        "name": game.title,
        "description": game.description,
        "image": {
          "@type": "ImageObject",
          "url": game.thumb,
          "width": 512,
          "height": 384
        },
        "url": `${SITE_URL}/game/${game.id}`,
        "genre": game.category,
        "keywords": game.tags,
        "applicationCategory": "Game",
        "operatingSystem": "Web Browser",
        "playMode": "SinglePlayer",
        "publisher": {
          "@type": "Organization",
          "name": SITE_NAME,
          "url": SITE_URL,
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/favicon.png`,
            "width": 512,
            "height": 512
          }
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.2",
          "ratingCount": "500",
          "bestRating": "5",
          "worstRating": "1"
        },
        "datePublished": "2024-01-01T00:00:00.000Z", // Fixed date to avoid hydration error
        "inLanguage": "en-US",
        "isAccessibleForFree": true
      },
      // BreadcrumbList Schema
      breadcrumbList
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
        title={`${game.title} - ${SITE_NAME}`}
        description={game.description}
        image={game.thumb}
        type="website"
        url={`${SITE_URL}/game/${game.id}`}
        canonical={`${SITE_URL}/game/${game.id}`}
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

        {/* Popular Games Section */}
        {popularGames.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
              Popular Games
            </h2>
            <GameGrid games={popularGames} featured={false} />
          </>
        )}
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