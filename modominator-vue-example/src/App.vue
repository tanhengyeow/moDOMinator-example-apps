<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <div class="app-name">moDOMinator</div>
        </div>
      </div>
    </nav>
    <div class="content-spacer"></div>
    <div class="container">
      <div class="columns">
        <div class="column is-3">
          <NavigationMenu/>
        </div>
        <div class="column">
          <router-view/>
          <div class="content-spacer"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

import NavigationMenu from '@/components/NavigationMenu.vue';

export default Vue.extend({
  name: 'app',
  components: {
    NavigationMenu
  }
});
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-name {
  padding: 6px;
  font-weight: bold;
  font-size: 1.3em;
}

.content-spacer {
  height: 30px;
}

.fade-in-enter-active {
  transition: opacity .2s;
}
.fade-in-enter, .fade-in-leave-to {
  opacity: 0;
}
.fade-in-leave-active {
  position: absolute;
  overflow: hidden;
  visibility: hidden;
}
</style>
