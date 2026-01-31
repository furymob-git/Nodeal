import DefaultTheme from 'vitepress/theme'
import { watch, h } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'
import KofiWidget from './components/KofiWidget.vue'

export default {
    extends: DefaultTheme,
    Layout: () => {
        return h(DefaultTheme.Layout, null, {
            'layout-bottom': () => h(KofiWidget)
        })
    },
    setup() {
        const route = useRoute()
        watch(
            () => route.path,
            () => {
                if (route.data.frontmatter.layout === 'home') {
                    document.body.classList.add('home-page')
                } else {
                    document.body.classList.remove('home-page')
                }
            },
            { immediate: true }
        )
    }
}
