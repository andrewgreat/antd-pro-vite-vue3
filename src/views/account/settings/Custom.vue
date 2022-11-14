<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <template #title>
          <a>风格配色</a>
        </template>
        <template #description>
          <span> 整体风格配色设置 </span>
        </template>
      </a-list-item-meta>
      <template #actions>
        <a-switch
          v-model:checked="navChecked"
          checkedChildren="暗色"
          unCheckedChildren="白色"
          @change="onChange"
        />
      </template>
    </a-list-item>
    <a-list-item>
      <a-list-item-meta>
        <template #title>
          <a>主题色</a>
        </template>
        <template #description>
          <span>
            页面风格配色： <a>{{ colorFilter(primaryColor) }}</a>
          </span>
        </template>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from "vue";
import { useStore } from "vuex";
import { colorList } from "@/components/SettingDrawer/settingConfig";
import { appBase } from "@/store/app-base";
import { NAV_THEME, TOGGLE_NAV_THEME } from "@/store/mutation-types";

const themeMap = {
  dark: "暗色",
  light: "白色",
};

export default defineComponent({
  name: "CustomSettings",

  setup() {
    const store = useStore();
    const navTheme = appBase.navTheme;
    const primaryColor = appBase.primaryColor;            
    const navChecked =ref((navTheme === 'dark' && true) || false)

    const themeFilter = (theme) => {
      return themeMap[theme];
    };

    const colorFilter = computed(() => {
      return (color) => {
        const c = colorList.find((o) => o.color === color);
        return c && c.key;
      };
    });

    const onChange = (checked) => {
      if (checked) {
        store.commit(TOGGLE_NAV_THEME, NAV_THEME.DARK);
      } else {
        store.commit(TOGGLE_NAV_THEME, NAV_THEME.LIGHT);
      }
    };

    return {
      navChecked,
      primaryColor,
      themeFilter,
      colorFilter,
      onChange,
    };
  },
});
</script>
