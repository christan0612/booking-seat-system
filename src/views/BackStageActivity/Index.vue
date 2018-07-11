<template>
  <main>
    <div class="container">
      <h1 class="main-title">票務後台</h1>
      <div class="content-container">
        <div class="left-content">
          <div class="title">票種設定</div>
          <create-ticket-form
            :ticket-list="ticketList"
          ></create-ticket-form>
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
                      @click.stop="toggleTicketTypeSelect(seatType)"
                    ></div>
                    <ticket-type-select
                      v-if="seatType.showTicketModal"
                      :ticket-list="ticketList"
                      :seat-type="seatType"
                    ></ticket-type-select>
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
import seatTypeConfig from '@/config/seatType'
// import { createEvent } from '@/API/Ticket'
import draggable from 'vuedraggable'
// component
import CreateTicketForm from './Components/CreateTicketForm'
import TicketTypeSelect from './Components/TicketTypeSelect'


let rowSeatsConfig = {
  count: null,
  name: null,
  seatGroupDTOList: []
}
export default {
  name: 'Activity',
  components: {
    draggable,
    CreateTicketForm,
    TicketTypeSelect
  },
  data () {
    return {
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
      seatTypeList: seatTypeConfig
    }
  },
  mounted () {
    // 檢查是否有建立好的票種
    this.getTicketInfo()
  },
  methods: {
    getTicketInfo () {
      let ticketList = localStorage.getItem('ticketList')
      if (ticketList) {
        this.ticketList = JSON.parse(ticketList)
      }
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

      // API
      // createEvent(this.modifyEventDTO).then(response => {
      //   this.$router.push(`/front-stage/${response.eventDTO.id}`)
      // })
    },
    // 刪除座位
    deleteSeats (rowIndex, index) {
      this.modifyEventDTO.seatRowDTOList[rowIndex].seatGroupDTOList.splice(index, 1)
    },
    // 開啟票種選擇
    toggleTicketTypeSelect (seatType) {
      seatType.showTicketModal = !seatType.showTicketModal
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
    background-color: $lighter-theme-color;
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
    background-color: $lighter-theme-color;
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
