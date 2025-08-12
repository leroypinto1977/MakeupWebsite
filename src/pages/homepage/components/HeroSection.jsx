import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";

gsap?.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const headlineRef = useRef(null);
  const sublineRef = useRef(null);
  const buttonRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap?.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      )?.matches;

      if (!prefersReducedMotion) {
        // Initial states
        gsap?.set(
          [headlineRef?.current, sublineRef?.current, buttonRef?.current],
          {
            opacity: 0,
            y: 30,
          }
        );

        gsap?.set(imageRef?.current, {
          opacity: 0,
          scale: 1.1,
        });

        // Staggered reveal animation
        const tl = gsap?.timeline({ delay: 0.5 });

        tl?.to(imageRef?.current, {
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power2.out",
        })
          ?.to(
            headlineRef?.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.8"
          )
          ?.to(
            sublineRef?.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.6"
          )
          ?.to(
            buttonRef?.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power2.out",
            },
            "-=0.4"
          );

        // Parallax effect on scroll
        gsap?.to(imageRef?.current, {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef?.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }
    }, heroRef);

    return () => ctx?.revert();
  }, []);

  const handleBookingClick = () => {
    navigate("/booking-system");
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div ref={imageRef} className="w-full h-full">
          <Image
            // src="https://images.unsplash.com/photo-1583391733956-6c78276477e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Beautiful Indian bride in traditional red saree with intricate gold jewelry and classic bridal makeup"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-foreground/40" />
      </div>
      {/* Content */}
      <div className="relative z-10 container-padding text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold mb-6 text-balance leading-tight"
          >
            Transform Your
            <span className="block text-primary">Special Day</span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-lg sm:text-xl lg:text-2xl font-body mb-8 text-white/90 max-w-2xl mx-auto text-balance"
          >
            Professional bridal makeup artistry that enhances your natural
            beauty and creates unforgettable moments
          </p>

          {/* CTA Button */}
          <div ref={buttonRef}>
            <Button
              variant="default"
              size="lg"
              onClick={handleBookingClick}
              iconName="Calendar"
              iconPosition="left"
              className="btn-hover text-lg px-8 py-4 shadow-lg"
            >
              Book Your Consultation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-white/80">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <div key={star} className="w-4 h-4 text-primary">
                    ⭐
                  </div>
                ))}
              </div>
              <span className="font-caption">500+ Happy Brides</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full" />
              <span className="font-caption">Licensed & Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded-full" />
              <span className="font-caption">Premium Products Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
