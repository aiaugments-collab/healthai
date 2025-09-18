import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="transition-colors duration-500 ease-in-out">
      <Head>
        {/* Basic Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="HealthAI Enterprise - Advanced AI-driven healthcare intelligence platform for healthcare organizations, delivering precision diagnostics and scalable digital health solutions."
        />
        <meta
          name="keywords"
          content="healthcare AI, enterprise healthcare, digital health platform, healthcare intelligence, predictive analytics, clinical decision support, healthcare technology, medical AI"
        />

        {/* Favicon and App Icons */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="https://symptomsync.vercel.app/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="https://symptomsync.vercel.app/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="https://symptomsync.vercel.app/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#344966" />

        {/* Open Graph / Facebook */}
        <meta property="og:title" content="HealthAI Enterprise" />
        <meta
          property="og:description"
          content="Enterprise-grade AI-powered healthcare intelligence platform delivering precision diagnostics and scalable digital health solutions for healthcare organizations."
        />
        <meta
          property="og:image"
          content="https://symptomsync.vercel.app/android-chrome-512x512.png"
        />
        <meta property="og:url" content="https://symptomsync.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="HealthAI Enterprise" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="HealthAI Enterprise" />
        <meta
          name="twitter:description"
          content="Enterprise-grade AI-powered healthcare intelligence platform delivering precision diagnostics and scalable digital health solutions."
        />
        <meta
          name="twitter:image"
          content="https://symptomsync.vercel.app/android-chrome-512x512.png"
        />

        {/* Additional Meta Tags */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased transition-colors duration-500 ease-in-out">
        <Main />
        <NextScript />
        <noscript>You need to enable JavaScript to run this app.</noscript>
      </body>
    </Html>
  );
}
