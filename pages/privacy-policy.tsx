import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { SITE_NAME, SITE_URL, SITE_CONFIG } from '@/config/site';

export default function PrivacyPolicyPage() {
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // Set the date on the client side after hydration to avoid mismatch
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    setCurrentDate(date);
  }, []);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Privacy Policy",
    "url": `${SITE_URL}/privacy-policy`,
    "description": `Privacy Policy for ${SITE_NAME} - How we collect, use, and protect your personal information.`
  };

  return (
    <Layout
      title={`Privacy Policy - ${SITE_NAME}`}
      description={`Privacy Policy for ${SITE_NAME}. Learn how we collect, use, and protect your personal information when you visit our website.`}
      url={`${SITE_URL}/privacy-policy`}
      type="website"
    >
      <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Privacy Policy
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {currentDate || 'Loading...'}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Introduction
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  At {SITE_NAME}, we are committed to protecting your privacy and ensuring the security of your personal information.
                  This Privacy Policy outlines how we collect, use, disclose, and protect your information when you visit our website
                  and use our services.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing and using our website, you acknowledge that you have read and understood this Privacy Policy.
                  If you do not agree with any part of this policy, please do not use our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Information We Collect
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We collect information that you provide voluntarily and automatically:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Device information (browser type, operating system)</li>
                  <li>Usage data (pages visited, time spent)</li>
                  <li>Game preferences and interactions</li>
                  <li>Contact information when you reach out to us</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  How We Use Your Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use the information we collect for the following purposes:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>To provide and maintain our services:</strong> Including displaying games and personalizing your experience</li>
                  <li><strong>To improve our website:</strong> Analyzing usage patterns to enhance user experience</li>
                  <li><strong>To communicate with you:</strong> Responding to inquiries and providing support</li>
                  <li><strong>To ensure security:</strong> Monitoring for fraudulent or malicious activity</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Cookies and Tracking Technologies
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  We use cookies to enhance your browsing experience. Cookies are small files stored on your device
                  that help us remember your preferences and understand how you use our website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 mb-2">
                  Types of cookies we use:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li><strong>Essential Cookies:</strong> Required for basic website functionality</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our site</li>
                  <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Third-Party Services
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent.
                  We may share information with trusted service providers who assist us in operating our website,
                  provided they agree to keep this information confidential.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Data Security
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We take reasonable measures to protect your personal information from unauthorized access, alteration,
                  disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Your Rights
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Access the personal information we hold about you</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt out of certain data collection and processing</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Changes to This Privacy Policy
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting
                  the new Privacy Policy on this page and updating the "Last updated" date at the top of this policy.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Contact Us
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li><strong>By email:</strong> {SITE_CONFIG.legal.privacyEmail}</li>
                  <li><strong>By visiting this page on our website:</strong> <Link href="/contact" className="text-primary hover:underline">Contact Us</Link></li>
                </ul>
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