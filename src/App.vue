<template>
  <div id="app">
    <the-header/>
    <router-view/>
    <!-- <page-loader/> -->
  </div>
</template>

<script>
import '@/assets/styles/main.scss'
import TheHeader from '@/components/Layout/TheHeader'
import PageLoader from '@/components/Spinner/PageLoader'
export default {
  name: 'App',
  components: {
    TheHeader,
    PageLoader
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
</style>
