import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";
import Button from "./Button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: "Home", path: "/", icon: "Home" },
    { label: "Services", path: "/services-overview", icon: "Sparkles" },
    { label: "Blog", path: "/blog-homepage", icon: "BookOpen" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleBookingClick = () => {
    navigate("/booking-system");
    setIsMobileMenuOpen(false);
  };

  const isActivePath = (path) => {
    return location?.pathname === path;
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-100 transition-smooth ${
          isScrolled
            ? "bg-background/95 backdrop-blur-nav shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="container-padding">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <div
              className="flex items-center cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-primary rounded-full flex items-center justify-center">
                  <Icon
                    name="Crown"
                    size={20}
                    color="var(--color-primary-foreground)"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading text-xl lg:text-2xl font-bold text-gradient">
                    Vyara
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-sm transition-smooth focus-ring ${
                    isActivePath(item?.path)
                      ? "text-primary font-medium"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span className="font-body">{item?.label}</span>
                </button>
              ))}
            </nav>

            {/* Desktop Book Now Button */}
            <div className="hidden lg:block">
              <Button
                variant="default"
                onClick={handleBookingClick}
                iconName="Calendar"
                iconPosition="left"
                className="btn-hover"
              >
                Book Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-sm text-foreground hover:text-primary transition-smooth focus-ring"
              aria-label="Toggle mobile menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-200 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-background shadow-lg">
            <div className="flex flex-col h-full">
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <Icon
                      name="Crown"
                      size={16}
                      color="var(--color-primary-foreground)"
                    />
                  </div>
                  <div>
                    <h2 className="font-heading font-semibold text-gradient">
                      Vyara
                    </h2>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-sm text-foreground hover:text-primary transition-smooth focus-ring"
                  aria-label="Close menu"
                >
                  <Icon name="X" size={20} />
                </button>
              </div>

              {/* Mobile Navigation Items */}
              <nav className="flex-1 px-6 py-8">
                <div className="space-y-2">
                  {navigationItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className={`w-full flex items-center space-x-4 px-4 py-4 rounded-sm transition-smooth focus-ring text-left ${
                        isActivePath(item?.path)
                          ? "bg-accent text-primary font-medium"
                          : "text-foreground hover:bg-accent hover:text-primary"
                      }`}
                    >
                      <Icon name={item?.icon} size={20} />
                      <span className="font-body text-base">{item?.label}</span>
                    </button>
                  ))}
                </div>

                {/* Mobile Book Now Button */}
                <div className="mt-8 pt-8 border-t border-border">
                  <Button
                    variant="default"
                    onClick={handleBookingClick}
                    iconName="Calendar"
                    iconPosition="left"
                    fullWidth
                    className="btn-hover"
                  >
                    Book Appointment
                  </Button>
                </div>
              </nav>

              {/* Mobile Menu Footer */}
              <div className="p-6 border-t border-border">
                <p className="text-sm font-caption text-muted-foreground text-center">
                  Transform your special day with professional bridal makeup
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Mobile Floating Book Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-100">
        <Button
          variant="default"
          onClick={handleBookingClick}
          iconName="Calendar"
          size="lg"
          className="btn-hover shadow-lg rounded-full w-14 h-14 p-0"
        />
      </div>
    </>
  );
};

export default Header;
