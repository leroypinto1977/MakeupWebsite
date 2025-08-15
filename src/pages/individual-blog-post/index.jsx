import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import Header from "../../components/ui/Header";
import ArticleHeader from "./components/ArticleHeader";
import ArticleContent from "./components/ArticleContent";
import SidebarContent from "./components/SidebarContent";
import RelatedPosts from "./components/RelatedPosts";
import MobileSidebar from "./components/MobileSidebar";
import Footer from "../homepage/components/Footer";

const IndividualBlogPost = () => {
  const [shareMessage, setShareMessage] = useState("");

  // Mock article data
  const article = {
    id: 1,
    title: "The Complete Guide to Flawless Bridal Makeup That Lasts All Day",
    subtitle:
      "Master the art of long-lasting bridal beauty with professional techniques and insider secrets",
    category: "Bridal Makeup",
    publishDate: "2025-01-10",
    readTime: 15,
    views: 12450,
    tags: [
      "bridal makeup",
      "wedding beauty",
      "makeup tutorial",
      "long-lasting makeup",
    ],
    featuredImage:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=1200&h=800&fit=crop",
  };

  const author = {
    name: "Isabella Martinez",
    title: "Senior Bridal Makeup Artist & Beauty Educator",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
    bio: `Isabella is a certified makeup artist with over 8 years of experience specializing in bridal beauty. She has worked with over 500 brides and is known for her expertise in creating long-lasting, camera-ready looks that enhance natural beauty.`,
    location: "New York, NY",
    joinDate: "March 2017",
    website: "https://isabellamakeup.com",
    social: {
      instagram: "https://instagram.com/isabella_makeup",
      facebook: "https://facebook.com/isabella.makeup.artist",
      youtube: "https://youtube.com/c/isabellasbeauty",
    },
    stats: {
      articles: 47,
      followers: "12.5K",
      experience: 8,
    },
    specialties: [
      "Bridal Makeup",
      "Editorial Beauty",
      "Color Theory",
      "Skincare Prep",
    ],
  };

  const content = {
    title: article?.title,
    featuredImage: article?.featuredImage,
    introduction: `Your wedding day is one of the most photographed days of your life, and you want to look absolutely radiant from the moment you say "I do" until the last dance. Creating a flawless bridal makeup look that photographs beautifully and lasts through tears of joy, kisses, and hours of celebration requires the right techniques, products, and preparation.\n\nIn this comprehensive guide, I'll share the professional secrets I've learned from working with hundreds of brides, ensuring your makeup looks as fresh at midnight as it did when you walked down the aisle.`,
    sections: [
      {
        heading: "Pre-Wedding Skincare Preparation",
        paragraphs: [
          "The foundation of any stunning bridal makeup look begins with healthy, well-prepared skin. Starting your skincare routine at least 3-6 months before your wedding day is crucial for achieving that coveted bridal glow.",
          "Focus on establishing a consistent routine that includes gentle cleansing, regular exfoliation, targeted treatments for any skin concerns, and daily moisturizing with SPF protection. Avoid trying new products within 4 weeks of your wedding to prevent any unexpected reactions.",
        ],
        tutorialStep: {
          number: 1,
          title: "The Perfect Bridal Skincare Routine",
          description:
            "Follow this morning and evening routine for radiant, camera-ready skin",
          image:
            "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=600&h=400&fit=crop",
          tips: [
            "Use lukewarm water to avoid irritating sensitive skin",
            "Apply products in thin layers and allow each to absorb fully",
            "Never skip SPF, even on cloudy days or when staying indoors",
            "Keep a skincare diary to track what works best for your skin",
          ],
        },
      },
      {
        heading: "Choosing the Right Foundation",
        paragraphs: [
          "Your foundation choice can make or break your bridal look. The key is finding a formula that photographs well, matches your skin tone perfectly, and has the staying power to last through your entire celebration.",
          "I recommend scheduling a professional color matching session at least 2 months before your wedding. This gives you time to test the foundation in different lighting conditions and ensure it photographs beautifully.",
        ],
        productRecommendation: {
          name: "Estée Lauder Double Wear Foundation",
          description:
            "Long-wearing, full coverage foundation perfect for special occasions",
          price: 52,
          image:
            "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
        },
      },
      {
        heading: "Creating the Perfect Base",
        paragraphs: [
          "A flawless base is essential for bridal makeup that photographs beautifully. This involves proper priming, strategic concealing, and setting techniques that ensure your makeup stays put through tears, kisses, and dancing.",
          "The secret to long-lasting makeup lies in the layering technique. Each layer should be thin and properly set before applying the next, creating a buildable, natural-looking finish that won't cake or separate throughout the day.",
        ],
        beforeAfter: {
          title: "Foundation Application: Before & After",
          before:
            "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=600&h=400&fit=crop",
          after:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
        },
      },
      {
        heading: "Eye Makeup That Photographs Beautifully",
        paragraphs: [
          "Bridal eye makeup should enhance your natural eye shape while being bold enough to show up in photographs. The key is creating dimension with strategic shading and highlighting, while ensuring the colors complement your overall look.",
          "Consider your wedding venue's lighting when choosing eyeshadow colors. Outdoor ceremonies may require slightly more dramatic application, while indoor venues with professional lighting can handle more subtle looks.",
        ],
        tutorialStep: {
          number: 2,
          title: "Classic Bridal Eye Look",
          description:
            "Create timeless, elegant eyes that complement any bridal style",
          image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=600&h=400&fit=crop",
          tips: [
            "Use waterproof mascara and eyeliner to prevent smudging",
            "Apply eyeshadow primer to ensure colors stay vibrant all day",
            "Blend colors seamlessly for a professional finish",
            "Consider false lashes for added drama in photos",
          ],
        },
      },
      {
        heading: "Lip Color That Lasts",
        paragraphs: [
          "Your lip color needs to survive the ceremony, photos, eating, drinking, and countless kisses. The secret is in the application technique and product selection.",
          "I always recommend having a touch-up kit ready, but with the right preparation and products, you should need minimal maintenance throughout your special day.",
        ],
      },
    ],
    conclusion: `Creating the perfect bridal makeup look is an art that combines technical skill, quality products, and careful preparation. Remember that the most beautiful bridal makeup enhances your natural features rather than masking them. Practice these techniques well before your wedding day, and don't forget to enjoy the process of preparing for one of the most special days of your life.\n\nYour wedding day makeup should make you feel confident, beautiful, and authentically yourself. With these professional techniques and tips, you'll have the knowledge to create or communicate exactly what you want to your makeup artist for a truly unforgettable bridal look.`,
  };

  const handleShare = (platform) => {
    const url = window.location?.href;
    const title = article?.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "instagram":
        setShareMessage("Link copied! Share on Instagram Stories");
        navigator.clipboard?.writeText(url);
        break;
      case "pinterest":
        window.open(
          `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
            url
          )}&description=${encodeURIComponent(title)}`,
          "_blank"
        );
        break;
      case "copy":
        navigator.clipboard?.writeText(url);
        setShareMessage("Link copied to clipboard!");
        break;
      default:
        break;
    }

    if (shareMessage) {
      setTimeout(() => setShareMessage(""), 3000);
    }
  };

  const handleNewsletterSignup = (email) => {
    console.log("Newsletter signup:", email);
    // In a real app, this would make an API call
  };

  // Schema.org JSON-LD markup for SEO
  const schemaMarkup = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article?.title,
    description: article?.subtitle,
    image: article?.featuredImage,
    author: {
      "@type": "Person",
      name: author?.name,
      jobTitle: author?.title,
      image: author?.avatar,
      url: author?.website,
    },
    publisher: {
      "@type": "Organization",
      name: "Vyara",
      logo: {
        "@type": "ImageObject",
        url: "/logo.png",
      },
    },
    datePublished: article?.publishDate,
    dateModified: article?.publishDate,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": window.location?.href,
    },
  };

  useEffect(() => {
    // Scroll to top on component mount
    window.scrollTo(0, 0);
  }, []);

  const articleColRef = useRef(null);
  const sidebarColRef = useRef(null);

  useEffect(() => {
    if (!articleColRef.current || !sidebarColRef.current) return;

    const applyHeight = () => {
      if (articleColRef.current && sidebarColRef.current) {
        const h = articleColRef.current.getBoundingClientRect().height;
        sidebarColRef.current.style.minHeight = h + "px";
      }
    };

    // Initial + delayed attempts (for late-loading images)
    applyHeight();
    const timeouts = [200, 600, 1200].map((t) => setTimeout(applyHeight, t));

    // ResizeObserver for article content changes
    const ro = new ResizeObserver(() => applyHeight());
    ro.observe(articleColRef.current);

    // Window resize
    window.addEventListener("resize", applyHeight);

    return () => {
      timeouts.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener("resize", applyHeight);
    };
  }, [content]);

  return (
    <>
      <Helmet>
        <title>
          {article?.title} | Vyara Beauty Blog - Bridal Makeup Tips & Tutorials
        </title>
        <meta name="description" content={article?.subtitle} />
        <meta name="keywords" content={article?.tags?.join(", ")} />

        {/* Open Graph tags */}
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={article?.subtitle} />
        <meta property="og:image" content={article?.featuredImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location?.href} />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article?.title} />
        <meta name="twitter:description" content={article?.subtitle} />
        <meta name="twitter:image" content={article?.featuredImage} />

        {/* Article specific meta tags */}
        <meta property="article:author" content={author?.name} />
        <meta
          property="article:published_time"
          content={article?.publishDate}
        />
        <meta property="article:section" content={article?.category} />
        {article?.tags?.map((tag) => (
          <meta key={tag} property="article:tag" content={tag} />
        ))}

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify(schemaMarkup)}
        </script>
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />

        {/* Share Success Message */}
        {shareMessage && (
          <div className="fixed top-20 right-4 z-50 bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg animate-slide-up">
            {shareMessage}
          </div>
        )}

        {/* Article Header */}
        <div className="pt-20 lg:pt-24">
          {/* Top spacing compensating for removed breadcrumb */}
          <ArticleHeader
            article={article}
            author={author}
            onShare={handleShare}
          />
        </div>

        {/* Main Content Area */}
        <main className="container-padding py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8 lg:gap-12">
              {/* Article Content */}
              <div className="lg:col-span-3" ref={articleColRef}>
                <ArticleContent
                  content={content}
                  onNewsletterSignup={handleNewsletterSignup}
                />
              </div>

              {/* Desktop Sidebar */}
              <div
                className="hidden lg:block"
                ref={sidebarColRef}
                style={{ position: "relative" }}
              >
                <SidebarContent
                  content={content}
                  author={author}
                  onNewsletterSignup={handleNewsletterSignup}
                />
              </div>
            </div>
          </div>
        </main>

        {/* Related Posts */}
        <RelatedPosts currentPostId={article?.id} currentTags={article?.tags} />

        {/* Mobile Sidebar */}
        <MobileSidebar
          content={content}
          author={author}
          onNewsletterSignup={handleNewsletterSignup}
        />
        <Footer />
      </div>
    </>
  );
};

export default IndividualBlogPost;
