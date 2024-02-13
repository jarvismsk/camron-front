// pages/_app.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Analytics } from '@vercel/analytics/react';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteComplete = (url) => {
      // Tracking pageview using gtag
      window.gtag('config', 'AW-16443243167', {
        page_path: url,
      });
    };

    router.events.on('routeChangeComplete', handleRouteComplete);

    // Cleanup event listener
    return () => {
      router.events.off('routeChangeComplete', handleRouteComplete);
    };
  }, [router.events]);

  return (
    <>
      {/* Preconnect for Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Render the component and Versel Analytics */}
      <Component {...pageProps} />
      <Analytics />
      
      {/* Google Tag Manager script */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16443243167"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16443243167');
          `,
        }}
      />
    </>
  );
}
