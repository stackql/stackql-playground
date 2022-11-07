import { useState, useEffect } from "react";

const breakpoints = {
  mobile: 500,
  tablet: 800,
  regular: 1500,
};

// Hook
export function useWindowSize() {
  const defaultWindowSize = {
    isRegular: false,
    isMobile: false,
    isTablet: false,
  };
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState<{
    isRegular: boolean;
    isMobile: boolean;
    isTablet: boolean;
  }>(defaultWindowSize);

  function handleResize() {
    // Set window width/height to state
    let size = { ...defaultWindowSize };
    const width = window.innerWidth;
    if (width <= breakpoints.mobile) {
      size.isMobile = true;
    }
    if (breakpoints.mobile < width && width <= breakpoints.tablet) {
      size.isTablet = true;
    }
    if (breakpoints.tablet < width && width <= breakpoints.regular) {
      size.isRegular = true;
    }
    setWindowSize({ ...size });
  }

  useEffect(() => {
    // Handler to call on window resize

    // Add event listener
    window.addEventListener("resize", handleResize);

    handleResize();

    // Remove event listener on cleanup
    // return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}
