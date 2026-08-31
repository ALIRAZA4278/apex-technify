import { getServiceBySlug, servicesData } from "@/data/services";
import ServicePageClient from "./ServicePageClient";
import { notFound } from "next/navigation";

// Generate static params for all services
export async function generateStaticParams() {
  return Object.keys(servicesData).map((slug) => ({
    slug: slug,
  }));
}

// Generate dynamic metadata for each service page
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    };
  }

  const baseUrl = "https://www.apextechnify.com";

  // Service-specific keywords
  const serviceKeywords = {
    "web-development": ["web development services", "website design", "custom web development", "WordPress development", "React development", "Next.js development", "professional website design"],
    "logo-design": ["logo design services", "professional logo design", "brand identity design", "custom logo creation", "logo design company", "creative logo design"],
    "graphics-design": ["graphics design services", "professional graphic design", "social media graphics", "marketing materials design", "brand collateral design"],
    "video-editing": ["video editing services", "professional video editing", "video production", "motion graphics", "video post-production"],
    "digital-marketing": ["digital marketing services", "online marketing", "PPC advertising", "content marketing", "email marketing", "marketing automation"],
    "seo-optimization": ["SEO services", "SEO optimization", "search engine optimization", "keyword research", "on-page SEO", "technical SEO", "link building"],
    "social-media": ["social media management", "social media marketing", "Instagram marketing", "Facebook marketing", "social media strategy"],
    "e-commerce": ["e-commerce development", "online store development", "Shopify development", "WooCommerce development", "e-commerce solutions"],
  };

  const keywords = serviceKeywords[slug] || [];

  return {
    title: `Professional ${service.title} Services`,
    description: service.description.slice(0, 160),
    keywords: ["Apex Technify", "apextechnify", service.title, ...keywords],
    openGraph: {
      title: `${service.title} Services | Apex Technify`,
      description: service.description.slice(0, 160),
      url: `${baseUrl}/services/${slug}`,
      siteName: "Apex Technify",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.title} Services | Apex Technify`,
      description: service.description.slice(0, 160),
    },
    alternates: {
      canonical: `${baseUrl}/services/${slug}`,
    },
  };
}

// Generate JSON-LD structured data
function generateJsonLd(service, slug) {
  const baseUrl = "https://www.apextechnify.com";

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.title} Services`,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: "Apex Technify",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      sameAs: [
        "https://www.facebook.com/apextechnify",
        "https://www.instagram.com/apextechnify",
        "https://www.linkedin.com/company/apextechnify",
        "https://twitter.com/apextechnify"
      ]
    },
    url: `${baseUrl}/services/${slug}`,
    areaServed: {
      "@type": "Country",
      name: "Worldwide"
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Packages`,
      itemListElement: service.features.map((feature, index) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: feature.title,
          description: feature.description
        }
      }))
    }
  };
}

// FAQ Schema for rich snippets
function generateFaqJsonLd(service) {
  if (!service.faqs || service.faqs.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = generateJsonLd(service, slug);
  const faqJsonLd = generateFaqJsonLd(service);

  return (
    <>
      {/* Service Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      {/* FAQ Schema */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <ServicePageClient service={service} />
    </>
  );
}
