import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Game } from '@/types';

interface SearchContextType {
  searchTerm: string;
  games: Game[];
  setSearchTerm: (term: string) => void;
  setGames: (games: Game[]) => void;
  handleSearch: (term: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
  initialGames?: Game[];
}

export function SearchProvider({ children, initialGames = [] }: SearchProviderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [games, setGames] = useState<Game[]>(initialGames);

  const handleSetSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const handleSetGames = useCallback((newGames: Game[]) => {
    setGames(newGames);
  }, []);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        games,
        setSearchTerm: handleSetSearchTerm,
        setGames: handleSetGames,
        handleSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
}