<style lang='scss' scoped>
.loading-box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  .loading-txt {
    font-size: 35px;
    font-weight: bold;
    color: #f4f6f8;
    position: relative;
    &::before {
      content: attr(data-txt);
      position: absolute;
      color: rgba(0, 186, 186, 0.5);
      overflow: hidden;
      width: 0%;
      animation: dh 1s linear infinite;
    }
    @keyframes dh {
      from {
        width: 0%;
      }
      to {
        width: 100%;
      }
    }
  }
}
</style>

<template>
  <div class="loading-box">
    <span data-txt="LOADING"
          class="loading-txt">LOADING</span>
  </div>
</template>