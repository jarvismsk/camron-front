import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Preconnect for Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      
      {/* Set the static title */}
      <title>Camco | Sell your used camera instantly</title>
      
      {/* Render the component and Vercel Analytics */}
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights /> {/* Add Vercel Speed Insights */}
      
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
