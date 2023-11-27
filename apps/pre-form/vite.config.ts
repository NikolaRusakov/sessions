import { defineConfig } from 'vite';
// import react from "@vitejs/plugin-react";
import preact from '@preact/preset-vite';
import prefresh from '@prefresh/vite';

import alias from '@rollup/plugin-alias';
import UnoCSS from 'unocss/vite';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // prefresh(),
    preact(),
    UnoCSS({
      shortcuts: [
        {
          logo: 'i-logos-react w-6em h-6em transform transition-800 hover:rotate-180',
        },
      ],
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            display: 'inline-block',
            'vertical-align': 'middle',
          },
        }),
      ],
      inspector: true,
    }),
    alias({
      entries: [
        { find: 'react', replacement: 'preact/compat' },
        { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
        { find: 'react-dom', replacement: 'preact/compat' },
        { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' },
      ],
    }),
  ],
});
