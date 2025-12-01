import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '@/components/Layout';
import GameGrid from '@/components/GameGrid';
import { Game } from '@/types';
import { SITE_NAME, SITE_URL, MAX_404_RECOMMENDED_GAMES } from '@/config/site';

export default function NotFoundPage() {
  const [recommendedGames, setRecommendedGames] = useState<Game[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const pageTitle = `404 Not Found - ${SITE_NAME}`;
  const pageDescription = "The page you are looking for does not exist. Try one of the recommended online games instead.";
  const pageUrl = `${SITE_URL}/404`;

  // JSON-LD structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": pageTitle,
    "url": pageUrl,
    "description": pageDescription,
  };

  useEffect(() => {
    // Fetch recommended games on the client side
    const fetchRecommendedGames = async () => {
      try {
        const response = await fetch('/feed.json');
        if (response.ok) {
          const allGames: Game[] = await response.json();
          // Get first N games for recommendations (4 rows × 8 columns = 32 games)
          const games = allGames.slice(0, MAX_404_RECOMMENDED_GAMES);
          setRecommendedGames(games);
        } else {
          console.error('Failed to fetch games data');
          setRecommendedGames([]);
        }
      } catch (error) {
        console.error('Error fetching games data:', error);
        setRecommendedGames([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendedGames();
  }, []);

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content={SITE_NAME} />
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
        <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
          {/* 404 Error Section */}
          <div className="text-center py-16">
            <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
              404
            </h1>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              The page you are looking for doesn't exist or has been moved.
              But don't worry, you can explore our collection of exciting games below!
            </p>
            <a
              href="/"
              className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-hover transition-colors font-medium"
            >
              Back to Home
            </a>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="mt-12 text-center">
              <div className="text-gray-600 dark:text-gray-400">
                Loading recommended games...
              </div>
            </div>
          )}

          {/* Recommended Games Section */}
          {!isLoading && recommendedGames.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                Recommended Games
              </h2>
              <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
                You might also like these exciting games
              </p>
              <GameGrid games={recommendedGames} featured={false} />
            </div>
          )}

          {/* Empty State */}
          {!isLoading && recommendedGames.length === 0 && (
            <div className="mt-12 text-center">
              <div className="text-gray-600 dark:text-gray-400">
                No games available at the moment. Please check back later!
              </div>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}