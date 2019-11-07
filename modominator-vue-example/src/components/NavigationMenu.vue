<template>
  <aside class="menu">
    <p class="menu-label">
      General
    </p>
    <ul class="menu-list">
      <li><router-link to="/" :class="path === '/' ? 'is-active' : ''">Home</router-link></li>
      <li><router-link to="/safe" :class="path === '/safe' ? 'is-active' : ''">Safe</router-link></li>
    </ul>
    <p class="menu-label">
      Attacks
    </p>
    <ul class="menu-list">
      <li><router-link to="/domxss" :class="path === '/domxss' ? 'is-active' : ''">DOM XSS</router-link></li>
      <li><router-link to="/storedxss" :class="path === '/storedxss' ? 'is-active' : ''">Stored XSS</router-link></li>
      <li><router-link to="/domcssi" :class="path === '/domcssi' ? 'is-active' : ''">DOM CSSi</router-link></li>
      <li><router-link to="/storedcssi" :class="path === '/storedcssi' ? 'is-active' : ''">Stored CSSi</router-link></li>
    </ul>
  </aside>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'NavigationMenu',
    computed: {
      path(): string {
        return this.$route.path;
      }
    }
  });
</script>
