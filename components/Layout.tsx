import Head from 'next/head';
import React from 'react';
import { LayoutProps } from '@/types';
import Header from './Header';
import { SITE_URL, SITE_NAME } from '@/config/site';

interface ExtendedLayoutProps extends LayoutProps {
  onSearch?: (searchTerm: string) => void;
}

export default function Layout({
  children,
  title = SITE_NAME,
  description = 'Slope Rider is an adrenaline-packed endless runner game where speed, balance, and reflexes push every run to the limit. Let\'s ride the digital winter now!',
  image = '/cache/data/image/game/slope-rider/sloperider-m186x186.webp',
  type = 'website',
  url = SITE_URL,
  canonical = SITE_URL,
  onSearch
}: ExtendedLayoutProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="slope rider, games, endless runner, skiing, snow games" />
        <meta name="title" content={title} />
        <meta property="fb:app_id" content="" />
        <meta property="og:title" content={title} />
        <meta property="og:site_name" content={SITE_NAME} />
        <link rel="image_src" href={image} />
        <meta property="og:type" content={type} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimal-ui, shrink-to-fit=no viewport-fit=cover" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content={SITE_NAME} />
        <meta name="HandheldFriendly" content="true" />
        <meta name="mobile-web-app-capable" content="yes" />
        <link rel="shortcut icon" sizes="512x512" href="/cache/data/image/options/favicon-s512x512.png" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/cache/data/image/options/favicon-s512x512.png" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <link rel="canonical" href={canonical} data-react-helmet="true" />
        <link rel="stylesheet" type="text/css" href="/resources/css/style.min.css" />
      </Head>

      <div className="min-h-screen dark:bg-gray-950 font-sans antialiased flex flex-col">
        <Header onSearch={onSearch} />

        <div className="relative flex-1">
          <div className="max-w-7xl mx-auto">
            <div className="flex h-full">
              <main className="flex-1 2xl:ml-[0]">
                <div className="min-h-screen">
                  {children}
                </div>
              </main>
            </div>
          </div>

          <div className="absolute top-0 left-[calc(50%+37rem)] min-[1660px]:block d-none">
            <div className="d-none min-[1660px]:block w-[200px] ml-6">
              <div className="mt-8 mb-6 hidden">
                <div className="rounded-lg rounded-b-none overflow-hidden bg-gray-100">
                  <div className="text-center text-gray-500/50 text-sm px-3 py-0">Advertisement</div>
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

        <footer className="mt-auto bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-4">
          <div className="max-w-7xl mx-auto flex">
            <div className="flex justify-center items-center gap-4 flex-wrap px-3 md:px-12 w-full"></div>
          </div>
        </footer>
      </div>

      <div className="page_loading" style={{ display: 'none' }}>
        <div className="loading_page">
          <div className="loader"></div>
        </div>
      </div>

      <button id="button-gotop" className="btn_up">
        <span className="svg-icon" aria-hidden="true">
          <svg className="svg-icon__link">
            <use href="#icon-keyboard_arrow_up" />
          </svg>
        </span>
      </button>

      <svg className="main-svg-sprite main-svg-sprite--icons" xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }} xmlnsXlink="http://www.w3.org/1999/xlink">
        <symbol id="icon-keyboard_arrow_up" viewBox="0 0 24 24">
          <path d="M7.406 15.422l-1.406-1.406 6-6 6 6-1.406 1.406-4.594-4.594z"></path>
        </symbol>
        <symbol id="icon-search" viewBox="0 0 20 20">
          <path d="M12.9 14.32c-1.34 1.049-3.050 1.682-4.908 1.682-4.418 0-8-3.582-8-8s3.582-8 8-8c4.418 0 8 3.582 8 8 0 1.858-0.633 3.567-1.695 4.925l0.013-0.018 5.35 5.33-1.42 1.42-5.33-5.34zM8 14c3.314 0 6-2.686 6-6s-2.686-6-6-6v0c-3.314 0-6 2.686-6 6s2.686 6 6 6v0z"></path>
        </symbol>
        <symbol id="icon-heart" viewBox="0 0 28 28">
          <path d="M14 26c-0.25 0-0.5-0.094-0.688-0.281l-9.75-9.406c-0.125-0.109-3.563-3.25-3.563-7 0-4.578 2.797-7.313 7.469-7.313 2.734 0 5.297 2.156 6.531 3.375 1.234-1.219 3.797-3.375 6.531-3.375 4.672 0 7.469 2.734 7.469 7.313 0 3.75-3.437 6.891-3.578 7.031l-9.734 9.375c-0.187 0.187-0.438 0.281-0.688 0.281z"></path>
        </symbol>
        <symbol id="icon-shares" viewBox="0 0 24 24">
          <path d="M 18 2 C 16.35499 2 15 3.3549904 15 5 C 15 5.1909529 15.021791 5.3771224 15.056641 5.5585938 L 7.921875 9.7207031 C 7.3985399 9.2778539 6.7320771 9 6 9 C 4.3549904 9 3 10.35499 3 12 C 3 13.64501 4.3549904 15 6 15 C 6.7320771 15 7.3985399 14.722146 7.921875 14.279297 L 15.056641 18.439453 C 15.021555 18.621514 15 18.808386 15 19 C 15 20.64501 16.35499 22 18 22 C 19.64501 22 21 20.64501 21 19 C 21 17.35499 19.64501 16 18 16 C 17.26748 16 16.601593 16.279328 16.078125 16.722656 L 8.9433594 12.558594 C 8.9782095 12.377122 9 12.190953 9 12 C 9 11.809047 8.9782095 11.622878 8.9433594 11.441406 L 16.078125 7.2792969 C 16.60146 7.7221461 17.267923 8 18 8 C 19.64501 8 21 6.6450096 21 5 C 21 3.3549904 19.64501 2 18 2 z M 18 4 C 18.564129 4 19 4.4358706 19 5 C 19 5.5641294 18.564129 6 18 6 C 17.435871 6 17 5.5641294 17 5 C 17 4.4358706 17.435871 4 18 4 z M 6 11 C 6.5641294 11 7 11.435871 7 12 C 7 12.564129 6.5641294 13 6 13 C 5.4358706 13 5 12.564129 5 12 C 5 11.435871 5.4358706 11 6 11 z M 18 18 C 18.564129 18 19 18.435871 19 19 C 19 19.564129 18.564129 20 18 20 C 17.435871 20 17 19.564129 17 19 C 17 18.435871 17.435871 18 18 18 z"></path>
        </symbol>
        <symbol id="icon-fullscreen" viewBox="0 0 24 24">
          <path d="M4 1.5C2.61929 1.5 1.5 2.61929 1.5 4V8.5C1.5 9.05228 1.94772 9.5 2.5 9.5H3.5C4.05228 9.5 4.5 9.05228 4.5 8.5V4.5H8.5C9.05228 4.5 9.5 4.05228 9.5 3.5V2.5C9.5 1.94772 9.05228 1.5 8.5 1.5H4Z"></path>
          <path d="M20 1.5C21.3807 1.5 22.5 2.61929 22.5 4V8.5C22.5 9.05228 22.0523 9.5 21.5 9.5H20.5C19.9477 9.5 19.5 9.05228 19.5 8.5V4.5H15.5C14.9477 4.5 14.5 4.05228 14.5 3.5V2.5C14.5 1.94772 14.9477 1.5 15.5 1.5H20Z"></path>
          <path d="M20 22.5C21.3807 22.5 22.5 21.3807 22.5 20V15.5C22.5 14.9477 22.0523 14.5 21.5 14.5H20.5C19.9477 14.5 19.5 14.9477 19.5 15.5V19.5H15.5C14.9477 19.5 14.5 19.9477 14.5 20.5V21.5C14.5 22.0523 14.9477 22.5 15.5 22.5H20Z"></path>
          <path d="M1.5 20C1.5 21.3807 2.61929 22.5 4 22.5H8.5C9.05228 22.5 9.5 22.0523 9.5 21.5V20.5C9.5 19.9477 9.05228 19.5 8.5 19.5H4.5V15.5C4.5 14.9477 4.05228 14.5 3.5 14.5H2.5C1.94772 14.5 1.5 14.9477 1.5 15.5V20Z"></path>
        </symbol>
        <symbol id="icon-close" viewBox="0 0 32 32">
          <path d="M0.544 0.544v0q-0.32 0.32-0.416 0.576-0.096 0.224-0.096 0.704v0 0.768l13.312 13.408-6.208 6.272q-2.528 2.528-4.544 4.576v0q-1.952 1.984-2.144 2.208v0q-0.48 0.608-0.448 1.216 0.032 0.64 0.576 1.152 0.512 0.544 1.152 0.576 0.608 0.032 1.216-0.448v0q0.224-0.192 2.208-2.144v0q2.048-2.016 4.576-4.544v0l6.272-6.24 6.272 6.24q2.528 2.528 4.608 4.544v0q1.984 1.952 2.208 2.144v0q0.608 0.48 1.216 0.448 0.64-0.032 1.152-0.576 0.544-0.512 0.544-1.152 0.032-0.608-0.448-1.216v0q-0.384-0.48-6.656-6.816v0l-6.24-6.24 6.24-6.272q2.528-2.528 4.544-4.608v0q1.952-1.984 2.112-2.208v0q0.544-0.64 0.448-1.408-0.128-0.768-0.8-1.28v0q-0.096-0.096-0.416-0.16-0.288-0.064-0.608-0.064v0h-0.8l-13.376 13.344-13.376-13.344h-0.768q-0.544 0-0.768 0.096t-0.544 0.448z"></path>
        </symbol>
      </svg>
    </>
  );
}