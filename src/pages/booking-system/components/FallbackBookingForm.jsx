import React, { useState } from "react";
import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

const FallbackBookingForm = ({ isVisible, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    preferredDate: "",
    preferredTime: "",
    eventDate: "",
    location: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const serviceOptions = [
    { value: "", label: "Select a service" },
    { value: "bridal-trial", label: "Bridal Makeup Trial - $150" },
    { value: "bridal-wedding", label: "Wedding Day Makeup - $300" },
    { value: "bridal-package", label: "Complete Bridal Package - $400" },
    { value: "party-makeup", label: "Party/Event Makeup - $120" },
    { value: "consultation", label: "Consultation Only - $50" },
  ];

  const timeSlots = [
    { value: "", label: "Select preferred time" },
    { value: "09:00", label: "9:00 AM" },
    { value: "10:00", label: "10:00 AM" },
    { value: "11:00", label: "11:00 AM" },
    { value: "12:00", label: "12:00 PM" },
    { value: "13:00", label: "1:00 PM" },
    { value: "14:00", label: "2:00 PM" },
    { value: "15:00", label: "3:00 PM" },
    { value: "16:00", label: "4:00 PM" },
    { value: "17:00", label: "5:00 PM" },
  ];

  const locationOptions = [
    { value: "", label: "Select location preference" },
    { value: "studio", label: "Vyara" },
    { value: "client-home", label: "Client's Home (+$50 travel fee)" },
    { value: "venue", label: "Wedding Venue (+$75 travel fee)" },
    { value: "hotel", label: "Hotel (+$50 travel fee)" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.firstName?.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData?.lastName?.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData?.email?.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\(\d{3}\) \d{3}-\d{4}$/?.test(formData?.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData?.service) {
      newErrors.service = "Please select a service";
    }

    if (!formData?.preferredDate) {
      newErrors.preferredDate = "Please select your preferred date";
    }

    if (!formData?.preferredTime) {
      newErrors.preferredTime = "Please select your preferred time";
    }

    if (!formData?.location) {
      newErrors.location = "Please select a location preference";
    }

    // Validate event date for bridal services
    if (formData?.service?.includes("bridal") && !formData?.eventDate) {
      newErrors.eventDate = "Wedding date is required for bridal services";
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsSubmitted(true);
    } catch (error) {
      console.error("Booking submission error:", error);
      setErrors({ submit: "Failed to submit booking. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePhoneChange = (e) => {
    let value = e?.target?.value?.replace(/\D/g, "");
    if (value?.length >= 6) {
      value = `(${value?.slice(0, 3)}) ${value?.slice(3, 6)}-${value?.slice(
        6,
        10
      )}`;
    } else if (value?.length >= 3) {
      value = `(${value?.slice(0, 3)}) ${value?.slice(3)}`;
    }
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  if (!isVisible) return null;

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-200 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-lg max-w-md w-full p-8 text-center animate-scale-in">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>

          <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
            Booking Request Submitted!
          </h3>

          <p className="text-muted-foreground mb-6">
            Thank you for your booking request. We'll contact you within 24
            hours to confirm your appointment details.
          </p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Service:</span>
              <span className="font-medium text-foreground">
                {
                  serviceOptions?.find((s) => s?.value === formData?.service)
                    ?.label
                }
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Preferred Date:</span>
              <span className="font-medium text-foreground">
                {new Date(formData.preferredDate)?.toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Preferred Time:</span>
              <span className="font-medium text-foreground">
                {
                  timeSlots?.find((t) => t?.value === formData?.preferredTime)
                    ?.label
                }
              </span>
            </div>
          </div>

          <Button
            variant="default"
            onClick={onClose}
            iconName="Home"
            iconPosition="left"
            fullWidth
          >
            Return to Homepage
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-foreground/20 backdrop-blur-sm z-200 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-background rounded-lg shadow-lg max-w-2xl w-full my-8 animate-scale-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h3 className="text-xl font-heading font-semibold text-foreground">
              Book Your Appointment
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Fill out the form below and we'll confirm your booking
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-smooth focus-ring"
            aria-label="Close booking form"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h4 className="text-lg font-heading font-medium text-foreground mb-4">
              Personal Information
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                required
                placeholder="Enter your first name"
              />

              <Input
                label="Last Name"
                type="text"
                name="lastName"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                required
                placeholder="Enter your last name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <Input
                label="Email Address"
                type="email"
                name="email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                required
                placeholder="your.email@example.com"
              />

              <Input
                label="Phone Number"
                type="tel"
                name="phone"
                value={formData?.phone}
                onChange={handlePhoneChange}
                error={errors?.phone}
                required
                placeholder="(555) 123-4567"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div>
            <h4 className="text-lg font-heading font-medium text-foreground mb-4">
              Service Details
            </h4>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Service Type *
                </label>
                <select
                  name="service"
                  value={formData?.service}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                  required
                >
                  {serviceOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
                {errors?.service && (
                  <p className="text-sm text-error mt-1">{errors?.service}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location Preference *
                </label>
                <select
                  name="location"
                  value={formData?.location}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                  required
                >
                  {locationOptions?.map((option) => (
                    <option key={option?.value} value={option?.value}>
                      {option?.label}
                    </option>
                  ))}
                </select>
                {errors?.location && (
                  <p className="text-sm text-error mt-1">{errors?.location}</p>
                )}
              </div>
            </div>
          </div>

          {/* Scheduling */}
          <div>
            <h4 className="text-lg font-heading font-medium text-foreground mb-4">
              Preferred Schedule
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Preferred Date"
                type="date"
                name="preferredDate"
                value={formData?.preferredDate}
                onChange={handleInputChange}
                error={errors?.preferredDate}
                required
                min={new Date()?.toISOString()?.split("T")?.[0]}
              />

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  value={formData?.preferredTime}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                  required
                >
                  {timeSlots?.map((slot) => (
                    <option key={slot?.value} value={slot?.value}>
                      {slot?.label}
                    </option>
                  ))}
                </select>
                {errors?.preferredTime && (
                  <p className="text-sm text-error mt-1">
                    {errors?.preferredTime}
                  </p>
                )}
              </div>
            </div>

            {formData?.service?.includes("bridal") && (
              <div className="mt-4">
                <Input
                  label="Wedding Date"
                  type="date"
                  name="eventDate"
                  value={formData?.eventDate}
                  onChange={handleInputChange}
                  error={errors?.eventDate}
                  required
                  description="When is your wedding day?"
                  min={new Date()?.toISOString()?.split("T")?.[0]}
                />
              </div>
            )}
          </div>

          {/* Special Requests */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Special Requests or Notes
            </label>
            <textarea
              name="specialRequests"
              value={formData?.specialRequests}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
              placeholder="Any specific requirements, skin concerns, or questions you'd like to discuss..."
            />
          </div>

          {errors?.submit && (
            <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
              <p className="text-sm text-error">{errors?.submit}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              fullWidth
              className="sm:w-auto"
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="default"
              loading={isSubmitting}
              iconName="Calendar"
              iconPosition="left"
              fullWidth
              className="sm:flex-1"
            >
              {isSubmitting ? "Submitting..." : "Submit Booking Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FallbackBookingForm;
