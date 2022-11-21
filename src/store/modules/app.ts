import storage from 'store'
import {
  SIDEBAR_TYPE,
  TOGGLE_MOBILE_TYPE,
  TOGGLE_NAV_THEME,
  TOGGLE_LAYOUT,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_HIDE_HEADER,
  TOGGLE_PRIMARY_COLOR,
  TOGGLE_COLOR_WEAK,
  TOGGLE_SPLIT_MENUS,
  TOGGLE_MULTI_TAB,
  CONTENT_WIDTH_TYPE,
  // i18n
  APP_LANGUAGE
} from '@/store/mutation-types'
import { loadLanguageAsync } from '@/locales'
import settings from '@/config/defaultSettings';

const app = {
  state: {
    sideCollapsed: false,
    isMobile: false,
    splitMenus: settings.splitMenus,
    navTheme: settings.navTheme,
    layout: settings.layout,
    contentWidth: settings.layout === 'side' ? CONTENT_WIDTH_TYPE.Fluid : settings.contentWidth,
    fixedHeader: settings.fixedHeader,
    fixSiderbar: settings.fixSiderbar,
    autoHideHeader: settings.autoHideHeader,
    primaryColor: settings.primaryColor,
    colorWeak: settings.colorWeak,
    multiTab: true,
    lang: 'zh-CN',
    _antLocale: {}
  },
  mutations: {
    [SIDEBAR_TYPE]: (state, type) => {
      state.sideCollapsed = type
      storage.set(SIDEBAR_TYPE, type)
    },
    [TOGGLE_MOBILE_TYPE]: (state, isMobile) => {
      state.isMobile = isMobile
    },
    [TOGGLE_NAV_THEME]: (state, theme) => {
      state.navTheme = theme
      storage.set(TOGGLE_NAV_THEME, theme)
    },
    [TOGGLE_LAYOUT]: (state, mode) => {
      state.layout = mode
      storage.set(TOGGLE_LAYOUT, mode)
    },
    [TOGGLE_FIXED_HEADER]: (state, mode) => {
      state.fixedHeader = mode
      storage.set(TOGGLE_FIXED_HEADER, mode)
    },
    [TOGGLE_FIXED_SIDEBAR]: (state, mode) => {
      state.fixSiderbar = mode
      storage.set(TOGGLE_FIXED_SIDEBAR, mode)
    },
    [TOGGLE_CONTENT_WIDTH]: (state, type) => {
      state.contentWidth = type
      storage.set(TOGGLE_CONTENT_WIDTH, type)
    },
    [TOGGLE_HIDE_HEADER]: (state, type) => {
      state.autoHideHeader = type
      storage.set(TOGGLE_HIDE_HEADER, type)
    },
    [TOGGLE_PRIMARY_COLOR]: (state, color) => {
      state.primaryColor = color
      storage.set(TOGGLE_PRIMARY_COLOR, color)
    },
    [TOGGLE_COLOR_WEAK]: (state, mode) => {
      state.colorWeak = mode
      storage.set(TOGGLE_COLOR_WEAK, mode)
    },
    [TOGGLE_SPLIT_MENUS]:(state, mode) =>{
      state.splitMenus = mode
      storage.set(TOGGLE_SPLIT_MENUS, mode)
    },
    [APP_LANGUAGE]: (state, lang, antd = {}) => {
      state.lang = lang
      state._antLocale = antd
      storage.set(APP_LANGUAGE, lang)
    },
    [TOGGLE_MULTI_TAB]: (state, bool) => {
      storage.set(TOGGLE_MULTI_TAB, bool)
      state.multiTab = bool
    }
  },
  actions: {
    setLang ({ commit }, lang) {
      return new Promise((resolve, reject) => {
        commit(APP_LANGUAGE, lang)
        loadLanguageAsync(lang).then(() => {
          resolve(lang)
        }).catch((e) => {
          reject(e)
        })
      })
    }
  }
}

export default app
