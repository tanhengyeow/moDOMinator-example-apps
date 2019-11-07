<template>
  <div>
    <h1 class="title">404 Not Found</h1>

    <p>The page you requested could not be found.</p>
    <router-link to="/">Back to home page.</router-link>
  </div>
</template>

<script lang="ts">
  export default {
    name: 'NotFound'
  };
</script>
