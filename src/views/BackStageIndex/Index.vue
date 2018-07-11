<template>
  <main>
    <h1 class="main-title">活動列表</h1>
    <div class="ticket-list-table"
      v-if="activityList.length > 0"
    >
      <div class="table-row">
        <div class="table-cell no">編號</div>
        <div class="table-cell name">活動名稱</div>
        <div class="table-cell action">功能列</div>
      </div>
      <div class="table-row"
        v-for="(activityInfo, index) in activityList"
        :key="activityInfo.id"
      >
        <div class="table-cell">{{ index + 1 }}</div>
        <div class="table-cell">{{ activityInfo.name }}</div>
        <div class="table-cell">
          <div class="action-button">
            <svg-icon icon-class="edit"></svg-icon>編輯
          </div>
          <div class="action-button">
            <svg-icon icon-class="delete"></svg-icon>刪除
          </div>
        </div>
      </div>
    </div>
    <div class="empty-info">目前尚未有活動！<br>
      <router-link class="create-btn" to="/create-activity">點此建立新活動</router-link>
    </div>
  </main>
</template>
<script>
export default {
  name: 'BackStageIndex',
  data () {
    return {
      activityList: []
    }
  },
  mounted () {
    this.getActivityList()
  },
  methods: {
    // 取得活動列表
    getActivityList () {
      let activityList = localStorage.getItem('activityList')
      if (activityList) {
        this.activityList = JSON.parse(activityList)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
main {
  width: 600px;
  margin: 0 auto;
}
.empty-info {
  padding: 64px;
  text-align: center;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid $lighter-theme-color;

  .create-btn {
    display: inline-block;
    background-color: $link-color;
    color: #fff;
    border-radius: 8px;
    padding: 12px 32px;
    margin-top: 16px;
  }
}

</style>
