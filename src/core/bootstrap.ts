import store from '@/store'
import storage from 'store'
import {
  ACCESS_TOKEN,
  APP_LANGUAGE,
  TOGGLE_CONTENT_WIDTH,
  TOGGLE_FIXED_HEADER,
  TOGGLE_FIXED_SIDEBAR, TOGGLE_HIDE_HEADER,
  TOGGLE_LAYOUT, TOGGLE_NAV_THEME, TOGGLE_COLOR_WEAK,
  TOGGLE_PRIMARY_COLOR, TOGGLE_MULTI_TAB,
  TOGGLE_SPLIT_MENUS,
} from '@/store/mutation-types'

import defaultSettings from '@/config/defaultSettings'

export default function Initializer () {
  console.log('main.ts...','bootstrap')
  store.commit(TOGGLE_LAYOUT, storage.get(TOGGLE_LAYOUT, defaultSettings.layout))
  store.commit(TOGGLE_FIXED_HEADER, storage.get(TOGGLE_FIXED_HEADER, defaultSettings.fixedHeader))
  store.commit(TOGGLE_FIXED_SIDEBAR, storage.get(TOGGLE_FIXED_SIDEBAR, defaultSettings.fixSiderbar))
  store.commit(TOGGLE_CONTENT_WIDTH, storage.get(TOGGLE_CONTENT_WIDTH, defaultSettings.contentWidth))
  store.commit(TOGGLE_HIDE_HEADER, storage.get(TOGGLE_HIDE_HEADER, defaultSettings.autoHideHeader))
  store.commit(TOGGLE_NAV_THEME, storage.get(TOGGLE_NAV_THEME, defaultSettings.navTheme))
  store.commit(TOGGLE_COLOR_WEAK, storage.get(TOGGLE_COLOR_WEAK, defaultSettings.colorWeak))
  store.commit(TOGGLE_PRIMARY_COLOR, storage.get(TOGGLE_PRIMARY_COLOR, defaultSettings.primaryColor))
  store.commit(TOGGLE_MULTI_TAB, storage.get(TOGGLE_MULTI_TAB, defaultSettings.multiTab))
  store.commit(TOGGLE_SPLIT_MENUS, storage.get(TOGGLE_SPLIT_MENUS, defaultSettings.splitMenus))
  store.commit('SET_TOKEN', storage.get(ACCESS_TOKEN))

  store.dispatch('setLang', storage.get(APP_LANGUAGE, 'en-US')).then(() => {})
  // last step
}
