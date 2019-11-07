<template>
  <div>
    <h1 class="title">DOM XSS</h1>
    <p>
      The widget below is vulnerable to injection of JavaScript code.<br/>
      moDOMinator should be able to automatically detect and attack the input element below.
    </p>
    <br/>

    <div class="box">
      <h5 class="title is-5">Show your favorite image</h5>
      <input
        class="input"
        placeholder="Paste your favorite image URL, like https://placeimg.com/320/320/any"
        v-model="url"
      />
      <template v-if="url">
        <br/>
        <br/>
        <div v-html="image"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'DomXss',
    data() {
      return {
        url: ''
      };
    },
    computed: {
      image(): string {
        return this.url ? `<img src="${this.url}" alt="Failed to load image."/>` : '';
      }
    }
  });
</script>
