import React, { useState, useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import GradientHeading from "../../components/ui/GradientHeading";
import BlogHeader from "./components/BlogHeader";
import FeaturedPost from "./components/FeaturedPost";
import CategoryNavigation from "./components/CategoryNavigation";
import BlogGrid from "./components/BlogGrid";
import Footer from "../homepage/components/Footer";
import Sidebar from "./components/Sidebar";
import MobileSidebarToggle from "./components/MobileSidebarToggle";
import Pagination from "./components/Pagination";

const BlogHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const postsPerPage = 9;

  // Mock blog posts data
  const allBlogPosts = [
    {
      id: 1,
      title: "10 Essential Bridal Makeup Tips for Your Perfect Wedding Day",
      excerpt:
        "Discover the secrets to achieving flawless bridal makeup that will make you glow on your special day. From long-lasting foundation to waterproof mascara, we cover everything you need to know.",
      content: `Your wedding day is one of the most important days of your life, and you want to look absolutely radiant. Here are our top 10 essential bridal makeup tips that will ensure you look stunning from the ceremony to the reception.\n\n1. Start with a flawless base\n2. Choose long-wearing products\n3. Don't forget to prime\n4. Waterproof is your friend\n5. Practice your look beforehand`,
      featuredImage:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop",
      category: "Bridal Tips",
      tags: ["wedding", "makeup", "bridal", "tips"],
      author: {
        name: "Isabella Martinez",
        role: "Lead Makeup Artist",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-15",
      readTime: 8,
      views: "2.1k",
      isNew: true,
      isFeatured: true,
    },
    {
      id: 2,
      title: "The Ultimate Skincare Routine for Glowing Bridal Skin",
      excerpt:
        "Start your bridal beauty journey with the perfect skincare routine. Learn how to achieve that coveted bridal glow with our step-by-step guide to healthy, radiant skin.",
      content: `Beautiful makeup starts with beautiful skin. Here's your complete guide to achieving that perfect bridal glow through a dedicated skincare routine.\n\nMorning Routine:\n- Gentle cleanser\n- Vitamin C serum\n- Moisturizer with SPF\n\nEvening Routine:\n- Double cleanse\n- Retinol treatment\n- Hydrating night cream`,
      featuredImage:
        "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=600&fit=crop",
      category: "Skincare",
      tags: ["skincare", "routine", "bridal", "glow"],
      author: {
        name: "Dr. Sarah Chen",
        role: "Skincare Specialist",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-12",
      readTime: 6,
      views: "1.8k",
      isNew: true,
    },
    {
      id: 3,
      title: "Smokey Eye Tutorial: From Day to Night Glamour",
      excerpt:
        "Master the art of the smokey eye with our comprehensive tutorial. Perfect for brides who want to add drama and sophistication to their wedding look.",
      content: `The smokey eye is a timeless classic that adds instant glamour to any look. Here's how to create the perfect smokey eye for your special day.\n\nStep 1: Prime your lids\nStep 2: Apply base shadow\nStep 3: Build the gradient\nStep 4: Line and define\nStep 5: Highlight and blend`,
      featuredImage:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
      category: "Tutorials",
      tags: ["tutorial", "smokey eye", "makeup", "glamour"],
      author: {
        name: "Isabella Martinez",
        role: "Lead Makeup Artist",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-10",
      readTime: 12,
      views: "3.2k",
    },
    {
      id: 4,
      title: "2025 Bridal Makeup Trends: What's Hot This Season",
      excerpt:
        "Stay ahead of the curve with the latest bridal makeup trends for 2025. From natural glam to bold statements, discover what's trending this wedding season.",
      content: `Wedding makeup trends are constantly evolving, and 2025 brings some exciting new directions for bridal beauty. Here are the top trends we're seeing this season.\n\n1. Natural Glam\n2. Bold Lips with Minimal Eyes\n3. Dewy Skin Finish\n4. Colorful Eyeliner\n5. Textured Lashes`,
      featuredImage:
        "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=800&h=600&fit=crop",
      category: "Trends",
      tags: ["trends", "2025", "bridal", "fashion"],
      author: {
        name: "Emma Thompson",
        role: "Beauty Editor",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-08",
      readTime: 7,
      views: "2.7k",
    },
    {
      id: 5,
      title: "Hair and Makeup Coordination: Creating the Perfect Bridal Look",
      excerpt:
        "Learn how to coordinate your hair and makeup for a cohesive bridal look. Our experts share tips on balancing elements for stunning wedding day beauty.",
      content: `Creating a cohesive bridal look requires careful coordination between hair and makeup. Here's how to achieve perfect harmony between these essential elements.\n\nConsider Your Dress Style\nBalance Bold and Subtle Elements\nThink About Your Venue\nConsider Photography\nPlan Your Timeline`,
      featuredImage:
        "https://images.unsplash.com/photo-1560869713-7d0b29837c64?w=800&h=600&fit=crop",
      category: "Hair Styling",
      tags: ["hair", "coordination", "bridal", "styling"],
      author: {
        name: "Maria Rodriguez",
        role: "Hair Stylist",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-05",
      readTime: 9,
      views: "1.9k",
    },
    {
      id: 6,
      title: "Contouring and Highlighting: Sculpting Your Perfect Face",
      excerpt:
        "Master the art of contouring and highlighting with our detailed guide. Learn professional techniques to enhance your natural features for your wedding day.",
      content: `Contouring and highlighting can transform your face and enhance your natural beauty. Here's our professional guide to sculpting the perfect bridal face.\n\nUnderstanding Face Shapes\nChoosing the Right Products\nApplication Techniques\nBlending Like a Pro\nSetting Your Look`,
      featuredImage:
        "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&h=600&fit=crop",
      category: "Makeup Techniques",
      tags: ["contouring", "highlighting", "techniques", "professional"],
      author: {
        name: "Isabella Martinez",
        role: "Lead Makeup Artist",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-03",
      readTime: 10,
      views: "2.4k",
    },
    {
      id: 7,
      title: "Seasonal Skincare: Preparing Your Skin for Different Weather",
      excerpt:
        "Adapt your skincare routine to the seasons for optimal bridal skin. Learn how weather changes affect your skin and how to adjust your routine accordingly.",
      content: `Your skin's needs change with the seasons, and as a bride, you want to ensure your skin looks perfect regardless of when you're getting married.\n\nSpring Skincare Tips\nSummer Protection Strategies\nFall Transition Routine\nWinter Hydration Focus\nYear-Round Essentials`,
      featuredImage:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
      category: "Skincare",
      tags: ["seasonal", "skincare", "weather", "adaptation"],
      author: {
        name: "Dr. Sarah Chen",
        role: "Skincare Specialist",
        avatar:
          "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2025-01-01",
      readTime: 8,
      views: "1.6k",
    },
    {
      id: 8,
      title: "Bridal Makeup for Different Skin Tones: A Complete Guide",
      excerpt:
        "Discover the best makeup techniques and color choices for every skin tone. Our comprehensive guide ensures every bride looks radiant on her special day.",
      content: `Every bride deserves to feel beautiful, regardless of her skin tone. Here's our complete guide to choosing the perfect makeup for different complexions.\n\nUnderstanding Undertones\nFoundation Matching Tips\nColor Theory for Makeup\nBest Shades by Skin Tone\nUniversal Flattering Colors`,
      featuredImage:
        "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
      category: "Bridal Tips",
      tags: ["skin tone", "inclusive", "color matching", "diversity"],
      author: {
        name: "Aisha Patel",
        role: "Color Specialist",
        avatar:
          "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2024-12-28",
      readTime: 11,
      views: "2.8k",
    },
    {
      id: 9,
      title: "DIY Bridal Beauty: Simple Techniques You Can Master at Home",
      excerpt:
        "Learn professional makeup techniques you can do yourself. Perfect for budget-conscious brides or those who prefer a more personal touch to their wedding beauty.",
      content: `Not every bride needs a professional makeup artist. With the right techniques and practice, you can create a stunning bridal look at home.\n\nEssential Tools and Products\nStep-by-Step Application\nCommon Mistakes to Avoid\nPractice Makes Perfect\nEmergency Touch-Up Kit`,
      featuredImage:
        "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
      category: "Tutorials",
      tags: ["DIY", "budget", "self-application", "home"],
      author: {
        name: "Emma Thompson",
        role: "Beauty Editor",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2024-12-25",
      readTime: 15,
      views: "3.5k",
    },
    {
      id: 10,
      title: "The Science of Long-Lasting Makeup: Products That Stay Put",
      excerpt:
        "Understand the science behind long-wearing makeup and discover the products that will keep you looking flawless from ceremony to reception.",
      content: `Your wedding day is long, and your makeup needs to last. Here's the science behind long-wearing formulas and how to make your makeup stay put all day.\n\nUnderstanding Makeup Longevity\nPrimer Science\nSetting Techniques\nProduct Recommendations\nTouch-Up Strategies`,
      featuredImage:
        "https://images.unsplash.com/photo-1583001931096-959e9a1a6223?w=800&h=600&fit=crop",
      category: "Makeup Techniques",
      tags: ["longevity", "science", "products", "durability"],
      author: {
        name: "Dr. Lisa Wang",
        role: "Cosmetic Chemist",
        avatar:
          "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=100&h=100&fit=crop&crop=face",
      },
      publishedAt: "2024-12-22",
      readTime: 9,
      views: "2.1k",
    },
  ];

  // Mock popular posts
  const popularPosts = [
    {
      id: 1,
      title: "10 Essential Bridal Makeup Tips for Your Perfect Wedding Day",
      publishedAt: "2025-01-15",
      views: "2.1k",
    },
    {
      id: 9,
      title: "DIY Bridal Beauty: Simple Techniques You Can Master at Home",
      publishedAt: "2024-12-25",
      views: "3.5k",
    },
    {
      id: 3,
      title: "Smokey Eye Tutorial: From Day to Night Glamour",
      publishedAt: "2025-01-10",
      views: "3.2k",
    },
    {
      id: 8,
      title: "Bridal Makeup for Different Skin Tones: A Complete Guide",
      publishedAt: "2024-12-28",
      views: "2.8k",
    },
  ];

  // Mock recent comments
  const recentComments = [
    {
      id: 1,
      author: {
        name: "Jennifer Smith",
        avatar:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "This tutorial was exactly what I needed for my wedding! The step-by-step instructions were so clear.",
      postTitle: "Smokey Eye Tutorial: From Day to Night Glamour",
      createdAt: "2025-01-14",
    },
    {
      id: 2,
      author: {
        name: "Maria Garcia",
        avatar:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "I've been following this skincare routine for 3 months and my skin has never looked better!",
      postTitle: "The Ultimate Skincare Routine for Glowing Bridal Skin",
      createdAt: "2025-01-13",
    },
    {
      id: 3,
      author: {
        name: "Sarah Johnson",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
      },
      content:
        "Love these trend predictions! Can't wait to try the dewy skin look for my summer wedding.",
      postTitle: "2025 Bridal Makeup Trends: What's Hot This Season",
      createdAt: "2025-01-12",
    },
  ];

  // Generate categories with counts
  const categories = useMemo(() => {
    const categoryCount = {};
    allBlogPosts?.forEach((post) => {
      categoryCount[post.category] = (categoryCount?.[post?.category] || 0) + 1;
    });

    const allCategories = [
      { name: "All", count: allBlogPosts?.length },
      ...Object.entries(categoryCount)?.map(([name, count]) => ({
        name,
        count,
      })),
    ];

    return allCategories;
  }, [allBlogPosts]);

  // Filter and search posts
  const filteredPosts = useMemo(() => {
    let filtered = allBlogPosts;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered?.filter((post) => post?.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(
        (post) =>
          post?.title?.toLowerCase()?.includes(query) ||
          post?.excerpt?.toLowerCase()?.includes(query) ||
          post?.tags?.some((tag) => tag?.toLowerCase()?.includes(query)) ||
          post?.author?.name?.toLowerCase()?.includes(query)
      );
    }

    return filtered;
  }, [allBlogPosts, activeCategory, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts?.length / postsPerPage);
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage;
    return filteredPosts?.slice(startIndex, startIndex + postsPerPage);
  }, [filteredPosts, currentPage, postsPerPage]);

  // Get featured post
  const featuredPost =
    allBlogPosts?.find((post) => post?.isFeatured) || allBlogPosts?.[0];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  // Simulate loading
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, currentPage]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Helmet>
        <title>
          Bridal Makeup Tips & Beauty Tutorials | Vyara Beauty Blog - Expert
          Wedding Makeup Advice
        </title>
        <meta
          name="description"
          content="Discover expert bridal makeup tips, wedding beauty tutorials, and professional makeup advice from Vyara. Learn makeup techniques, skincare tips, and beauty secrets for your perfect wedding day look."
        />
        <meta
          name="keywords"
          content="bridal makeup tips, wedding makeup tutorials, makeup tips and tricks, beauty blog, Indian bridal makeup tips, wedding beauty advice, makeup techniques, skincare tips, bridal beauty tutorials, makeup artist blog, wedding makeup guide, beauty tips for brides"
        />
        <meta
          property="og:title"
          content="Beauty & Bridal Blog - Expert Tips & Tutorials"
        />
        <meta
          property="og:description"
          content="Expert beauty tips, bridal makeup tutorials, and trends from professional makeup artists."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://vyara.com/blog" />
        <link rel="canonical" href="https://vyara.com/blog" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Vyara Blog",
            description:
              "Expert beauty tips, bridal makeup tutorials, and trends",
            url: "https://vyara.com/blog",
            publisher: {
              "@type": "Organization",
              name: "Vyara",
              logo: {
                "@type": "ImageObject",
                url: "https://vyara.com/logo.png",
              },
            },
          })}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        <main className="pt-20 lg:pt-24">
          {/* Blog Header */}
          <BlogHeader onSearch={handleSearch} searchQuery={searchQuery} />

          {/* Featured Post */}
          <FeaturedPost post={featuredPost} />

          {/* Category Navigation */}
          <CategoryNavigation
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          {/* Main Content */}
          <div className="container-padding py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
              <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
                {/* Blog Posts Grid */}
                <div className="lg:col-span-3">
                  {/* Results Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      {(() => {
                        const rawTitle = searchQuery
                          ? "Search Results"
                          : activeCategory === "All"
                          ? "Latest Articles"
                          : activeCategory;
                        const parts = rawTitle.split(" ");
                        let normal = "";
                        let highlight = rawTitle;
                        let after = "";
                        if (parts.length === 2) {
                          normal = parts[0];
                          highlight = parts[1];
                        } else if (parts.length > 2) {
                          normal = parts.slice(0, parts.length - 1).join(" ");
                          highlight = parts[parts.length - 1];
                        }
                        return (
                          <GradientHeading
                            level={2}
                            normal={normal}
                            highlight={highlight}
                            after={after}
                            className="text-xl"
                          />
                        );
                      })()}
                      <p className="text-muted-foreground text-sm mt-1">
                        {filteredPosts?.length} article
                        {filteredPosts?.length !== 1 ? "s" : ""} found
                      </p>
                    </div>
                  </div>

                  {/* Blog Grid */}
                  <BlogGrid posts={paginatedPosts} isLoading={isLoading} />

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="mt-12">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  )}
                </div>

                {/* Desktop Sidebar */}
                <div className="hidden lg:block">
                  <div className="sticky top-32">
                    <Sidebar
                      popularPosts={popularPosts}
                      categories={categories}
                      recentComments={recentComments}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Sidebar Toggle */}
          <MobileSidebarToggle
            popularPosts={popularPosts}
            categories={categories}
            recentComments={recentComments}
          />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogHomepage;
