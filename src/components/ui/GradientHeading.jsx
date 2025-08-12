import React from "react";
import clsx from "clsx";

/**
 * GradientHeading
 * Renders a heading where part is normal and a specified segment is bold + gradient.
 * Props:
 * - level: 1|2|3|4|5|6 (default 2)
 * - normal: string (text before gradient)
 * - highlight: string (gradient text)
 * - after?: string (optional trailing text after gradient)
 * - align?: 'left'|'center'|'right'
 * - className?: extra classes for the wrapper heading
 * - gradientClass?: override gradient class
 */
const sizeClasses = {
  1: "text-4xl lg:text-5xl",
  2: "text-3xl md:text-4xl",
  3: "text-2xl lg:text-3xl",
  4: "text-xl lg:text-2xl",
  5: "text-lg",
  6: "text-base",
};

const defaultGradient = "bg-gradient-to-r from-[#d4a574] to-[#b08d57]";

const GradientHeading = ({
  level = 2,
  normal = "",
  highlight = "",
  after = "",
  align = "left",
  className = "",
  gradientClass = defaultGradient,
}) => {
  const Tag = `h${level}`;
  return (
    <Tag
      className={clsx(
        sizeClasses[level] || sizeClasses[2],
        "font-heading font-semibold tracking-tight text-foreground leading-tight",
        align === "center" && "text-center",
        align === "right" && "text-right",
        className
      )}
    >
      {normal && <span>{normal.trim()} </span>}
      {highlight && (
        <span
          className={clsx(
            gradientClass,
            "bg-clip-text text-transparent font-semibold"
          )}
        >
          {highlight}
        </span>
      )}
      {after && <span> {after}</span>}
    </Tag>
  );
};

export default GradientHeading;
