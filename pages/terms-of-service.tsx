import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { SITE_NAME, SITE_URL, SITE_CONFIG } from '@/config/site';

export default function TermsOfServicePage() {
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
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Terms of Service',
    url: `${SITE_URL}/terms-of-service`,
    description: `Terms of Service for ${SITE_NAME} - Rules and guidelines for using our website and services.`,
  };

  return (
    <Layout
      title={`Terms of Service - ${SITE_NAME}`}
      description={`Terms of Service for ${SITE_NAME}. Please read these terms carefully before using our website and services.`}
      url={`${SITE_URL}/terms-of-service`}
      type="website"
    >
      <div className="w-full mx-auto px-3 md:px-10 py-3 md:py-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 p-8">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Last updated:{' '}
                {currentDate || 'Loading...'}
              </p>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  By accessing and using {SITE_NAME} (&quot;the Website&quot;), you agree to be
                  bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these
                  Terms, you may not access or use the Website. These Terms apply to all visitors,
                  users, and others who access or use the Website.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  By using the Website, you represent that you are at least 13 years of age or
                  older. If you are under 13, you may only use the Website with the consent and
                  supervision of a parent or legal guardian.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  2. Use License
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  Permission is granted to temporarily download one copy of the materials
                  (information or software) on {SITE_NAME} for personal, non-commercial transitory
                  viewing only. This is the grant of a license, not a transfer of title, and under
                  this license you may not:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
                  <li>Modify or copy the materials</li>
                  <li>
                    Use the materials for any commercial purpose, or for any public display
                    (commercial or non-commercial)
                  </li>
                  <li>Attempt to decompile or reverse engineer any software contained on {SITE_NAME}</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>
                    Transfer the materials to another person or &quot;mirror&quot; the materials on any
                    other server
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  This license shall automatically terminate if you violate any of these
                  restrictions and may be terminated by {SITE_NAME} at any time. Upon terminating
                  your viewing of these materials or upon the termination of this license, you must
                  destroy any downloaded materials in your possession whether in electronic or
                  printed format.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  3. Disclaimer
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  The materials on {SITE_NAME} are provided on an &apos;as is&apos; basis. {SITE_NAME}{' '}
                  makes no warranties, expressed or implied, and hereby disclaims and negates all
                  other warranties including, without limitation, implied warranties or conditions of
                  merchantability, fitness for a particular purpose, or non-infringement of
                  intellectual property or other violation of rights.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Further, {SITE_NAME} does not warrant or make any representations concerning the
                  accuracy, likely results, or reliability of the use of the materials on its
                  website or otherwise relating to such materials or on any sites linked to this
                  site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  4. Limitations
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  In no event shall {SITE_NAME} or its suppliers be liable for any damages
                  (including, without limitation, damages for loss of data or profit, or due to
                  business interruption) arising out of the use or inability to use the materials on{' '}
                  {SITE_NAME}, even if {SITE_NAME} or a {SITE_NAME} authorized representative has
                  been notified orally or in writing of the possibility of such damage. Because some
                  jurisdictions do not allow limitations on implied warranties, or limitations of
                  liability for consequential or incidental damages, these limitations may not apply
                  to you.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  5. Accuracy of Materials
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The materials appearing on {SITE_NAME} could include technical, typographical, or
                  photographic errors. {SITE_NAME} does not warrant that any of the materials on its
                  website are accurate, complete or current. {SITE_NAME} may make changes to the
                  materials contained on its website at any time without notice. However {SITE_NAME}{' '}
                  does not make any commitment to update the materials.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  6. Links
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {SITE_NAME} has not reviewed all of the sites linked to its website and is not
                  responsible for the contents of any such linked site. The inclusion of any link
                  does not imply endorsement by {SITE_NAME} of the site. Use of any such linked
                  website is at the user&apos;s own risk.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  7. Modifications
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {SITE_NAME} may revise these terms of service for its website at any time without
                  notice. By using this website you are agreeing to be bound by the then current
                  version of these terms of service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  8. Governing Law
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  These terms and conditions are governed by and construed in accordance with the
                  laws of the United States and you irrevocably submit to the exclusive jurisdiction
                  of the courts in that location.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  9. User Conduct
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  By using our website, you agree to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Use the website only for lawful purposes and in accordance with these Terms</li>
                  <li>
                    Not engage in any conduct that restricts or inhibits anyone&apos;s use or
                    enjoyment of the website
                  </li>
                  <li>Not upload or transmit any viruses, malware, or other harmful code</li>
                  <li>Not attempt to gain unauthorized access to any portion of the website</li>
                  <li>
                    Not use any automated means to access the website for any purpose without our
                    express written permission
                  </li>
                  <li>Not remove, alter, or obscure any proprietary notices on the website</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  10. Intellectual Property
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The website and its original content, features, and functionality are owned by{' '}
                  {SITE_NAME} and are protected by international copyright, trademark, patent, trade
                  secret, and other intellectual property or proprietary rights laws. The games
                  featured on our platform are the property of their respective developers and
                  publishers.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  We respect the intellectual property rights of others and expect our users to do
                  the same. If you believe that your work has been copied in a way that constitutes
                  copyright infringement, please contact us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  11. Termination
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We may terminate or suspend access to our website immediately, without prior
                  notice or liability, for any reason whatsoever, including without limitation if
                  you breach the Terms. All provisions of the Terms which by their nature should
                  survive termination shall survive termination, including, without limitation,
                  ownership provisions, warranty disclaimers, indemnity, and limitations of
                  liability.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  12. Indemnification
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  You agree to defend, indemnify, and hold harmless {SITE_NAME} and its licensee and
                  licensors, and their employees, contractors, agents, officers, and directors, from
                  and against any and all claims, damages, obligations, losses, liabilities, costs,
                  or debt, and expenses (including but not limited to attorney&apos;s fees),
                  resulting from or arising out of: (a) your use and access of the website, by you
                  or any person using your account and password; or (b) a breach of these Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  13. Contact Information
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <ul className="space-y-2 text-gray-700 dark:text-gray-300">
                  <li>
                    <strong>By email:</strong>{' '}
                    {SITE_CONFIG.legal.termsEmail}
                  </li>
                  <li>
                    <strong>By visiting this page on our website:</strong>{' '}
                    <Link href="/contact" className="text-primary hover:underline">
                      Contact Us
                    </Link>
                  </li>
                </ul>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mt-4">
                  By continuing to access or use our website after any revisions become effective,
                  you agree to be bound by the revised terms. If you do not agree to the new terms,
                  you are no longer authorized to use the website.
                </p>
              </section>
            </div>
          </div>
        </div>

        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </div>
    </Layout>
  );
}