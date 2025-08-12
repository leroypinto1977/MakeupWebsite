import React, { useEffect, useRef } from "react";
import GradientHeading from "../../../components/ui/GradientHeading";
import { gsap } from "gsap";
import Image from "../../../components/AppImage";
import Icon from "../../../components/AppIcon";

const TestimonialSection = () => {
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "June 2024",
      content: `Bella Bridal Studio made my wedding day absolutely perfect! The trial session was so detailed, and on my wedding day, I felt like a princess. The makeup lasted all day and looked stunning in photos. I can't recommend them enough!`,
      weddingImage:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      package: "Premium Bridal Package",
    },
    {
      id: 2,
      name: "Emily Rodriguez",
      role: "Bride",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "August 2024",
      content: `The team at Bella Bridal Studio is incredibly talented and professional. They listened to my vision and created exactly what I wanted. The natural glam look was perfect for my outdoor wedding. Thank you for making me feel so beautiful!`,
      weddingImage:
        "https://images.unsplash.com/photo-1583900985737-6d0495555783?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      package: "Classic Bridal Package",
    },
    {
      id: 3,
      name: "Jessica Chen",
      role: "Bride",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      rating: 5,
      date: "September 2024",
      content: `From the consultation to the wedding day, everything was flawless. The makeup artist was so calm and professional, which helped me stay relaxed. The results exceeded my expectations - I looked like the best version of myself!`,
      weddingImage:
        "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
      package: "Luxury Bridal Package",
    },
  ];

  useEffect(() => {
    const section = sectionRef?.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    )?.matches;

    if (!prefersReducedMotion) {
      const cards = section?.querySelectorAll(".testimonial-card");
      gsap?.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  const renderStars = (rating) => {
    return [...Array(5)]?.map((_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={
          index < rating
            ? "text-warning fill-current"
            : "text-muted-foreground/30"
        }
      />
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="py-16 bg-gradient-to-br from-background to-accent/20"
    >
      <div className="container-padding">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <GradientHeading
            align="center"
            normal="What Our"
            highlight="Brides"
            after="Say"
          />
          <p className=" font-body max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our beautiful brides
            have to say about their experience with us.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial?.id}
              className="testimonial-card bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-smooth"
            >
              {/* Header */}
              <div className="flex items-start space-x-4 mb-4">
                <div className="flex-shrink-0">
                  <Image
                    src={testimonial?.image}
                    alt={testimonial?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading font-semibold text-foreground">
                    {testimonial?.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial?.role} • {testimonial?.date}
                  </p>
                  <div className="flex items-center space-x-1 mt-1">
                    {renderStars(testimonial?.rating)}
                  </div>
                </div>
              </div>

              {/* Package Badge */}
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium">
                  {testimonial?.package}
                </span>
              </div>

              {/* Content */}
              <blockquote className="text-foreground font-body leading-relaxed mb-4">
                "{testimonial?.content}"
              </blockquote>

              {/* Wedding Image */}
              <div className="rounded-lg overflow-hidden">
                <Image
                  src={testimonial?.weddingImage}
                  alt={`${testimonial?.name}'s wedding makeup`}
                  className="w-full h-48 object-cover hover:scale-105 transition-smooth"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              500+
            </div>
            <div className="text-sm text-muted-foreground font-body">
              Happy Brides
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              5.0
            </div>
            <div className="text-sm text-muted-foreground font-body">
              Average Rating
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              3+
            </div>
            <div className="text-sm text-muted-foreground font-body">
              Years Experience
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl lg:text-4xl font-heading font-bold text-primary mb-2">
              100%
            </div>
            <div className="text-sm text-muted-foreground font-body">
              Satisfaction Rate
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-primary/5 rounded-2xl p-8 max-w-2xl mx-auto">
            <GradientHeading
              level={3}
              normal="Join Our"
              highlight="Happy"
              after="Brides"
              className="mb-2"
            />
            <p className="text-muted-foreground font-body mb-4">
              Ready to look absolutely stunning on your special day? Book your
              consultation today.
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Award" size={14} />
                <span>Award-winning service</span>
              </div>
              <div className="h-4 w-px bg-border"></div>
              <div className="flex items-center space-x-1">
                <Icon name="Heart" size={14} />
                <span>Personalized experience</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
