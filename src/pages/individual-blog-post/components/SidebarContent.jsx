import React from "react";
import TableOfContents from "./TableOfContents";
import AuthorProfile from "./AuthorProfile";
import PopularPosts from "./PopularPosts";
import NewsletterSignup from "./NewsletterSignup";

const SidebarContent = ({ content, author, onNewsletterSignup }) => {
  return (
    <>
      {/* Table of Contents - Independent sticky container */}
      <TableOfContents content={content} />

      {/* Other sidebar content - Non-sticky */}
      <aside className="space-y-8 mt-8">
        {/* Author Profile */}
        <AuthorProfile author={author} />

        {/* Popular Posts */}
        <PopularPosts />

        {/* Newsletter Signup */}
        <NewsletterSignup onSignup={onNewsletterSignup} />
      </aside>
    </>
  );
};

export default SidebarContent;
