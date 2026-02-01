import { defineConfig } from 'vitepress'
import { readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Auto-discover modules in /api/modules/
function getModulesSidebarItems() {
  const modulesDir = join(__dirname, '../api/modules')
  try {
    const files = readdirSync(modulesDir)
      .filter((file: string) => file.endsWith('.md'))
      .map((file: string) => ({
        text: file.replace('.md', '').replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        link: `/api/modules/${file.replace('.md', '')}`
      }))
      .sort((a: any, b: any) => a.text.localeCompare(b.text))
    return files
  } catch {
    return []
  }
}

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
    ['meta', { property: 'og:title', content: 'Nodeal | The Advanced Framework to Break Roblox Engine Limits' }],
    ['meta', { property: 'og:description', content: 'Unlock the full potential of Roblox with decorators, custom proxies, and modular services. Build advanced games seamlessly without engine limitations.' }],
    ['meta', { property: 'og:image', content: 'https://furymob-git.github.io/Nodeal/logo.png' }],
    ['meta', { property: 'og:url', content: 'https://furymob-git.github.io/Nodeal/' }],

    // Forces small thumbnail on right side
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
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'API', link: '/api/game' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: 'Introduction',
          items: [
            { text: 'Getting Started', link: '/guide/getting-started' },
            { text: 'Studio Integration', link: '/guide/studio-integration' },
            { text: 'Core Concepts', link: '/guide/core-concepts' }
          ]
        },
        {
          text: 'Custom Components',
          items: [
            { text: 'Creating Modules', link: '/guide/module-system/modules' },
            { text: 'Services', link: '/guide/module-system/services' },
            { text: 'Built-ins', link: '/guide/module-system/builtins' },
            { text: 'Decorators', link: '/guide/module-system/decorators' }
          ]
        }
      ],
      '/api/': [
        {
          text: 'Nodeal Extensions',
          items: [
            { text: 'game Extension', link: '/api/game' },
            { text: 'Global Functions', link: '/api/globals' }
          ]
        },
        {
          text: 'Extra Modules',
          items: getModulesSidebarItems()
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/furymob-git/Nodeal' },
      { icon: 'discord', link: 'https://discord.gg/hTqXPRduHp' },
      {
        icon: {
          svg: '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M18.926 23.998 0 18.892 5.075.002 24 5.108ZM15.348 10.09l-5.282-1.453-1.414 5.273 5.282 1.453z" fill="currentColor"/></svg>'
        },
        link: 'https://devforum.roblox.com/'
      },
      {
        icon: {
          svg: '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M23.881 8.948c-.773-4.085-4.859-4.593-4.859-4.593H.723c-.604 0-.679.798-.679.798s-.082 7.324-.022 11.822c.164 2.424 2.586 2.672 2.586 2.672s8.267-.023 11.966-.049c2.438-.426 2.683-2.566 2.658-3.734 4.352.24 7.422-2.831 6.649-6.916zm-11.062 3.511c-1.246 1.453-4.011 3.976-4.011 3.976s-.121.119-.31.023c-.076-.057-.108-.09-.108-.09-.443-.441-3.368-3.049-4.034-3.954-.709-.965-1.041-2.7-.091-3.71.951-1.01 3.005-1.086 4.363.407 0 0 1.565-1.782 3.468-.963 1.904.82 1.832 3.011.723 4.311zm6.173.478c-.928.116-1.682.028-1.682.028V7.284h1.77s1.971.551 1.971 2.638c0 1.913-.985 2.667-2.059 3.015z" fill="currentColor"/></svg>'
        },
        link: 'https://ko-fi.com/furymob'
      }
    ],

    footer: {
      message: 'Released under the <a href="/Nodeal/license">Nodeal Public License</a>.',
      copyright: 'Copyright © 2026 Nodeal Team'
    }
  }
})
