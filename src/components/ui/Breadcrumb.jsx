import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Icon from "../AppIcon";

const Breadcrumb = ({ customItems = null }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const routeMap = {
    "/": { label: "Home", icon: "Home" },
    "/services-overview": { label: "Services", icon: "Sparkles" },
    "/bridal-package-details": { label: "Bridal Packages", icon: "Crown" },
    "/booking-system": { label: "Book Appointment", icon: "Calendar" },
    "/blog-homepage": { label: "Blog", icon: "BookOpen" },
    "/individual-blog-post": { label: "Article", icon: "FileText" },
  };

  const generateBreadcrumbs = () => {
    if (customItems) return customItems;

    const pathSegments = location?.pathname?.split("/")?.filter(Boolean);
    const breadcrumbs = [{ label: "Home", path: "/", icon: "Home" }];

    if (location?.pathname === "/") {
      return breadcrumbs;
    }

    let currentPath = "";
    pathSegments?.forEach((segment) => {
      currentPath += `/${segment}`;
      const route = routeMap?.[currentPath];
      if (route) {
        breadcrumbs?.push({
          label: route?.label,
          path: currentPath,
          icon: route?.icon,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  if (breadcrumbs?.length <= 1) {
    return null;
  }

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <nav
      className="container-padding py-4 bg-background border-b border-border"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2 text-sm">
        {breadcrumbs?.map((crumb, index) => {
          const isLast = index === breadcrumbs?.length - 1;
          const isClickable = crumb?.path && !isLast;

          return (
            <li key={crumb?.path || index} className="flex items-center">
              {index > 0 && (
                <Icon
                  name="ChevronRight"
                  size={16}
                  className="mx-2 text-muted-foreground"
                />
              )}
              {isClickable ? (
                <button
                  onClick={() => handleNavigation(crumb?.path)}
                  className="flex items-center space-x-1.5 text-muted-foreground hover:text-primary transition-smooth focus-ring rounded px-1 py-0.5"
                >
                  {crumb?.icon && <Icon name={crumb?.icon} size={14} />}
                  <span className="font-caption">{crumb?.label}</span>
                </button>
              ) : (
                <div className="flex items-center space-x-1.5">
                  {crumb?.icon && (
                    <Icon
                      name={crumb?.icon}
                      size={14}
                      className={
                        isLast ? "text-primary" : "text-muted-foreground"
                      }
                    />
                  )}
                  <span
                    className={`font-caption ${
                      isLast
                        ? "text-foreground font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {crumb?.label}
                  </span>
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
