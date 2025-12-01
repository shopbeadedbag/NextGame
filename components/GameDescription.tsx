import React from 'react';
import { Game } from '@/types';

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
            {featured ? (
              <>
                <p>{game.description}</p>
                <h2><strong>Meet Slope Rider: Ride Into a Frozen Adventure</strong></h2>
                <p><span style={{ fontWeight: 400 }}>
                  Leap into thrill with Slope Rider, an ultimate endless runner on icy, adrenaline-packed slopes! Every descent delivers excitement, energy, and winter chaos that keeps hearts racing. Snow-covered hills, festive vibes, and slippery twists create an immersive adventure that challenges daring players. Feel icy rush as you glide with precision, embrace the festive landscapes, and enjoy endless thrill of high-speed sliding. Prepare your sled and ride frozen adventure now!
                </span></p>
                <p style={{ textAlign: 'center' }}>
                  <span style={{ fontWeight: 400 }}>
                    <img
                      src="https://sloperidergame.github.io/data/image/game/slope-rider-game.png"
                      alt="Slope Rider Game"
                      width="512"
                      height="512"
                      className="rounded-lg mx-auto"
                    />
                  </span>
                </p>
                <p style={{ textAlign: 'center' }}>
                  <strong><em>Slope Rider: New Thrilling Runs Through Frozen Chaos!</em></strong>
                </p>
                <h2><strong>Adrenaline-Packed Endless Runner Gameplay</strong></h2>
                <p><span style={{ fontWeight: 400 }}>
                  High-speed action defines Slope Rider, an endless runner full of thrills. Every run throws players into icy slopes, sharp turns, and sudden hazards. Rolling boulders, fallen logs, and sudden spike traps demand sharp reflexes and quick thinking. The fast-paced pace keeps adrenaline pumping with every slide.
                </span></p>
                <p><span style={{ fontWeight: 400 }}>
                  Each descent feels fresh because of randomized tracks and unpredictable dynamic terrain. Slopes challenge timing, momentum, and precision, making each ride unique. Daring players can push for longer runs, test their skills, and experience the rush of high-speed winter chaos. Are you one of these typical objective players?
                </span></p>
                <h3><strong>Grab the Sliding Controls</strong></h3>
                <ul>
                  <li style={{ fontWeight: 400 }}><span style={{ fontWeight: 400 }}>
                    Automatic sliding sled with an impulsive speed.
                  </span></li>
                  <li style={{ fontWeight: 400 }}><span style={{ fontWeight: 400 }}>
                    Arrow Left/Right: Steer your sled around obstacles efficiently.
                  </span></li>
                  <li style={{ fontWeight: 400 }}><span style={{ fontWeight: 400 }}>
                    Arrow Up: Jump over logs, fences, or small rocks.
                  </span></li>
                  <li style={{ fontWeight: 400 }}><span style={{ fontWeight: 400 }}>
                    Momentum and gravity matter; adjusting timing to survive longer.
                  </span></li>
                </ul>
                <h3><strong>Endless Replayability: Why Players Return</strong></h3>
                <p><span style={{ fontWeight: 400 }}>
                  Every run in Slope Rider begins with a brand-new, ever-changing map, making each descent feel exciting and unique. Shifting terrain and constantly moving obstacles challenge reflexes and strategy on every slide. Replay value is boosted by daily missions and frequent updates that introduce new slopes, hazards, and sleds. Each attempt delivers a renewed thrill, keeping the winter adventure fresh, exciting, and addictive.
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
                      {game.tags.split(',').map((tag, index) => (
                        <span
                          key={index}
                          className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                        >
                          {tag.trim()}
                        </span>
                      ))}
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