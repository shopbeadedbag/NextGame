export interface Game {
  id: string;
  title: string;
  description: string;
  instructions: string;
  url: string;
  category: string;
  tags: string;
  thumb: string;
  width: string;
  height: string;
}

export interface GameData {
  games: Game[];
}

export interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  image?: string;
  type?: string;
  url?: string;
  canonical?: string;
}

export interface GameCardProps {
  game: Game;
  featured?: boolean;
}

export interface GamePlayerProps {
  game: Game;
  featured?: boolean;
}

export interface SearchResultsProps {
  games: Game[];
  searchTerm: string;
}