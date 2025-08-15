import React from "react";
import Icon from "../../../components/AppIcon";
import GradientHeading from "../../../components/ui/GradientHeading";

const BookingPolicies = () => {
  const policies = [
    {
      icon: "Calendar",
      title: "Booking & Scheduling",
      items: [
        "Appointments must be booked at least 48 hours in advance",
        "Wedding day bookings require 2-4 weeks notice minimum",
        "Peak season (May-October) bookings should be made 2-3 months ahead",
        "Confirmation email will be sent within 24 hours of booking",
      ],
    },
    {
      icon: "CreditCard",
      title: "Payment & Deposits",
      items: [
        "Consultations require full payment at time of booking",
        "Wedding services require 50% deposit to secure your date",
        "Remaining balance due on day of service",
        "We accept cash, credit cards, and digital payments",
      ],
    },
    {
      icon: "RotateCcw",
      title: "Cancellation Policy",
      items: [
        "Consultations: 24-hour cancellation notice required",
        "Wedding services: 72-hour cancellation notice required",
        "Cancellations within notice period forfeit deposit",
        "Rescheduling is allowed once without penalty",
      ],
    },
    {
      icon: "Clock",
      title: "Timing & Punctuality",
      items: [
        "Please arrive 10 minutes early for your appointment",
        "Late arrivals may result in shortened service time",
        "Services running over time may incur additional charges",
        "Wedding day timeline must be confirmed 1 week prior",
      ],
    },
    {
      icon: "Shield",
      title: "Health & Safety",
      items: [
        "All tools and brushes are sanitized between clients",
        "Please inform us of any allergies or skin sensitivities",
        "If you feel unwell, please reschedule your appointment",
        "We maintain the highest hygiene standards",
      ],
    },
    {
      icon: "Users",
      title: "Group Bookings",
      items: [
        "Bridal party services available with advance booking",
        "Group discounts apply for 4+ people",
        "Travel fees may apply for on-location services",
        "Timeline coordination required for wedding parties",
      ],
    },
  ];

  return (
    <div className="bg-muted/20 py-16 lg:py-20">
      <div className="container-padding">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <GradientHeading
              level={2}
              align="center"
              normal="Booking"
              highlight="Policies"
              after="& Guidelines"
              className="mb-4"
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Please review our policies to ensure a smooth booking experience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {policies?.map((policy, index) => (
              <div
                key={index}
                className="bg-background rounded-lg border border-border p-6 hover:shadow-md transition-smooth"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon
                      name={policy?.icon}
                      size={20}
                      className="text-primary"
                    />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground">
                    {policy?.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {policy?.items?.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <Icon
                        name="Check"
                        size={16}
                        className="text-success flex-shrink-0 mt-0.5"
                      />
                      <span className="text-sm text-muted-foreground leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Information */}
          <div className="mt-12 bg-background rounded-lg border border-border p-8">
            <div className="text-center">
              <GradientHeading
                level={3}
                align="center"
                normal="Questions"
                highlight="About"
                after="Our Policies?"
                className="mb-4"
              />
              <p className="text-muted-foreground mb-6">
                We're here to help! Contact us if you need clarification on any
                of our booking policies.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="tel:+1-555-123-4567"
                  className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary/80 transition-smooth"
                >
                  <Icon name="Phone" size={18} />
                  <span className="font-medium">(555) 123-4567</span>
                </a>

                <div className="hidden sm:block w-px h-6 bg-border"></div>

                <a
                  href="mailto:hello@vyara.com"
                  className="flex items-center space-x-2 px-4 py-2 text-primary hover:text-primary/80 transition-smooth"
                >
                  <Icon name="Mail" size={18} />
                  <span className="font-medium">hello@vyara.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPolicies;
