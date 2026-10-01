import { useState, useEffect } from 'react';

/**
 * Custom hook that evaluates a media query string and subscribes to changes.
 *
 * @param {string} query - CSS media query (e.g. '(max-width: 768px)')
 * @returns {boolean} Whether the media query matches
 */
export const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== 'undefined' && 'matchMedia' in window) {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || !('matchMedia' in window)) {
      return undefined;
    }

    const mediaQueryList = window.matchMedia(query);
    const updateMatch = (event) => {
      setMatches(event.matches);
    };



    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', updateMatch);
      return () => {
        mediaQueryList.removeEventListener('change', updateMatch);
      };
    } else {
      // Fallback for older browsers
      mediaQueryList.addListener(updateMatch);
      return () => {
        mediaQueryList.removeListener(updateMatch);
      };
    }
  }, [query]);

  return matches;
};

/**
 * Convenience hook for mobile screen devices (max-width: 768px).
 * @returns {boolean}
 */
export const useIsMobile = () => useMediaQuery('(max-width: 768px)');

/**
 * Convenience hook for tablet devices (768px - 1024px).
 * @returns {boolean}
 */
export const useIsTablet = () => useMediaQuery('(min-width: 768px) and (max-width: 1024px)');

/**
 * Convenience hook for desktop devices (min-width: 1024px).
 * @returns {boolean}
 */
export const useIsDesktop = () => useMediaQuery('(min-width: 1024px)');

export default useMediaQuery;
