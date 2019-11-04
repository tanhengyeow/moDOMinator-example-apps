<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <h1>Show your favorite image</h1>
    <input
      placeholder="Paste your favorite image URL, like https://placeimg.com/320/320/any"
      v-model="url"
    />
    <div v-html="image"></div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      url: ''
    };
  },
  computed: {
    image(): string {
      return this.url ? `<img src="${this.url}"/>` : '';
    }
  }
});
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
