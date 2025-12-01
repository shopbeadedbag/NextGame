import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Game } from '@/types';

interface HeaderProps {
  onSearch?: (searchTerm: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="w-full py-1 bg-white/95 dark:bg-gray-900 backdrop-blur-md border-b border-primary/10 relative z-50">
      <div className="container flex h-30 items-center justify-between">
        <div className="flex gap-8 md:gap-12">
          <a href="/" className="flex items-center space-x-3 group">
            <div className="relative rounded-xl shadow-lg shadow-primary/10">
              <img
                alt="Slope Rider"
                loading="lazy"
                decoding="async"
                data-nimg="1"
                className="transition-all duration-500 group-hover:scale-110 group-hover:rotate-[360deg]"
                style={{ color: 'transparent', objectFit: 'contain', maxHeight: '30px' }}
                src="/cache/data/image/options/sloperider.io-f200x80.webp"
              />
            </div>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-full mx-auto px-3 md:px-6 search-results">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search Games ..."
                value={searchTerm}
                onChange={handleSearchChange}
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
          </div>
        </div>
      </div>
    </header>
  );
}