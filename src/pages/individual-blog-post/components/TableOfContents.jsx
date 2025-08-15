import React, { useState, useEffect } from "react";
import Icon from "../../../components/AppIcon";

const TableOfContents = ({ content }) => {
  const [activeSection, setActiveSection] = useState("");
  const [isSticky, setIsSticky] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const tableOfContents = [
    { id: "introduction", title: "Introduction", level: 1 },
    ...content?.sections?.map((section, index) => ({
      id: `section-${index}`,
      title: section?.heading,
      level: 1,
    })),
    { id: "conclusion", title: "Final Thoughts", level: 1 },
  ];

  useEffect(() => {
    // Enhanced sticky control - stick until end of blog content
    const handleSticky = () => {
      const scrollY = window.scrollY;
      const startSticky = 300;

      // Calculate reading progress
      const articleContent = document.querySelector(".lg\\:col-span-3");
      if (articleContent) {
        const articleStart = articleContent.offsetTop;
        const articleHeight = articleContent.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrolled = Math.max(0, scrollY - articleStart);
        const maxScroll = articleHeight - windowHeight;
        const progress = Math.min(
          100,
          Math.max(0, (scrolled / maxScroll) * 100)
        );
        setReadingProgress(Math.round(progress));
      } else {
        // Fallback to document-based calculation
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(
          100,
          Math.max(0, (scrollY / docHeight) * 100)
        );
        setReadingProgress(Math.round(progress));
      }

      // Aggressive sticky logic - stay sticky almost until the very end
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;

      // Calculate a very late end point to ensure TOC stays sticky
      let endPoint = docHeight - windowHeight - 100; // Only stop 100px before absolute end

      // Only stop for footer if it's very close to the bottom
      const footer = document.querySelector("footer");
      if (footer) {
        const footerDistance = footer.offsetTop - windowHeight;
        if (footerDistance > scrollY) {
          endPoint = Math.max(endPoint, footerDistance - 50);
        }
      }

      setIsSticky(scrollY > startSticky && scrollY < endPoint);
    };

    window.addEventListener("scroll", handleSticky);
    handleSticky();

    // Enhanced IntersectionObserver for more accurate section tracking
    const headerOffset = 120;
    const options = {
      root: null,
      rootMargin: `-${headerOffset}px 0px -30% 0px`, // Reduced bottom margin for better detection
      threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0], // More threshold points
    };

    const ids = tableOfContents.map((t) => t.id);
    const visibleSections = new Map();

    const io = new IntersectionObserver((entries) => {
      // Update visibility map
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSections.set(entry.target.id, {
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
            element: entry.target,
          });
        } else {
          visibleSections.delete(entry.target.id);
        }
      });

      // Determine active section with improved logic
      if (visibleSections.size > 0) {
        // Sort by intersection ratio and position
        const sortedSections = Array.from(visibleSections.entries()).sort(
          (a, b) => {
            const [idA, dataA] = a;
            const [idB, dataB] = b;

            // Prioritize sections with higher intersection ratio
            if (Math.abs(dataA.ratio - dataB.ratio) > 0.1) {
              return dataB.ratio - dataA.ratio;
            }

            // If ratios are similar, prefer the one closer to top
            return Math.abs(dataA.top) - Math.abs(dataB.top);
          }
        );

        setActiveSection(sortedSections[0][0]);
      } else {
        // Fallback: find the last section that has been scrolled past
        const currentScroll = window.scrollY + headerOffset;
        let activeId = ids[0]; // Default to first section

        for (let i = 0; i < ids.length; i++) {
          const element = document.getElementById(ids[i]);
          if (element && element.offsetTop <= currentScroll) {
            activeId = ids[i];
          } else {
            break; // Stop at first section that hasn't been reached
          }
        }

        setActiveSection(activeId);
      }
    }, options);

    // Observe all sections with improved timing
    const observeSections = () => {
      ids.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          io.observe(element);
        }
      });
    };

    // Delay observation to ensure DOM is ready
    const observeTimeout = setTimeout(observeSections, 100);

    // Also observe immediately in case elements are already ready
    observeSections();
    return () => {
      window.removeEventListener("scroll", handleSticky);
      clearTimeout(observeTimeout);
      io.disconnect();
    };
  }, [tableOfContents]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 120; // Account for fixed header
      const offsetTop = element.offsetTop - headerHeight;

      // Smooth scroll with better easing
      window.scrollTo({
        top: Math.max(0, offsetTop),
        behavior: "smooth",
      });

      // Update active section immediately for better UX
      setActiveSection(sectionId);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isSticky ? "sticky top-28 z-30" : ""
      }`}
      style={{
        position: isSticky ? "sticky" : "relative",
        top: isSticky ? "7rem" : "auto",
        zIndex: isSticky ? 30 : "auto",
      }}
    >
      <div className="bg-card rounded-lg p-6 card-elevation">
        <div className="flex items-center mb-4">
          <Icon name="List" size={20} className="text-primary mr-2" />
          <h3 className="font-heading font-semibold text-foreground">
            Table of Contents
          </h3>
        </div>

        <nav className="space-y-1">
          {tableOfContents?.map((item) => (
            <button
              key={item?.id}
              onClick={() => scrollToSection(item?.id)}
              className={`w-full text-left px-3 py-2.5 rounded-md transition-all duration-200 focus-ring group ${
                activeSection === item?.id
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent/70"
              }`}
            >
              <span
                className={`block text-sm transition-all duration-200 ${
                  item?.level === 2 ? "ml-4" : ""
                } ${
                  activeSection === item?.id
                    ? "transform translate-x-1"
                    : "group-hover:transform group-hover:translate-x-0.5"
                }`}
              >
                {item?.title}
              </span>
            </button>
          ))}
        </nav>

        {/* Reading Progress */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
            <span>Reading Progress</span>
            <span>{readingProgress}%</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${readingProgress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableOfContents;
