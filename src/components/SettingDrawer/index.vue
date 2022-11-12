<template>
  <a-drawer
    v-model:visible="visible"
    :width="300"
    placement="right"
    :closable="false"
  >
    <template #handle>
      <div class="ant-pro-setting-drawer-handle" @click="handleShowDrawer">
        <SettingOutlined v-if="!visible" />
        <CloseOutlined v-else />
      </div>
    </template>
    <div class="setting-drawer-index-content">
      <h3 class="setting-drawer-index-title">整体风格设置</h3>
      <div class="setting-drawer-index-blockChecbox">
        <a-tooltip v-for="(a, i) in themeList" :key="i" placement="top">
          <template #title>
            <span>{{ a.tips }}</span>
          </template>
          <div
            :class="['setting-drawer-index-item', a.style]"
            @click="handleMenuTheme(a.value)"
          >
            <img :src="a.image" :alt="a.value" />
            <check-outlined
              v-if="sideStyle === a.value"
              class="setting-drawer-index-selectIcon"
            />
          </div>
        </a-tooltip>
      </div>
    </div>

    <div class="margin-bottom: 24px">
      <h3>导航模式</h3>
      <a-radio-group
        :value="modelValue.layout"
        @change="({ target }: { target: HTMLInputElement }) => updateConf(target.value, 'layout')"
      >
        <a-radio value="side">左侧菜单布局</a-radio>
        <a-radio value="top">顶部菜单布局</a-radio>
        <a-radio value="mix">混合菜单布局</a-radio>
      </a-radio-group>
      <a-divider />
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定 Header</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixedHeader"
            @change="(checked: CheckedType) => updateConf(checked, 'fixedHeader')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">固定 左侧菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.fixSiderbar"
            @change="(checked: CheckedType) => updateConf(checked, 'fixSiderbar')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">自动分割菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.splitMenus"
            @change="(checked: CheckedType) => updateConf(checked, 'splitMenus')"
          />
        </a-col>
      </a-row>

      <a-divider />
      <h3>内容区域</h3>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">顶栏</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.headerRender === undefined"
            @change="(checked: CheckedType) => updateConf(checked === true && undefined, 'headerRender')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">页脚</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.footerRender === undefined"
            @change="(checked: CheckedType) => updateConf(checked === true && undefined, 'footerRender')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">菜单</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            disabled
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.menu === undefined"
            @change="(checked: CheckedType) => updateConf(checked === true && undefined, 'menu')"
          />
        </a-col>
      </a-row>
      <a-row style="margin-bottom: 12px">
        <a-col :span="12">菜单头</a-col>
        <a-col :span="12" style="text-align: right">
          <a-switch
            checked-children="开"
            un-checked-children="关"
            :checked="modelValue.menuHeaderRender === undefined"
            @change="(checked: CheckedType) => updateConf(checked === true && undefined, 'menuHeaderRender')"
          />
        </a-col>
      </a-row>
    </div>
  </a-drawer>
</template>

<script setup name="SettingDrawer" lang="ts">
import { ref, toRaw } from "vue";
import { useStore } from "vuex";

type CheckedType = boolean | string | number;
type ConfType = "layout" | "fixedHeader" | "fixSiderbar" | string;

const props = defineProps<{
  modelValue: Record<string, any>;
}>();
const emit = defineEmits(["update:modelValue"]);

const store = useStore();
// 整体风格
const sideStyle = store.state.app.theme;

const themeList = [
  {
    tips: "默认主题风格",
    value: "theme-default",
    image: "/public/images/LCkqqYNmvBEbokSDscrm.svg",
    style: "setting-checkbox-item-default",
  },
  {
    tips: "亮色主题风格",
    value: "theme-light",
    image: "/public/images/jpRkZQMyYRryryPNtyIC.svg",
    style: "setting-checkbox-item-light",
  },
  {
    tips: "暗黑模式",
    value: "theme-dark",
    image: "/public/images/LCkqqYNmvBEbokSDdark.svg",
    style: "setting-checkbox-item-dark",
  },
];

const visible = ref<boolean>(false);
const handleShowDrawer = () => {
  visible.value = !visible.value;
};

const handleMenuTheme = (theme: string) => {
  console.log(`theme: ${theme}, todo...`)
};

const updateConf = (val: any, type: ConfType) => {
  const newVal = {
    ...toRaw(props.modelValue),
    [`${type}`]: val,
  };
  console.log("newConf", newVal);
  emit("update:modelValue", newVal);
};
</script>

<style lang="less" scoped>
.ant-pro-setting-drawer-handle {
  position: absolute;
  top: 240px;
  right: 300px;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  font-size: 16px;
  text-align: center;
  background: @primary-color;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  pointer-events: auto;

  > span {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}

.setting-drawer-index-content {
  .setting-drawer-index-blockChecbox {
    display: flex;

    .setting-drawer-index-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .setting-drawer-index-selectIcon {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }
  .setting-drawer-theme-color-colorBlock {
    width: 20px;
    height: 20px;
    border-radius: 2px;
    float: left;
    cursor: pointer;
    margin-right: 8px;
    padding-left: 0px;
    padding-right: 0px;
    text-align: center;
    color: #fff;
    font-weight: 700;

    i {
      font-size: 14px;
    }
  }
}
.setting-drawer-index-handle {
  position: absolute;
  top: 240px;
  background: #1890ff;
  width: 48px;
  height: 48px;
  right: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 16px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 20px;
  }
}
</style>

