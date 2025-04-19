---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'tsdown'
  text: 优雅的<br>库打包工具
  tagline: 由 Rolldown 驱动
  image:
    src: /tsdown.svg
    alt: tsdown
  actions:
    - theme: brand
      text: 开始使用
      link: /zh-CN/guide/
    - theme: alt
      text: API 参考
      link: /zh-CN/reference/config-options.md

features:
  - title: Speed of Rust
    details: |
      tsdown is powered on Rolldown, which handles tens of thousands of modules without breaking a sweat
  - title: Easy to use
    details: |
      tsdown preconfigures everything you need to get started, so you can focus on writing code
---

<div class="voidzero">
  <a class="voidzero-img" href="https://voidzero.dev/" target="_blank" title="voidzero.dev"></a>
  <div class="voidzero-follow">由 VoidZero 隆重推出</div>
</div>

<style scoped>
.voidzero {
  padding-top: 100px;
}

.voidzero-follow {
  text-align: center;
  margin: 48px 0 16px;
  line-height: 32px;
  font-size: 24px;
  font-weight: 600;
}
</style>
