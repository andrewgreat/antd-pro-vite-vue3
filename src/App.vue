<template>
  <a-config-provider :locale="locale">
    <router-view />
  </a-config-provider>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import store from '@/store'
// import { useStore } from 'vuex';
import {domTitle, setDocumentTitle} from '@/utils/domUtil'

export default defineComponent({
  name: 'App',
  setup() {
    const { t, getLocaleMessage } = useI18n()
    // const store = useStore()
    const route  = useRoute()
    console.log('app.vue...')
    const locale = computed(()=>{
      const { title } = route.meta
      // @ts-ignore
      title && (setDocumentTitle(`${t(title)}-${domTitle}`))

      return getLocaleMessage(store.getters.lang).antLocale
    })
    const getPopupContainer = (el: Element, dialogContext: any) => {
      if (dialogContext) {
        return dialogContext.getDialogWrap();
      }
      return document.body;
    };
    return {
      getPopupContainer,
      locale
    };
  },
});
</script>

<style>
#app {
  height: 100%;
}
</style>
