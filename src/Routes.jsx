import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import IndividualBlogPost from "./pages/individual-blog-post";
import BridalPackageDetails from "./pages/bridal-package-details";
import BlogHomepage from "./pages/blog-homepage";
import ServicesOverview from "./pages/services-overview";
import BookingSystem from "./pages/booking-system";
import Homepage from "./pages/homepage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Root shows Homepage */}
          <Route path="/" element={<Homepage />} />
          <Route
            path="/individual-blog-post"
            element={<IndividualBlogPost />}
          />
          <Route
            path="/bridal-package-details"
            element={<BridalPackageDetails />}
          />
          <Route path="/blog-homepage" element={<BlogHomepage />} />
          <Route path="/services-overview" element={<ServicesOverview />} />
          <Route path="/booking-system" element={<BookingSystem />} />
          {/* Removed separate /homepage route; use root instead */}
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
