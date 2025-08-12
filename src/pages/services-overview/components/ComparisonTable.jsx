import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonTable = ({ services }) => {
  const [isVisible, setIsVisible] = useState(false);

  const features = [
    'Consultation',
    'Makeup Application',
    'Hair Styling',
    'Touch-up Kit',
    'Photography Ready',
    'Trial Session',
    'Travel Service',
    'Assistant Support'
  ];

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="hidden md:block mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-heading font-semibold text-foreground">
          Compare Services
        </h3>
        <Button
          variant="outline"
          onClick={toggleVisibility}
          iconName={isVisible ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
        >
          {isVisible ? 'Hide' : 'Show'} Comparison
        </Button>
      </div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="bg-card rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border bg-muted/50">
                      <th className="text-left p-4 font-medium text-foreground min-w-[200px]">
                        Features
                      </th>
                      {services?.slice(0, 3)?.map((service) => (
                        <th key={service?.id} className="text-center p-4 min-w-[150px]">
                          <div className="flex flex-col items-center space-y-2">
                            <h4 className="font-medium text-foreground text-sm">
                              {service?.name}
                            </h4>
                            <div className="text-xs text-muted-foreground">
                              From ${service?.startingPrice}
                            </div>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {features?.map((feature, index) => (
                      <tr key={feature} className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                        <td className="p-4 font-medium text-foreground">
                          {feature}
                        </td>
                        {services?.slice(0, 3)?.map((service) => {
                          const hasFeature = service?.features?.some(f => 
                            f?.toLowerCase()?.includes(feature?.toLowerCase()) ||
                            feature?.toLowerCase()?.includes(f?.toLowerCase()?.split(' ')?.[0])
                          );
                          
                          return (
                            <td key={service?.id} className="p-4 text-center">
                              {hasFeature ? (
                                <Icon name="Check" size={18} className="text-success mx-auto" />
                              ) : (
                                <Icon name="X" size={18} className="text-muted-foreground mx-auto" />
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ComparisonTable;