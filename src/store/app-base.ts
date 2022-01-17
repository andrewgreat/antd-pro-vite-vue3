import {computed} from 'vue';
import store from '@/store/index';

const appBase = {
    layout: computed(() => store.state.app.layout),
    navTheme: computed(() => store.state.app.theme),
    primaryColor: computed(() => store.state.app.color),
    colorWeak: computed(() => store.state.app.weak),
    fixedHeader: computed(() => store.state.app.fixedHeader),
    fixedSidebar: computed(() => store.state.app.fixedSidebar),
    contentWidth: computed(() => store.state.app.contentWidth),
    autoHideHeader: computed(() => store.state.app.autoHideHeader),
    isMobile: computed(() => store.state.app.isMobile),
    sideCollapsed: computed(() => store.state.app.sideCollapsed),
    multiTab: computed(() => store.state.app.multiTab),
    isTopMenu: computed(() =>  appBase.layout === 'topmenu'),
    isSideMenu:  ()=> {
      return !appBase.isTopMenu
    }
  }

export {
  appBase
}
