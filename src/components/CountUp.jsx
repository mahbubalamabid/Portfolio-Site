import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * React Bits-Inspired CountUp Component (Odometer / Roll Mode)
 *
 * Smoothly rolls digits from 0 to `to` using spring-like easing,
 * then reveals the `+` suffix upon landing.
 *
 * - Uses hardware-accelerated transforms (translateY, opacity, scale).
 * - Triggers once when scrolled into the viewport via Intersection Observer.
 * - Respects `prefers-reduced-motion` by immediately showing the final value.
 * - Prevents layout shifts with fixed line-height containers.
 */
export default function CountUp({
  to,
  from = 0,
  suffix = "+",
  trailingText = "",
  duration = 2.0,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();

  // If the user prefers reduced motion, render final static state immediately
  if (shouldReduceMotion) {
    return (
      <span className={`inline-flex items-baseline ${className}`}>
        <span>{to}</span>
        {suffix && <span>{suffix}</span>}
        {trailingText && <span className="ml-1.5">{trailingText}</span>}
      </span>
    );
  }

  // Construct digit sequence from `from` (0) to `to`
  const digits = [];
  for (let i = from; i <= to; i++) {
    digits.push(i);
  }

  return (
    <span ref={ref} className={`inline-flex items-baseline ${className}`}>
      {/* Number-rolling column container (h-[1.15em] prevents vertical layout shift) */}
      <span className="relative inline-block h-[1.15em] overflow-hidden align-baseline">
        <motion.span
          className="flex flex-col select-none"
          initial={{ y: "0%" }}
          animate={
            isInView
              ? { y: `-${(to / digits.length) * 100}%` }
              : { y: "0%" }
          }
          transition={{
            duration: duration,
            ease: [0.16, 1, 0.3, 1], // Spring-like ease-out curve matching React Bits spring
          }}
        >
          {digits.map((digit) => (
            <span
              key={digit}
              className="h-[1.15em] flex items-center justify-center leading-none"
            >
              {digit}
            </span>
          ))}
        </motion.span>
      </span>

      {/* Suffix '+' — reveals with a subtle spring as the roll reaches the target */}
      {suffix && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5, x: -3 }}
          animate={
            isInView
              ? {
                  opacity: 1,
                  scale: 1,
                  x: 0,
                  transition: {
                    delay: duration * 0.72,
                    duration: 0.35,
                    ease: [0.34, 1.56, 0.64, 1], // Spring pop
                  },
                }
              : { opacity: 0, scale: 0.5, x: -3 }
          }
          className="inline-block origin-left select-none"
        >
          {suffix}
        </motion.span>
      )}

      {/* Optional trailing text (e.g., 'Projects') */}
      {trailingText && (
        <span className="ml-1.5 inline-block">{trailingText}</span>
      )}
    </span>
  );
}
