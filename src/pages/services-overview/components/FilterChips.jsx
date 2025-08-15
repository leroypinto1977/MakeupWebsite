import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FilterChips = ({ categories, activeCategory, onCategoryChange }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories?.map((category, index) => {
          const isActive = activeCategory === category?.value;

          return (
            <motion.button
              key={category?.value}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => onCategoryChange(category?.value)}
              onMouseDown={(e) => e.preventDefault()} // Prevents focus outline on mouse click
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
              }`}
            >
              <Icon name={category?.icon} size={16} />
              <span>{category?.label}</span>
              {category?.count && (
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isActive
                      ? "bg-primary-foreground/20 text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {category?.count}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default FilterChips;
