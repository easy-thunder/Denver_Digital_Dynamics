
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import HomeButtonGuard from "@/components/ui/HomeButton/HomeButtonGuard";
import Footer from "@/components/Footer/Footer";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
"https://denver-digital-dynamics.vercel.app" ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');



export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Denver Digital Dynamics', template: '%s — Denver Digital Dynamics' },
  description: 'Small-business websites from $400. Design • Develop • Deploy.',
  openGraph: {
    title: 'Denver Digital Dynamics',
    description: 'Small-business websites from $400.',
    url: siteUrl,
    siteName: 'Denver Digital Dynamics',
    images: [
      { url: `${siteUrl}/og.png?v=3`, width: 1200, height: 630, alt: 'Denver Digital Dynamics' }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: [`${siteUrl}/og.png?v=3`],
    title: 'Denver Digital Dynamics',
    description: 'Small-business websites from $400.',
  },


  icons: {
    icon: [      
      { url: "/logos/diamond-weave-logo-1024.png", sizes: "32x32", type: "image/png" },
    ]
  },
  alternates: { canonical: '/' },
  other: {
    "geo.region": "US-CO",
    "geo.placename": "Denver",
    "geo.position": "39.7392;-104.9903",
    "ICBM": "39.7392, -104.9903"
  }
};




export default function RootLayout({ children }) {

  const beforeSend = (event) => {
    if (localStorage.getItem('va-disable') === 'true') {
      console.log('Vercel Analytics: Ignoring event for developer');
      return null; 
    }
    return event;
  };
  return (
    <html lang="en">
      <Analytics beforeSend={beforeSend}/>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <HomeButtonGuard />
        {children}
        <Footer />  
      </body>
    </html>
  );
}
