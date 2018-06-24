<template>
  <main>
    <div class="item-container">
      <router-link class="item" to="/back-stage">活動後台</router-link>
      <router-link class="item" to="/front-stage">活動清單</router-link>
    </div>
  </main>
</template>
<script>
export default {
  name: 'Index'
}
</script>
<style lang="scss" scoped>
  .item-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 480px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .item {
      display: block;
      padding: 64px;
      background-color: $theme-color;
      color: #fff;
      border-radius: 8px;
      transition: all 0.3s;

      &:hover {
        background-color: $darker-theme-color;
      }
    }
  }
</style>
