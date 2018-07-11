<template>
  <main>
    <div class="activity-table-container">
      <h1 class="main-title">活動清單</h1>
      <div class="activity-table">
        <div class="table-row table-head">
          <div class="table-cell number">編號</div>
          <div class="table-cell">名稱</div>
        </div>
        <div class="table-row">
          <div class="table-cell">01</div>
          <router-link class="table-cell" to="front-stage/1">測試活動一</router-link>
        </div>
      </div>
    </div>
  </main>
</template>
<script>

export default {
  name: 'FrontStageIndex',
}
</script>
<style lang="scss" scoped>
.activity-table-container {
  width: 600px;
  margin: 0 auto;
}
.activity-table {
  display: table;
  width: 100%;

  .table-row {
    display: table-row;
    background-color: #fff;

    &.table-head {
      background-color: $lighter-theme-color;
    }
  }
  .table-cell {
    display: table-cell;
    padding: 16px 12px;

    &.number {
      width: 60px;
    }
  }
}
</style>
