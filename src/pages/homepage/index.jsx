import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import ServicesPreview from "./components/ServicesPreview";
import TestimonialsSection from "./components/TestimonialsSection";
import BeforeAfterGallery from "./components/BeforeAfterGallery";
import NewsletterSignup from "./components/NewsletterSignup";
import Footer from "./components/Footer";

const Homepage = () => {
  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    name: "Bella Bridal Studio",
    description:
      "Professional bridal makeup artistry that enhances your natural beauty and creates unforgettable moments for your special day.",
    url: "https://bellabridal.com",
    telephone: "(555) 123-4567",
    email: "hello@bellabridal.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 Beauty Lane",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94102",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "37.7749",
      longitude: "-122.4194",
    },
    openingHours: ["Mo-Fr 09:00-18:00", "Sa 08:00-20:00", "Su 10:00-16:00"],
    priceRange: "$100-$500",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: "500",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Bridal Makeup Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Bridal Makeup",
            description:
              "Complete bridal transformation with trial session, premium products, and touch-up kit included",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Party Makeup",
            description:
              "Glamorous looks for special occasions, parties, and celebrations with professional finish",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Trial Session",
            description:
              "Perfect your look before the big day with our comprehensive trial makeup session",
          },
        },
      ],
    },
  };

  return (
    <>
      <Helmet>
        <title>
          Bella Bridal Studio - Professional Bridal Makeup Artist | San
          Francisco
        </title>
        <meta
          name="description"
          content="Transform your special day with professional bridal makeup artistry. Expert makeup services for weddings, parties, and special occasions in San Francisco. Book your consultation today."
        />
        <meta
          name="keywords"
          content="bridal makeup, wedding makeup artist, San Francisco makeup artist, professional makeup, party makeup, trial session, beauty services"
        />

        {/* Open Graph Tags */}
        <meta
          property="og:title"
          content="Bella Bridal Studio - Professional Bridal Makeup Artist"
        />
        <meta
          property="og:description"
          content="Transform your special day with professional bridal makeup artistry that enhances your natural beauty and creates unforgettable moments."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://bellabridal.com" />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        />
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="Bella Bridal Studio" />

        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Bella Bridal Studio - Professional Bridal Makeup Artist"
        />
        <meta
          name="twitter:description"
          content="Transform your special day with professional bridal makeup artistry that enhances your natural beauty."
        />
        <meta
          name="twitter:image"
          content="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
        />

        {/* Additional Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Bella Bridal Studio" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://bellabridal.com" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Services Preview (responsive width) */}
          <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%]">
            <ServicesPreview />
          </div>

          {/* Before/After Gallery (responsive width) */}
          <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%]">
            <BeforeAfterGallery />
          </div>

          {/* Testimonials (full-width background) */}
          <TestimonialsSection />

          {/* Newsletter Signup (responsive width) */}
          <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%]">
            <NewsletterSignup />
          </div>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Homepage;
