import { create } from 'zustand';
import { persist } from 'zustand/middleware';

/**
 * Zustand authentication store with localStorage persistence.
 */
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      isAuthenticated: false,

      /**
       * Set authentication state upon successful login.
       * @param {Object} userData - User data and auth payload
       */
      login: (userData) => {
        let user = null;
        let token = null;
        let role = null;

        if (userData && typeof userData === 'object') {
          if ('user' in userData && userData.user !== undefined) {
            user = userData.user;
            token = userData.token ?? null;
            role = userData.role ?? user?.role ?? null;
          } else {
            token = userData.token ?? null;
            role = userData.role ?? null;
            user = userData;
          }
        }

        set({
          user,
          token,
          role,
          isAuthenticated: true,
        });
      },

      /**
       * Reset authentication state to initial defaults.
       */
      logout: () => {
        set({
          user: null,
          token: null,
          role: null,
          isAuthenticated: false,
        });
      },

      /**
       * Update user profile information.
       * @param {Object|null} user - Updated user profile
       */
      setUser: (user) => set({ user }),

      /**
       * Update user role.
       * @param {string|null} role - Assigned role
       */
      setRole: (role) => set({ role }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        role: state.role,
      }),
      merge: (persistedState, currentState) => ({
        ...currentState,
        ...persistedState,
        isAuthenticated: Boolean(persistedState?.token),
      }),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);

export default useAuthStore;
