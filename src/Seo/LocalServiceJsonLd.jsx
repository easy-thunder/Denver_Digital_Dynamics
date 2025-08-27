// src/components/Seo/LocalServiceJsonLd.jsx
export default function LocalServiceJsonLd() {
    const data = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",        // or "LocalBusiness"
      "name": "Denver Digital Dynamics",
      "url": "https://denverdigitaldynamics.com",
      "telephone": "+1-970-582-0018",
      "email": "jddiehl17@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Denver",
        "addressRegion": "CO",
        "addressCountry": "US"
      },
      "areaServed": [{ "@type": "City", "name": "Denver" }],
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 39.7392,
        "longitude": -104.9903
      }
    };
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    );
  }
  