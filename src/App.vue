<template>
  <div id="app">
    <router-view></router-view>
    <lg-preview></lg-preview>
  </div>
</template>
<script>
    export default {
        name: 'App'
    };
</script>
<style scoped>
    @import '../static/layout/css/style.css';
</style>