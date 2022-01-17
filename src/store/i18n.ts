 import { computed } from 'vue'
import store from '@/store/index';

export const currentLang = computed(() => store.state.app.lang)
export const setLang = (lang) => {
  store.dispatch('setLang', lang).then(() => {})
}

export default  { currentLang, setLang }
