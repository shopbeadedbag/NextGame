import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/config/site';

interface FooterProps {
  popularTags?: Array<{ name: string; href: string; count: number }>;
}

export default function Footer({ popularTags = [] }: FooterProps) {
  const [currentYear, setCurrentYear] = useState(2024); // Default year to avoid hydration error

  useEffect(() => {
    // Set the actual year on the client side after hydration
    setCurrentYear(new Date().getFullYear());
  }, []);

  // SEO-friendly footer navigation
  const footerLinks = {
    games: [
      { name: 'All Games', href: '/game' },
      { name: 'Popular Games', href: '/game?sort=popular' },
      { name: 'New Games', href: '/game?sort=new' },
      { name: 'Categories', href: '/categories' },
      { name: 'Tags', href: '/tags' }
    ],
    categories: [
      { name: 'Action Games', href: '/categories/action' },
      { name: 'Adventure Games', href: '/categories/adventure' },
      { name: 'Puzzle Games', href: '/categories/puzzle' },
      { name: 'Racing Games', href: '/categories/racing' },
      { name: 'Sports Games', href: '/categories/sports' }
    ],
    siteInfo: [
      { name: 'About', href: '/about' },
      { name: 'Privacy Policy', href: '/privacy-policy' },
      { name: 'Terms of Service', href: '/terms-of-service' },
      { name: 'Contact', href: '/contact' },
      { name: 'Sitemap', href: '/sitemap.xml' }
    ]
  };

  return (
    <>
      <footer className="mt-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-3 md:px-12 py-12">
          {/* Main Footer Content */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-8">
            {/* Site Info */}
            <div className="col-span-2 md:col-span-1">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {SITE_NAME}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Discover and play the best online games. Enjoy thousands of free games
                  across all genres - action, adventure, puzzle, racing, and more.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                  aria-label="Follow us on Twitter"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                  aria-label="Follow us on Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                  aria-label="Follow us on Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Games Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Games
              </h4>
              <ul className="space-y-2">
                {footerLinks.games.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Categories
              </h4>
              <ul className="space-y-2">
                {footerLinks.categories.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Tags */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Popular Tags
              </h4>
              <ul className="space-y-2">
                {popularTags.length > 0 ? (
                  popularTags.map((tag) => (
                    <li key={tag.href}>
                      <Link
                        href={tag.href}
                        className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                      >
                        {tag.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  // Loading state
                  <>
                    {[1, 2, 3, 4, 5].map((i) => (
                      <li key={i} className="h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse">
                        <span className="invisible">Loading...</span>
                      </li>
                    ))}
                  </>
                )}
              </ul>
            </div>

            {/* Site Info */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                Site Info
              </h4>
              <ul className="space-y-2">
                {footerLinks.siteInfo.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <div className="text-sm text-gray-600 dark:text-gray-400">
                © {currentYear} {SITE_NAME}. All rights reserved.
              </div>

              {/* Additional Links */}
              <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                <Link href="/privacy-policy" className="hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Privacy
                </Link>
                <Link href="/terms-of-service" className="hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Terms
                </Link>
                <Link href="/contact" className="hover:text-primary dark:hover:text-primary transition-colors duration-200">
                  Contact
                </Link>
              </div>
            </div>

            {/* SEO Description */}
            <div className="mt-6 text-xs text-gray-500 dark:text-gray-500 text-center max-w-4xl mx-auto leading-relaxed">
              <p>
                {SITE_NAME} is your premier destination for free online games. Play thousands of games
                directly in your browser without downloads. From action-packed adventures to mind-bending
                puzzles, we have games for every taste and skill level. All games are HTML5 based and
                work on desktop, tablet, and mobile devices.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Schema.org Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": SITE_NAME,
            "url": SITE_URL,
            "description": "Play thousands of free online games. From action to puzzle games, we have games for every taste.",
            "sameAs": [
              "https://twitter.com",
              "https://facebook.com",
              "https://instagram.com"
            ],
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${SITE_URL}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />
    </>
  );
}