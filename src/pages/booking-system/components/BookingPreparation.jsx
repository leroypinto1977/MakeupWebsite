import React from "react";
import Icon from "../../../components/AppIcon";
import GradientHeading from "../../../components/ui/GradientHeading";

const BookingPreparation = () => {
  const preparationSteps = [
    {
      icon: "Sparkles",
      title: "Come with Clean Skin",
      description:
        "Please arrive with a clean, moisturized face. Remove all makeup and avoid heavy skincare treatments 24 hours before.",
    },
    {
      icon: "Shirt",
      title: "Wear Appropriate Clothing",
      description:
        "Bring or wear a button-up shirt or robe that can be easily removed without disturbing your makeup.",
    },
    {
      icon: "Camera",
      title: "Bring Inspiration Photos",
      description:
        "Collect photos of makeup looks you love, your dress, and any specific style preferences you have in mind.",
    },
    {
      icon: "Clock",
      title: "Plan Your Timeline",
      description:
        "Allow 60-90 minutes for your consultation. Bridal trials may take up to 2 hours for the complete look.",
    },
    {
      icon: "Heart",
      title: "Discuss Your Vision",
      description:
        "Be ready to share details about your wedding theme, venue, time of day, and personal style preferences.",
    },
    {
      icon: "AlertCircle",
      title: "Mention Allergies",
      description:
        "Please inform us of any skin sensitivities, allergies, or reactions to cosmetic products beforehand.",
    },
  ];

  const whatToExpect = [
    {
      step: "1",
      title: "Consultation Discussion",
      description:
        "We'll discuss your vision, wedding details, and skin concerns",
      duration: "15 minutes",
    },
    {
      step: "2",
      title: "Skin Analysis",
      description: "Professional assessment of your skin type and makeup needs",
      duration: "10 minutes",
    },
    {
      step: "3",
      title: "Makeup Application",
      description: "Full makeup application with your input and adjustments",
      duration: "45-60 minutes",
    },
    {
      step: "4",
      title: "Final Review",
      description: "Photos, touch-ups, and booking your wedding day service",
      duration: "15 minutes",
    },
  ];

  return (
    <div className="bg-background py-16 lg:py-20">
      <div className="container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Preparation Guidelines */}
          <div className="text-center mb-12">
            <GradientHeading
              level={2}
              align="center"
              normal="How to"
              highlight="Prepare"
              after="for Your Consultation"
              className="mb-4"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Follow these simple steps to ensure you get the most out of your
              bridal makeup consultation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {preparationSteps?.map((step, index) => (
              <div
                key={index}
                className="bg-card rounded-lg border border-border p-6 hover:shadow-md transition-smooth"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Icon name={step?.icon} size={24} className="text-primary" />
                </div>

                <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                  {step?.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step?.description}
                </p>
              </div>
            ))}
          </div>

          {/* What to Expect */}
          <div className="bg-card rounded-lg border border-border p-8 lg:p-12">
            <div className="text-center mb-8">
              <GradientHeading
                level={2}
                align="center"
                normal="What to"
                highlight="Expect"
                after="During Your Visit"
                className="mb-4"
              />
              <p className="text-lg text-muted-foreground">
                Your consultation experience, step by step
              </p>
            </div>

            <div className="space-y-6">
              {whatToExpect?.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary-foreground font-semibold text-sm">
                      {item?.step}
                    </span>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-heading font-semibold text-foreground">
                        {item?.title}
                      </h3>
                      <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                        {item?.duration}
                      </span>
                    </div>

                    <p className="text-muted-foreground">{item?.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-accent rounded-lg border border-border">
              <div className="flex items-start space-x-3">
                <Icon
                  name="Info"
                  size={20}
                  className="text-primary flex-shrink-0 mt-0.5"
                />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Important Note
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Your consultation includes professional photos of your
                    completed look and a detailed product list for touch-ups on
                    your wedding day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPreparation;
