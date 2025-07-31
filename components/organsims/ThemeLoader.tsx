'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    theme_loaded?: boolean;
  }
}

export function ThemeLoader() {
  useEffect(() => {
    const mode = Math.random() < 0.5 ? 'light' : 'dark';

    fetch(`/api/theme?mode=${mode}`)
      .then(res => res.json())
      .then(theme => {
        const root = document.documentElement;

        if (mode === 'dark') {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }

        Object.entries(theme).forEach(([key, value]) => {
          root.style.setProperty(`--${key}`, value as string);
        });

        window.theme_loaded = true;
      })
      .catch(err => {
        console.error('ThemeLoader: Failed to load theme from API', err);
      });
  }, []);

  return null;
}
