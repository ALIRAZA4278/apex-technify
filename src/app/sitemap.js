export default function sitemap() {
  const baseUrl = 'https://www.apextechnify.com';

  // Service slugs
  const services = [
    'web-development',
    'logo-design',
    'graphics-design',
    'video-editing',
    'digital-marketing',
    'seo-optimization',
    'social-media',
    'e-commerce'
  ];

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ];

  // Service pages
  const servicePages = services.map((slug) => ({
    url: `${baseUrl}/services/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages];
}
