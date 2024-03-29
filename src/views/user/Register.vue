<template>
  <div class="main user-layout-register">
    <h3>
      <span>{{ $t('user.register.register') }}</span>
    </h3>
    <a-form id="formRegister" :model="form">
      <a-form-item v-bind="validateInfos.email">
        <a-input
          size="large"
          type="text"
          :placeholder="$t('user.register.email.placeholder')"
          v-model:value="form.email"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="(trigger) => trigger.parentElement"
        v-model:value="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">{{ $t(passwordLevelName) }}</div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor=" passwordLevelColor "
            />
            <div style="margin-top: 10px;">
              <span>{{ $t('user.register.password.popover-message') }}</span>
            </div>
          </div>
        </template>
        <a-form-item v-bind="validateInfos.password">
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            :placeholder="$t('user.register.password.placeholder')"
            v-model:value="form.password"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item v-bind="validateInfos.password2">
        <a-input-password
          size="large"
          :placeholder="$t('user.register.confirm-password.placeholder')"
          v-model:value="form.password2"
        ></a-input-password>
      </a-form-item>

      <a-form-item v-bind="validateInfos.mobile">
        <a-input
          size="large"
          :placeholder="$t('user.login.mobile.placeholder')"
          v-model:value="form.mobile"
        >
          <a-select slot="addonBefore" size="large" defaultValue="+86">
            <a-select-option value="+86">+86</a-select-option>
            <a-select-option value="+87">+87</a-select-option>
          </a-select>
        </a-input>
      </a-form-item>
      <!--<a-input-group size="large" compact>
            <a-select style="width: 20%" size="large" defaultValue="+86">
              <a-select-option value="+86">+86</a-select-option>
              <a-select-option value="+87">+87</a-select-option>
            </a-select>
            <a-input style="width: 80%" size="large" placeholder="11 位手机号"></a-input>
      </a-input-group>-->

      <a-row :gutter="16">
        <a-col class="gutter-row" :span="16">
          <a-form-item v-bind="validateInfos.captcha">
            <a-input
              size="large"
              type="text"
              :placeholder="$t('user.login.mobile.verification-code.placeholder')"
              v-model:value="form.captcha"
            >
              <MailOutlined :style="{ color: 'rgba(0,0,0,.25)' }" />
            </a-input>
          </a-form-item>
        </a-col>
        <a-col class="gutter-row" :span="8">
          <a-button
            class="getCaptcha"
            size="large"
            :disabled="state.smsSendBtn"
            @click.stop.prevent="getCaptcha"
          >{{!state.smsSendBtn && $t('user.register.get-verification-code')||(state.time+' s')}}</a-button>
        </a-col>
      </a-row>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="registerBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="registerBtn"
        >{{ $t('user.register.register') }}</a-button>
        <router-link class="login" :to="{ name: 'login' }">{{ $t('user.register.sign-in') }}</router-link>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue'
import { Form, message, notification } from 'ant-design-vue'
import { useI18n } from 'vue-i18n'
import { scorePassword } from '@/utils/util'
import { useRouter } from 'vue-router'
import { isMobile } from '@/store/device'
import { getSmsCaptcha } from '@/api/login'

const levelNames = {
  0: 'user.password.strength.short',
  1: 'user.password.strength.low',
  2: 'user.password.strength.medium',
  3: 'user.password.strength.strong'
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success'
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a'
}
export default defineComponent({
  name: 'Register',
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const useForm = Form.useForm

    // 表单相关
    const form = reactive({
      email: '',
      password: '',
      password2: '',
      mobile: ''
    })
    const handlePasswordLevel = (rule, value) => {
      if (value === '') {
        return Promise.resolve()
      }
      console.log('scorePassword ; ', scorePassword(value))
      if (value.length >= 6) {
        if (scorePassword(value) >= 30) {
          state.level = 1
        }
        if (scorePassword(value) >= 60) {
          state.level = 2
        }
        if (scorePassword(value) >= 80) {
          state.level = 3
        }
      } else {
        state.level = 0
        return Promise.reject(new Error(t('user.password.strength.msg')))
      }
      state.passwordLevel = state.level
      state.percent = state.level * 33

      return Promise.resolve()
    }
    const handlePhoneCheck = (rule, value) => {
      return Promise.resolve()
    }
    const rules = reactive({
      email: [
        { required: true, type: 'email', message: t('user.email.required') },
        { validateTrigger: ['change', 'blur'] }
      ],
      password: [
        { required: true, message: t('user.password.required') },
        { validator: handlePasswordLevel },
        { validateTrigger: ['change', 'blur'] }
      ],
      password2: [
        { required: true, message: t('user.password.required') },
        { validator: handlePasswordLevel },
        { validateTrigger: ['change', 'blur'] }
      ],
      mobile: [
        { required: true, message: t('user.phone-number.required'), pattern: /^1[3456789]\d{9}$/ },
        { validator: handlePhoneCheck },
        { validateTrigger: ['change', 'blur'] }
      ],
      captcha: [{ required: true, message: '请输入验证码' }, { validateTrigger: 'blur' }]
    })
    const { validate, validateInfos } = useForm(form, rules)
    const handleSubmit = () => {
      validate().then((res) => {
        state.passwordLevelChecked = false
        router.push({ name: 'registerResult', params: { ...form } })
      })
    }

    const state = reactive({
      time: 60,
      level: 0,
      smsSendBtn: false,
      passwordLevel: 0,
      passwordLevelChecked: false,
      percent: 10,
      progressColor: '#FF0000'
    })

    // 密码检查相关
    const registerBtn = ref(false)
    const passwordLevelClass = computed(() => {
      return levelClass[state.passwordLevel]
    })
    const passwordLevelName = computed(() => {
      return levelNames[state.passwordLevel]
    })
    const passwordLevelColor = computed(() => {
      return levelColor[state.passwordLevel]
    })
    const handlePasswordCheck = (rule, value) => {
      const password = form.password
      if (value === undefined) {
        return Promise.reject(new Error(t('user.password.required')))
      }
      if (value && password && value.trim() !== password.trim()) {
        return Promise.reject(new Error(t('user.password.twice.msg')))
      }
      return Promise.resolve()
    }
    const handlePasswordInputClick = () => {
      if (!isMobile) {
        state.passwordLevelChecked = true
        return
      }
      state.passwordLevelChecked = false
    }

    const requestFailed = (err) => {
      notification['error']({
        message: '错误',
        description: ((err.response || {}).data || {}).message || '请求出现错误，请稍后再试',
        duration: 4
      })
      registerBtn.value = false
    }

    const useGetCaptcha = (e, validate, state, form, registerBtn) => {
      e.preventDefault();
      validate(['mobile']).then((res) => {
        state.smsSendBtn = true;
        const interval = window.setInterval(() => {
          if (state.time-- <= 0) {
            state.time = 60;
            state.smsSendBtn = false;
            window.clearInterval(interval);
          }
        }, 1000);

        message.loading('验证码发送中..', 1);

        getSmsCaptcha({ mobile: form.mobile })
          .then((res) => {
            notification['success']({
              message: '提示',
              description: '验证码获取成功，您的验证码为：' + res.result.captcha,
              duration: 8,
            });
          })
          .catch((err) => {
            clearInterval(interval);
            state.time = 60;
            state.smsSendBtn = false;
            requestFailed(err);
            registerBtn && (registerBtn.value = false);
          });
      });
    };

    const getCaptcha = (e) => {
      useGetCaptcha(e, validate, state, form, registerBtn)
    }

    return {
      t,
      state,
      registerBtn,
      validateInfos,
      form,
      passwordLevelClass,
      passwordLevelName,
      passwordLevelColor,
      handlePasswordCheck,
      handlePasswordInputClick,
      handleSubmit,
      getCaptcha,
      rules
    }
  }
})
</script>
<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>
<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }
}
</style>
