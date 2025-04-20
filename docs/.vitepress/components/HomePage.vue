<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { useTranslate } from '../i18n/composable'

const { lang, isDark } = useData()
const t = useTranslate()

const voidZeroLogo = computed(() =>
  isDark
    ? 'https://voidzero.dev/logo-white.svg'
    : 'https://voidzero.dev/logo.svg',
)
</script>

<template>
  <div flex="~ col" items-center justify-center>
    <div mt20 flex="~ col" items-center gap8>
      <h2 v-if="lang === 'en'" class="voidzero-title">Brought to you by</h2>
      <a href="https://voidzero.dev/" target="_blank" title="voidzero.dev">
        <img :src="voidZeroLogo" alt="VoidZero" w-300px h-75px />
      </a>
      <h2 v-if="lang === 'zh-CN'" class="voidzero-title">
        由 VoidZero 隆重推出
      </h2>
    </div>

    <img
      mt12
      src="https://cdn.jsdelivr.net/gh/sxzz/sponsors/sponsors.wide.svg"
    />
  </div>
</template>

<style scoped>
.voidzero-title {
  line-height: 32px;
  font-size: 24px;
  font-weight: 600;
}
</style>
