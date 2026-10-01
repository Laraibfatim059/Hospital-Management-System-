import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Helper function to synchronize the 'dark' CSS class on document.documentElement
 * @param {boolean} isDark
 */
const updateDocumentTheme = (isDark) => {
  if (typeof document !== 'undefined') {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
};

// Apply initial dark theme early if saved in localStorage to prevent theme flashing
if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  try {
    const saved = localStorage.getItem('theme-storage');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.state?.isDarkMode) {
        document.documentElement.classList.add('dark');
      }
    }
  } catch {
    // Ignore storage read/parse error
  }
}

/**
 * Zustand theme store with localStorage persistence.
 */
export const useThemeStore = create(
  persist(
    (set) => ({
      isDarkMode: false,

      /**
       * Toggles the current dark mode setting and updates document root class.
       */
      toggleTheme: () => {
        set((state) => {
          const next = !state.isDarkMode;
          updateDocumentTheme(next);
          return { isDarkMode: next };
        });
      },

      /**
       * Sets dark mode to an explicit value and updates document root class.
       * @param {boolean} isDark
       */
      setTheme: (isDark) => {
        const mode = Boolean(isDark);
        updateDocumentTheme(mode);
        set({ isDarkMode: mode });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        if (state && typeof state.isDarkMode === 'boolean') {
          updateDocumentTheme(state.isDarkMode);
        }
      },
    }
  )
);

export default useThemeStore;
