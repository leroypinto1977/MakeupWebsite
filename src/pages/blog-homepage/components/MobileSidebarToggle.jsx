import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Sidebar from './Sidebar';

const MobileSidebarToggle = ({ popularPosts, categories, recentComments }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button */}
      <div className="lg:hidden fixed bottom-20 right-6 z-100">
        <Button
          variant="default"
          onClick={toggleSidebar}
          iconName={isOpen ? "X" : "Menu"}
          size="lg"
          className="btn-hover shadow-lg rounded-full w-14 h-14 p-0"
          aria-label="Toggle sidebar menu"
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-200">
          <div 
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-background shadow-lg overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
                <h2 className="text-lg font-heading font-semibold text-foreground">
                  Blog Menu
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-sm text-foreground hover:text-primary transition-smooth focus-ring"
                  aria-label="Close sidebar"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Sidebar Content */}
              <Sidebar
                popularPosts={popularPosts}
                categories={categories}
                recentComments={recentComments}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSidebarToggle;