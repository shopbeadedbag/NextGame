import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Game } from '@/types';
import { SITE_NAME, SITE_CONFIG } from '@/config/site';
import SearchDropdown from './SearchDropdown';
import { useSearch } from '@/contexts/SearchContext';

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
  games?: Game[];
}

export default function Header({ onSearch, games }: HeaderProps) {
  const { searchTerm: contextSearchTerm, setSearchTerm: setContextSearchTerm } = useSearch();
  const [localSearchTerm, setLocalSearchTerm] = useState(contextSearchTerm || '');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(localSearchTerm);
    }
  };

  const handleSearchChange = (value: string) => {
    setLocalSearchTerm(value);
    setContextSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="w-full py-1 bg-white/95 dark:bg-gray-900 backdrop-blur-md border-b border-primary/10 relative z-50">
      <div className="max-w-7xl mx-auto flex h-30 items-center justify-between px-3 md:px-10">
        <div className="flex gap-8 md:gap-12">
          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
            >
              {SITE_NAME}
            </a>
            <a
              href="https://www.roblox.com/games/127742093697776/Plants-Vs-Brainrots" target="_blank"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
            >
              Play Plants Vs Brainrots on Roblox
            </a>
            <a
              href="/categories"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
            >
              Categories
            </a>
            <a
              href="/tags"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
            >
              Tags
            </a>
            <a
              href="/game"
              className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
            >
              All Games
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="p-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          <div className="relative w-full search-results">
            {games && games.length > 0 ? (
              <SearchDropdown
                games={games}
                searchTerm={localSearchTerm}
                onSearchChange={handleSearchChange}
              />
            ) : (
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search Games ..."
                  value={localSearchTerm}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="input_search w-full rounded-3xl transition-all duration-300 border-2 pl-9 pr-4 h-10 text-lg"
                  autoComplete="off"
                />
                <button
                  type="submit"
                  className="lucide lucide-search absolute top-1/2 -translate-y-1/2 transition-colors text-primary/70 left-2 w-7 h-7"
                >
                  <span className="svg-icon svelte-11lxo0l" aria-hidden="true">
                    <svg className="svg-icon__link icon-search" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"/>
                    </svg>
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isClient && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-3 md:px-10 py-2">
            <nav className="flex flex-col space-y-2">
              <a
                href="/"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
              >
                {SITE_NAME}
              </a>
              <a
                href="/categories"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
              >
                Categories
              </a>
              <a
                href="/tags"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
              >
                Tags
              </a>
              <a
                href="/game"
                className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors duration-200"
              >
                All Games
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}