import React from 'react';
import Link from 'next/link';
import { Game } from '@/types';
import { GAME_CONFIG, SITE_NAME } from '@/config/site';

interface GameDescriptionProps {
  game: Game;
  featured?: boolean;
}

export default function GameDescription({ game, featured = false }: GameDescriptionProps) {
  return (
    <div className="mb-3 md:mb-12 sub_description">
      <div className="w-full mx-auto mt-8 md:mt-12 px-0">
        <div className="content-inner dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-6 relative overflow-hidden text-gray-600 dark:text-gray-300">
          <div className="game-description page-content">
            {/* Breadcrumb Navigation - Only show on non-featured games */}
            {!featured && (
              <div className="d-flex al bread-crumb-list mb-4 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="d-flex bread-crumb-item hover:text-primary transition-colors">
                  {SITE_NAME}
                </Link>
                {game.category && (
                  <>
                    <span className="bread-crumb-separator mx-2">›</span>
                    <Link
                      href={`/categories/${game.category.toLowerCase().replace(/\s+/g, '-')}`}
                      className="bread-crumb-item hover:text-primary transition-colors"
                    >
                      {game.category}
                    </Link>
                  </>
                )}
                <span className="bread-crumb-separator mx-2">›</span>
                <span className="bread-crumb-item bread-after text-gray-700 dark:text-gray-200">
                  {game.title}
                </span>
              </div>
            )}

            {featured ? (
              <>
                {/* Remove game.description for featured game to avoid showing unrelated content */}
                <h2><strong>{GAME_CONFIG.featuredContent.gameplay.title}</strong></h2>
                <p><span style={{ fontWeight: 400 }}>
                  {GAME_CONFIG.featuredContent.main}
                </span></p>
                <div style={{ textAlign: 'center', margin: '20px 0' }}>
                  <iframe
                    width="893"
                    height="501"
                    src="https://www.youtube.com/embed/y_g047HkF2Q"
                    title="Roblox Plants VS Brainrots is SO GOOD!"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                    style={{ maxWidth: '100%', borderRadius: '8px', margin: '0 auto' }}
                  ></iframe>
                </div>
                <p style={{ textAlign: 'center' }}>
                  <strong><em>{GAME_CONFIG.title}: {GAME_CONFIG.description}</em></strong>
                </p>
                <h2><strong>{GAME_CONFIG.featuredContent.gameplay.title}</strong></h2>
                <p><span style={{ fontWeight: 400 }}>
                  {GAME_CONFIG.featuredContent.gameplay.content}
                </span></p>
                <p><span style={{ fontWeight: 400 }}>
                  {GAME_CONFIG.featuredContent.features.content}
                </span></p>
                <h3><strong>{GAME_CONFIG.featuredContent.controls.title}</strong></h3>
                <ul>
                  {GAME_CONFIG.featuredContent.controls.items.map((item, index) => (
                    <li key={index} style={{ fontWeight: 400 }}>
                      <span style={{ fontWeight: 400 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <h3><strong>{GAME_CONFIG.featuredContent.replayability.title}</strong></h3>
                <p><span style={{ fontWeight: 400 }}>
                  {GAME_CONFIG.featuredContent.replayability.content}
                </span></p>
                <div className="list_category gap-3 flex items-center flex-wrap my-2"></div>
              </>
            ) : (
              <>
                <p>{game.description}</p>
                <h3><strong>How to Play</strong></h3>
                <p>{game.instructions}</p>
                <h3><strong>Category</strong></h3>
                <p>{game.category}</p>
                {game.tags && game.tags.split(',').length > 0 && (
                  <>
                    <h3><strong>Tags</strong></h3>
                    <div className="list_category gap-3 flex items-center flex-wrap my-2">
                      {game.tags.split(',').map((tag, index) => {
                        const slug = tag.trim().toLowerCase().replace(/\s+/g, '-');
                        return (
                          <Link
                            key={index}
                            href={`/tags/${encodeURIComponent(slug)}`}
                            className="inline-block bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary-hover px-3 py-1 rounded-full text-sm transition-colors duration-200 cursor-pointer"
                          >
                            {tag.trim()}
                          </Link>
                        );
                      })}
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}