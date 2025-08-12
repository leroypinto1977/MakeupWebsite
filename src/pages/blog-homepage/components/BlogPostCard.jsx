import React from 'react';
import { useNavigate } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';

const BlogPostCard = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/individual-blog-post', { state: { post } });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article 
      className="bg-background rounded-lg shadow-sm overflow-hidden card-elevation cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Featured Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post?.featuredImage}
          alt={post?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
        />
        <div className="absolute top-3 left-3">
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
            {post?.category}
          </span>
        </div>
        {post?.isNew && (
          <div className="absolute top-3 right-3">
            <span className="bg-success text-success-foreground px-2 py-1 rounded text-xs font-medium">
              New
            </span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-lg font-heading font-semibold text-foreground mb-3 leading-tight group-hover:text-primary transition-smooth line-clamp-2">
          {post?.title}
        </h3>

        {/* Excerpt */}
        <p className="text-muted-foreground text-sm mb-4 leading-relaxed line-clamp-3">
          {post?.excerpt}
        </p>

        {/* Tags */}
        {post?.tags && post?.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post?.tags?.slice(0, 3)?.map((tag, index) => (
              <span
                key={index}
                className="bg-muted text-muted-foreground px-2 py-1 rounded text-xs"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Author & Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src={post?.author?.avatar}
              alt={post?.author?.name}
              className="w-8 h-8 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground text-sm">{post?.author?.name}</p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{formatDate(post?.publishedAt)}</span>
                <span>•</span>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{post?.readTime} min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Read More Arrow */}
          <div className="text-primary group-hover:translate-x-1 transition-smooth">
            <Icon name="ArrowRight" size={16} />
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostCard;