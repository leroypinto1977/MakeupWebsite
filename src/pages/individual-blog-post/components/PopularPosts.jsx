import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const PopularPosts = () => {
  const navigate = useNavigate();

  const popularPosts = [
    {
      id: 5,
      title: "5 Makeup Mistakes Every Bride Should Avoid",
      featuredImage:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=300&fit=crop",
      readTime: 6,
      views: 8920,
      category: "Tips & Tricks",
    },
    {
      id: 6,
      title: "The Ultimate Guide to Waterproof Wedding Makeup",
      featuredImage:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
      readTime: 10,
      views: 7650,
      category: "Tutorials",
    },
    {
      id: 7,
      title: "How to Make Your Wedding Makeup Last 12+ Hours",
      featuredImage:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop",
      readTime: 8,
      views: 6340,
      category: "Techniques",
    },
    {
      id: 8,
      title: "Choosing Colors That Complement Your Skin Tone",
      featuredImage:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=300&fit=crop",
      readTime: 7,
      views: 5890,
      category: "Color Theory",
    },
  ];

  const handlePostClick = (post) => {
    navigate("/individual-blog-post", { state: { postId: post?.id } });
  };

  return (
    <div className="bg-card rounded-lg p-6 card-elevation">
      <div className="flex items-center mb-4">
        <Icon name="TrendingUp" size={20} className="text-primary mr-2" />
        <h3 className="font-heading font-semibold text-foreground">
          Popular Articles
        </h3>
      </div>
      <div className="space-y-4">
        {popularPosts?.map((post, index) => (
          <article
            key={post?.id}
            className="flex space-x-3 cursor-pointer group hover:bg-accent rounded-lg p-2 -m-2 transition-smooth"
            onClick={() => handlePostClick(post)}
          >
            {/* Ranking Number */}
            <div className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center text-sm font-semibold">
              {index + 1}
            </div>

            {/* Post Image */}
            <div className="flex-shrink-0">
              <Image
                src={post?.featuredImage}
                alt={post?.title}
                className="w-16 h-12 object-cover rounded"
              />
            </div>

            {/* Post Info */}
            <div className="flex-1 min-w-0 overflow-hidden">
              <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-smooth mb-1 break-words overflow-hidden">
                <span className="line-clamp-2">{post?.title}</span>
              </h4>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground overflow-hidden">
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-full text-xs whitespace-nowrap">
                  {post?.category}
                </span>
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <Icon name="Clock" size={10} />
                  <span>{post?.readTime}m</span>
                </div>
                <div className="flex items-center space-x-1 whitespace-nowrap">
                  <Icon name="Eye" size={10} />
                  <span>{(post?.views / 1000)?.toFixed(1)}k</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
      {/* View All Link */}
      <div className="mt-4 pt-4 border-t border-border">
        <button
          onClick={() => navigate("/blog-homepage")}
          className="w-full text-sm text-primary hover:text-primary/80 transition-smooth flex items-center justify-center space-x-1 focus-ring rounded p-2"
        >
          <span>View All Articles</span>
          <Icon name="ArrowRight" size={14} />
        </button>
      </div>
    </div>
  );
};

export default PopularPosts;
