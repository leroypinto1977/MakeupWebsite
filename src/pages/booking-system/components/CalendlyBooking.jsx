import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const CalendlyBooking = ({ onFallbackToggle }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Simulate Calendly loading
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Simulate occasional loading failure for fallback demonstration
      if (Math.random() > 0.8) {
        setHasError(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleFallbackClick = () => {
    setHasError(true);
    onFallbackToggle(true);
  };

  if (hasError) {
    return (
      <div className="bg-card rounded-lg border border-border p-8 text-center">
        <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="AlertTriangle" size={32} className="text-warning" />
        </div>
        
        <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
          Booking System Temporarily Unavailable
        </h3>
        
        <p className="text-muted-foreground mb-6">
          Our online booking system is currently experiencing issues. Please use our backup form below to schedule your appointment.
        </p>
        
        <button
          onClick={() => onFallbackToggle(true)}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth focus-ring"
        >
          <Icon name="Calendar" size={20} />
          <span>Use Backup Form</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {isLoading && (
        <div className="h-96 flex items-center justify-center bg-muted/20">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground font-caption">Loading booking calendar...</p>
          </div>
        </div>
      )}
      
      {!isLoading && !hasError && (
        <div className="relative">
          {/* Mock Calendly Interface */}
          <div className="h-96 bg-gradient-to-br from-background to-muted/20 p-6">
            <div className="h-full border-2 border-dashed border-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Calendar" size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  Calendly Integration
                </h3>
                <p className="text-muted-foreground mb-4">
                  Interactive booking calendar would appear here
                </p>
                <button
                  onClick={handleFallbackClick}
                  className="text-sm text-primary hover:text-primary/80 transition-smooth underline"
                >
                  Having trouble? Use backup form
                </button>
              </div>
            </div>
          </div>
          
          {/* Mock iframe overlay for demonstration */}
          <div className="absolute inset-0 pointer-events-none">
            <iframe
              title="Calendly Booking"
              className="w-full h-full opacity-0"
              src="about:blank"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendlyBooking;