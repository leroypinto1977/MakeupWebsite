import React from 'react';
import TableOfContents from './TableOfContents';
import AuthorProfile from './AuthorProfile';
import PopularPosts from './PopularPosts';
import NewsletterSignup from './NewsletterSignup';

const SidebarContent = ({ content, author, onNewsletterSignup }) => {
  return (
    <aside className="space-y-8">
      {/* Table of Contents */}
      <TableOfContents content={content} />
      
      {/* Author Profile */}
      <AuthorProfile author={author} />
      
      {/* Popular Posts */}
      <PopularPosts />
      
      {/* Newsletter Signup */}
      <NewsletterSignup onSignup={onNewsletterSignup} />
    </aside>
  );
};

export default SidebarContent;