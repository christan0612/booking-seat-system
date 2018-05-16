<template>
  <main>
    <div class="container">
      <h1 class="main-title">票務後台</h1>
      <div class="content-container">
        <div class="left-content">
          <div class="title">票種設定</div>
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
          <div class="ticket-table">
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
            v-if="ticketList.length === 0"
          >目前尚未建立任何票種
          </div>
        </div>
        <div class="right-content">
          <div class="title">建立座位表</div>
          <draggable
            class="seats-type-container"
            v-model="seatTypeList"
            :options="{
              draggable: '.seats-type',
              sort: false,
              group: {
                name: 'seatRow',
                pull: 'clone',
                put: false
              }
            }"
            :clone="onClone"
          >
            <div class="seats-type"
              v-for="seatType in seatTypeList"
              :key="seatType.groupType"
            >
              <div class="seat"
                v-for="(seat, index) in seatType.seatDTOList"
                :key="index"
              ></div>
            </div>
          </draggable>
          <div class="stage-container">
            <div class="stage">舞台</div>
            <div class="seats-row-container">
              <div class="seats-row"
                v-for="(seatRowInfo, rowIndex) in modifyEventDTO.seatRowDTOList"
                :key="seatRowInfo.name"
              >
                <div class="name">{{seatRowInfo.name}}</div>
                <draggable
                  class="seats-container"
                  v-model="seatRowInfo.seatGroupDTOList"
                  :options="{
                    draggable: '.seats-type',
                    group: 'seatRow',
                    sort: true
                  }"
                  :data-row="rowIndex"
                  @add="addSeats"
                >
                  <div class="seats-type"
                    v-for="(seatType, index) in seatRowInfo.seatGroupDTOList"
                    :key="seatType.groupId"
                  >
                    <div class="seat"
                      :style="{backgroundColor: ticketColor(seatType.ticketDTO.id) }"
                      v-for="seat in seatType.seatDTOList"
                      :key="seat.id"
                      @click.stop="seatType.showTicketModal = !seatType.showTicketModal"
                    ></div>
                    <div class="choose-ticket-type-block" v-if="seatType.showTicketModal">
                      <div class="label">選擇票種：</div>
                      <select v-model="seatType.ticketDTO.id" @change="seatType.showTicketModal = false">
                        <option :value="null">請選擇</option>
                        <option
                          v-for="ticket in ticketList"
                          :key="ticket.id"
                          :value="ticket.id">{{ ticket.name }}</option>
                      </select>
                    </div>
                    <div class="delete-seat-block" @click.stop="deleteSeats(rowIndex, index)">
                      <svg-icon icon-class="remove" class="delete-icon"></svg-icon>
                    </div>
                  </div>
                </draggable>
                <div class="add-new-row" @click="addNewRow(rowIndex)">+</div>
              </div>
            </div>
          </div>
          <div class="total-seats-info">
            總座位: <span class="seats-number">{{ totalSeats }}</span> 人
          </div>
          <div class="total-tickets-type-info">
            <div class="tickets-info"
            >
              <div class="color default"></div>
              <div class="name">尚未選擇</div>
            </div>
            <div class="tickets-info"
              v-for="ticketInfo in ticketList"
              :key="ticketInfo.id"
            >
              <div class="color" :style="{backgroundColor: ticketInfo.color }"></div>
              <div class="name">{{ ticketInfo.name }}</div>
            </div>
          </div>
          <div class="button-block">
            <button type="button" class="btn btn-default btn-save" @click="saveSeatsInfo">儲存</button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<script>
import { Message } from 'element-ui'
import { createTicket, createEvent } from '@/API/Ticket'
import draggable from 'vuedraggable'
let ticketConfig = {
  color: null,
  id: null,
  name: null,
  price: null
}
let rowSeatsConfig = {
  count: null,
  name: null,
  seatGroupDTOList: []
}
export default {
  name: 'BackStage',
  components: {
    draggable
  },
  data () {
    return {
      ticketInfo: JSON.parse(JSON.stringify(ticketConfig)),
      // 票種清單
      ticketList: [],
      modifyEventDTO: {
        id: null,
        seatRowDTOList: [
          {
            count: null,
            name: 'A',
            seatGroupDTOList: []
          }
        ],
        ticketDTOList: []
      },
      // 座位種類
      seatTypeList: [
        {
          groupId: null,
          groupType: 'type-1',
          showTicketModal: false,
          ticketDTO: {
            id: null
          },
          seatDTOList: [
            {
              id: null,
              number: null
            }
          ]
        },
        {
          groupId: null,
          groupType: 'type-2',
          showTicketModal: false,
          ticketDTO: {
            id: null
          },
          seatDTOList: [
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            }
          ]
        },
        {
          groupId: null,
          groupType: 'type-3',
          showTicketModal: false,
          ticketDTO: {
            id: null
          },
          seatDTOList: [
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            }
          ]
        },
        {
          groupId: null,
          groupType: 'type-4',
          showTicketModal: false,
          ticketDTO: {
            id: null
          },
          seatDTOList: [
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            }
          ]
        },
        {
          groupId: null,
          groupType: 'type-5',
          showTicketModal: false,
          ticketDTO: {
            id: null
          },
          seatDTOList: [
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            },
            {
              id: null,
              number: null
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 新增票種
    createTicket () {
      // 隨機產生票卷顏色
      this.ticketInfo.color = `rgba(${this.randomColor()}, ${this.randomColor()}, ${this.randomColor()}, 0.4)`

      createTicket(this.ticketInfo).then(response => {
        this.ticketInfo.id = response.ticketDTO.id
        this.ticketList.push(this.ticketInfo)
        this.ticketInfo = JSON.parse(JSON.stringify(ticketConfig))
      })
    },
    // 產生 0-255 的值
    randomColor () {
      return Math.floor((Math.random() * 255) + 1)
    },
    // 加新的一排
    addNewRow (index) {
      let newRows = JSON.parse(JSON.stringify(rowSeatsConfig))
      this.modifyEventDTO.seatRowDTOList.push(newRows)
      for (let i = index; i < this.modifyEventDTO.seatRowDTOList.length; i++) {
        // 編碼 A - Z
        this.modifyEventDTO.seatRowDTOList[i].name = String.fromCharCode(65 + i)
      }
    },
    onClone (element) {
      return JSON.parse(JSON.stringify(element))
    },
    // 新增座位
    addSeats (element) {
      this.modifyEventDTO.seatRowDTOList[element.to.dataset.row].seatGroupDTOList[element.newIndex].groupId = new Date().valueOf()
    },
    // 票卷顏色
    ticketColor (value) {
      for (let i = 0; i < this.ticketList.length; i++) {
        if (value === this.ticketList[i].id) {
          return this.ticketList[i].color
        }
      }
    },
    // 儲存票卷
    saveSeatsInfo () {
      // 檢查是不是都有選票種
      let checkTicketInfo = false
      this.modifyEventDTO.seatRowDTOList.forEach(rowInfo => {
        rowInfo.seatGroupDTOList.forEach(groupInfo => {
          if (!groupInfo.ticketDTO.id) {
            Message({
              showClose: true,
              message: '所有座位皆須選擇票種',
              type: 'info'
            })
            checkTicketInfo = true
          }
        })
      })
      if (checkTicketInfo) return false

      // 票種資訊
      this.modifyEventDTO.ticketDTOList = this.ticketList
      // 移除彈出視窗資訊
      this.modifyEventDTO.seatRowDTOList.forEach(rowInfo => {
        let numberCount = 1
        rowInfo.seatGroupDTOList.forEach(groupInfo => {
          groupInfo.seatDTOList.forEach(seat => {
            seat.number = numberCount
            numberCount++
          })
          this.$delete(groupInfo, 'showTicketModal')
        })
      })

      createEvent(this.modifyEventDTO).then(response => {
        this.$router.push(`/front-stage/${response.eventDTO.id}`)
      })
    },
    // 刪除座位
    deleteSeats (rowIndex, index) {
      this.modifyEventDTO.seatRowDTOList[rowIndex].seatGroupDTOList.splice(index, 1)
    }
  },
  computed: {
    // 總座位
    totalSeats () {
      let total = 0
      this.modifyEventDTO.seatRowDTOList.forEach(row => {
        row.seatGroupDTOList.forEach(seat => {
          total += seat.seatDTOList.length
        })
      })
      return total
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
.seats-type-container {
  position: relative;
  width: 100%;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  background-color: #f9f9f9;
  padding: 16px;
  margin-bottom: 16px;
}
.seats-type {
  display: flex;
  flex-wrap: wrap;
  margin-right: 16px;
  background-color: transparent;
  cursor: move;

  .seat {
    width: 40px;
    height: 40px;
    background-color: $light-theme-color;
    border-radius: 8px;

    &:not(:last-child) {
      margin-right: 8px;
    }
  }
}
.stage-container {
  border: 2px solid $theme-color;
  margin-bottom: 16px;
  padding: 0 8px;

  .stage {
    width: 60px;
    margin: 0 auto;
    background-color: $light-theme-color;
    text-align: center;
    padding: 4px 8px;
    margin-bottom: 16px;
  }
}
.seats-row {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 8px;
  align-items: center;

  .name {
    flex: 1;
  }

  .seats-container {
    flex: initial;
    width: 90%;
    background-color: #f2f2f2;
    border-radius: 4px;
    min-height: 32px;
    margin-right: 4px;

    .seats-type {
      position: relative;
      float: left;
      margin-right: 0;
      cursor: pointer;
    }
    .seat {
      width: 32px;
      height: 32px;
      background-color: #fff;
      border: 1px solid $theme-color;
    }
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
    .delete-seat-block {
      position: absolute;
      right: 2px;
      top: -5px;
      color: #fff;
      background-color: $theme-color;
      border-radius: 50%;
    }
  }

  .add-new-row {
    font-size: 24px;
    line-height: 28px;
    width: 32px;
    height: 32px;
    text-align: center;
    background-color: $theme-color;
    color: #fff;
    border-radius: 4px;
  }
}
.total-seats-info {
  margin-bottom: 16px;
  text-align: center;

  .seats-number {
    color: $theme-color;
    font-size: 20px;
    font-weight: bold;
  }
}
.total-tickets-type-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 16px;

  .tickets-info {
    display: flex;
    align-items: center;
    margin-right: 16px;

    .color {
      width: 14px;
      height: 14px;
      border-radius: 4px;
      margin-right: 4px;
      background-color: #fff;

      &.default {
        border: 1px solid $theme-color;
      }
    }
    .name {

    }
  }
}
.button-block {
  text-align: right;

  .btn-save {
    padding: 8px 24px;
    cursor: pointer;
  }
}
</style>
