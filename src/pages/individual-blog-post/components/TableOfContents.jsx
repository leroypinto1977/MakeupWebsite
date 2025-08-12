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

    // IntersectionObserver for active section
    const headerOffset = 120;
    const options = {
      root: null,
      rootMargin: `-${headerOffset}px 0px -55% 0px`,
      threshold: [0, 0.25, 0.5, 0.75],
    };
    const ids = tableOfContents.map((t) => t.id);
    const io = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort(
          (a, b) =>
            a.target.getBoundingClientRect().top -
            b.target.getBoundingClientRect().top
        );
      if (visible.length) {
        setActiveSection(visible[0].target.id);
      } else {
        // fallback: last section above scroll
        const y = window.scrollY + headerOffset + 10;
        let last = ids[0];
        ids.forEach((id) => {
          const el = document.getElementById(id);
          if (el && el.offsetTop <= y) last = id;
        });
        setActiveSection(last);
      }
    }, options);
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", handleSticky);
      io.disconnect();
    };
  }, [tableOfContents]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element?.offsetTop - 100;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
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

        <nav className="space-y-2">
          {tableOfContents?.map((item) => (
            <button
              key={item?.id}
              onClick={() => scrollToSection(item?.id)}
              className={`w-full text-left px-3 py-2 rounded-sm transition-smooth focus-ring ${
                activeSection === item?.id
                  ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              }`}
            >
              <span
                className={`block text-sm ${item?.level === 2 ? "ml-4" : ""}`}
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
