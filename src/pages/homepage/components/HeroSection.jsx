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
        // Initial states (exclude headline container; we'll animate letters separately)
        gsap?.set([sublineRef?.current, buttonRef?.current], {
          opacity: 0,
          y: 30,
        });

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
        });

        // Letter animation setup
        const letters = headlineRef?.current?.querySelectorAll(".char");
        if (letters?.length) {
          gsap?.set(letters, { opacity: 0, y: 50 });
          tl?.to(
            letters,
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.04,
            },
            "-=0.6"
          );
        }

        tl?.to(
          sublineRef?.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          "-=0.4"
        )?.to(
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
      className="relative min-h-screen flex items-center overflow-hidden bg-background"
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
      <div className="relative z-10 container-padding text-left text-white w-full">
        <div className="max-w-4xl pl-2 sm:pl-4 md:pl-6">
          {/* Main Headline */}
          <h1
            ref={headlineRef}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-semibold mb-6 leading-tight"
            aria-label="Transform Your Special Day"
          >
            <span className="sr-only">Transform Your Special Day</span>
            <span aria-hidden="true" className="block">
              {"Transform Your".split("").map((ch, i) => (
                <span
                  key={`l1-${i}`}
                  className="char inline-block will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
            <span aria-hidden="true" className="block text-primary">
              {"Special Day".split("").map((ch, i) => (
                <span
                  key={`l2-${i}`}
                  className="char inline-block will-change-transform"
                >
                  {ch === " " ? "\u00A0" : ch}
                </span>
              ))}
            </span>
          </h1>

          {/* Subline */}
          <p
            ref={sublineRef}
            className="text-lg sm:text-xl lg:text-2xl font-body mb-8 text-white/90 max-w-2xl text-balance"
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
          {/* Trust Indicators removed */}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
