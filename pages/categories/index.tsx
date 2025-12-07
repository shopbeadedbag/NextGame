import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, GAME_CONFIG, SITE_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';
import { loadAllGames } from '@/utils/gameData';

// Minimal game data for category preview
interface MinimalGame {
  id: string;
  title: string;
  thumb: string;
  category: string;
}

interface CategoryData {
  name: string;
  count: number;
  // Only store 4 games for preview instead of all games
  previewGames: MinimalGame[];
}

interface CategoriesPageProps {
  categories: CategoryData[];
  allGamesCount: number;
  // We don't need all games here, just the count
}

export default function CategoriesPage({ categories, allGamesCount }: CategoriesPageProps) {
  const { searchTerm } = useSearch();

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageTitle = `Game Categories - ${SITE_NAME}`;
  const pageDescription = `Browse games by category on ${SITE_NAME}. Find your favorite game types including Action, Adventure, Puzzle, Racing, Sports and more.`;
  const pageUrl = `${SITE_URL}/categories`;

  // Generate structured data for categories listing page
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
      // WebPage Schema for Categories
      {
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": pageUrl,
        "mainEntity": {
          "@type": "ItemList",
          "name": "Game Categories",
          "description": "List of all game categories",
          "url": pageUrl,
          "numberOfItems": filteredCategories.length,
          "itemListElement": filteredCategories.slice(0, 10).map((category, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Thing",
              "name": category.name,
              "url": `${SITE_URL}/categories/${encodeURIComponent(category.name.toLowerCase())}`,
              "description": `${category.count} games in ${category.name} category`
            }
          }))
        }
      },
      // BreadcrumbList Schema
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
      >
      <div id="sub-page-data" className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 page-data">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Game Categories
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            Explore our extensive collection of games organized by category. From action-packed adventures to brain-teasing puzzles,
            find games that match your interests perfectly.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              {filteredCategories.length} Categories • {allGamesCount} Games
            </span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            All Categories
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredCategories.map((category) => (
              <Link
                key={category.name}
                href={`/categories/${encodeURIComponent(category.name.toLowerCase())}`}
                className="group block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {getCategoryIcon(category.name)}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {category.count} games
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* No Categories Found */}
        {filteredCategories.length === 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Categories Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Try adjusting your search terms.
            </p>
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

export const getServerSideProps: GetServerSideProps<CategoriesPageProps> = async () => {
  try {
    // Load all games
    const allGames = await loadAllGames();

    // Group games by category
    const categoryMap = new Map<string, Game[]>();

    allGames.forEach(game => {
      const category = game.category || 'Uncategorized';
      if (!categoryMap.has(category)) {
        categoryMap.set(category, []);
      }
      categoryMap.get(category)!.push(game);
    });

    // Convert to array and sort by game count (descending)
    // Only keep 4 games for preview to reduce data size
    const categories: CategoryData[] = Array.from(categoryMap.entries())
      .map(([name, games]) => ({
        name: name || 'Uncategorized',
        count: games.length,
        // Only take first 4 games for preview
        previewGames: games.slice(0, 4).map(game => ({
          id: game.id,
          title: game.title,
          thumb: game.thumb,
          category: game.category,
        })),
      }))
      .sort((a, b) => b.count - a.count);

    return {
      props: {
        categories,
        allGamesCount: allGames.length,
      },
    };
  } catch (error) {
    console.error('Error reading categories data:', error);
    return {
      props: {
        categories: [],
        allGamesCount: 0,
      },
    };
  }
};