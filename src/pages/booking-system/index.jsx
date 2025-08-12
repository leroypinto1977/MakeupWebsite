import React, { useState } from "react";
import Header from "../../components/ui/Header";
import GradientHeading from "../../components/ui/GradientHeading";
import Footer from "../homepage/components/Footer";
import BookingHeader from "./components/BookingHeader";
import CalendlyBooking from "./components/CalendlyBooking";
import FallbackBookingForm from "./components/FallbackBookingForm";
import BookingPreparation from "./components/BookingPreparation";
import BookingPolicies from "./components/BookingPolicies";

const BookingSystem = () => {
  const [showFallbackForm, setShowFallbackForm] = useState(false);

  const handleFallbackToggle = (show) => {
    setShowFallbackForm(show);
  };

  const handleFormClose = () => {
    setShowFallbackForm(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20 lg:pt-24">
        <BookingHeader />

        {/* Main Booking Section */}
        <div className="bg-background py-16 lg:py-20">
          <div className="container-padding">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <GradientHeading
                  level={2}
                  align="center"
                  normal="Schedule"
                  highlight="Your"
                  after="Appointment"
                  className="mb-4"
                />
                <p className="text-lg text-muted-foreground">
                  Choose your preferred date and time for your bridal makeup
                  consultation
                </p>
              </div>

              <CalendlyBooking onFallbackToggle={handleFallbackToggle} />

              <div className="mt-8 text-center">
                <button
                  onClick={() => setShowFallbackForm(true)}
                  className="text-primary hover:text-primary/80 transition-smooth underline text-sm"
                >
                  Prefer to fill out a form instead? Click here
                </button>
              </div>
            </div>
          </div>
        </div>

        <BookingPreparation />

        <BookingPolicies />
      </main>

      <FallbackBookingForm
        isVisible={showFallbackForm}
        onClose={handleFormClose}
      />
      <Footer />
    </div>
  );
};

export default BookingSystem;
