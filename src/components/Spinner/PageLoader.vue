<template>
  <div id="spin-container">
    <div class="loader"></div>
  </div>
</template>
<style lang="scss" scoped>
#spin-container {
  background-color: #e8f0f9;
  opacity: 0.9;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
}
// loading icon
.loader {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 40px 0 #0082c3;
  position: relative;
  animation: loader 0.8s ease-in-out alternate infinite;
  animation-delay: 0.32s;
  top: 50%;
  margin: -35px auto 0;
}
.loader::after, .loader::before {
  content: '';
  position: absolute;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  box-shadow: 0 40px 0 #0082c3;
  animation: loader 0.8s ease-in-out alternate infinite;
}
.loader::before {
  left: -30px;
  animation-delay: 0.48s;
}
.loader::after {
  right: -30px;
  animation-delay: 0.16s;
}

@keyframes loader {
  0% {
    box-shadow: 0 40px 0 #0082c3; }
  100% {
    box-shadow: 0 20px 0 #0082c3; }
}

</style>
