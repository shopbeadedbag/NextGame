import fs from 'fs';
import path from 'path';
import { Game } from '@/types';

let gamesCache: Game[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

/**
 * Load all games from feed.json with caching
 */
export async function loadAllGames(): Promise<Game[]> {
  const now = Date.now();

  // Return cached data if still valid
  if (gamesCache && (now - cacheTimestamp) < CACHE_DURATION) {
    return gamesCache;
  }

  try {
    const feedPath = path.join(process.cwd(), 'feed.json');
    const fileContents = fs.readFileSync(feedPath, 'utf8');
    const games: Game[] = JSON.parse(fileContents);

    // Update cache
    gamesCache = games;
    cacheTimestamp = now;

    return games;
  } catch (error) {
    console.error('Error loading games data:', error);
    return [];
  }
}

/**
 * Load games by category with pagination support
 */
export async function loadGamesByCategory(
  category: string,
  limit?: number,
  offset: number = 0
): Promise<{ games: Game[]; total: number }> {
  const allGames = await loadAllGames();

  const games = allGames.filter(game =>
    game.category && game.category.toLowerCase() === category.toLowerCase()
  );

  const total = games.length;

  if (limit) {
    return {
      games: games.slice(offset, offset + limit),
      total
    };
  }

  return { games, total };
}

/**
 * Load games by tag with pagination support
 */
export async function loadGamesByTag(
  tag: string,
  limit?: number,
  offset: number = 0
): Promise<{ games: Game[]; total: number }> {
  const allGames = await loadAllGames();

  const games = allGames.filter(game => {
    if (!game.tags) return false;
    const gameTags = game.tags.split(',').map(t => t.trim().toLowerCase());
    return gameTags.includes(tag.toLowerCase());
  });

  const total = games.length;

  if (limit) {
    return {
      games: games.slice(offset, offset + limit),
      total
    };
  }

  return { games, total };
}

/**
 * Get all available categories
 */
export async function getAllCategories(): Promise<string[]> {
  const games = await loadAllGames();
  const categories = new Set<string>();

  games.forEach(game => {
    if (game.category) {
      categories.add(game.category);
    }
  });

  return Array.from(categories).sort();
}

/**
 * Get all available tags
 */
export async function getAllTags(): Promise<string[]> {
  const games = await loadAllGames();
  const tags = new Set<string>();

  games.forEach(game => {
    if (game.tags) {
      const gameTags = game.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      gameTags.forEach(tag => tags.add(tag));
    }
  });

  return Array.from(tags).sort();
}

/**
 * Search games with pagination support
 */
export async function searchGames(
  query: string,
  limit?: number,
  offset: number = 0
): Promise<{ games: Game[]; total: number }> {
  const allGames = await loadAllGames();

  if (!query.trim()) {
    return { games: [], total: 0 };
  }

  const searchLower = query.toLowerCase();
  const games = allGames.filter(game => {
    return (
      game.title.toLowerCase().includes(searchLower) ||
      game.description.toLowerCase().includes(searchLower) ||
      game.category.toLowerCase().includes(searchLower) ||
      game.tags.toLowerCase().includes(searchLower)
    );
  });

  const total = games.length;

  if (limit) {
    return {
      games: games.slice(offset, offset + limit),
      total
    };
  }

  return { games, total };
}

/**
 * Clear the games cache (useful for development)
 */
export function clearGamesCache(): void {
  gamesCache = null;
  cacheTimestamp = 0;
}