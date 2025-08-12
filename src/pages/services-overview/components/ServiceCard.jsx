import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ServiceCard = ({ service, index }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (service?.category === 'Bridal') {
      navigate('/bridal-package-details');
    }
  };

  const handleQuickBook = () => {
    navigate('/booking-system');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-card rounded-lg shadow-sm border border-border overflow-hidden group hover:shadow-md transition-smooth"
    >
      {/* Service Image */}
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <Image
          src={service?.image}
          alt={service?.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth" />
        
        {/* Quick Book Button - Mobile Only */}
        <div className="lg:hidden absolute bottom-4 right-4">
          <Button
            variant="default"
            size="sm"
            onClick={handleQuickBook}
            iconName="Calendar"
            className="rounded-full shadow-lg"
          >
            Book
          </Button>
        </div>

        {/* Popular Badge */}
        {service?.isPopular && (
          <div className="absolute top-4 left-4">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
              Most Popular
            </div>
          </div>
        )}
      </div>
      {/* Service Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground mb-1">
              {service?.name}
            </h3>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{service?.duration}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="DollarSign" size={14} />
                <span>From ${service?.startingPrice}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-1 text-warning">
            <Icon name="Star" size={16} fill="currentColor" />
            <span className="text-sm font-medium">{service?.rating}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {service?.description}
        </p>

        {/* Key Features */}
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-2">Includes:</h4>
          <ul className="space-y-1">
            {service?.features?.slice(0, 3)?.map((feature, idx) => (
              <li key={idx} className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
            {service?.features?.length > 3 && (
              <li className="text-xs text-primary font-medium">
                +{service?.features?.length - 3} more features
              </li>
            )}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleViewDetails}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            View Details
          </Button>
          <Button
            variant="default"
            onClick={handleQuickBook}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Book Now
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;