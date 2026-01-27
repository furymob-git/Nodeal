import DefaultTheme from 'vitepress/theme'
import { watch } from 'vue'
import { useRoute } from 'vitepress'
import './style.css'

export default {
    extends: DefaultTheme,
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
