import { useEffect, useState, useRef } from "react";

export const useInScreen = <T extends HTMLElement>(
  options?: IntersectionObserverInit,
): [React.RefObject<T | null>, boolean] => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [options]);

  return [ref, isVisible];
};
