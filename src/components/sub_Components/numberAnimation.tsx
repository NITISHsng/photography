"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  target: number;      
  duration?: number;    
  delay?: number;      
  step?: number;      
  start?: number;
  threshold?: number;    
  format?: boolean;   
  className?: string;    // optional className for styling
}

const MIN_INTERVAL_MS = 16; // ~60fps frame duration

const CountUp: React.FC<CountUpProps> = ({
  target,
  duration = 1000,
  delay = 400,
  step = 1,
  start = 0,
  threshold = 0.5,
  format = true,
  className,
}) => {
  const [count, setCount] = useState<number>(start);
  const ref = useRef<HTMLDivElement | null>(null);
  const hasPlayed = useRef(false);
  const rafRef = useRef<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Ensure step is valid
  const safeStep = step > 0 ? step : 1;
  if (step <= 0) {
    console.warn("CountUp: step must be > 0. Falling back to step = 1.");
  }

  useEffect(() => {
    // Quick guard
    if (start >= target) {
      setCount(target);
      return;
    }

    const el = ref.current;
    if (!el) return;

    // Define animation function inside useEffect to avoid dependency warnings
    const startAnimation = (currentStep: number) => {
      const range = target - start;
      const totalSteps = Math.max(1, Math.ceil(range / currentStep));
      const idealInterval = duration / totalSteps;

      if (idealInterval >= MIN_INTERVAL_MS) {
        // Use setInterval if interval is feasible
        let current = start;
        setCount(current);
        intervalRef.current = window.setInterval(() => {
          current = Math.min(current + currentStep, target);
          setCount(current);
          if (current >= target && intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }, Math.round(idealInterval));
        return;
      }

      // Otherwise, use requestAnimationFrame
      const startTime = performance.now();
      const animate = (ts: number) => {
        const elapsed = ts - startTime;
        const progress = Math.min(1, elapsed / duration);
        const stepsElapsed = Math.floor(progress * totalSteps);
        const value = Math.min(start + stepsElapsed * currentStep, target);

        setCount((prev) => (prev !== value ? value : prev));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        } else {
          rafRef.current = null;
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    };

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasPlayed.current) {
            hasPlayed.current = true;
            // Delay before starting animation
            timeoutRef.current = window.setTimeout(() => {
              startAnimation(safeStep);
            }, delay);
            observerRef.current?.disconnect();
          }
        }
      },
      { threshold }
    );

    observerRef.current.observe(el);

    return () => {
      observerRef.current?.disconnect();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, delay, safeStep, start, threshold]);

  return (
    <div ref={ref} className={className}>
      {format ? count.toLocaleString() : count}
    </div>
  );
};

export default CountUp;
