import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const StickyBookingWidget = ({ onBookConsultation, selectedPackage = null }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show widget after scrolling past hero section
      setIsVisible(scrollPosition > windowHeight * 0.5);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-100 hidden lg:block">
      <div className={`bg-card border border-border rounded-2xl shadow-2xl transition-smooth ${
        isExpanded ? 'w-80' : 'w-16'
      }`}>
        {!isExpanded ? (
          /* Collapsed State */
          (<button
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 bg-primary text-primary-foreground rounded-2xl flex items-center justify-center hover:scale-105 transition-smooth focus-ring"
            aria-label="Open booking widget"
          >
            <Icon name="Calendar" size={24} />
          </button>)
        ) : (
          /* Expanded State */
          (<div className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="font-heading font-semibold text-foreground">
                Book Now
              </h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1 rounded-full hover:bg-accent transition-smooth focus-ring"
                aria-label="Close booking widget"
              >
                <Icon name="X" size={16} />
              </button>
            </div>
            {/* Selected Package Info */}
            {selectedPackage && (
              <div className="bg-accent rounded-lg p-3 space-y-2">
                <div className="text-sm font-medium text-foreground">
                  {selectedPackage?.name}
                </div>
                <div className="text-lg font-heading font-bold text-primary">
                  ${selectedPackage?.price}
                </div>
                <div className="text-xs text-muted-foreground">
                  {selectedPackage?.duration}
                </div>
              </div>
            )}
            {/* Quick Info */}
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Free consultation</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={14} />
                <span>Studio or on-location</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Icon name="Shield" size={14} />
                <span>100% satisfaction guarantee</span>
              </div>
            </div>
            {/* Action Buttons */}
            <div className="space-y-2">
              <Button
                variant="default"
                fullWidth
                onClick={() => onBookConsultation(selectedPackage)}
                iconName="Calendar"
                iconPosition="left"
                className="btn-hover"
              >
                Book Consultation
              </Button>
              
              <Button
                variant="outline"
                fullWidth
                iconName="Phone"
                iconPosition="left"
                className="btn-hover"
              >
                Call Now
              </Button>
            </div>
            {/* Trust Indicators */}
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className="flex">
                    {[...Array(5)]?.map((_, i) => (
                      <span key={i} className="text-warning text-xs">★</span>
                    ))}
                  </div>
                  <span>5.0</span>
                </div>
                <span>500+ happy brides</span>
              </div>
            </div>
            {/* Urgency Indicator */}
            <div className="bg-warning/10 border border-warning/20 rounded-lg p-2">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-xs text-warning font-medium">
                  3 slots available this week
                </span>
              </div>
            </div>
          </div>)
        )}
      </div>
    </div>
  );
};

export default StickyBookingWidget;