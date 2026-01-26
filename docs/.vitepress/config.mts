import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Nodeal",
  description: "A seamless Roblox framework built to break engine limits.",
  cleanUrls: true,
  base: '/Nodeal/',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
  themeConfig: {
    logo: '/logo.png', // Placeholder
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Studio Workflow', link: '/guide/studio-workflow' }
          ]
        },
        {
          text: 'Core Concepts',
          items: [
            { text: 'Services', link: '/guide/services' },
            { text: 'Built-ins', link: '/guide/builtins' },
            { text: 'Proxies & Metamethods', link: '/guide/proxies' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Global Extensions',
          items: [
            { text: 'game Extension', link: '/api/game' },
            { text: 'Global Functions', link: '/api/globals' }
          ]
        },
        {
          text: 'Metamethods',
          items: [
            { text: 'Custom Metamethods', link: '/api/metamethods' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/furymob-git/Nodeal' }
    ],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026 Nodeal Team'
    }
  }
})
