import { useEffect, useRef, useState } from "react";

/**
 * Scroll-triggered reveal: opacity 0→1, translateY 30px→0.
 * Optional stagger via transitionDelay (ms) when visible.
 */
export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`lux-reveal ${visible ? "lux-reveal--visible" : ""} ${className}`.trim()}
      style={{ "--lux-reveal-delay": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
