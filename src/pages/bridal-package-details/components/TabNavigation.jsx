import React from 'react';
import Icon from '../../../components/AppIcon';

const TabNavigation = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'packages',
      label: 'Packages',
      icon: 'Crown',
      description: 'Compare our bridal packages'
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: 'Image',
      description: 'View our work gallery'
    },
    {
      id: 'process',
      label: 'Process',
      icon: 'MapPin',
      description: 'Your bridal journey timeline'
    }
  ];

  return (
    <div className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-16 lg:top-20 z-50">
      <div className="container-padding">
        <nav className="flex space-x-0 overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-2 px-4 lg:px-6 py-4 border-b-2 transition-smooth focus-ring whitespace-nowrap ${
                activeTab === tab?.id
                  ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <div className="text-left">
                <div className="font-medium text-sm lg:text-base">
                  {tab?.label}
                </div>
                <div className="text-xs text-muted-foreground hidden lg:block">
                  {tab?.description}
                </div>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TabNavigation;