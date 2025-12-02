export const businessConfig = {
  /**
   * ORGANIZATION — enabled manually per project
   */
  organization: {
    enabled: false,
    schema: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "",
      url: "",
      logo: "",
      sameAs: []
    }
  },

  /**
   * LOCAL BUSINESS — optional
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
      "openingHours": []
    }
  }
};
