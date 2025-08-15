import React from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../../components/AppIcon";
// Removed Button import after design update (CTA removed per latest request)

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    services: [
      { label: "Bridal Makeup", path: "/bridal-package-details" },
      { label: "Party Makeup", path: "/services-overview" },
      { label: "Trial Sessions", path: "/services-overview" },
      { label: "All Services", path: "/services-overview" },
    ],
    company: [
      { label: "About Us", path: "/about" },
      { label: "Our Story", path: "/about" },
      { label: "Blog", path: "/blog-homepage" },
      { label: "Contact", path: "/contact" },
    ],
    support: [
      { label: "Book Appointment", path: "/booking-system" },
      { label: "FAQ", path: "/faq" },
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms of Service", path: "/terms" },
    ],
  };

  const socialLinks = [
    {
      name: "Instagram",
      icon: "Instagram",
      url: "https://instagram.com/vyara",
    },
    {
      name: "Facebook",
      icon: "Facebook",
      url: "https://facebook.com/vyara",
    },
    {
      name: "Pinterest",
      icon: "Heart",
      url: "https://pinterest.com/vyara",
    },
    { name: "TikTok", icon: "Video", url: "https://tiktok.com/@vyara" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleBookingClick = () => {
    navigate("/booking-system");
  };

  return (
    <footer className="bg-[#1f2732] text-white relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="container-padding pt-28 pb-12 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Brand / About */}
          <div className="lg:col-span-2 max-w-md">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ring-1 ring-white/10">
                <Icon name="Sparkle" size={24} className="text-[#d4a574]" />
              </div>
              <h3 className="text-2xl font-heading font-semibold leading-snug">
                <span className="bg-gradient-to-r from-[#d4a574] to-[#b08d57] bg-clip-text text-transparent">
                  Vyara
                </span>
              </h3>
            </div>
            <p className="text-sm leading-loose text-white/70 font-body mb-8">
              Bridal & occasion makeup artistry based in Namakkal, Tamil Nadu.
              Enhancing natural beauty through refined technique, premium
              products, and calm, personalized experience.
            </p>
            <ul className="space-y-3 text-sm font-caption text-white/70 mb-8">
              <li className="flex items-center gap-3">
                <Icon name="Phone" size={16} className="text-[#d4a574]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="Mail" size={16} className="text-[#d4a574]" />
                <span>hello@vyara.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Icon
                  name="MapPin"
                  size={16}
                  className="text-[#d4a574] mt-0.5"
                />
                <span>
                  2nd Floor, (Near Bus Stand)
                  <br />
                  Namakkal, Tamil Nadu 637001, India
                </span>
              </li>
            </ul>
            {/* Booking CTA removed as per updated footer specification */}
          </div>

          {/* Link Columns */}
          <div>
            <h4 className="text-base tracking-wide font-heading font-semibold mb-5 bg-gradient-to-r from-[#d4a574] to-[#b08d57] bg-clip-text text-transparent">
              Services
            </h4>
            <ul className="space-y-2">
              {footerLinks?.services?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-white/70 hover:text-white transition-colors font-body text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base tracking-wide font-heading font-semibold mb-5 bg-gradient-to-r from-[#d4a574] to-[#b08d57] bg-clip-text text-transparent">
              Company
            </h4>
            <ul className="space-y-2">
              {footerLinks?.company?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-white/70 hover:text-white transition-colors font-body text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base tracking-wide font-heading font-semibold mb-5 bg-gradient-to-r from-[#d4a574] to-[#b08d57] bg-clip-text text-transparent">
              Support
            </h4>
            <ul className="space-y-2">
              {footerLinks?.support?.map((link) => (
                <li key={link?.label}>
                  <button
                    onClick={() => handleNavigation(link?.path)}
                    className="text-white/70 hover:text-white transition-colors font-body text-sm"
                  >
                    {link?.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Watermark / Brand Section (standalone visual band) */}
      <div className="relative mt-0 h-[22vh] min-h-[200px] flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <span className="font-heading font-extrabold tracking-tight text-white/5 text-center leading-[0.8] text-[20vw] md:text-[17vw] lg:text-[14vw]">
            VYARA
          </span>
        </div>
      </div>

      {/* Bottom Bar now placed below watermark */}
      <div>
        <div className="container-padding py-10 flex flex-col lg:flex-row items-center justify-between gap-8">
          <p className="text-[13px] font-caption text-white/60 text-center lg:text-left max-w-xl">
            © {currentYear} Vyara — Professional bridal & occasion makeup
            services in Namakkal, India.
          </p>
          <div className="flex items-center gap-5">
            {socialLinks?.map((social) => (
              <a
                key={social?.name}
                href={social?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center transition-colors focus-ring"
                aria-label={`Follow us on ${social?.name}`}
              >
                <Icon name={social?.icon} size={16} />
              </a>
            ))}
          </div>
          <div className="flex items-center gap-6 text-[13px] font-caption text-white/60">
            <button
              onClick={() => handleNavigation("/privacy")}
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button
              onClick={() => handleNavigation("/terms")}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
