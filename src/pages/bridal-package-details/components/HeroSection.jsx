import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

const HeroSection = ({ onBookConsultation }) => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const content = contentRef.current;
    const image = imageRef.current;

    if (!hero || !content || !image) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      gsap.set([content, image], { opacity: 0, y: 30 });

      const tl = gsap.timeline();
      tl.to(image, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }).to(
        content,
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
        "-=0.4"
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center bg-gradient-to-br from-background via-card to-accent overflow-hidden pt-20 lg:pt-24"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23D4A574%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>

      <div className="container-padding relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                <span>✨</span>
                <span>Premium Bridal Packages</span>
              </div>

              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-heading font-semibold text-foreground leading-tight">
                Your Dream Wedding
                <span className="block text-gradient">Makeup Experience</span>
              </h1>

              <p className="text-lg lg:text-xl text-muted-foreground font-body leading-relaxed max-w-xl">
                Transform your special day with our comprehensive bridal makeup
                packages. From trial sessions to your wedding day, we ensure you
                look absolutely radiant.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
                Starting from <span className="text-primary">$299</span>
              </div>
              <div className="text-sm text-muted-foreground">
                *Includes trial session
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                variant="default"
                size="lg"
                onClick={onBookConsultation}
                iconName="Calendar"
                iconPosition="left"
                className="btn-hover"
              >
                Book Free Consultation
              </Button>

              <Button
                variant="outline"
                size="lg"
                iconName="Phone"
                iconPosition="left"
                className="btn-hover"
              >
                Call (555) 123-4567
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-4">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-warning text-lg">
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  5.0 (200+ reviews)
                </span>
              </div>

              <div className="h-4 w-px bg-border"></div>

              <div className="text-sm text-muted-foreground">
                500+ Happy Brides
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div ref={imageRef} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Beautiful bride with professional makeup"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent"></div>

              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-background/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-foreground">
                    Available Today
                  </span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
