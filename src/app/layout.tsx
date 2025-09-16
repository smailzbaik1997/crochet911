import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import GoogleAnalytics from "@/components/GoogleAnalytics";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Crochet911 - Free & Premium Crochet Patterns for All Skill Levels",
    template: "%s | Crochet911"
  },
  description: "Discover thousands of crochet patterns for all skill levels. Browse free and premium designs including animals, clothing, home decor, and more. Your ultimate crochet companion with detailed instructions and helpful tips.",
  keywords: [
    "crochet patterns",
    "free crochet patterns", 
    "crochet designs",
    "amigurumi patterns",
    "crochet tutorials",
    "beginner crochet",
    "advanced crochet",
    "crochet projects",
    "yarn crafts",
    "handmade patterns"
  ].join(", "),
  authors: [{ name: "Crochet911 Team" }],
  creator: "Crochet911",
  publisher: "Crochet911",
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-16x16.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: 'Crochet911',
    title: 'Crochet911 - Free & Premium Crochet Patterns',
    description: 'Discover thousands of crochet patterns for all skill levels. Your ultimate crochet companion.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crochet911 - Free & Premium Crochet Patterns',
    description: 'Discover thousands of crochet patterns for all skill levels. Your ultimate crochet companion.',
    creator: '@crochet911',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Crochet911',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    logo: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
    description: 'Your ultimate destination for free and premium crochet patterns for all skill levels.',
    sameAs: [
      // Add social media URLs here when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'English'
    }
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body
        className={`${poppins.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <GoogleAnalytics />
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}