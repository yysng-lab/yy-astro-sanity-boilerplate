export const businessConfig = {
  /**
   * Enable LocalBusiness schema in JSON-LD output
   */
  localBusiness: {
    enabled: false,
    schema: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": "",
      "image": "",
      "url": "",
      "telephone": "",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "",
        "addressLocality": "",
        "addressRegion": "",
        "postalCode": "",
        "addressCountry": ""
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "",
        "longitude": ""
      },
      "openingHours": [] // Example: ["Mo-Fr 09:00-18:00"]
    }
  },

  /**
   * Enable Organization schema (homepage / global identity)
   */
  organization: {
    enabled: false,
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "",
      "url": "",
      "logo": "",
      "sameAs": [] // Social profiles
    }
  }
};
