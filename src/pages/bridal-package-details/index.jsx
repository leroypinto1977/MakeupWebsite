import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/ui/Header";
import HeroSection from "./components/HeroSection";
import TabNavigation from "./components/TabNavigation";
import PackageCard from "./components/PackageCard";
import PortfolioGallery from "./components/PortfolioGallery";
import ProcessTimeline from "./components/ProcessTimeline";
import TestimonialSection from "./components/TestimonialSection";
import StickyBookingWidget from "./components/StickyBookingWidget";
import Footer from "../homepage/components/Footer";

const BridalPackageDetails = () => {
  const [activeTab, setActiveTab] = useState("packages");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showMonthlyPayment, setShowMonthlyPayment] = useState(false);
  const navigate = useNavigate();

  const packages = [
    {
      id: 1,
      name: "Essential Bridal",
      description:
        "Perfect for intimate ceremonies and budget-conscious brides",
      price: 299,
      duration: "Trial + Wedding Day (3 hours)",
      features: [
        "1 trial session (1.5 hours)",
        "Wedding day makeup application",
        "Basic touch-up kit",
        "Consultation and style planning",
        "Natural or soft glam look",
        "Lashes included",
      ],
      additionalServices: [
        { name: "Hair styling", price: 150 },
        { name: "Additional touch-up", price: 75 },
      ],
    },
    {
      id: 2,
      name: "Classic Bridal",
      description: "Our most popular package with comprehensive coverage",
      price: 499,
      duration: "Trial + Wedding Day (4 hours)",
      features: [
        "1 detailed trial session (2 hours)",
        "Wedding day makeup application",
        "Premium touch-up kit",
        "Pre-wedding skincare consultation",
        "Choice of natural, soft glam, or dramatic look",
        "Premium lashes and lip color",
        "2 touch-ups during event",
        "Makeup removal at end of day",
      ],
      additionalServices: [
        { name: "Hair styling", price: 125 },
        { name: "Bridesmaid makeup", price: 85 },
        { name: "Mother of bride makeup", price: 95 },
      ],
      isPopular: true,
    },
    {
      id: 3,
      name: "Luxury Bridal",
      description: "Ultimate bridal experience with premium services",
      price: 799,
      duration: "2 Trials + Wedding Day (5 hours)",
      features: [
        "2 trial sessions (2.5 hours each)",
        "Wedding day makeup application",
        "Luxury touch-up kit to keep",
        "Pre-wedding skincare treatment",
        "Custom makeup look design",
        "Premium luxury products",
        "Unlimited touch-ups",
        "Photography session prep",
        "Makeup removal and skincare",
        "Complimentary lip color",
      ],
      additionalServices: [
        { name: "Hair styling", price: 100 },
        { name: "Bridesmaid makeup", price: 75 },
        { name: "Engagement shoot makeup", price: 150 },
      ],
    },
  ];

  const handleBookConsultation = (packageData = null) => {
    if (packageData) {
      setSelectedPackage(packageData);
    }
    navigate("/booking-system", {
      state: {
        selectedPackage: packageData,
        source: "bridal-packages",
      },
    });
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);

    // Smooth scroll to content
    const element = document.getElementById(`tab-${tabId}`);
    if (element) {
      const headerHeight = 140; // Account for header + tab navigation
      const elementPosition = element?.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    // Set default popular package as selected
    const popularPackage = packages?.find((pkg) => pkg?.isPopular);
    if (popularPackage) {
      setSelectedPackage(popularPackage);
    }
  }, []);

  const renderTabContent = () => {
    switch (activeTab) {
      case "packages":
        return (
          <div id="tab-packages" className="space-y-8">
            {/* Payment Toggle */}
            <div className="flex items-center justify-center space-x-4">
              <span
                className={`text-sm font-medium ${
                  !showMonthlyPayment
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                One-time Payment
              </span>
              <button
                onClick={() => setShowMonthlyPayment(!showMonthlyPayment)}
                onMouseDown={(e) => e.preventDefault()}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-smooth focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none ${
                  showMonthlyPayment ? "bg-primary" : "bg-muted"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-background transition-smooth ${
                    showMonthlyPayment ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium ${
                  showMonthlyPayment
                    ? "text-foreground"
                    : "text-muted-foreground"
                }`}
              >
                Monthly Payment Plan
              </span>
            </div>
            {/* Package Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {packages?.map((pkg) => (
                <PackageCard
                  key={pkg?.id}
                  packageData={pkg}
                  isPopular={pkg?.isPopular}
                  onBookConsultation={handleBookConsultation}
                  showMonthlyPayment={showMonthlyPayment}
                />
              ))}
            </div>
            {/* Additional Information */}
            <div className="bg-accent/50 rounded-2xl p-8 text-center">
              <h3 className="text-xl font-heading font-semibold text-foreground mb-4">
                Not Sure Which Package is Right for You?
              </h3>
              <p className="text-muted-foreground font-body mb-6 max-w-2xl mx-auto">
                Book a free consultation and we'll help you choose the perfect
                package based on your wedding style, budget, and preferences.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleBookConsultation()}
                  className="inline-flex items-center space-x-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-smooth focus-ring"
                >
                  <span>Book Free Consultation</span>
                </button>
                <button className="inline-flex items-center space-x-2 bg-background text-foreground px-6 py-3 rounded-lg font-medium border border-border hover:bg-accent transition-smooth focus-ring">
                  <span>Call (555) 123-4567</span>
                </button>
              </div>
            </div>
          </div>
        );

      case "portfolio":
        return (
          <div id="tab-portfolio">
            <PortfolioGallery />
          </div>
        );

      case "process":
        return (
          <div id="tab-process">
            <ProcessTimeline />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <HeroSection onBookConsultation={handleBookConsultation} />

      {/* Tab Navigation - Full Width & Sticky */}
      <TabNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {/* Tab Content */}
      <main className="py-12 lg:py-16">
        <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] container-padding">
          {renderTabContent()}
        </div>
      </main>

      {/* Testimonials */}
      <div
        id="testimonials-section"
        className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%]"
      >
        <TestimonialSection />
      </div>

      {/* Sticky Booking Widget */}
      <StickyBookingWidget
        onBookConsultation={handleBookConsultation}
        selectedPackage={selectedPackage}
      />
      <Footer />
    </div>
  );
};

export default BridalPackageDetails;
