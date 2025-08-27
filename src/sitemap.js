export default async function sitemap() {
    const base = 'https://denverdigitaldynamics.com';
    return [
      { url: `${base}/`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
      { url: `${base}/Pricing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    ];
  }