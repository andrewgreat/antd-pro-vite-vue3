import { computed } from "vue";
import store from "@/store/index";

const appBase = {
  splitMenus: computed(() => store.state.app.splitMenus),
  layout: computed(() => store.state.app.layout),
  navTheme: computed(() => store.state.app.navTheme),
  primaryColor: computed(() => store.state.app.primaryColor),
  colorWeak: computed(() => store.state.app.colorWeak),
  fixedHeader: computed(() => store.state.app.fixedHeader),
  fixSiderbar: computed(() => store.state.app.fixSiderbar),
  contentWidth: computed(() => store.state.app.contentWidth),
  autoHideHeader: computed(() => store.state.app.autoHideHeader),
  isMobile: computed(() => store.state.app.isMobile),
  sideCollapsed: computed(() => store.state.app.sideCollapsed),
  multiTab: computed(() => store.state.app.multiTab),
  isTopMenu: computed(() => appBase.layout === "top"),
  isSideMenu: () => {
    return !appBase.isTopMenu;
  },
};

export { appBase };
