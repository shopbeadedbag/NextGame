import { NextPageContext } from 'next';
import Head from 'next/head';
import { SITE_NAME } from '@/config/site';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

interface ErrorProps {
  statusCode?: number;
}

export default function Error({ statusCode }: ErrorProps) {
  const router = useRouter();

  useEffect(() => {
    // Client-side redirect for 404 errors
    if (statusCode === 404 && typeof window !== 'undefined') {
      router.replace('/404');
    }
  }, [statusCode, router]);

  // Don't render anything for 404 errors (will redirect)
  if (statusCode === 404) {
    return null;
  }

  // Render default error page for other error codes
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>{statusCode ? `Error ${statusCode}` : 'Error'} - {SITE_NAME}</title>
      </Head>
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-white mb-4">
          {statusCode || 'Error'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {statusCode
            ? `An error ${statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
        <a
          href="/"
          className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-hover transition-colors"
        >
          Go Back Home
        </a>
      </div>
    </div>
  );
}

Error.getInitialProps = ({ res, err, asPath }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  // Handle 404 errors with redirect
  if (statusCode === 404 && res) {
    // Server-side redirect with 302 status
    res.writeHead(302, {
      Location: '/404',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      Pragma: 'no-cache',
      Expires: '0',
    });
    res.end();
  }

  return { statusCode };
};