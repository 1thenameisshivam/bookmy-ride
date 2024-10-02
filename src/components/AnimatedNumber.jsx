/* eslint-disable react/prop-types */

import { cn } from "../lib/utils";
import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

const AnimatedNumber = ({ value, className, springOptions }) => {
  const spring = useSpring(value, springOptions);
  const display = useTransform(spring, (current) =>
    Math.round(current).toLocaleString()
  );

  useEffect(() => {
    spring.set(value);
  }, [spring, value]);

  return (
    <motion.span className={cn("tabular-nums", className)}>
      {display}
    </motion.span>
  );
};

export default AnimatedNumber;
