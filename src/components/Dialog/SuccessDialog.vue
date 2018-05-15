<template>
  <div id="success-dialog" tabindex="-1" role="dialog">
    <transition name="slide-down">
      <div v-if="show" class="dialog" role="document">
        <div class="dialog-content">
          <div class="content" v-if="content">{{ content }}</div>
          <div class="long-content"
            v-if="longContent"
            v-html="longContent"
          ></div>
          <div class="dialog-btn-block">
            <button type="button" class="btn-normal btn-major left-route-btn"
              v-if="leftBtnName"
              @click="leftRoute"
            >{{ leftBtnName }}</button>
            <button type="button" class="btn-normal btn-default right-route-btn"
              v-if="rightBtnName"
              @click="rightRoute"
            >{{ rightBtnName }}</button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
export default {
  name: 'SuccessDialog',
  props: {
    content: {
      type: String,
      default: ''
    },
    longContent: {
      type: String,
      default: ''
    },
    leftBtnName: {
      type: String,
      default: ''
    },
    rightBtnName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      // 為了 transition
      show: false
    }
  },
  mounted () {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden'
    this.show = true
  },
  destroyed () {
    document.getElementsByTagName('body')[0].removeAttribute('style')
    this.show = false
  },
  methods: {
    leftRoute () {
      this.$emit('left-route')
    },
    rightRoute () {
      this.$emit('right-route')
    }
  }
}
</script>
<style lang="scss" scoped>
#success-dialog {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;

  &:before {
    display: block;
    content: "";
    background-color: rgba(26,23,27,0.8);
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  .dialog {
    position: fixed;
    width: 400px;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 0 auto;
  }
  .dialog-content {
    background-color: #fff;
    padding: 64px 72px;
    text-align: center;
    box-shadow: 0px 1px 10px 0px rgba(87,93,94,0.5);
  }
  .content {
    margin-bottom: 32px;
    color: $theme-color;
    font-size: 30px;
    line-height: 40px;
    font-weight: bold;
  }
  .long-content {
    font-size: 16px;
    line-height: 20px;
    margin-bottom: 32px;
    color: $theme-color;
  }
  .dialog-btn-block {

    >.btn-normal {
      font-weight: normal;
    }

    .left-route-btn {
      margin-right: 10px;
    }
  }
}
</style>
