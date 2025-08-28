import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});




export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Denver Digital Dynamics', template: '%s — Denver Digital Dynamics' },
  description: 'Small-business websites from $400. Design • Develop • Deploy.',
  openGraph: {
    title: 'Denver Digital Dynamics',
    description: 'Small-business websites from $400.',
    url: siteUrl,
    siteName: 'Denver Digital Dynamics',
    images: [{ url: '/og.png?v=2', width: 1200, height: 630, alt: 'Denver Digital Dynamics' }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og.png?v=2'],
    title: 'Denver Digital Dynamics',
    description: 'Small-business websites from $400.',
  },

  icons: {
    icon: [      
      { url: "/logos/diamond-weave-logo-1024.png", sizes: "32x32", type: "image/png" },
    ]
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  other: {
    "geo.region": "US-CO",
    "geo.placename": "Denver",
    "geo.position": "39.7392;-104.9903",
    "ICBM": "39.7392, -104.9903"
  }
};




export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
