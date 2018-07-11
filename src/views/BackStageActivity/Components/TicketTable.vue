<template>
  <div class="ticket-table"
    v-if="ticketList.length > 0"
  >
    <div class="table-head table-row">
      <div class="table-cell">票種</div>
      <div class="table-cell">售價</div>
      <div class="table-cell">顏色</div>
    </div>
    <div class="table-row"
      v-if="ticketList.length > 0"
      v-for="ticket in ticketList"
      :key="ticket.id"
    >
      <div class="table-cell">{{ ticket.name }}</div>
      <div class="table-cell">${{ ticket.price | formatComma }}元</div>
      <div class="table-cell"><div class="color" :style="{backgroundColor: ticket.color }"></div></div>
    </div>
  </div>
  <div class="empty-block"
    v-else
  >目前尚未建立任何票種</div>
</template>
<script>
export default {
  name: 'TicketTable',
  props: {
    ticketList: Array
  }
}
</script>
<style lang="scss" scoped>
.ticket-table {
  display: table;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 16px;

  .table-row {
    display: table-row;
    border-bottom: 1px solid $lighter-theme-color;

    &.table-head {
      background-color: $lighter-theme-color;
    }
  }
  .table-cell {
    display: table-cell;
    padding: 10px;
  }

  .center {
    text-align: center;
  }

  .color {
    width: 50%;
    height: 10px;
  }
}
.empty-block {
  text-align: center;
  background-color: #f2f2f2;
  padding: 32px;
  margin-bottom: 16px;
}
</style>
