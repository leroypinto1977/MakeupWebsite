import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryNavigation = ({ categories, activeCategory, onCategoryChange }) => {
  const categoryIcons = {
    'All': 'Grid3X3',
    'Bridal Tips': 'Crown',
    'Skincare': 'Sparkles',
    'Tutorials': 'PlayCircle',
    'Trends': 'TrendingUp',
    'Hair Styling': 'Scissors',
    'Makeup Techniques': 'Palette'
  };

  return (
    <div className="bg-background border-b border-border sticky top-16 lg:top-20 z-50 backdrop-blur-nav">
      <div className="container-padding py-4">
        {/* Mobile: Horizontal Scrolling */}
        <div className="lg:hidden">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide pb-2">
            {categories?.map((category) => (
              <button
                key={category?.name}
                onClick={() => onCategoryChange(category?.name)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-smooth focus-ring ${
                  activeCategory === category?.name
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                <Icon 
                  name={categoryIcons?.[category?.name] || 'Tag'} 
                  size={16} 
                />
                <span className="text-sm font-medium">{category?.name}</span>
                <span className="text-xs opacity-75">({category?.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: Full Navigation Bar */}
        <div className="hidden lg:block">
          <div className="flex items-center justify-center space-x-1">
            {categories?.map((category) => (
              <button
                key={category?.name}
                onClick={() => onCategoryChange(category?.name)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-sm transition-smooth focus-ring ${
                  activeCategory === category?.name
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <Icon 
                  name={categoryIcons?.[category?.name] || 'Tag'} 
                  size={18} 
                />
                <span className="font-body">{category?.name}</span>
                <span className="text-sm opacity-75 ml-1">({category?.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavigation;