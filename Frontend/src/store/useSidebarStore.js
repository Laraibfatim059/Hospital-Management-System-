import { create } from 'zustand';

/**
 * Zustand sidebar store managing responsive open/closed and desktop collapsed states.
 */
export const useSidebarStore = create((set) => ({
  isOpen: true,
  isCollapsed: false,

  /**
   * Toggles the open/closed state of the sidebar.
   */
  toggle: () => set((state) => ({ isOpen: !state.isOpen })),

  /**
   * Opens the sidebar.
   */
  open: () => set({ isOpen: true }),

  /**
   * Closes the sidebar.
   */
  close: () => set({ isOpen: false }),

  /**
   * Toggles the collapsed state of the sidebar.
   */
  toggleCollapse: () => set((state) => ({ isCollapsed: !state.isCollapsed })),

  /**
   * Sets the collapsed state of the sidebar.
   * @param {boolean} value
   */
  setCollapsed: (value) => set({ isCollapsed: Boolean(value) }),
}));

export default useSidebarStore;
