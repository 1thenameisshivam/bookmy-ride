/* eslint-disable react/prop-types */
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { cn } from "../lib/utils";

// This function flattens the children elements into a single array.
const flatten = (children) => {
  const result = [];

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type === React.Fragment) {
        result.push(...flatten(child.props.children));
      } else if (child.props.children) {
        result.push(React.cloneElement(child, {}));
      } else {
        result.push(child);
      }
    } else {
      const parts = String(child).split(/(\s+)/);
      result.push(
        ...parts.map((part, index) => (
          <React.Fragment key={index}>{part}</React.Fragment>
        ))
      );
    }
  });

  return result.flatMap((child) => (Array.isArray(child) ? child : [child]));
};

function OpacityChild({ children, index, progress, total }) {
  const opacity = useTransform(
    progress,
    [index / total, (index + 1) / total],
    [0.5, 1]
  );

  let className = "";
  if (React.isValidElement(children)) {
    className = children.props.className || "";
  }

  return (
    <motion.span
      style={{ opacity }}
      className={cn(className, "h-fit text-white")}
    >
      {children}
    </motion.span>
  );
}

const ScrollReveal = ({ children, className, ...props }) => {
  const flat = flatten(children);
  const count = flat.length;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  return (
    <div
      {...props}
      ref={containerRef}
      className={cn(
        "storybook-fix relative h-96 w-full overflow-y-scroll bg-foreground text-background dark:text-zinc-900",
        className
      )}
    >
      <div className="sticky top-0 flex h-full w-full items-center justify-center">
        <div className="flex h-fit w-full min-w-fit flex-wrap whitespace-break-spaces p-8">
          {flat.map((child, index) => (
            <OpacityChild
              progress={scrollYProgress}
              index={index}
              total={flat.length}
              key={index}
            >
              {child}
            </OpacityChild>
          ))}
        </div>
      </div>
      {Array.from({ length: count }).map((_, index) => (
        // Create a large area to enhance the scrolling effect
        <div key={index} className="h-32" />
      ))}
    </div>
  );
};

export default ScrollReveal;
