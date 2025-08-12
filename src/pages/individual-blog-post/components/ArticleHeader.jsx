import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ArticleHeader = ({ article, author, onShare }) => {
  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })?.format(new Date(date));
  };

  const shareButtons = [
    { name: 'Facebook', icon: 'Facebook', color: '#1877F2' },
    { name: 'Twitter', icon: 'Twitter', color: '#1DA1F2' },
    { name: 'Instagram', icon: 'Instagram', color: '#E4405F' },
    { name: 'Pinterest', icon: 'Heart', color: '#BD081C' }
  ];

  return (
    <header className="bg-background border-b border-border">
      <div className="container-padding py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Icon name="Sparkles" size={14} className="mr-1.5" />
              {article?.category}
            </span>
          </div>

          {/* Article Title */}
          <h1 className="text-3xl lg:text-5xl font-heading font-semibold text-foreground mb-6 text-balance leading-tight">
            {article?.title}
          </h1>

          {/* Article Subtitle */}
          {article?.subtitle && (
            <p className="text-lg lg:text-xl text-muted-foreground mb-8 text-balance leading-relaxed">
              {article?.subtitle}
            </p>
          )}

          {/* Author and Meta Information */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src={author?.avatar}
                  alt={author?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-background"></div>
              </div>
              <div>
                <h3 className="font-medium text-foreground">{author?.name}</h3>
                <p className="text-sm text-muted-foreground">{author?.title}</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Calendar" size={16} />
                <span>{formatDate(article?.publishDate)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Clock" size={16} />
                <span>{article?.readTime} min read</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Eye" size={16} />
                <span>{article?.views?.toLocaleString()} views</span>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground mr-2">Share:</span>
            {shareButtons?.map((platform) => (
              <Button
                key={platform?.name}
                variant="outline"
                size="sm"
                onClick={() => onShare(platform?.name?.toLowerCase())}
                iconName={platform?.icon}
                iconPosition="left"
                className="btn-hover"
              >
                <span className="hidden sm:inline">{platform?.name}</span>
              </Button>
            ))}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShare('copy')}
              iconName="Copy"
              className="btn-hover"
            >
              <span className="hidden sm:inline">Copy Link</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ArticleHeader;