import React from 'react';
import Layout from '@/components/Layout';
import { SITE_NAME, SITE_URL } from '@/config/site';

export default function ContactPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Us",
    "url": `${SITE_URL}/contact`,
    "mainEntity": {
      "@type": "Organization",
      "name": SITE_NAME,
      "url": SITE_URL,
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "email": `contact@${SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com`,
        "availableLanguage": ["English"]
      }
    }
  };

  return (
    <Layout
      title={`Contact Us - ${SITE_NAME}`}
      description={`Contact ${SITE_NAME} for questions, feedback, or support. We're here to help with any inquiries about our games and services.`}
      url={`${SITE_URL}/contact`}
      type="website"
    >
      <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                We'd love to hear from you! Get in touch with us for any questions, feedback, or support.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Get in Touch
                  </h2>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    Whether you have questions about our games, need technical support, or want to provide feedback,
                    we're here to help. Reach out to us through any of the channels below.
                  </p>
                </div>

                {/* Email Contact */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Email Us
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      For general inquiries and support
                    </p>
                    <a
                      href={`mailto:contact@${SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="text-primary hover:text-primary-hover transition-colors duration-200 font-medium"
                    >
                      contact@{SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com
                    </a>
                  </div>
                </div>

                {/* Support Contact */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Technical Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      For technical issues and bug reports
                    </p>
                    <a
                      href={`mailto:support@${SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="text-primary hover:text-primary-hover transition-colors duration-200 font-medium"
                    >
                      support@{SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com
                    </a>
                  </div>
                </div>

                {/* Business Contact */}
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      Business Inquiries
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      For partnerships and business opportunities
                    </p>
                    <a
                      href={`mailto:business@${SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com`}
                      className="text-primary hover:text-primary-hover transition-colors duration-200 font-medium"
                    >
                      business@{SITE_NAME.toLowerCase().replace(/\s+/g, '')}.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Send us a Message
                  </h3>
                  <form className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="your@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Subject
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                      >
                        <option value="">Select a topic</option>
                        <option value="general">General Inquiry</option>
                        <option value="technical">Technical Support</option>
                        <option value="game-request">Game Request</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                        placeholder="Tell us how we can help you..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      Send Message
                    </button>
                  </form>

                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                    We typically respond within 24-48 hours. For urgent issues, please use our support email.
                  </p>
                </div>

                {/* FAQ Section */}
                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Frequently Asked Questions
                  </h3>
                  <div className="space-y-3">
                    <div className="border-b border-gray-200 dark:border-gray-600 pb-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        How long does it take to get a response?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        We typically respond to emails within 24-48 hours during business days.
                      </p>
                    </div>
                    <div className="border-b border-gray-200 dark:border-gray-600 pb-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Can I request a specific game?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Yes! We welcome game requests. Please use the contact form and select "Game Request" as the subject.
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        Do you accept game submissions from developers?
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Absolutely! Use the business email for partnership and game submission inquiries.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-400 mb-3">
                We're Here to Help!
              </h3>
              <p className="text-blue-800 dark:text-blue-300 text-sm leading-relaxed">
                Our team is dedicated to providing you with the best gaming experience possible. Whether you have a
                technical issue, need help finding a specific game, or just want to share your feedback, we're always
                happy to hear from our community. Your input helps us improve and grow!
              </p>
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