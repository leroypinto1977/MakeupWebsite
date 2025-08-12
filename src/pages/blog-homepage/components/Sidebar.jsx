import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const Sidebar = ({ popularPosts, categories, recentComments }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e?.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handlePostClick = (post) => {
    navigate("/individual-blog-post", { state: { post } });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg p-6 border border-primary/20">
        <div className="text-center mb-4">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
            <Icon
              name="Mail"
              size={20}
              color="var(--color-primary-foreground)"
            />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            Beauty Insider Newsletter
          </h3>
          <p className="text-sm text-muted-foreground">
            Get exclusive tips, tutorials, and early access to new content
            delivered weekly.
          </p>
        </div>

        {isSubscribed ? (
          <div className="text-center">
            <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon
                name="Check"
                size={20}
                color="var(--color-success-foreground)"
              />
            </div>
            <p className="text-success font-medium">Successfully subscribed!</p>
          </div>
        ) : (
          <form onSubmit={handleNewsletterSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e?.target?.value)}
              required
            />
            <Button
              type="submit"
              variant="default"
              fullWidth
              iconName="Send"
              iconPosition="right"
            >
              Subscribe
            </Button>
          </form>
        )}
      </div>
      {/* Popular Posts */}
      <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="TrendingUp" size={20} className="mr-2 text-primary" />
          Popular Posts
        </h3>
        <div className="space-y-4">
          {popularPosts?.map((post, index) => (
            <div
              key={post?.id}
              className="flex space-x-3 cursor-pointer group"
              onClick={() => handlePostClick(post)}
            >
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary font-bold text-sm">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth line-clamp-2 mb-1">
                  {post?.title}
                </h4>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <span>{formatDate(post?.publishedAt)}</span>
                  <span>•</span>
                  <div className="flex items-center space-x-1">
                    <Icon name="Eye" size={12} />
                    <span>{post?.views}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Comments */}
      <div className="bg-background rounded-lg p-6 shadow-sm border border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground mb-4 flex items-center">
          <Icon name="MessageCircle" size={20} className="mr-2 text-primary" />
          Recent Comments
        </h3>
        <div className="space-y-4">
          {recentComments?.map((comment) => (
            <div
              key={comment?.id}
              className="border-l-2 border-primary/20 pl-4"
            >
              <div className="flex items-center space-x-2 mb-2">
                <Image
                  src={comment?.author?.avatar}
                  alt={comment?.author?.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-foreground">
                  {comment?.author?.name}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(comment?.createdAt)}
                </span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {comment?.content}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                on "{comment?.postTitle}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
