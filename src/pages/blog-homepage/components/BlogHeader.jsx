import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const BlogHeader = ({ onSearch, searchQuery }) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery || '');

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setLocalSearchQuery(value);
    onSearch(value);
  };

  const handleSearchClear = () => {
    setLocalSearchQuery('');
    onSearch('');
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="container-padding py-12 lg:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Blog Title & Tagline */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-5xl font-heading font-semibold text-foreground mb-4 text-gradient">
              Beauty & Bridal Blog
            </h1>
            <p className="text-lg lg:text-xl font-body text-muted-foreground max-w-2xl mx-auto">
              Expert tips, tutorials, and trends to help you look and feel your absolute best on your special day
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <div className="relative">
              <Input
                type="search"
                placeholder="Search articles, tips, tutorials..."
                value={localSearchQuery}
                onChange={handleSearchChange}
                className="pl-12 pr-12"
              />
              <Icon 
                name="Search" 
                size={20} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground pointer-events-none" 
              />
              {localSearchQuery && (
                <button
                  onClick={handleSearchClear}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth focus-ring rounded p-1"
                  aria-label="Clear search"
                >
                  <Icon name="X" size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Search Results Count */}
          {searchQuery && (
            <div className="mt-4">
              <p className="text-sm font-caption text-muted-foreground">
                Searching for "{searchQuery}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogHeader;