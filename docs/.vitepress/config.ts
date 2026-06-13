import { defineConfig } from 'vitepress';
import { resolve } from 'path';

export default defineConfig({
  title: 'Knocking Borders',
  description: 'Open-source CSS border & text animation library',
  lang: 'en-US',

  themeConfig: {
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Demo', link: '/demo/pro-borders' },
      { text: 'Sandbox', link: '/sandbox' },
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Guide',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Border Animations', link: '/guide/border-animations' },
            { text: 'Text Animations', link: '/guide/text-animations' },
          ],
        },
      ],
      '/demo/': [
        {
          text: 'Live Demos',
          items: [
            { text: 'Pro Borders', link: '/demo/pro-borders' },
            { text: 'Alt Borders', link: '/demo/alt-borders' },
            { text: 'Text Effects', link: '/demo/text' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ITSECT3R/Knocking-Borders' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Knocking Borders',
    },
  },

  vite: {
    resolve: {
      alias: {
        'knocking-borders/borders': resolve(__dirname, '../../src/borders/index.ts'),
        'knocking-borders/borders/styles': resolve(__dirname, '../../src/borders/base.css'),
        'knocking-borders/borders/alt': resolve(__dirname, '../../src/borders/alt/index.ts'),
        'knocking-borders/text': resolve(__dirname, '../../src/text/index.ts'),
        'knocking-borders/text/styles': resolve(__dirname, '../../src/text/base.css'),
        'knocking-borders/react': resolve(__dirname, '../../src/react/hooks/index.ts'),
        'knocking-borders': resolve(__dirname, '../../src/index.ts'),
      },
    },
    css: {
      devSourcemap: true,
    },
  },
});
