<template>
  <form class="ticket-create-block" @submit.prevent="createTicket">
    <div class="sub-title">建立票種</div>
    <div class="inline-input-block first-child">
      <label for="">票種</label>
      <input type="text" v-model="ticketInfo.name" required>
    </div>
    <div class="inline-input-block">
      <label for="">售價</label>
      <input type="number" v-model.number="ticketInfo.price" required>
    </div>
    <button type="submit" class="btn btn-default btn-create">新增</button>
  </form>
</template>
<script>
let ticketConfig = {
  color: null,
  id: null,
  name: null,
  price: null
}
export default {
  name: 'CreateTicketForm',
  props: {
    ticketList: Array
  },
  data () {
    return {
      ticketInfo: JSON.parse(JSON.stringify(ticketConfig))
    }
  },
  methods: {
    // 新增票種
    createTicket () {
      // 隨機產生票卷顏色
      this.ticketInfo.color = `rgba(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()}, 0.4)`

      // without API use localStorage
      this.ticketInfo.id = new Date().valueOf()
      this.ticketList.push(this.ticketInfo)
      localStorage.setItem('ticketList', JSON.stringify(this.ticketList))
      // recover ticketInfo
      this.ticketInfo = JSON.parse(JSON.stringify(ticketConfig))
    },
    // 產生 0-255 的值
    randomColor () {
      return Math.floor((Math.random() * 255) + 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.ticket-create-block {
  position: relative;
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 32px;

  .sub-title {
    position: absolute;
    top: -6px;
    right: 16px;
    color: $theme-color;
  }

  .btn-create {
    position: absolute;
    right: 16px;
    bottom: 16px;
    padding: 8px 16px;
  }
}

.inline-input-block {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  border-radius: 4px;

  &.first-child {
    margin-bottom: 16px;
    margin-top: 16px;
  }

  label {
    flex: initial;
    width: 10%;
    margin-right: 8px;
  }
  input {
    flex: initial;
    width: 60%;
    height: 20px;
    padding: 0 8px;
  }
}
</style>

