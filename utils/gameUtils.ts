import { Game } from '@/types';

export function getPopularTags(games: Game[], limit: number = 5): Array<{ name: string; href: string; count: number }> {
  const tagCount = new Map<string, number>();

  games.forEach(game => {
    if (game.tags) {
      const gameTags = game.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      gameTags.forEach(tag => {
        tagCount.set(tag, (tagCount.get(tag) || 0) + 1);
      });
    }
  });

  // Get top tags
  const topTags = Array.from(tagCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({
      name,
      href: `/tags/${encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'))}`,
      count
    }));

  return topTags;
}

export function getPopularCategories(games: Game[], limit: number = 5): Array<{ name: string; count: number }> {
  const categoryCount = new Map<string, number>();

  games.forEach(game => {
    const category = game.category || 'Uncategorized';
    categoryCount.set(category, (categoryCount.get(category) || 0) + 1);
  });

  const topCategories = Array.from(categoryCount.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([name, count]) => ({ name, count }));

  return topCategories;
}