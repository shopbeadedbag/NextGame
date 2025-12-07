import React, { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import Pagination from '@/components/Pagination';
import { Game, CategoryPageProps } from '@/types';
import { SITE_NAME, SITE_URL, GAME_CONFIG, SITE_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';
import { loadGamesByCategory, getAllCategories } from '@/utils/gameData';
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

interface CategoryPagePropsNew {
  games: MinimalGame[];
  categoryName: string;
  allCategories: string[];
  totalGamesInCategory: number;
  currentPage: number;
  hasSearch: boolean;
  searchQuery: string;
}

export default function CategoryPage({ games, categoryName, allCategories, totalGamesInCategory, currentPage, hasSearch, searchQuery }: CategoryPagePropsNew) {
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

    // If there's a search term from server, redirect to search page
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    }
  }, [searchTerm, games, hasSearch]);

  // Calculate pagination - now we use the total from props
  const totalPages = useMemo(() => {
    return Math.ceil(totalGamesInCategory / PAGINATION_CONFIG.PAGE_SIZE);
  }, [totalGamesInCategory]);

  // Current games are already filtered server-side
  const currentGames = filteredGames;

  // Reset to page 1 when search changes
  useEffect(() => {
    if (searchTerm.trim() && !hasSearch && currentPageFromProps !== 1) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`, undefined, { shallow: true });
    }
  }, [searchTerm, hasSearch, currentPageFromProps]);

  // Handle loading state
  if (router.isFallback) {
    return (
      <Layout
        title={`Loading... - ${SITE_NAME}`}
        description="Loading category page..."
        type="website"
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading...</h1>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the games.</p>
        </div>
      </Layout>
    );
  }

  // Handle category not found
  if (!games || games.length === 0) {
    return (
      <Layout
        title={`Category Not Found - ${SITE_NAME}`}
        description="This category does not exist or has no games."
        type="website"
        url={`${SITE_URL}/categories/${categoryName}`}
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Category Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            The category "{categoryName}" does not exist or has no games.
          </p>
          <Link
            href="/categories"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
          >
            Browse All Categories
          </Link>
        </div>
      </Layout>
    );
  }

  const pageTitle = `${categoryName} Games - ${SITE_NAME}`;
  const pageDescription = `Play the best ${categoryName.toLowerCase()} games on ${SITE_NAME}. Discover ${totalGamesInCategory} exciting ${categoryName.toLowerCase()} games including top titles and new releases. Free online games, instant play.`;
  const pageUrl = `${SITE_URL}/categories/${categoryName.toLowerCase()}`;

  // Generate structured data for category page
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
          "name": `${categoryName} Games`,
          "description": `Collection of ${categoryName.toLowerCase()} games`,
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
            "name": "Categories",
            "item": `${SITE_URL}/categories`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": categoryName,
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
          {/* Breadcrumb */}
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link href="/" className="hover:text-primary dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <Link href="/categories" className="hover:text-primary dark:hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-900 dark:text-white font-medium">{categoryName}</span>
              </li>
            </ol>
          </nav>

          {/* Category Header */}
          <div className="mb-8 text-center">
            <div className="text-5xl mb-4">{getCategoryIcon(categoryName)}</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {categoryName} Games
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
              Discover {totalGamesInCategory} amazing {categoryName.toLowerCase()} games. From classic favorites to new releases,
              find your next gaming adventure in our carefully curated collection.
            </p>

            {/* Games Count Info */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-blue-600 dark:text-blue-400 font-medium">
                Showing {games.length} of {totalGamesInCategory} {categoryName.toLowerCase()} games
                {hasSearch && ` for "${searchQuery}"`}
              </span>
            </div>
          </div>

          {/* Other Categories */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Other Categories</h2>
            <div className="flex flex-wrap gap-2">
              {allCategories
                .filter(cat => cat !== categoryName)
                .slice(0, 12)
                .map(cat => (
                  <Link
                    key={cat}
                    href={`/categories/${cat.toLowerCase()}`}
                    className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-primary hover:text-white transition-colors duration-200"
                  >
                    {getCategoryIcon(cat)}
                    <span className="ml-1">{cat}</span>
                  </Link>
                ))}
            </div>
          </div>

          {/* Games Grid */}
          <GameGrid games={currentGames} featured={false} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPageFromProps}
              totalPages={totalPages}
              baseUrl={`/categories/${categoryName.toLowerCase()}`}
              queryParams={hasSearch ? { search: searchQuery } : {}}
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
                  ? `No ${categoryName.toLowerCase()} games found for your search. Try adjusting your search terms.`
                  : `No games found in the ${categoryName.toLowerCase()} category.`
                }
              </p>
              {hasSearch && (
                <Link
                  href={`/categories/${categoryName.toLowerCase()}?page=1`}
                  className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
                >
                  Show All {categoryName} Games
                </Link>
              )}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}

// Helper function to get icons for categories
function getCategoryIcon(categoryName: string): string {
  const iconMap: { [key: string]: string } = {
    'Action': '⚔️',
    'Adventure': '🗺️',
    'Arcade': '🎮',
    'Puzzle': '🧩',
    'Racing': '🏎️',
    'Sports': '⚽',
    'Shooting': '🎯',
    'Strategy': '♟️',
    'Girls': '👸',
    'Hypercasual': '🎯',
    'Multiplayer': '👥',
    'Stickman': '🤺',
    'Soccer': '⚽',
    '3D': '🎮',
    'Clicker': '👆',
  };

  return iconMap[categoryName] || '🎮';
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const categoryParam = context.params?.category;
    const categoryName = Array.isArray(categoryParam) ? categoryParam[0] : categoryParam;
    const page = parseInt(context.query.page as string) || 1;
    const searchQuery = context.query.search as string || '';

    if (!categoryName) {
      return { notFound: true };
    }

    // Calculate offset
    const offset = (page - 1) * PAGINATION_CONFIG.PAGE_SIZE;

    // Use optimized data loading
    const allCategories = await getAllCategories();
    const { games, total } = await loadGamesByCategory(categoryName, PAGINATION_CONFIG.PAGE_SIZE, offset);

    // If no games found for this category, return 404
    if (total === 0) {
      return {
        props: {
          games: [],
          categoryName: categoryName,
          allCategories,
          totalGamesInCategory: 0,
          currentPage: page,
          hasSearch: !!searchQuery,
          searchQuery,
        },
      };
    }

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
        categoryName: games[0].category, // Use the actual case from the first game
        allCategories,
        totalGamesInCategory: total,
        currentPage: page,
        hasSearch: !!searchQuery,
        searchQuery,
      },
    };
  } catch (error) {
    console.error('Error loading category data:', error);
    return {
      props: {
        games: [],
        categoryName: context.params?.category || '',
        allCategories: [],
        totalGamesInCategory: 0,
        currentPage: 1,
        hasSearch: false,
        searchQuery: '',
      },
    };
  }
};