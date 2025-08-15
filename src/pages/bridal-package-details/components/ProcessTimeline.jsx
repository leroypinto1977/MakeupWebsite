import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Icon from "../../../components/AppIcon";

gsap?.registerPlugin(ScrollTrigger);

const ProcessTimeline = () => {
  const timelineRef = useRef(null);

  const processSteps = [
    {
      id: 1,
      icon: "MessageCircle",
      title: "Initial Consultation",
      duration: "30 minutes",
      description:
        "We discuss your vision, wedding theme, and personal style preferences to create the perfect look.",
      details: [
        "Style preference discussion",
        "Skin analysis and preparation",
        "Wedding theme coordination",
        "Timeline planning",
      ],
    },
    {
      id: 2,
      icon: "Palette",
      title: "Trial Session",
      duration: "2-3 hours",
      description:
        "Complete makeup trial to perfect your bridal look and make any necessary adjustments.",
      details: [
        "Full makeup application",
        "Photography test",
        "Style adjustments",
        "Product recommendations",
      ],
    },
    {
      id: 3,
      icon: "Calendar",
      title: "Pre-Wedding Prep",
      duration: "1 week before",
      description:
        "Final preparations including skincare routine and last-minute adjustments if needed.",
      details: [
        "Skincare consultation",
        "Final look confirmation",
        "Timeline coordination",
        "Emergency contact setup",
      ],
    },
    {
      id: 4,
      icon: "Crown",
      title: "Wedding Day",
      duration: "3-4 hours",
      description:
        "Your special day! Professional makeup application with touch-ups throughout the ceremony.",
      details: [
        "Bridal makeup application",
        "Photography session prep",
        "Ceremony touch-ups",
        "Reception refresh",
      ],
    },
    {
      id: 5,
      icon: "Camera",
      title: "Post-Wedding",
      duration: "Follow-up",
      description:
        "We follow up to ensure you were completely satisfied and provide aftercare tips.",
      details: [
        "Satisfaction follow-up",
        "Photo sharing",
        "Skincare aftercare",
        "Future service discounts",
      ],
    },
  ];

  useEffect(() => {
    const timeline = timelineRef?.current;
    if (!timeline) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (!prefersReducedMotion) {
      const steps = timeline?.querySelectorAll(".timeline-step");

      steps?.forEach((step, index) => {
        gsap?.fromTo(
          step,
          { opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 },
          {
            opacity: 1,
            x: 0,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    return () => {
      ScrollTrigger?.getAll()?.forEach((trigger) => trigger?.kill());
    };
  }, []);

  return (
    <div ref={timelineRef} className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground">
          Your Bridal Journey
        </h3>
        <p className="text-muted-foreground font-body max-w-2xl mx-auto">
          From initial consultation to your wedding day, we guide you through
          every step to ensure you look absolutely stunning.
        </p>
      </div>
      {/* Timeline */}
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-0.5"></div>

        {/* Timeline Steps */}
        <div className="space-y-12">
          {processSteps?.map((step, index) => (
            <div
              key={step?.id}
              className={`timeline-step relative flex items-start ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center md:transform md:-translate-x-1/2 z-10">
                <Icon
                  name={step?.icon}
                  size={16}
                  color="var(--color-primary-foreground)"
                />
              </div>

              {/* Content */}
              <div
                className={`ml-16 md:ml-0 md:w-1/2 ${
                  index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                }`}
              >
                <div className="bg-card rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-xl font-heading font-semibold text-foreground">
                      {step?.title}
                    </h4>
                    <span className="text-sm text-primary font-medium bg-primary/10 px-3 py-1 rounded-full">
                      {step?.duration}
                    </span>
                  </div>

                  <p className="text-muted-foreground font-body mb-4 leading-relaxed">
                    {step?.description}
                  </p>

                  <div className="space-y-2">
                    {step?.details?.map((detail, detailIndex) => (
                      <div
                        key={detailIndex}
                        className="flex items-center space-x-2"
                      >
                        <Icon
                          name="Check"
                          size={14}
                          className="text-success flex-shrink-0"
                        />
                        <span className="text-sm text-foreground">
                          {detail}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step Number */}
              <div
                className={`hidden md:block md:w-1/2 ${
                  index % 2 === 0 ? "md:pl-8" : "md:pr-8"
                }`}
              >
                <div
                  className={`text-6xl font-heading font-bold text-primary/20 ${
                    index % 2 === 0 ? "text-left" : "text-right"
                  }`}
                >
                  {step?.id?.toString()?.padStart(2, "0")}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Call to Action */}
      <div className="text-center pt-8">
        <div className="bg-gradient-to-r from-primary/10 via-accent/20 to-primary/10 rounded-2xl p-8">
          <h4 className="text-xl font-heading font-semibold text-foreground mb-2">
            Ready to Start Your Journey?
          </h4>
          <p className="text-muted-foreground font-body mb-4">
            Book your free consultation today and let's create your perfect
            bridal look together.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>Flexible scheduling</span>
            </div>
            <div className="h-4 w-px bg-border"></div>
            <div className="flex items-center space-x-1">
              <Icon name="Shield" size={14} />
              <span>100% satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProcessTimeline;
