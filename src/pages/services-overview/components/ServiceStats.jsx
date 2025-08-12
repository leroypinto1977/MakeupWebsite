import React from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon';

const ServiceStats = ({ services, activeCategory }) => {
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services?.filter(service => service?.category?.toLowerCase() === activeCategory);

  const stats = [
    {
      icon: 'Sparkles',
      label: 'Services Available',
      value: filteredServices?.length,
      color: 'text-primary'
    },
    {
      icon: 'Clock',
      label: 'Avg Duration',
      value: `${Math.round(filteredServices?.reduce((acc, service) => 
        acc + parseInt(service?.duration), 0) / filteredServices?.length || 0)}min`,
      color: 'text-success'
    },
    {
      icon: 'DollarSign',
      label: 'Starting From',
      value: `$${Math.min(...filteredServices?.map(s => s?.startingPrice))}`,
      color: 'text-warning'
    },
    {
      icon: 'Star',
      label: 'Avg Rating',
      value: (filteredServices?.reduce((acc, service) => 
        acc + service?.rating, 0) / filteredServices?.length || 0)?.toFixed(1),
      color: 'text-primary'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats?.map((stat, index) => (
        <motion.div
          key={stat?.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-card rounded-lg p-4 border border-border text-center"
        >
          <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted mb-3 ${stat?.color}`}>
            <Icon name={stat?.icon} size={20} />
          </div>
          <div className="text-2xl font-heading font-semibold text-foreground mb-1">
            {stat?.value}
          </div>
          <div className="text-sm text-muted-foreground">
            {stat?.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ServiceStats;