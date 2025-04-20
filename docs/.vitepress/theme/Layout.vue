<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import HomePage from '../components/HomePage.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #home-features-after>
      <HomePage />
    </template>
  </DefaultTheme.Layout>
</template>
