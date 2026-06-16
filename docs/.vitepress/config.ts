import { defineConfig } from 'vitepress';
import { resolve } from 'path';

export default defineConfig({
  title: 'Bortx',
  description: 'CSS Border & Text Animation Library — powered by the vortex',
  lang: 'en-US',
  appearance: false,

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
            { text: 'Text Effects', link: '/demo/text' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/ITSECT3R/bortx' },
    ],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Bortx',
    },
  },

  vite: {
    resolve: {
      alias: {
        'bortx/borders': resolve(__dirname, '../../src/borders/index.ts'),
        'bortx/borders/styles': resolve(
          __dirname,
          '../../src/borders/base.css'
        ),
        'bortx/text': resolve(__dirname, '../../src/text/index.ts'),
        'bortx/text/styles': resolve(__dirname, '../../src/text/base.css'),
        'bortx/react': resolve(__dirname, '../../src/react/hooks/index.ts'),
        'bortx/logo': resolve(__dirname, '../../src/logo/vortex.css'),
        bortx: resolve(__dirname, '../../src/index.ts'),
      },
    },
    css: {
      devSourcemap: true,
    },
  },
});
