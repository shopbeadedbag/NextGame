import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { SITE_NAME, SITE_URL } from '@/config/site';

export default function AboutPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": `About ${SITE_NAME}`,
    "url": `${SITE_URL}/about`,
    "mainEntity": {
      "@type": "Organization",
      "name": SITE_NAME,
      "description": "Your premier destination for free online games",
      "url": SITE_URL
    }
  };

  return (
    <Layout
      title={`About - ${SITE_NAME}`}
      description={`Learn more about ${SITE_NAME}, your premier destination for free online games. Discover our mission, features, and commitment to providing quality gaming experiences.`}
      url={`${SITE_URL}/about`}
      type="website"
    >
      <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                About {SITE_NAME}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Your premier destination for free online games
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Mission
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  At {SITE_NAME}, we're passionate about bringing the joy of gaming to everyone. Our mission is to provide
                  a curated collection of high-quality, free-to-play online games that are accessible instantly in your
                  web browser.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We believe that great games should be easily accessible without the need for downloads, registrations,
                  or complicated installations. That's why we've built a platform where you can jump straight into the
                  action with just one click.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What We Offer
                </h2>
                <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Thousands of Games:</strong> A vast collection of games across all genres - action, adventure, puzzle, racing, sports, and more</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>No Downloads Required:</strong> All games are HTML5 based and run directly in your browser</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Mobile Friendly:</strong> Play on any device - desktop, tablet, or smartphone</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Regular Updates:</strong> New games added daily to keep our collection fresh and exciting</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary mr-3 mt-1">✓</span>
                    <span><strong>Community Driven:</strong> User ratings and reviews help others discover great games</span>
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Join Our Community
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Whether you're a casual gamer looking for quick entertainment or a hardcore player seeking
                  challenging experiences, {SITE_NAME} has something for everyone. Join thousands of players
                  who visit us daily for their gaming fix.
                </p>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary-hover text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    Start Playing Now
                    <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData)
        }}
      />
    </Layout>
  );
}