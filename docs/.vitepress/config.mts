import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Nodeal",
  description: "A seamless Roblox framework built to break engine limits.",
  cleanUrls: false,
  appearance: 'dark',
  base: '/Nodeal/',
  lastUpdated: true,
  markdown: {
    lineNumbers: true
  },
  head: [
    ['link', { rel: 'icon', href: '/Nodeal/logo.png' }],

    // Open Graph / Facebook / Discord
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:site_name', content: 'Nodeal' }],
    ['meta', { property: 'og:title', content: 'Nodeal | Break Roblox Engine Limits' }],
    ['meta', { property: 'og:description', content: 'Experience a new standard in Roblox development. Nodeal provides a seamless, powerful toolset including decorators, advanced proxies, and modular services to help you build without boundaries.' }],
    ['meta', { property: 'og:image', content: 'https://furymob-git.github.io/Nodeal/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://furymob-git.github.io/Nodeal/' }],

    // Key for smaller thumbnail on Discord
    ['meta', { name: 'twitter:card', content: 'summary' }],

    // Theme
    ['meta', { name: 'theme-color', content: '#e83cfc' }]
  ],
  themeConfig: {
    logo: '/logo.png',
    search: {
      provider: 'local'
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/guide/getting-started' },
      { text: 'API', link: '/api/game' }
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
            { text: 'Proxies & Metamethods', link: '/guide/proxies' },
            { text: 'Decorators', link: '/guide/decorators' }
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
      { icon: 'github', link: 'https://github.com/furymob-git/Nodeal' },
      { icon: 'discord', link: 'https://discord.gg/hxFJqGe9JE' },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z" fill="currentColor"/></svg>'
        },
        link: 'https://devforum.roblox.com/'
      }
    ],

    footer: {
      message: 'Released under the <a href="/Nodeal/license">Nodeal Public License</a>.',
      copyright: 'Copyright © 2026 Nodeal Team'
    }
  }
})
