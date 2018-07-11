<template>
  <div class="choose-ticket-type-block">
    <div class="label">選擇票種：</div>
    <select v-model="seatType.ticketDTO.id" @change="changeType">
      <option :value="null">請選擇</option>
      <option
        v-for="ticket in ticketList"
        :key="ticket.id"
        :value="ticket.id"
      >{{ ticket.name }}</option>
    </select>
  </div>
</template>
<script>
export default {
  name: 'TicketTypeSelect',
  props: {
    ticketList: {
      type: Array
    },
    seatType: {
      type: Object
    }
  },
  mounted () {
    document.addEventListener('click', this.autoHide, false)
  },
  destroyed () {
    document.removeEventListener('click', this.autoHide, false)
  },
  methods: {
    autoHide (evt) {
      if (this.seatType.showTicketModal) {
        if (!this.$el.contains(evt.target)) {
          this.seatType.showTicketModal = false
        }
      }
    },
    changeType () {
      this.seatType.showTicketModal = false
    }
  }
}
</script>
<style lang="scss" scoped>
.choose-ticket-type-block {
  width: 100px;
  position: absolute;
  bottom: -64px;
  left: 0;
  background-color: #fff;
  padding: 4px;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0,0,0,0.3);
  z-index: 10;

  &:after {
    bottom: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
    border-color: rgba(136, 183, 213, 0);
    border-bottom-color: #fff;
    border-width: 5px;
    margin-left: -5px
  }

  .label {
    font-size: 12px;
  }

  select {
    border: none;
  }
}
</style>
