<template>
  <div>
    <h1 class="title">DOM CSS Injection</h1>
    <p>
      The widget below is vulnerable to injection of CSS styles.<br/>
      moDOMinator should be able to automatically detect and attack the input element below.
    </p>
    <br/>

    <div class="box">
      <h5 class="title is-5">What is your favorite color?</h5>
      <input
        class="input"
        placeholder="#000000"
        v-model="color"
      />
      <template v-if="color">
        <br/>
        <br/>
        <div class="color-display" :style="`background-color: ${color}`"></div>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';

  export default Vue.extend({
    name: 'DomCssi',
    data() {
      return {
        color: ''
      };
    }
  });
</script>

<style>
  .color-display {
    width: 400px;
    height: 100px;
    border: 1px solid #bbb;
    border-radius: 15px;
  }
</style>
