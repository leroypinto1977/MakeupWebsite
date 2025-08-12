import React from "react";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import GradientHeading from "../../../components/ui/GradientHeading";

const FeaturedPost = ({ post }) => {
  const navigate = useNavigate();

  if (!post) return null;

  const handleReadMore = () => {
    navigate("/individual-blog-post", { state: { post } });
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="bg-card">
      <div className="container-padding py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Icon name="Star" size={16} />
              <span>Featured Article</span>
            </div>
            <GradientHeading
              align="center"
              level={2}
              normal="Editor's"
              highlight="Pick"
            />
          </div>

          {/* Featured Post Card */}
          <div className="bg-background rounded-lg shadow-md overflow-hidden card-elevation">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Image Section */}
              <div className="relative h-64 lg:h-full min-h-[400px] overflow-hidden">
                <Image
                  src={post?.featuredImage}
                  alt={post?.title}
                  className="w-full h-full object-cover hover:scale-105 transition-smooth"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {post?.category}
                  </span>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 leading-tight">
                    {post?.title}
                  </h3>
                  <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                    {post?.excerpt}
                  </p>
                </div>

                {/* Author & Meta Info */}
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={post?.author?.avatar}
                      alt={post?.author?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {post?.author?.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {post?.author?.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-muted-foreground text-sm">•</div>
                  <div className="text-muted-foreground text-sm">
                    {formatDate(post?.publishedAt)}
                  </div>
                  <div className="text-muted-foreground text-sm">•</div>
                  <div className="flex items-center space-x-1 text-muted-foreground text-sm">
                    <Icon name="Clock" size={14} />
                    <span>{post?.readTime} min read</span>
                  </div>
                </div>

                {/* CTA Button */}
                <div>
                  <Button
                    variant="default"
                    onClick={handleReadMore}
                    iconName="ArrowRight"
                    iconPosition="right"
                    className="btn-hover"
                  >
                    Read Full Article
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;
