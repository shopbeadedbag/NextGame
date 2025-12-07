import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Game } from '@/types';

interface SearchDropdownProps {
  games: Game[];
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

const SearchDropdown = memo(({ games, searchTerm, onSearchChange }: SearchDropdownProps) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure games is always an array
  const safeGames = games || [];

  // Filter games based on search term with useMemo
  const safeSearchTerm = searchTerm || '';

  const filteredGames = useMemo(() => {
    if (!safeSearchTerm.trim()) return [];

    const searchLower = safeSearchTerm.toLowerCase();
    return safeGames
      .filter(game => {
        return (
          game.title.toLowerCase().includes(searchLower) ||
          game.description.toLowerCase().includes(searchLower) ||
          game.category.toLowerCase().includes(searchLower) ||
          game.tags.toLowerCase().includes(searchLower)
        );
      })
      .slice(0, 8); // Limit to 8 results
  }, [safeGames, safeSearchTerm]);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e || !e.target) return;
    const value = e.target.value || '';
    onSearchChange(value);
    setHighlightedIndex(-1);
    setShowDropdown(value.trim().length > 0);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown || filteredGames.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev =>
          prev < filteredGames.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          const game = filteredGames[highlightedIndex];
          window.location.href = `/game/${game.id}`;
          setShowDropdown(false);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle result click
  const handleResultClick = () => {
    setShowDropdown(false);
    onSearchChange('');
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search Games ..."
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="input_search w-full rounded-3xl transition-all duration-300 border-2 pl-9 pr-4 h-10 text-lg"
          autoComplete="off"
        />
        <button
          type="button"
          className="lucide lucide-search absolute top-1/2 -translate-y-1/2 transition-colors text-primary/70 left-2 w-7 h-7"
        >
          <span className="svg-icon svelte-11lxo0l" aria-hidden="true">
            <svg className="svg-icon__link icon-search" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"/>
            </svg>
          </span>
        </button>
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-96 overflow-y-auto z-50">
          {filteredGames.length > 0 ? (
            <ul className="py-2">
              {filteredGames.map((game, index) => (
                <li key={game.id}>
                  <Link
                    href={`/game/${game.id}`}
                    onClick={handleResultClick}
                    className={`block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                      index === highlightedIndex
                        ? 'bg-gray-100 dark:bg-gray-700 border-l-4 border-primary'
                        : ''
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="relative w-12 h-9 rounded flex-shrink-0 overflow-hidden">
                        <Image
                          src={game.thumb}
                          alt={game.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                          {game.title}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                          {game.category}
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
              No games found
            </div>
          )}
        </div>
      )}
    </div>
  );
});

SearchDropdown.displayName = 'SearchDropdown';

export default SearchDropdown;