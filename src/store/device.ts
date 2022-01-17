import { computed } from 'vue';
import store from '@/store/index';

export const isMobile = computed(() => store.state.app.isMobile)
export default { isMobile }


