import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PackageCard = ({ 
  package: pkg, 
  isPopular = false, 
  onBookConsultation,
  showMonthlyPayment = false 
}) => {
  const monthlyPrice = Math.ceil(pkg?.price / 12);

  return (
    <div className={`relative bg-card rounded-2xl p-6 lg:p-8 shadow-lg transition-smooth hover:shadow-xl ${
      isPopular ? 'ring-2 ring-primary scale-105' : ''
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg">
            Most Popular
          </div>
        </div>
      )}
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-heading font-semibold text-foreground mb-2">
          {pkg?.name}
        </h3>
        <p className="text-muted-foreground font-body">
          {pkg?.description}
        </p>
      </div>
      {/* Pricing */}
      <div className="text-center mb-8">
        <div className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-2">
          ${pkg?.price}
        </div>
        {showMonthlyPayment && (
          <div className="text-sm text-muted-foreground">
            or ${monthlyPrice}/month with payment plan
          </div>
        )}
        <div className="text-sm text-muted-foreground mt-1">
          {pkg?.duration}
        </div>
      </div>
      {/* Features */}
      <div className="space-y-4 mb-8">
        {pkg?.features?.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <Icon 
              name="Check" 
              size={18} 
              className="text-success mt-0.5 flex-shrink-0" 
            />
            <span className="text-foreground font-body text-sm leading-relaxed">
              {feature}
            </span>
          </div>
        ))}
      </div>
      {/* Additional Services */}
      {pkg?.additionalServices && pkg?.additionalServices?.length > 0 && (
        <div className="border-t border-border pt-6 mb-8">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Additional Services Available:
          </h4>
          <div className="space-y-2">
            {pkg?.additionalServices?.map((service, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{service?.name}</span>
                <span className="text-foreground font-medium">+${service?.price}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* CTA Button */}
      <Button
        variant={isPopular ? "default" : "outline"}
        fullWidth
        size="lg"
        onClick={() => onBookConsultation(pkg)}
        iconName="Calendar"
        iconPosition="left"
        className="btn-hover"
      >
        Book Consultation
      </Button>
      {/* Trust Indicator */}
      <div className="text-center mt-4 text-xs text-muted-foreground">
        <Icon name="Shield" size={14} className="inline mr-1" />
        100% Satisfaction Guarantee
      </div>
    </div>
  );
};

export default PackageCard;