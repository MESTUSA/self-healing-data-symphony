
import { useEffect, useState } from 'react';

// Hook to create staggered animation for lists of items
export const useStaggeredAnimation = (itemCount: number, baseDelay = 75) => {
  const delays = Array.from({ length: itemCount }, (_, i) => i * baseDelay);
  return delays;
};

// Hook to create animated counter
export const useCountAnimation = (
  targetValue: number,
  duration = 1500,
  delay = 0
) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;
    const startValue = 0;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime - delay;
      
      if (elapsed < 0) {
        animationFrame = requestAnimationFrame(updateCount);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentCount = Math.floor(easedProgress * (targetValue - startValue) + startValue);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      } else {
        setCount(targetValue);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [targetValue, duration, delay]);

  return count;
};

// Easing function for smooth animation
const easeOutQuart = (x: number): number => {
  return 1 - Math.pow(1 - x, 4);
};

// Function to animate elements on scroll
export const animateOnScroll = (element: HTMLElement, animation: string, threshold = 0.2) => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(animation);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold }
  );

  observer.observe(element);
  
  return () => observer.unobserve(element);
};

// Hook to add animation classes when element enters viewport
export const useAnimateOnScroll = (
  ref: React.RefObject<HTMLElement>,
  animation: string,
  threshold = 0.2
) => {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const cleanup = animateOnScroll(element, animation, threshold);
    return cleanup;
  }, [ref, animation, threshold]);
};

// Type-safe animation names
export type AnimationName =
  | 'fade-in'
  | 'slide-up'
  | 'slide-down'
  | 'scale-in'
  | 'blur-in'
  | 'pulse-slow'
  | 'float';

// Function to add/remove animation classes with timing
export const animateElement = (
  element: HTMLElement,
  animation: AnimationName,
  duration = 300,
  remove = true
) => {
  element.classList.add(`animate-${animation}`);
  
  if (remove) {
    setTimeout(() => {
      element.classList.remove(`animate-${animation}`);
    }, duration);
  }

  return () => {
    element.classList.remove(`animate-${animation}`);
  };
};

// Utility to create staggered animations for children elements
export const createStaggerAnimation = (
  parentElement: HTMLElement,
  childSelector: string,
  animation: AnimationName,
  baseDelay = 50,
  duration = 300
) => {
  const children = parentElement.querySelectorAll(childSelector);
  
  children.forEach((child, index) => {
    setTimeout(() => {
      animateElement(child as HTMLElement, animation, duration);
    }, index * baseDelay);
  });
};
