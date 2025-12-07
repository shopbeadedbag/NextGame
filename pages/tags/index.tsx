import React, { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import Head from 'next/head';
import Layout from '@/components/Layout';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, GAME_CONFIG, SITE_CONFIG } from '@/config/site';
import { useSearch } from '@/contexts/SearchContext';

interface TagData {
  name: string;
  count: number;
  games: Game[];
}

interface TagsPageProps {
  tags: TagData[];
  allGamesCount: number;
  popularTags: TagData[];
  allGames: Game[];
}

export default function TagsPage({ tags, allGamesCount, popularTags, allGames }: TagsPageProps) {
  const { searchTerm } = useSearch();

  const filteredTags = tags.filter(tag =>
    tag.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageTitle = `Game Tags - ${SITE_NAME}`;
  const pageDescription = `Browse games by tags on ${SITE_NAME}. Find games with specific features like 2D, 3D, Multiplayer, Puzzle, Racing and many more.`;
  const pageUrl = `${SITE_URL}/tags`;

  // Generate structured data for tags listing page
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
      // WebPage Schema for Tags
      {
        "@type": "WebPage",
        "name": pageTitle,
        "description": pageDescription,
        "url": pageUrl,
        "mainEntity": {
          "@type": "ItemList",
          "name": "Game Tags",
          "description": "List of all game tags",
          "url": pageUrl,
          "numberOfItems": filteredTags.length,
          "itemListElement": filteredTags.slice(0, 10).map((tag, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Thing",
              "name": tag.name,
              "url": `${SITE_URL}/tags/${encodeURIComponent(tag.name.toLowerCase().replace(/\s+/g, '-'))}`,
              "description": `${tag.count} games tagged with ${tag.name}`
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
            "name": "Tags",
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
        games={allGames}
      >
      <div id="sub-page-data" className="w-full mx-auto px-3 md:px-10 py-3 md:py-6 page-data">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            Game Tags
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 text-center max-w-3xl mx-auto">
            Explore our game collection by tags. Find games with specific features, gameplay styles,
            and themes that match your interests perfectly.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center px-4 py-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <span className="text-green-600 dark:text-green-400 font-medium">
              {tags.length} Tags • {allGamesCount} Games
            </span>
          </div>
        </div>

        {/* Popular Tags Section */}
        {popularTags.length > 0 && (
          <div className="mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Popular Tags
            </h2>
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {popularTags.map((tag) => (
                <Link
                  key={tag.name}
                  href={`/tags/${encodeURIComponent(tag.name.toLowerCase().replace(/\s+/g, '-'))}`}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-primary-hover text-white font-medium rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  <span className="mr-2">{getTagIcon(tag.name)}</span>
                  <span>{tag.name}</span>
                  <span className="ml-2 bg-white/20 px-2 py-0.5 rounded-full text-xs">
                    {tag.count}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Tags Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            All Tags
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filteredTags.map((tag) => (
              <Link
                key={tag.name}
                href={`/tags/${encodeURIComponent(tag.name.toLowerCase().replace(/\s+/g, '-'))}`}
                className="group block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-400"
              >
                <div className="text-center">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                    {getTagIcon(tag.name)}
                  </div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors truncate">
                    {tag.name}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {tag.count} games
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tag Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
            Browse by Type
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-3">
                🎮 Gameplay
              </h3>
              <div className="flex flex-wrap gap-2">
                {getGameplayTags(tags).map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="text-sm text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-100 hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-green-900 dark:text-green-400 mb-3">
                🎨 Theme & Style
              </h3>
              <div className="flex flex-wrap gap-2">
                {getThemeTags(tags).map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="text-sm text-green-700 dark:text-green-300 hover:text-green-900 dark:hover:text-green-100 hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-400 mb-3">
                🛠️ Features
              </h3>
              <div className="flex flex-wrap gap-2">
                {getFeatureTags(tags).map(tag => (
                  <Link
                    key={tag}
                    href={`/tags/${encodeURIComponent(tag.toLowerCase().replace(/\s+/g, '-'))}`}
                    className="text-sm text-purple-700 dark:text-purple-300 hover:text-purple-900 dark:hover:text-purple-100 hover:underline"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* No Tags Found */}
        {filteredTags.length === 0 && (
          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              No Tags Found
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

// Helper functions to categorize tags
function getGameplayTags(tags: TagData[]): string[] {
  const gameplayKeywords = ['Action', 'Adventure', 'Puzzle', 'Racing', 'Sports', 'Shooting', 'Strategy', 'Platform', 'Running', 'Jumping', 'Fighting', 'Defense', 'Tower Defense'];
  return tags
    .filter(tag => gameplayKeywords.some(keyword => tag.name.toLowerCase().includes(keyword.toLowerCase())))
    .slice(0, 12)
    .map(tag => tag.name);
}

function getThemeTags(tags: TagData[]): string[] {
  const themeKeywords = ['Animal', 'Space', 'Fantasy', 'Pirate', 'Ninja', 'Magic', 'Zombie', 'Dragon', 'Princess', 'Superhero', 'Christmas', 'Halloween'];
  return tags
    .filter(tag => themeKeywords.some(keyword => tag.name.toLowerCase().includes(keyword.toLowerCase())))
    .slice(0, 12)
    .map(tag => tag.name);
}

function getFeatureTags(tags: TagData[]): string[] {
  const featureKeywords = ['Multiplayer', '2D', '3D', 'HTML5', 'Mobile', 'Touch', 'Online', 'Free', 'Educational', 'Family', 'Kids', 'Casual'];
  return tags
    .filter(tag => featureKeywords.some(keyword => tag.name.toLowerCase().includes(keyword.toLowerCase())))
    .slice(0, 12)
    .map(tag => tag.name);
}

export const getServerSideProps: GetServerSideProps<TagsPageProps> = async () => {
  try {
    // Read feed.json file
    const feedPath = path.join(process.cwd(), 'feed.json');
    const fileContents = fs.readFileSync(feedPath, 'utf8');

    // Parse JSON
    const games: Game[] = JSON.parse(fileContents);

    // Extract all tags
    const tagMap = new Map<string, Game[]>();

    games.forEach(game => {
      if (game.tags) {
        // Split tags by comma and clean up
        const gameTags = game.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);

        gameTags.forEach(tag => {
          if (!tagMap.has(tag)) {
            tagMap.set(tag, []);
          }
          tagMap.get(tag)!.push(game);
        });
      }
    });

    // Convert to array and sort by game count (descending)
    const allTags: TagData[] = Array.from(tagMap.entries())
      .map(([name, games]) => ({
        name,
        count: games.length,
        games: games.sort((a, b) => a.title.localeCompare(b.title))
      }))
      .sort((a, b) => b.count - a.count);

    // Get popular tags (top 20 by game count)
    const popularTags = allTags.slice(0, 20);

    return {
      props: {
        tags: allTags,
        allGamesCount: games.length,
        popularTags,
        allGames: games,
      },
    };
  } catch (error) {
    console.error('Error reading tags data:', error);
    return {
      props: {
        tags: [],
        allGamesCount: 0,
        popularTags: [],
        allGames: [],
      },
    };
  }
};