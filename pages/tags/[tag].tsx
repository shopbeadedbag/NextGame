import React, { useState, useEffect, useMemo } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import Pagination from '@/components/Pagination';
import { Game, TagPageProps } from '@/types';
import { SITE_NAME, SITE_URL, GAME_CONFIG, SITE_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';
import { loadGamesByTag, getAllTags } from '@/utils/gameData';
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

interface TagPagePropsNew {
  games: MinimalGame[];
  tagName: string;
  allTags: string[];
  relatedTags: string[];
  totalGamesWithTag: number;
  currentPage: number;
  hasSearch: boolean;
  searchQuery: string;
}

export default function TagPage({ games, tagName, allTags, relatedTags, totalGamesWithTag, currentPage, hasSearch, searchQuery }: TagPagePropsNew) {
  const router = useRouter();
  const { searchTerm } = useSearch();
  const [filteredGames, setFilteredGames] = useState(games || []);

  // Get current page from query params, default to 1
  const currentPage = useMemo(() => {
    const page = parseInt(router.query.page as string);
    return isNaN(page) || page < 1 ? 1 : page;
  }, [router.query.page]);

  // Filter games based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredGames(games);
      return;
    }

    const filtered = games.filter(game =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredGames(filtered);
  }, [searchTerm, games]);

  // Calculate pagination
  const totalPages = useMemo(() => {
    return Math.ceil(filteredGames.length / PAGINATION_CONFIG.PAGE_SIZE);
  }, [filteredGames.length]);

  // Get games for current page
  const currentGames = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGINATION_CONFIG.PAGE_SIZE;
    const endIndex = startIndex + PAGINATION_CONFIG.PAGE_SIZE;
    return filteredGames.slice(startIndex, endIndex);
  }, [filteredGames, currentPage]);

  // Reset to page 1 when search changes
  useEffect(() => {
    if (searchTerm.trim() && currentPage !== 1) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
      router.push(`/tags/${tagSlug}?page=1`, undefined, { shallow: true });
    }
  }, [searchTerm]);

  // Handle loading state
  if (router.isFallback) {
    return (
      <Layout
        title={`Loading... - ${SITE_NAME}`}
        description="Loading tag page..."
        type="website"
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Loading...</h1>
          <p className="text-gray-600 dark:text-gray-300">Please wait while we load the games.</p>
        </div>
      </Layout>
    );
  }

  // Handle tag not found
  if (!games || games.length === 0) {
    return (
      <Layout
        title={`Tag Not Found - ${SITE_NAME}`}
        description="This tag does not exist or has no games."
        type="website"
        url={`${SITE_URL}/tags/${encodeURIComponent(tagName.toLowerCase().replace(/\s+/g, '-'))}`}
      >
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Tag Not Found
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
            The tag "{tagName}" does not exist or has no games.
          </p>
          <Link
            href="/tags"
            className="inline-flex items-center px-6 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
          >
            Browse All Tags
          </Link>
        </div>
      </Layout>
    );
  }

  const pageTitle = `${tagName} Games - ${SITE_NAME}`;
  const pageDescription = `Play the best ${tagName.toLowerCase()} games on ${SITE_NAME}. Discover ${totalGamesWithTag} exciting games tagged with ${tagName.toLowerCase()}. Free online games, instant play.`;
  const pageUrl = `${SITE_URL}/tags/${encodeURIComponent(tagName.toLowerCase().replace(/\s+/g, '-'))}`;

  // Generate structured data for tag page
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
          "name": `${tagName} Games`,
          "description": `Collection of games tagged with ${tagName}`,
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
            "name": "Tags",
            "item": `${SITE_URL}/tags`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": tagName,
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
              <Link href="/tags" className="hover:text-primary dark:hover:text-primary transition-colors">
                Tags
              </Link>
            </li>
            <li className="flex items-center">
              <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-gray-900 dark:text-white font-medium">{tagName}</span>
            </li>
          </ol>
        </nav>

        {/* Tag Header */}
        <div className="mb-8 text-center">
          <div className="text-5xl mb-4">{getTagIcon(tagName)}</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {tagName} Games
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-6">
            Explore {filteredGames.length} amazing games tagged with "{tagName}". From popular favorites
            to hidden gems, discover games that match your interests perfectly.
          </p>

          {/* Games Count Info */}
          <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-green-600 dark:text-green-400 font-medium">
              Showing {currentGames.length} of {filteredGames.length} {tagName.toLowerCase()} games
            </span>
          </div>
        </div>

        {/* Related Tags */}
        {relatedTags.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Related Tags</h2>
            <div className="flex flex-wrap gap-2">
              {relatedTags.map(relatedTag => (
                <Link
                  key={relatedTag}
                  href={`/tags/${encodeURIComponent(relatedTag.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="inline-flex items-center px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-700 dark:hover:text-green-300 transition-colors duration-200"
                >
                  {getTagIcon(relatedTag)}
                  <span className="ml-1">{relatedTag}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Popular Categories for This Tag */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Popular Categories</h2>
          <div className="flex flex-wrap gap-2">
            {getPopularCategoriesForTag(games).map(category => (
              <Link
                key={category}
                href={`/categories/${category.toLowerCase()}`}
                className="inline-flex items-center px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors duration-200"
              >
                {getCategoryIcon(category)}
                <span className="ml-1">{category}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Games Grid */}
        <GameGrid games={currentGames} featured={false} />

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/tags/${encodeURIComponent(tagName.toLowerCase().replace(/\s+/g, '-'))}`}
            queryParams={searchTerm.trim() ? { search: searchTerm } : {}}
          />
        )}

        {/* No Games Found */}
        {filteredGames.length === 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Games Found
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm.trim()
                ? `No ${tagName.toLowerCase()} games found for "${searchTerm}". Try adjusting your search terms.`
                : `No games found with the ${tagName.toLowerCase()} tag.`
              }
            </p>
            {searchTerm.trim() && (
              <button
                onClick={() => {
                  // Clear search
                  const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
                  router.push(`/tags/${tagSlug}?page=1`, undefined, { shallow: true });
                }}
                className="inline-flex items-center px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary-hover transition-colors duration-200"
              >
                Show All {tagName} Games
              </button>
            )}
          </div>
        )}
      </div>
    </Layout>
    </>
  );
}

// Helper function to get icons for tags
function getTagIcon(tagName: string): string {
  const iconMap: { [key: string]: string } = {
    '2D': '2️⃣',
    '3D': '3️⃣',
    'Action': '⚔️',
    'Adventure': '🗺️',
    'Arcade': '🎮',
    'Puzzle': '🧩',
    'Racing': '🏎️',
    'Sports': '⚽',
    'Multiplayer': '👥',
    'Shooting': '🎯',
    'Strategy': '♟️',
    'Girls': '👸',
    'Kids': '🧒',
    'Boy': '👦',
    'Baby': '👶',
    'Car': '🚗',
    'Bike': '🏍️',
    'Football': '⚽',
    'Soccer': '⚽',
    'Halloween': '🎃',
    'Christmas': '🎄',
    'Space': '🚀',
    'Animal': '🐾',
    'Dress Up': '👗',
    'Makeover': '💄',
    'Cooking': '👩‍🍳',
    'Building': '🏗️',
    'Zombie': '🧟',
    'Ninja': '🥷',
    'Pirate': '🏴‍☠️',
    'Magic': '✨',
    'Fantasy': '🐉',
    'Robot': '🤖',
    'Tank': '🪖',
    'Plane': '✈️',
    'Train': '🚂',
    'Ship': '🚢',
    'Farm': '🚜',
    'Hospital': '🏥',
    'School': '🏫',
    'Police': '👮',
    'Fire': '🔥',
    'Water': '💧',
    'Ice': '🧊',
    'Music': '🎵',
    'Art': '🎨',
    'Word': '📝',
    'Math': '🔢',
    'Quiz': '❓',
    'Board': '🎲',
    'Card': '🃏',
    'Casino': '🎰',
    'Match 3': '💎',
    'Bubble': '🫧',
    'Hidden Object': '🔍',
    'Tower Defense': '🏰',
    'Platform': '🏃',
    'Running': '🏃‍♂️',
    'Jumping': '🦘',
    'Flying': '🪂',
    'Swimming': '🏊',
    'Driving': '🚗',
    'Parking': '🅿️',
    'Stunts': '🤸',
    'Fighting': '🥊',
    'War': '⚔️',
    'Battle': '⚔️',
    'Defense': '🛡️',
    'Tower': '🗼',
    'Castle': '🏰',
    'Kingdom': '👑',
    'Princess': '👸',
    'Prince': '🤴',
    'Knight': '🛡️',
    'Dragon': '🐲',
    'Unicorn': '🦄',
    'Fairy': '🧚',
    'Mermaid': '🧜‍♀️',
    'Superhero': '🦸',
    'Villain': '🦹',
    'Comic': '💫',
    'Pixel': '🎮',
    'Retro': '📼',
    'Classic': '🎮',
    'Modern': '🆕',
    'New': '🆕',
    'Popular': '⭐',
    'Trending': '🔥',
    'HTML5': '🌐',
    'Mobile': '📱',
    'Tablet': '📱',
    'Touch': '👆',
    'Click': '🖱️',
    'Mouse': '🖱️',
    'Keyboard': '⌨️',
    'Gamepad': '🎮',
    'Online': '🌐',
    'Offline': '💾',
    'Free': '🆓',
    'Premium': '💎',
    'Easy': '😊',
    'Hard': '💪',
    'Relaxing': '😌',
    'Challenging': '💯',
    'Educational': '🎓',
    'Learning': '📚',
    'Family': '👨‍👩‍👧‍👦',
    'Adult': '👨‍💼',
    'Teen': '👨‍🎓',
    'Casual': '😊',
    'Hardcore': '💪',
    'Addictive': '🔄',
    'Fun': '😄',
    'Funny': '😂',
    'Cute': '🥰',
    'Cool': '😎',
    'Awesome': '🤩',
    'Amazing': '🤩',
    'Great': '👍',
    'Best': '🏆',
    'Top': '🔝',
    'Epic': '🔥',
    'Legend': '👑',
    'Master': '🏆',
    'Pro': '🏆',
    'Expert': '🎯',
    'Beginner': '🌱',
    'Starter': '🌱',
    'Noob': '🌱',
  };

  return iconMap[tagName] || '🎮';
}

// Helper function to get category icons
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

// Helper function to get popular categories for a tag
function getPopularCategoriesForTag(games: Game[]): string[] {
  const categoryCount: Record<string, number> = {};

  games.forEach(game => {
    if (game.category) {
      categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
    }
  });

  return Object.entries(categoryCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 8)
    .map(([category]) => category);
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const tagParam = context.params?.tag;
    const tagName = Array.isArray(tagParam) ? tagParam[0] : tagParam;
    const page = parseInt(context.query.page as string) || 1;

    if (!tagName) {
      return { notFound: true };
    }

    // Decode the tag name from URL
    const decodedTagName = decodeURIComponent(tagName).replace(/-/g, ' ');

    // Use optimized data loading
    const allTags = await getAllTags();
    const { games, total } = await loadGamesByTag(decodedTagName);

    // If no games found for this tag, return 404
    if (total === 0) {
      return {
        props: {
          games: [],
          tagName: decodedTagName,
          allTags,
          relatedTags: [],
          totalGamesWithTag: 0,
        },
      };
    }

    // Get related tags (simplified - in a real app, you'd have a more sophisticated algorithm)
    const relatedTags = allTags
      .filter(tag => tag.toLowerCase() !== decodedTagName.toLowerCase())
      .slice(0, 12);

    return {
      props: {
        games,
        tagName: decodedTagName,
        allTags,
        relatedTags,
        totalGamesWithTag: total,
      },
    };
  } catch (error) {
    console.error('Error loading tag data:', error);
    return {
      props: {
        games: [],
        tagName: context.params?.tag || '',
        allTags: [],
        relatedTags: [],
        totalGamesWithTag: 0,
      },
    };
  }
};