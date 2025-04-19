---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: 'tsdown'
  text: 'The Elegant<br>Library bundler'
  tagline: powered on Rolldown
  image:
    src: /tsdown.svg
    alt: tsdown
  actions:
    - theme: brand
      text: Get Started
      link: /guide/
    - theme: alt
      text: Reference
      link: /reference/config-options.md

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

.VPImage {
  height: 80%;
  width: 80%;
}
</style>
