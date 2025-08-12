import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import GradientHeading from "../../../components/ui/GradientHeading";

const RelatedPosts = ({ currentPostId, currentTags }) => {
  const navigate = useNavigate();

  const relatedPosts = [
    {
      id: 2,
      title: "10 Essential Bridal Makeup Products Every Bride Needs",
      subtitle:
        "Build your perfect bridal beauty kit with these must-have products",
      slug: "essential-bridal-makeup-products",
      category: "Product Guide",
      author: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      },
      featuredImage:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
      publishDate: "2025-01-08",
      readTime: 8,
      views: 3420,
      tags: ["bridal makeup", "products", "beauty essentials"],
      excerpt:
        "Discover the essential makeup products that will ensure your bridal look stays flawless from ceremony to reception.",
    },
    {
      id: 3,
      title: "How to Choose the Perfect Wedding Day Hairstyle",
      subtitle: "Match your hairstyle to your dress, venue, and personal style",
      slug: "perfect-wedding-hairstyle-guide",
      category: "Hair & Beauty",
      author: {
        name: "Emily Chen",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      },
      featuredImage:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      publishDate: "2025-01-05",
      readTime: 12,
      views: 2890,
      tags: ["wedding hairstyles", "bridal hair", "beauty tips"],
      excerpt:
        "From elegant updos to romantic waves, find the perfect hairstyle that complements your wedding dress and venue.",
    },
    {
      id: 4,
      title: "Skincare Routine for Glowing Bridal Skin",
      subtitle: "Start your skincare journey 6 months before your wedding",
      slug: "bridal-skincare-routine-guide",
      category: "Skincare",
      author: {
        name: "Dr. Maria Rodriguez",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      },
      featuredImage:
        "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=600&fit=crop",
      publishDate: "2025-01-03",
      readTime: 15,
      views: 4150,
      tags: ["skincare", "bridal prep", "beauty routine"],
      excerpt:
        "Create a comprehensive skincare routine that will give you the radiant, camera-ready complexion of your dreams.",
    },
  ];

  const handlePostClick = (post) => {
    // In a real app, this would navigate to the specific post
    navigate("/individual-blog-post", { state: { postId: post?.id } });
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })?.format(new Date(date));
  };

  return (
    <section className="bg-background py-12 lg:py-16">
      <div className="container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center mb-4">
              <Icon name="BookOpen" size={24} className="text-primary mr-3" />
              <GradientHeading
                align="center"
                normal="Related"
                highlight="Articles"
              />
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Continue your beauty journey with these handpicked articles that
              complement your reading
            </p>
          </div>

          {/* Related Posts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedPosts?.map((post) => (
              <article
                key={post?.id}
                className="bg-card rounded-lg overflow-hidden card-elevation hover:shadow-lg transition-smooth cursor-pointer group"
                onClick={() => handlePostClick(post)}
              >
                {/* Post Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={post?.featuredImage}
                    alt={post?.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary text-primary-foreground">
                      {post?.category}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="p-6">
                  {/* Author and Meta */}
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{post?.author?.name}</span>
                      <span>•</span>
                      <span>{formatDate(post?.publishDate)}</span>
                    </div>
                  </div>

                  {/* Title and Subtitle */}
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-smooth line-clamp-2">
                    {post?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post?.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post?.tags?.slice(0, 2)?.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-accent text-muted-foreground"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Meta */}
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Icon name="Clock" size={14} />
                        <span>{post?.readTime} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="Eye" size={14} />
                        <span>{post?.views?.toLocaleString()}</span>
                      </div>
                    </div>
                    <Icon
                      name="ArrowRight"
                      size={16}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Posts Button */}
          <div className="text-center mt-12">
            <Button
              variant="outline"
              onClick={() => navigate("/blog-homepage")}
              iconName="BookOpen"
              iconPosition="left"
              className="btn-hover"
            >
              View All Articles
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RelatedPosts;
