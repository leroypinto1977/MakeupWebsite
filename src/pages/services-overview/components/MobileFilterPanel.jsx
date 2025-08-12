import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MobileFilterPanel = ({ 
  isOpen, 
  onClose, 
  categories, 
  activeCategory, 
  onCategoryChange,
  sortBy,
  onSortChange 
}) => {
  const sortOptions = [
    { value: 'name', label: 'Name A-Z', icon: 'ArrowUpAZ' },
    { value: 'price-low', label: 'Price: Low to High', icon: 'ArrowUp' },
    { value: 'price-high', label: 'Price: High to Low', icon: 'ArrowDown' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'duration', label: 'Duration', icon: 'Clock' }
  ];

  const handleCategorySelect = (category) => {
    onCategoryChange(category);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-200 lg:hidden"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 bg-background rounded-t-2xl shadow-lg z-300 lg:hidden max-h-[80vh] overflow-hidden"
          >
            {/* Handle */}
            <div className="flex justify-center py-3">
              <div className="w-12 h-1 bg-border rounded-full" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-6 pb-4 border-b border-border">
              <h3 className="text-lg font-heading font-semibold text-foreground">
                Filter & Sort
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                iconName="X"
              />
            </div>

            <div className="overflow-y-auto max-h-[60vh]">
              {/* Categories */}
              <div className="p-6 border-b border-border">
                <h4 className="text-sm font-medium text-foreground mb-4">Categories</h4>
                <div className="space-y-2">
                  {categories?.map((category) => (
                    <button
                      key={category?.value}
                      onClick={() => handleCategorySelect(category?.value)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg text-left transition-smooth ${
                        activeCategory === category?.value
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-card hover:bg-accent text-foreground'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon name={category?.icon} size={18} />
                        <span className="font-medium">{category?.label}</span>
                      </div>
                      {category?.count && (
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          activeCategory === category?.value
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                        }`}>
                          {category?.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div className="p-6">
                <h4 className="text-sm font-medium text-foreground mb-4">Sort By</h4>
                <div className="space-y-2">
                  {sortOptions?.map((option) => (
                    <button
                      key={option?.value}
                      onClick={() => onSortChange(option?.value)}
                      className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-smooth ${
                        sortBy === option?.value
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent text-foreground'
                      }`}
                    >
                      <Icon name={option?.icon} size={18} />
                      <span className="font-medium">{option?.label}</span>
                      {sortBy === option?.value && (
                        <Icon name="Check" size={16} className="ml-auto text-primary" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileFilterPanel;