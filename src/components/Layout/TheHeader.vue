<template>
  <header>
    <router-link class="title-block" to="/">
      訂票系統
    </router-link>
    <nav class="navbar-link-block">
      <router-link class="navbar-link" to="/back-stage">後台</router-link>
      <router-link class="navbar-link" to="/front-stage">前台</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: 'Header'
}
</script>
<style lang="scss" scoped>
header {
  position: fixed;
  top: 0;
  display: flex;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
  background-color: $theme-color;
  z-index: 999;

  .title-block {
    color: #fff;
    font-size: 22px;
    margin-left: 16px;
    margin-right: 32px;
  }
  .navbar-link-block {
    display: flex;
    align-items: stretch;
  }
  .navbar-link {
    color: #fff;
    font-weight: bold;
    padding: 18px 16px;
    font-size: 14px;
    line-height: 1;

    &.active {
      background-color: rgba(108, 140, 2, 0.4);
    }
  }
}
</style>
