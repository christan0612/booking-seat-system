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
              v-for="chosenTicketInfo in chosenTicketTable"
              :key="chosenTicketInfo.id"
            >
              <div class="table-cell">{{chosenTicketInfo.ticketDTO.name}}</div>
              <div class="table-cell">{{ chosenTicketInfo.number }}張</div>
              <div class="table-cell">{{ chosenTicketInfo.fullSeatNumber }}</div>
              <div class="table-cell">${{ chosenTicketInfo.ticketDTO.price * chosenTicketInfo.number | formatComma }}元</div>
            </div>
          </div>
          <div class="detail-info-block">
            總票數：<span class="number">{{ chosenSeatAmount }}</span>張，總金額 <span class="number">${{ totalPurchasePrice | formatComma }}</span>元
          </div>
          <div class="button-block">
            <button type="button" class="btn btn-default btn-payment">結帳</button>
          </div>
        </div>
        <div class="right-content">
          <div class="title">選擇座位</div>
          <div class="stage-container">
            <div class="stage">舞台</div>
            <div class="seat-container">
              <div class="seats-row seats-header">
                <div class="seats-name"></div>
                <div class="seats"
                  v-for="n in maxLength"
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
import { getEvent, purchaseTicket } from '@/API/Ticket'
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
      getEvent(this.$route.params.id).then(response => {
        // this.eventDTO = response.eventDTO
        this.eventDTO = {
            "id": 12,
            "ticketDTOList": [
                {
                    "id": 13,
                    "name": "normal",
                    "color": "#000000",
                    "price": 100
                },
                {
                    "id": 14,
                    "name": "VIP",
                    "color": "#111111",
                    "price": 10000
                }
            ],
            "seatRowDTOList": [
                {
                    "name": "A",
                    "count": 5,
                    "seatGroupDTOList": [
                        {
                            "groupType": "type-2",
                            "ticketDTO": {
                                "id": 13,
                                "name": "normal",
                                "color": "#000000",
                                "price": 100
                            },
                            "seatDTOList": [
                                {
                                    "id": 80,
                                    "number": 0,
                                    "fullSeatNumber": "A1",
                                    "status": "E"
                                },
                                {
                                    "id": 83,
                                    "number": 0,
                                    "fullSeatNumber": "A2",
                                    "status": "E"
                                }
                            ]
                        },
                        {
                            "groupType": "type-3",
                            "ticketDTO": {
                                "id": 14,
                                "name": "VIP",
                                "color": "#111111",
                                "price": 10000
                            },
                            "seatDTOList": [
                                {
                                    "id": 81,
                                    "number": 0,
                                    "fullSeatNumber": "A3",
                                    "status": "E"
                                },
                                {
                                    "id": 78,
                                    "number": 0,
                                    "fullSeatNumber": "A4",
                                    "status": "E"
                                },
                                {
                                    "id": 84,
                                    "number": 0,
                                    "fullSeatNumber": "A5",
                                    "status": "E"
                                }
                            ]
                        }
                    ]
                },
                {
                    "name": "B",
                    "count": 7,
                    "seatGroupDTOList": [
                        {
                            "groupType": "type-2",
                            "ticketDTO": {
                                "id": 14,
                                "name": "VIP",
                                "color": "#111111",
                                "price": 10000
                            },
                            "seatDTOList": [
                                {
                                    "id": 87,
                                    "number": 0,
                                    "fullSeatNumber": "B1",
                                    "status": "E"
                                },
                                {
                                    "id": 82,
                                    "number": 0,
                                    "fullSeatNumber": "B2",
                                    "status": "E"
                                }
                            ]
                        },
                        {
                            "groupType": "type-3",
                            "ticketDTO": {
                                "id": 14,
                                "name": "VIP",
                                "color": "#111111",
                                "price": 10000
                            },
                            "seatDTOList": [
                                {
                                    "id": 85,
                                    "number": 0,
                                    "fullSeatNumber": "B3",
                                    "status": "S"
                                },
                                {
                                    "id": 79,
                                    "number": 0,
                                    "fullSeatNumber": "B4",
                                    "status": "E"
                                },
                                {
                                    "id": 76,
                                    "number": 0,
                                    "fullSeatNumber": "B5",
                                    "status": "E"
                                }
                            ]
                        },
                        {
                            "groupType": "type-1",
                            "ticketDTO": {
                                "id": 14,
                                "name": "VIP",
                                "color": "#111111",
                                "price": 10000
                            },
                            "seatDTOList": [
                                {
                                    "id": 86,
                                    "number": 0,
                                    "fullSeatNumber": "B6",
                                    "status": "E"
                                }
                            ]
                        },
                        {
                            "groupType": "type-1",
                            "ticketDTO": {
                                "id": 14,
                                "name": "VIP",
                                "color": "#111111",
                                "price": 10000
                            },
                            "seatDTOList": [
                                {
                                    "id": 77,
                                    "number": 0,
                                    "fullSeatNumber": "B7",
                                    "status": "E"
                                }
                            ]
                        }
                    ]
                }
            ]
        }

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
        
      })
    },
    plusTicket () {
      this.buyTicketAmount += 1
    },
    minusTicket () {
      if (this.buyTicketAmount > 0)
      this.buyTicketAmount -= 1
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
          // 先判斷 已購買的table內是否有存在該票種
          let ticketExist = false
          this.chosenTicketTable.forEach(ticketInfo => {
            if (ticketInfo.ticketDTO.id === seatInfo.ticketDTO.id) {
              ticketExist = true
              ticketInfo.number += 1
            }
          })
          if (!ticketExist) {
            seatInfo.number += 1
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
        seatInfo.status = 'E'
        this.chosenSeatAmount -= 1

        let removeIndex = this.purchaseInfo.seatIdList.indexOf(seatInfo.id)
        this.purchaseInfo.seatIdList.splice(removeIndex, 1)

        let ticketTableIndex = -1
        this.chosenTicketTable.forEach((ticketInfo, index) => {
          if (ticketInfo.ticketDTO.id === seatInfo.ticketDTO.id) {
            if (ticketInfo.number === 1) {
              ticketTableIndex = index
            }
            ticketInfo.number -= 1
          }
        })

        if (ticketTableIndex > -1) {
          this.chosenTicketTable.splice(ticketTableIndex, 1)
        }
      }
    },
    purchase () {
      purchaseTicket(this.$route.params.id, this.purchaseInfo).then(response => {
        this.eventDTO = response.eventDTO
      })
    }
  },
  computed: {
    maxLength () {
      if (!this.eventDTO) return 0
      let max = 0
      this.eventDTO.seatRowDTOList.forEach(seatRow => {
        if(seatRow.count > max) {
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
.main-title {
  font-size: 24px;
  line-height: 1;
  margin-bottom: 16px;
  font-weight: bold;
  color: $theme-color;
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
    border-bottom: 1px solid $light-theme-color;

    &.table-head {
      background-color: $light-theme-color;
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
    background-color: $light-theme-color;
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
      background-color: $light-theme-color;
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
        background-color: $light-theme-color;
      }

    }
  }
}
</style>

