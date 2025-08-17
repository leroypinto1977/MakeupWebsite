import React, { useEffect, useRef, useState } from "react";
import GradientHeading from "../../../components/ui/GradientHeading";
import { fetchTestimonials } from "../../../lib/sanity";

const TestimonialsSection = () => {
  const sectionRef = useRef(null);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock data as fallback
  const mockTestimonials = [
    {
      id: 1,
      text: "The trial and wedding day experience were flawless. My makeup felt lightweight yet stayed perfect through tears and dancing.",
      author: "Sarah J.",
      role: "Recent Bride",
    },
    {
      id: 2,
      text: "As a bridesmaid at three different weddings with Vyara, I've seen consistent quality, care, and artistry every single time!",
      author: "Emily R.",
      role: "Bridesmaid & Client",
    },
    {
      id: 3,
      text: "The skincare prep advice alone was worth it. My skin has never looked this radiant in photos—timeless and natural.",
      author: "Jessica L.",
      role: "Bride",
    },
    {
      id: 4,
      text: "Professional, punctual, and calm under pressure. They elevated not just my look—but my confidence for the entire day.",
      author: "Amanda T.",
      role: "Bride",
    },
    {
      id: 5,
      text: "Every recommendation—from foundation to lip color—was spot on. Everything photographed beautifully without feeling heavy.",
      author: "Rachel M.",
      role: "Client",
    },
    {
      id: 6,
      text: "They understood my vision instantly and delivered a look that felt authentically me—enhanced, not masked.",
      author: "Isabella C.",
      role: "Bride",
    },
  ];

  // Fetch testimonials from Sanity on component mount
  useEffect(() => {
    const loadTestimonials = async () => {
      try {
        console.log("🔄 Loading testimonials from Sanity...");
        setLoading(true);
        const data = await fetchTestimonials();
        console.log("📊 Raw Sanity data:", data);

        // Transform Sanity data to match component structure
        const transformedTestimonials = data.map((testimonial) => ({
          id: testimonial._id,
          text: testimonial.testimonialText,
          author: testimonial.clientName,
          role: testimonial.title || "Client", // Use the title field from schema
        }));

        console.log("✨ Transformed testimonials:", transformedTestimonials);

        if (transformedTestimonials.length > 0) {
          console.log("✅ Using Sanity testimonials");
          setTestimonials(transformedTestimonials);
        } else {
          console.log("⚠️ No testimonials found in Sanity, using mock data");
          // Use mock data if no testimonials in CMS
          setTestimonials(mockTestimonials);
        }
      } catch (error) {
        console.error("❌ Error loading testimonials:", error);
        // Fallback to mock data if fetch fails
        console.log("🔄 Falling back to mock data");
        setTestimonials(mockTestimonials);
      } finally {
        setLoading(false);
        console.log("✨ Testimonials loading complete");
      }
    };

    loadTestimonials();
  }, []);

    // Intersection Observer for fade-in animation
  useEffect(() => {
    // Only run when testimonials are loaded and not loading
    if (loading || testimonials.length === 0) return;
    
    const cards = sectionRef.current?.querySelectorAll(".fade-in");
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [loading, testimonials]); // Re-run when loading state or testimonials change

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-card w-full">
      {/* Inner content constrained to 70vw (not max-% shrink stacking) for consistent usable width */}
      <div className="w-full mx-auto max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[75%] xl:max-w-[70%] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 fade-in opacity-0 translate-y-8 transition-all duration-700">
          <GradientHeading
            align="center"
            normal="What Our"
            highlight="Brides Say"
          />
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            Real experiences from brides and loved ones who trusted us with
            their most important moments.
          </p>
        </div>

        {/* Grid - with extra spacing for external quote marks */}
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 pt-8">
          {loading
            ? // Loading skeleton
              Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={`skeleton-${idx}`}
                  className="bg-background rounded-xl p-6 md:p-7 shadow-sm border border-border/50 relative overflow-hidden animate-pulse"
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gray-200" />
                  <div className="space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-5/6" />
                    <div className="h-4 bg-gray-200 rounded w-4/6" />
                  </div>
                  <div className="mt-5 space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-1/2" />
                    <div className="h-2 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            : testimonials.map((t, idx) => (
                <div
                  key={t.id}
                  className="fade-in opacity-0 translate-y-6 transition-all duration-700 bg-background rounded-xl p-6 md:p-7 mt-6 mr-6 shadow-sm border border-border/50 relative overflow-visible group"
                  style={{
                    transitionDelay: `${idx * 80}ms`
                  }}
                >
                  {/* Gradient left border with curved corners */}
                  <div 
                    className="absolute left-0 top-0 h-full w-1 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, #2C2825 0%, #D4A574 100%)',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px'
                    }}
                  ></div>
                  
                  {/* Large prominent quotation mark - positioned on the top right corner */}
                  <div className="absolute -right-6 -top-6 z-10 pointer-events-none">
                    <div className="relative">
                      {/* Quote background with blog title gradient */}
                      <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg" style={{
                        background: 'linear-gradient(135deg, #2C2825 0%, #D4A574 100%)'
                      }}>
                        {/* Custom quotation mark image */}
                        <img 
                          src="/assets/images/quote-mark.png" 
                          alt="Quote mark"
                          className="w-8 h-8 object-contain filter brightness-0 invert"
                        />
                      </div>
                      {/* Subtle glow effect with matching colors */}
                      <div className="absolute inset-0 w-16 h-16 rounded-full opacity-30 blur-md -z-10" style={{
                        background: 'linear-gradient(135deg, #2C2825 0%, #D4A574 100%)'
                      }}></div>
                    </div>
                  </div>
                  <blockquote className="relative font-body text-foreground/90 leading-relaxed italic mb-5">
                    "{t.text}"
                  </blockquote>
                  <div className="relative">
                    <div className="font-heading font-semibold text-sm text-foreground">
                      {t.author}
                    </div>
                    <div className="text-xs font-caption text-muted-foreground mt-0.5 tracking-wide uppercase">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
        </div>

        {/* Stats / Trust Indicators */}
        <div
          className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 fade-in opacity-0 translate-y-8 transition-all duration-700"
          style={{ transitionDelay: `${testimonials.length * 80}ms` }}
        >
          {[
            { label: "Happy Brides", value: "500+" },
            { label: "Average Rating", value: "5.0" },
            { label: "Satisfaction Rate", value: "98%" },
            { label: "Years Experience", value: "3+" },
          ].map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl md:text-3xl font-heading font-semibold text-primary mb-1">
                {s.value}
              </div>
              <p className="text-xs md:text-sm font-caption text-muted-foreground tracking-wide">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .fade-in.visible { opacity: 1 !important; transform: translateY(0) !important; }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
