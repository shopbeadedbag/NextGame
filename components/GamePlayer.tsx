import React, { useState, useEffect } from 'react';
import { GamePlayerProps } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import { GAME_CONFIG, SITE_CONFIG } from '@/config/site';
import RatingDisplay from './RatingDisplay';

export default function GamePlayer({ game, featured = false }: GamePlayerProps) {
  const [isClient, setIsClient] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use featured game config if this is the featured game
  const gameData = featured && GAME_CONFIG.iframe.src ? {
    ...game,
    title: GAME_CONFIG.title,
    url: GAME_CONFIG.iframe.src,
    thumb: GAME_CONFIG.ogImage
  } : game;

  const handleFullscreen = () => {
    if (!isClient) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      const gameArea = document.getElementById('game-area');
      if (gameArea) {
        gameArea.requestFullscreen();
      }
    }
  };

  return (
    <div className="mb-3 md:mb-12">
      <div className="w-full mx-auto px-0">
        <div className="mb-9 md:mb-12">
          <div className="w-full mx-auto">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-white/5 dark:from-primary/20 dark:to-gray-900/10 shadow-2xl">
              <div
                className="relative w-full h-[--mobile-height] md:h-[--desktop-height]"
                style={{
                  width: '100%',
                  '--mobile-height': SITE_CONFIG.ui.gamePlayer.mobileHeight,
                  '--desktop-height': SITE_CONFIG.ui.gamePlayer.desktopHeight,
                  minHeight: SITE_CONFIG.ui.gamePlayer.minHeight
                } as React.CSSProperties}
              >
                <div className="frame-box-game">
                  <iframe
                    id="game-area"
                    allowFullScreen={true}
                    title={`Play ${gameData.title}`}
                    width="100%"
                    height="100%"
                    src={gameData.url}
                    allow={GAME_CONFIG.iframe.allow}
                    name="gameFrame"
                    scrolling="no"
                    sandbox={GAME_CONFIG.iframe.sandbox}
                    className="border-0 rounded-2xl"
                  />
                </div>
              </div>
            </div>

            <div className="player__footer player-footer">
              <div className="player-footer__inner">
                <div className="player-footer__left player-footer__item flex items-center flex-wrap gap-3">
                  <div className="relative w-10 h-10 rounded-lg overflow-hidden">
                    {!imageLoaded && (
                      <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse" />
                    )}
                    <Image
                      src={gameData.thumb}
                      alt={`Play ${gameData.title} now!`}
                      fill
                      sizes="40px"
                      className={`rounded-lg object-cover ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      priority={featured} // Load featured game image with high priority
                      onLoad={() => setImageLoaded(true)}
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">{gameData.title}</h1>
                    {/* Rating Display */}
                    <div className="rating-wrapper">
                      <RatingDisplay
                        score={GAME_CONFIG.rating.value}
                        votes={GAME_CONFIG.rating.count}
                        maxScore={GAME_CONFIG.rating.max}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="player-footer__actions player-footer__item">
                  <div className="footer__button hide_fullscreen">
                    <button
                      className="g-footer__button player-footer__fullscreen"
                      onClick={handleFullscreen}
                    >
                      <span className="svg-icon" aria-hidden="true">
                        <svg className="svg-icon__link" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z"/>
                          <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z"/>
                          <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z"/>
                          <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z"/>
                        </svg>
                      </span>
                      <div className="g-footer__button-title">
                        <span className="g-footer__button-title_text g-footer__button-title_first"></span>
                        <span className="g-footer__button-title_text g-footer__button-title_last">Full Screen</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 mb-6 hidden">
              <div className="rounded-lg rounded-b-none overflow-hidden bg-gray-100">
                <div className="text-center text-gray-500/50 text-sm px-3 py-0">Advertisement</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}