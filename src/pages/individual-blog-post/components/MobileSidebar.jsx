import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import SidebarContent from './SidebarContent';

const MobileSidebar = ({ content, author, onNewsletterSignup }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('toc');

  const tabs = [
    { id: 'toc', label: 'Contents', icon: 'List' },
    { id: 'author', label: 'Author', icon: 'User' },
    { id: 'popular', label: 'Popular', icon: 'TrendingUp' },
    { id: 'newsletter', label: 'Subscribe', icon: 'Mail' }
  ];

  return (
    <>
      {/* Mobile Sticky Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-nav border-t border-border">
        <div className="flex items-center justify-around py-2">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => {
                setActiveTab(tab?.id);
                setIsOpen(true);
              }}
              className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-smooth focus-ring ${
                activeTab === tab?.id && isOpen
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="text-xs font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-100">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-background rounded-t-lg max-h-[80vh] overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h3 className="font-heading font-semibold text-foreground">
                {tabs?.find(tab => tab?.id === activeTab)?.label}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-smooth focus-ring"
              >
                <Icon name="X" size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(80vh-80px)]">
              <SidebarContent 
                content={content} 
                author={author} 
                onNewsletterSignup={onNewsletterSignup}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebar;