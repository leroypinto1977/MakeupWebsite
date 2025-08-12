import React from 'react';
import BlogPostCard from './BlogPostCard';
import Icon from '../../../components/AppIcon';


const BlogGrid = ({ posts, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)]?.map((_, index) => (
          <div key={index} className="bg-background rounded-lg shadow-sm overflow-hidden animate-pulse">
            <div className="h-48 bg-muted"></div>
            <div className="p-6">
              <div className="h-4 bg-muted rounded mb-3"></div>
              <div className="h-4 bg-muted rounded mb-3 w-3/4"></div>
              <div className="space-y-2 mb-4">
                <div className="h-3 bg-muted rounded"></div>
                <div className="h-3 bg-muted rounded w-5/6"></div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-muted rounded-full"></div>
                <div className="space-y-1">
                  <div className="h-3 bg-muted rounded w-20"></div>
                  <div className="h-2 bg-muted rounded w-16"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts?.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            No articles found
          </h3>
          <p className="text-muted-foreground">
            Try adjusting your search or browse different categories to discover more content.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {posts?.map((post) => (
        <BlogPostCard key={post?.id} post={post} />
      ))}
    </div>
  );
};

export default BlogGrid;