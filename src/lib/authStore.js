import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const storedUser = browser ? localStorage.getItem('pulse_user') : null;
let parsedUser = null;
try {
  if (storedUser) parsedUser = JSON.parse(storedUser);
} catch (e) {
  parsedUser = null;
}

function createAuthStore() {
  const { subscribe, set } = writable({
    isLoggedIn: Boolean(parsedUser),
    user: parsedUser
  });

  return {
    subscribe,
    login(email) {
      const user = {
        email: email || 'user@example.com',
        name: email ? email.split('@')[0] : 'User'
      };
      if (browser) {
        localStorage.setItem('pulse_user', JSON.stringify(user));
      }
      set({ isLoggedIn: true, user });
    },
    logout() {
      if (browser) {
        localStorage.removeItem('pulse_user');
      }
      set({ isLoggedIn: false, user: null });
    }
  };
}

export const auth = createAuthStore();
