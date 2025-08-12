import React from 'react';
import Icon from '../../../components/AppIcon';

const BookingHeader = () => {
  return (
    <div className="bg-gradient-to-br from-background via-card to-accent py-12 lg:py-16">
      <div className="container-padding">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-md">
              <Icon name="Calendar" size={32} color="var(--color-primary-foreground)" />
            </div>
          </div>
          
          <h1 className="text-3xl lg:text-5xl font-heading font-semibold text-foreground mb-4 text-balance">
            Book Your Consultation
          </h1>
          
          <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            Schedule your personalized bridal makeup consultation and let us create the perfect look for your special day
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="flex items-center justify-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
              <Icon name="Clock" size={20} className="text-primary" />
              <span className="text-sm font-caption text-foreground">60-90 Minutes</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
              <Icon name="MapPin" size={20} className="text-primary" />
              <span className="text-sm font-caption text-foreground">In-Studio or On-Location</span>
            </div>
            
            <div className="flex items-center justify-center space-x-3 p-4 bg-background/50 rounded-lg border border-border">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm font-caption text-foreground">Personalized Service</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHeader;