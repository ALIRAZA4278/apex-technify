import { Geist, Geist_Mono, Sora, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  metadataBase: new URL('https://www.apextechnify.com'),
  title: {
    default: "Apex Technify - Digital Agency | Web Development, Logo Design & Digital Marketing",
    template: "%s | Apex Technify"
  },
  description: "Apex Technify is a leading digital agency offering web development, logo design, graphics design, video editing, digital marketing, SEO optimization, social media management, and e-commerce solutions. Transform your business with our expert services.",
  keywords: [
    "Apex Technify",
    "apextechnify",
    "digital agency",
    "web development",
    "website design",
    "logo design",
    "graphics design",
    "video editing",
    "digital marketing",
    "SEO services",
    "SEO optimization",
    "social media management",
    "e-commerce solutions",
    "custom web development",
    "branding services",
    "online marketing"
  ],
  authors: [{ name: "Apex Technify" }],
  creator: "Apex Technify",
  publisher: "Apex Technify",
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
    url: 'https://www.apextechnify.com',
    siteName: 'Apex Technify',
    title: 'Apex Technify - Digital Agency | Web Development, Logo Design & Digital Marketing',
    description: 'Apex Technify is a leading digital agency offering web development, logo design, graphics design, video editing, digital marketing, SEO optimization, social media management, and e-commerce solutions.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Apex Technify - Digital Agency | Web Development & Digital Marketing',
    description: 'Transform your business with Apex Technify. Expert web development, logo design, digital marketing, SEO, and more.',
    creator: '@apextechnify',
  },
  alternates: {
    canonical: 'https://www.apextechnify.com',
  },
  verification: {
    google: 'xD_KHgNl1ypzZXjbUGHkEfdKBgjubP1fBMvFP_f92Ug',
  },
  category: 'technology',
};

// Organization JSON-LD Schema
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Apex Technify",
  alternateName: "ApexTechnify",
  url: "https://www.apextechnify.com",
  logo: "https://www.apextechnify.com/logo.png",
  description: "Apex Technify is a leading digital agency offering web development, logo design, graphics design, video editing, digital marketing, SEO optimization, social media management, and e-commerce solutions.",
  foundingDate: "2024",
  sameAs: [
    "https://www.facebook.com/apextechnify",
    "https://www.instagram.com/apextechnify",
    "https://www.linkedin.com/company/apextechnify",
    "https://twitter.com/apextechnify"
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English", "Urdu"]
  },
  offers: {
    "@type": "AggregateOffer",
    offerCount: "8",
    offers: [
      { "@type": "Offer", name: "Web Development Services" },
      { "@type": "Offer", name: "Logo Design Services" },
      { "@type": "Offer", name: "Graphics Design Services" },
      { "@type": "Offer", name: "Video Editing Services" },
      { "@type": "Offer", name: "Digital Marketing Services" },
      { "@type": "Offer", name: "SEO Optimization Services" },
      { "@type": "Offer", name: "Social Media Management" },
      { "@type": "Offer", name: "E-Commerce Solutions" }
    ]
  }
};

// Website JSON-LD Schema
const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Apex Technify",
  alternateName: "ApexTechnify",
  url: "https://www.apextechnify.com",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://www.apextechnify.com/services/{search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HVH1Y6JCPJ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HVH1Y6JCPJ');
          `}
        </Script>

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${sora.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
