<template>
  <main>
    <div class="container">
      <h1 class="main-title">購票</h1>
      <div class="content-container">
        <div class="left-content">
          <div class="title">選擇票數</div>
          <div class="number-control-block">
            <div class="control-block" @click="minusTicket">
              <svg-icon icon-class="minus" class="control-icon"></svg-icon>
            </div>
            <div class="number">{{ buyTicketAmount }}</div>
            <div class="control-block" @click="plusTicket">
              <svg-icon icon-class="plus" class="control-icon"></svg-icon>
            </div>
          </div>
          <div class="title">購票明細</div>
          <div class="ticket-table">
            <div class="table-head table-row">
              <div class="table-cell">票種</div>
              <div class="table-cell">票數</div>
              <div class="table-cell">位置</div>
              <div class="table-cell">小計</div>
            </div>
            <div class="table-row"
              v-if="chosenTicketTable.length > 0"
              v-for="chosenTicketInfo in chosenTicketTable"
              :key="chosenTicketInfo.id"
            >
              <div class="table-cell">{{chosenTicketInfo.ticketDTO.name}}</div>
              <div class="table-cell">{{ chosenTicketInfo.number }}張</div>
              <div class="table-cell">
                <div
                  v-for="seat in chosenTicketInfo.seatList"
                  :key="seat"
                >{{ seat }}</div>
              </div>
              <div class="table-cell">${{ chosenTicketInfo.ticketDTO.price * chosenTicketInfo.number | formatComma }}元</div>
            </div>
          </div>
          <div class="empty-block"
            v-if="chosenTicketTable.length === 0"
          >
            尚未選擇座位
          </div>
          <div class="detail-info-block">
            總票數：<span class="number">{{ chosenSeatAmount }}</span>張，總金額 <span class="number">${{ totalPurchasePrice | formatComma }}</span>元
          </div>
          <div class="button-block">
            <button type="button" class="btn btn-default btn-payment" @click="purchase">結帳</button>
          </div>
        </div>
        <div class="right-content">
          <div class="title">選擇座位</div>
          <div class="stage-container">
            <div class="stage">舞台</div>
            <div class="seat-container" v-if="eventDTO">
              <div class="seats-row seats-header">
                <div class="seats-name"></div>
                <div class="seats"
                  v-for="n in maxLength"
                  :key="n"
                >{{n}}</div>
              </div>
              <div class="seats-row"
                v-for="seatRow in eventDTO.seatRowDTOList"
                :key="seatRow.id"
              >
                <div class="seats-name">{{seatRow.name}}</div>
                <div class="seats"
                  v-for="seatInfo in seatRow.seatList"
                  :key="seatInfo.id"
                  :class="{'sold-out': seatInfo.status === 'S', 'chosen': seatInfo.status === 'C'}"
                  @click="chooseSeat(seatInfo)"
                >{{seatInfo.fullSeatNumber}}</div>
              </div>
            </div>
          </div>
          <div class="seats-info-block">
            <div class="seats-info">
              <div class="color available"></div>
              <div class="name">可劃位</div>
            </div>
            <div class="seats-info">
              <div class="color sold-out"></div>
              <div class="name">已售出</div>
            </div>
            <div class="seats-info">
              <div class="color chosen"></div>
              <div class="name">您選擇的座位</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { Message } from 'element-ui'
import activityDTO from '@/config/activity'
// import { getEvent, purchaseTicket } from '@/API/Ticket'
export default {
  name: 'FrontStage',
  data () {
    return {
      buyTicketAmount: 0,
      chosenSeatAmount: 0,
      chosenTicketTable: [],
      eventDTO: null,
      purchaseInfo: {
        seatIdList: []
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      // API
      // getEvent(this.$route.params.id).then(response => {
      //   this.setEventData(response)
      // })
      this.setEventData(activityDTO)
    },
    plusTicket () {
      this.buyTicketAmount += 1
    },
    minusTicket () {
      if (this.buyTicketAmount > 0) {
        if (this.chosenSeatAmount === this.buyTicketAmount) {
          Message({
            showClose: true,
            message: '請先取消座位',
            type: 'info'
          })
        } else {
          this.buyTicketAmount -= 1
        }
      }
    },
    setEventData (response) {
      this.eventDTO = response.eventDTO

      // 將座位往上拉一層出來
      this.eventDTO.seatRowDTOList.forEach(rows => {
        let seatList = []
        rows.seatGroupDTOList.forEach(group => {
          // 增加票卷資訊
          group.seatDTOList.forEach(seat => {
            this.$set(seat, 'ticketDTO', group.ticketDTO)
          })
          seatList = [...seatList, ...group.seatDTOList]
        })
        this.$set(rows, 'seatList', seatList)
      })
    },
    chooseSeat (seatInfo) {
      // 先判斷是不是可以購買
      if (seatInfo.status === 'S') return false
      // 判斷是要購買還是要取消
      if (this.purchaseInfo.seatIdList.indexOf(seatInfo.id) === -1) {
        // 購買
        // 先判斷數量是否超過
        if (this.chosenSeatAmount < this.buyTicketAmount) {
          seatInfo.status = 'C'
          this.chosenSeatAmount += 1
          this.purchaseInfo.seatIdList.push(seatInfo.id)
          // 先判斷 已購買的table內是否有存在該票種
          let ticketExist = false
          this.chosenTicketTable.forEach(ticketInfo => {
            if (ticketInfo.ticketDTO.id === seatInfo.ticketDTO.id) {
              ticketExist = true
              ticketInfo.number += 1
              ticketInfo.seatList.push(seatInfo.fullSeatNumber)
            }
          })
          if (!ticketExist) {
            seatInfo.number = 1
            this.$set(seatInfo, 'seatList', [seatInfo.fullSeatNumber])
            this.chosenTicketTable.push(seatInfo)
          }
        } else {
          Message({
            showClose: true,
            message: '請先增加票數',
            type: 'info'
          })
        }
      } else {
        // 取消
        // 恢復座位狀態
        seatInfo.status = 'E'
        // 已選擇的座位數- 1
        this.chosenSeatAmount -= 1
        // 從送給後端的資料中移除
        let removeIndex = this.purchaseInfo.seatIdList.indexOf(seatInfo.id)
        this.purchaseInfo.seatIdList.splice(removeIndex, 1)
        // 找出目前的座位在購票明細中的位置
        let ticketTableIndex = -1
        this.chosenTicketTable.forEach((ticketInfo, index) => {
          if (ticketInfo.ticketDTO.id === seatInfo.ticketDTO.id) {
            if (ticketInfo.number === 1) {
              ticketTableIndex = index
            } else {
              ticketInfo.number -= 1
              let seatIndex = ticketInfo.seatList.indexOf(seatInfo.fullSeatNumber)
              ticketInfo.seatList.splice(seatIndex, 1)
            }
          }
        })

        if (ticketTableIndex > -1) {
          this.chosenTicketTable.splice(ticketTableIndex, 1)
        }
      }
    },
    purchase () {
      if (this.chosenSeatAmount < this.buyTicketAmount) {
        Message({
          showClose: true,
          message: `還可以挑選${this.buyTicketAmount - this.chosenSeatAmount}個位置`,
          type: 'info'
        })
        return false
      }

      // API
      // purchaseTicket(this.$route.params.id, this.purchaseInfo).then(response => {
      //   this.setEventData(response)
      //   this.buyTicketAmount = 0
      //   this.chosenSeatAmount = 0
      //   this.chosenTicketTable = []
      //   this.purchaseInfo.seatIdList = []

      //   Message({
      //     showClose: true,
      //     message: '購買成功！',
      //     type: 'success'
      //   })
      // }).catch(response => {
      //   this.setEventData(response)
      //   this.chosenSeatAmount = 0
      //   this.chosenTicketTable = []
      //   this.purchaseInfo.seatIdList = []
      // })

      this.buyTicketAmount = 0
      this.chosenSeatAmount = 0
      this.chosenTicketTable = []
      this.purchaseInfo.seatIdList = []

      Message({
        showClose: true,
        message: '購買成功！',
        type: 'success'
      })
    }
  },
  computed: {
    maxLength () {
      if (!this.eventDTO) return 0
      let max = 0
      this.eventDTO.seatRowDTOList.forEach(seatRow => {
        if (seatRow.count > max) {
          max = seatRow.count
        }
      })
      return max
    },
    totalPurchasePrice () {
      let sum = 0
      if (this.chosenTicketTable.length === 0) return sum

      this.chosenTicketTable.forEach(ticketInfo => {
        sum += ticketInfo.number * ticketInfo.ticketDTO.price
      })
      return sum
    }
  }
}
</script>
<style lang="scss" scoped>
.content-container {
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  border-radius: 4px;

  .left-content, .right-content {
    flex: initial;
    padding: 32px;
  }

  .left-content {
    width: 40%;
    border-right: 1px solid #f2f2f2;
  }
  .right-content {
    position: relative;
    width: 60%;
  }

  .title {
    margin-bottom: 16px;
    font-weight: 600;
    border-left: 3px solid $theme-color;
    padding-left: 6px;
  }
}
.number-control-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  width: 160px;
  margin: 32px auto;

  .control-block {
    width: 32px;
    height: 32px;
    text-align: center;
    background-color: $theme-color;
    color: #fff;
    border-radius: 50%;
    user-select: none;
  }
  .number {
    text-align: center;
    user-select: none;
  }
  .control-icon {
    font-size: 16px;
    height: 32px;
  }
}
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
}
.empty-block {
  text-align: center;
  background-color: #f2f2f2;
  padding: 32px;
  margin-bottom: 16px;
}
.detail-info-block {
  text-align: center;
  margin-bottom: 32px;

  .number {
    margin: 0 8px;
    color: $theme-color;
    font-size: 20px;
    font-weight: bold;
  }
}
.button-block {
  text-align: center;

  .btn-payment {
    padding: 8px 24px;
  }
}
.stage-container {
  width: 100%;
  margin-bottom: 32px;

  .stage {
    background-color: $lighter-theme-color;
    width: 80px;
    margin: 0 auto;
    padding: 10px;
    text-align: center;
    margin-bottom: 8px;
  }
  .seats-row {
    display: flex;
    flex-wrap: wrap;
    margin: 4px;
    align-items: center;

    &.seats-header {
      .seats {
        border: none;
      }
    }
  }
  .seats-name {
    flex: initial;
    width: 40px;
  }
  .seats {
    width: 32px;
    height: 32px;
    line-height: 32px;
    margin-right: 8px;
    background-color: #fff;
    border: 1px solid $theme-color;
    border-radius: 4px;
    text-align: center;
    font-size: 12px;
    cursor: pointer;

    &.sold-out {
      background-color: $theme-color;
      color: #fff;
      cursor: not-allowed;
    }

    &.chosen {
      background-color: $lighter-theme-color;
    }
  }
}
.seats-info-block {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .seats-info {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-right: 16px;

    .color {
      width: 16px;
      height: 16px;
      margin-right: 4px;
      background-color: #fff;
      border-radius: 4px;

      &.available {
        border: 1px solid $theme-color;
      }
      &.sold-out {
        background-color: $theme-color;
      }
      &.chosen {
        background-color: $lighter-theme-color;
      }

    }
  }
}
</style>
