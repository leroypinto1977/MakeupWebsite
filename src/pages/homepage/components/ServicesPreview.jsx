import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Image from "../../../components/AppImage";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import GradientHeading from "../../../components/ui/GradientHeading";

gsap?.registerPlugin(ScrollTrigger);

const ServicesPreview = () => {
  const navigate = useNavigate();
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  const services = [
    {
      id: 1,
      title: "Bridal Makeup",
      description:
        "Complete bridal transformation with trial session, premium products, and touch-up kit included",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Starting at $350",
      features: [
        "Trial Session",
        "Premium Products",
        "Touch-up Kit",
        "6-Hour Wear",
      ],
      icon: "Crown",
    },
    {
      id: 2,
      title: "Party Makeup",
      description:
        "Glamorous looks for special occasions, parties, and celebrations with professional finish",
      image:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Starting at $150",
      features: ["Event Styling", "Photo-Ready", "Long-lasting", "Custom Look"],
      icon: "Sparkles",
    },
    {
      id: 3,
      title: "Trial Session",
      description:
        "Perfect your look before the big day with our comprehensive trial makeup session",
      image:
        "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: "Starting at $100",
      features: [
        "Style Consultation",
        "Product Testing",
        "Look Documentation",
        "Adjustments",
      ],
      icon: "Palette",
    },
  ];

  useEffect(() => {
    const ctx = gsap?.context(() => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      )?.matches;

      if (!prefersReducedMotion) {
        gsap?.set(cardsRef?.current, {
          opacity: 0,
          y: 50,
        });

        ScrollTrigger?.create({
          trigger: sectionRef?.current,
          start: "top 80%",
          onEnter: () => {
            gsap?.to(cardsRef?.current, {
              opacity: 1,
              y: 0,
              duration: 0.8,
              stagger: 0.2,
              ease: "power2.out",
            });
          },
        });
      }
    }, sectionRef);

    return () => ctx?.revert();
  }, []);

  const handleServiceClick = () => {
    navigate("/services-overview");
  };

  const handleBridalPackageClick = () => {
    navigate("/bridal-package-details");
  };

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background">
      <div className="container-padding">
        {/* Section Header */}
        <div className="text-center mb-12 lg:mb-16">
          <GradientHeading
            align="center"
            normal="Our"
            highlight="Signature"
            after="Services"
          />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
            From bridal transformations to special occasion glamour, we create
            looks that enhance your natural beauty
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {services?.map((service, index) => (
            <div
              key={service?.id}
              ref={(el) => (cardsRef.current[index] = el)}
              className="group bg-card rounded-lg overflow-hidden card-elevation hover:shadow-lg transition-smooth cursor-pointer"
              onClick={
                service?.id === 1
                  ? handleBridalPackageClick
                  : handleServiceClick
              }
            >
              {/* Service Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service?.image}
                  alt={`${service?.title} - Professional makeup service showcase`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                />
                <div className="absolute top-4 left-4">
                  <div className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Icon
                      name={service?.icon}
                      size={20}
                      color="var(--color-primary-foreground)"
                    />
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm font-caption font-medium text-foreground">
                      {service?.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
                  {service?.title}
                </h3>
                <p className="text-muted-foreground font-body mb-4 text-sm leading-relaxed">
                  {service?.description}
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {service?.features?.map((feature, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span className="text-xs font-caption text-muted-foreground">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Learn More Button */}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  fullWidth
                  className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-smooth"
                >
                  Learn More
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Services CTA */}
        <div className="text-center">
          <Button
            variant="default"
            size="lg"
            onClick={handleServiceClick}
            iconName="Sparkles"
            iconPosition="left"
            className="btn-hover"
          >
            View All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreview;
