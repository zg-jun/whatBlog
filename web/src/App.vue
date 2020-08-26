<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
body,
html {
  margin: 0;
  padding: 0;
}

// 全部链接
a {
  text-decoration: none;
  color: #606975;
  cursor: pointer;
  border-bottom: 1px solid #606975;
  transition: all 0.2s linear;
  &:hover {
    background: #00baba;
    color: #fff;
  }
}

#app {
  // font-family: Avenir, Helvetica, Arial, sans-serif;
  // -webkit-font-smoothing: antialiased;
  // -moz-osx-font-smoothing: grayscale;
  font-family: "Josefin Sans Light", -apple-system, BlinkMacSystemFont,
    "Helvetica Neue", "PingFang SC", "'Hiragino Sans GB", STHeiti,
    "Microsoft Yahei", "Source Han Sans SC", "Noto Sans CJK SC",
    "WenQuanYi Micro Hei", Arial, Verdana, sans-serif;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
