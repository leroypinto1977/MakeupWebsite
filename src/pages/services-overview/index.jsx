import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import GradientHeading from "../../components/ui/GradientHeading";
import Icon from "../../components/AppIcon";
import Button from "../../components/ui/Button";
import ServiceCard from "./components/ServiceCard";
import FilterChips from "./components/FilterChips";
import ComparisonTable from "./components/ComparisonTable";
import ServiceStats from "./components/ServiceStats";
import MobileFilterPanel from "./components/MobileFilterPanel";
import Footer from "../homepage/components/Footer";

const ServicesOverview = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Mock services data
  const services = [
    {
      id: 1,
      name: "Bridal Makeup Package",
      category: "Bridal",
      duration: "180",
      startingPrice: 299,
      rating: 4.9,
      isPopular: true,
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=300&fit=crop",
      description:
        "Complete bridal transformation with premium products and professional styling for your special day.",
      features: [
        "Pre-wedding consultation",
        "Premium makeup application",
        "Hair styling included",
        "Touch-up kit provided",
        "Photography ready finish",
        "Trial session available",
        "Travel to venue",
        "Assistant support",
      ],
    },
    {
      id: 2,
      name: "Party Glam Makeup",
      category: "Party",
      duration: "90",
      startingPrice: 149,
      rating: 4.7,
      isPopular: false,
      image:
        "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?w=500&h=300&fit=crop",
      description:
        "Glamorous party makeup perfect for special occasions, events, and celebrations.",
      features: [
        "Event consultation",
        "Glamour makeup application",
        "Lash enhancement",
        "Contouring & highlighting",
        "Long-lasting formula",
        "Photo-ready finish",
      ],
    },
    {
      id: 3,
      name: "Makeup Trial Session",
      category: "Trial",
      duration: "60",
      startingPrice: 89,
      rating: 4.8,
      isPopular: false,
      image:
        "https://images.pixabay.com/photo/2016/03/27/07/32/make-up-1282256_1280.jpg?w=500&h=300&fit=crop",
      description:
        "Perfect trial session to test your desired look before the main event.",
      features: [
        "Style consultation",
        "Makeup trial application",
        "Color matching",
        "Look documentation",
        "Product recommendations",
        "Booking discount included",
      ],
    },
    {
      id: 4,
      name: "Engagement Makeup",
      category: "Bridal",
      duration: "120",
      startingPrice: 199,
      rating: 4.6,
      isPopular: false,
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=300&fit=crop",
      description:
        "Elegant engagement makeup that captures your natural beauty for this milestone moment.",
      features: [
        "Engagement consultation",
        "Natural glam makeup",
        "Hair styling",
        "Touch-up provided",
        "Photography ready",
        "Couple photoshoot ready",
      ],
    },
    {
      id: 5,
      name: "Corporate Event Makeup",
      category: "Party",
      duration: "75",
      startingPrice: 129,
      rating: 4.5,
      isPopular: false,
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=500&h=300&fit=crop",
      description:
        "Professional makeup for corporate events, conferences, and business occasions.",
      features: [
        "Professional consultation",
        "Business-appropriate makeup",
        "Long-wearing formula",
        "Camera-ready finish",
        "Quick application",
        "Touch-up kit",
      ],
    },
    {
      id: 6,
      name: "Photoshoot Makeup",
      category: "Party",
      duration: "105",
      startingPrice: 179,
      rating: 4.8,
      isPopular: false,
      image:
        "https://images.pixabay.com/photo/2017/08/06/12/06/people-2589176_1280.jpg?w=500&h=300&fit=crop",
      description:
        "Specialized makeup designed for photography and video shoots with HD-ready finish.",
      features: [
        "Photoshoot consultation",
        "HD makeup application",
        "Multiple look options",
        "Lighting-optimized",
        "Touch-up between shots",
        "Photographer coordination",
      ],
    },
  ];

  const categories = [
    {
      value: "all",
      label: "All Services",
      icon: "Sparkles",
      count: services?.length,
    },
    {
      value: "bridal",
      label: "Bridal",
      icon: "Crown",
      count: services?.filter((s) => s?.category === "Bridal")?.length,
    },
    {
      value: "party",
      label: "Party",
      icon: "PartyPopper",
      count: services?.filter((s) => s?.category === "Party")?.length,
    },
    {
      value: "trial",
      label: "Trial",
      icon: "TestTube",
      count: services?.filter((s) => s?.category === "Trial")?.length,
    },
  ];

  // Filter and sort services
  const getFilteredAndSortedServices = () => {
    let filtered =
      activeCategory === "all"
        ? services
        : services?.filter(
            (service) => service?.category?.toLowerCase() === activeCategory
          );

    switch (sortBy) {
      case "price-low":
        return filtered?.sort((a, b) => a?.startingPrice - b?.startingPrice);
      case "price-high":
        return filtered?.sort((a, b) => b?.startingPrice - a?.startingPrice);
      case "rating":
        return filtered?.sort((a, b) => b?.rating - a?.rating);
      case "duration":
        return filtered?.sort(
          (a, b) => parseInt(a?.duration) - parseInt(b?.duration)
        );
      case "name":
      default:
        return filtered?.sort((a, b) => a?.name?.localeCompare(b?.name));
    }
  };

  const filteredServices = getFilteredAndSortedServices();

  // Close mobile filter on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileFilterOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Bridal Makeup Services & Wedding Beauty Packages | Vyara Professional
          Makeup Artist
        </title>
        <meta
          name="description"
          content="Explore Vyara's comprehensive bridal makeup services and wedding beauty packages. Professional makeup artistry for Indian weddings, destination ceremonies, and special occasions in Namakkal, Tamil Nadu."
        />
        <meta
          name="keywords"
          content="bridal makeup services, wedding makeup packages, Indian bridal makeup, professional makeup artist, bridal beauty services, wedding makeup artist Namakkal, Tamil Nadu makeup artist, destination wedding makeup, bridal makeup pricing, makeup artist services"
        />
        <meta
          name="description"
          content="Explore our comprehensive range of bridal and party makeup services. From complete bridal packages to trial sessions, find the perfect service for your special occasion."
        />
        <meta
          name="keywords"
          content="bridal makeup, party makeup, makeup trial, wedding makeup, professional makeup services"
        />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 lg:pt-24 pb-12 lg:pb-16">
          <div className="container-padding w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%]">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <GradientHeading
                level={1}
                align="center"
                normal="Our"
                highlight="Services"
                className="mb-4"
              />
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Discover our comprehensive range of professional makeup services
                designed to make you look and feel absolutely stunning for every
                special occasion.
              </p>
            </motion.div>

            {/* Service Stats */}
            <ServiceStats services={services} activeCategory={activeCategory} />

            {/* Desktop Filter & Sort Controls */}
            <div className="hidden lg:flex items-center justify-between mb-8">
              <FilterChips
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e?.target?.value)}
                  className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus-ring"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {/* Mobile Filter Chips */}
            <div className="lg:hidden mb-6">
              <FilterChips
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
            </div>

            {/* Mobile Filter & Sort Button */}
            <div className="lg:hidden flex items-center justify-between mb-6">
              <div className="text-sm text-muted-foreground">
                {filteredServices?.length} service
                {filteredServices?.length !== 1 ? "s" : ""} found
              </div>
              <Button
                variant="outline"
                onClick={() => setIsMobileFilterOpen(true)}
                iconName="SlidersHorizontal"
                iconPosition="left"
                size="sm"
              >
                Filter & Sort
              </Button>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-12">
              {filteredServices?.map((service, index) => (
                <ServiceCard
                  key={service?.id}
                  service={service}
                  index={index}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredServices?.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <Icon
                  name="Search"
                  size={48}
                  className="text-muted-foreground mx-auto mb-4"
                />
                <GradientHeading
                  level={3}
                  normal="No"
                  highlight="Services"
                  after="Found"
                  className="mb-2"
                />
                <p className="text-muted-foreground mb-6">
                  Try adjusting your filters to see more results.
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setActiveCategory("all");
                    setSortBy("name");
                  }}
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}

            {/* Comparison Table */}
            <ComparisonTable services={filteredServices} />

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-card rounded-lg p-8 text-center border border-border mt-12"
            >
              <Icon
                name="Calendar"
                size={48}
                className="text-primary mx-auto mb-4"
              />
              <GradientHeading
                level={3}
                normal="Ready to"
                highlight="Book"
                after="Your Service?"
                className="mb-4"
              />
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Schedule a consultation to discuss your needs and find the
                perfect service for your special occasion.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="default"
                  onClick={() => (window.location.href = "/booking-system")}
                  iconName="Calendar"
                  iconPosition="left"
                  size="lg"
                >
                  Book Consultation
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    (window.location.href = "/bridal-package-details")
                  }
                  iconName="Crown"
                  iconPosition="left"
                  size="lg"
                >
                  View Bridal Packages
                </Button>
              </div>
            </motion.div>
          </div>
        </main>

        {/* Mobile Filter Panel */}
        <MobileFilterPanel
          isOpen={isMobileFilterOpen}
          onClose={() => setIsMobileFilterOpen(false)}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
        <Footer />
      </div>
    </>
  );
};

export default ServicesOverview;
