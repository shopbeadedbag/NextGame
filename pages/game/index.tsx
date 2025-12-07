import React, { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import Pagination from '@/components/Pagination';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, GAME_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';
import { searchGames } from '@/utils/gameData';
import { PAGINATION_CONFIG } from '@/config/pagination';

// Minimal game data for the list
interface MinimalGame {
  id: string;
  title: string;
  description: string;
  thumb: string;
  category: string;
  tags: string;
  url: string;
}

interface AllGamesPageProps {
  games: MinimalGame[];
  totalGames: number;
  currentPage: number;
  hasSearch: boolean;
  searchQuery: string;
}

export default function AllGamesPage({ games, totalGames, currentPage, hasSearch, searchQuery }: AllGamesPageProps) {
  const router = useRouter();
  const { searchTerm } = useSearch();
  const [filteredGames, setFilteredGames] = useState(games || []);

  // Use the current page from props (server-side calculated)
  const currentPageFromProps = currentPage;

  // Filter games based on search term
  useEffect(() => {
    if (!hasSearch) {
      setFilteredGames(games);
      return;
    }

    // If there's a search term from server, we need to redirect to search page
    // since we don't have all games data client-side anymore
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    }
  }, [searchTerm, games, hasSearch]);

  // Calculate pagination - now we use the total from props
  const totalPages = useMemo(() => {
    return Math.ceil(totalGames / PAGINATION_CONFIG.PAGE_SIZE);
  }, [totalGames]);

  // Current games are already filtered server-side
  const currentGames = filteredGames;

  // Reset to page 1 when search changes
  useEffect(() => {
    if (searchTerm.trim() && !hasSearch && currentPageFromProps !== 1) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    }
  }, [searchTerm, hasSearch, currentPageFromProps]);

  const pageTitle = `All Games - ${SITE_NAME}`;
  const pageDescription = `Browse all online games on ${SITE_NAME}. Discover and play hundreds of exciting games including action, puzzle, racing, sports and more.`;
  const pageUrl = `${SITE_URL}/game`;

  // Generate structured data for all games page
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
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
      {
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": pageUrl,
        "mainEntity": {
          "@type": "ItemList",
          "name": "All Games",
          "description": "Complete collection of online games",
          "url": pageUrl,
          "numberOfItems": filteredGames.length,
          "itemListElement": currentGames.slice(0, 10).map((game, index) => ({
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
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": SITE_URL
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "All Games",
            "item": pageUrl
          }
        ]
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
        title={pageTitle}
        description={pageDescription}
        type="website"
        url={pageUrl}
        canonical={pageUrl}
        games={games}
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
              Showing {games.length} of {totalGames} games
              {hasSearch && ` for "${searchQuery}"`}
            </p>
          </div>

          {/* Games Grid */}
          <GameGrid games={currentGames} featured={false} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPageFromProps}
              totalPages={totalPages}
              baseUrl="/game"
              queryParams={hasSearch ? { search: searchTerm } : {}}
            />
          )}

          {/* No Games Found */}
          {games.length === 0 && (
            <div className="mt-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No Games Found
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {hasSearch
                  ? `No games found for your search. Try adjusting your search terms.`
                  : 'No games available at the moment.'
                }
              </p>
              {hasSearch && (
                <Link
                  href="/game?page=1"
                  className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
                >
                  Show All Games
                </Link>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<AllGamesPageProps> = async (context) => {
  try {
    // Get page from query params
    const page = parseInt(context.query.page as string) || 1;
    const searchQuery = context.query.search as string || '';

    // Calculate offset
    const offset = (page - 1) * PAGINATION_CONFIG.PAGE_SIZE;

    // Load only the games for current page
    const { games, total } = await searchGames(searchQuery, PAGINATION_CONFIG.PAGE_SIZE, offset);

    // Transform to minimal game data
    const minimalGames: MinimalGame[] = games.map(game => ({
      id: game.id,
      title: game.title,
      description: game.description,
      thumb: game.thumb,
      category: game.category,
      tags: game.tags,
      url: game.url,
    }));

    return {
      props: {
        games: minimalGames,
        totalGames: total,
        currentPage: page,
        hasSearch: !!searchQuery,
        searchQuery,
      },
    };
  } catch (error) {
    console.error('Error loading games data:', error);
    return {
      props: {
        games: [],
        totalGames: 0,
        currentPage: 1,
        hasSearch: false,
        searchQuery: '',
      },
    };
  }
};