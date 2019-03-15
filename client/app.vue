<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Todo></Todo>
    <Footer></Footer>
  </div>
</template>

<script>

import Header from "./layout/header.vue"; // 引入header.vue组件
import Footer from "./layout/footer.jsx"; // 引入footer.jsx组件   //不同组建方式而已
import Todo from "./views/todo/todo.vue"; // 引入todo.vue组件

export default {
  components: {  // 声明组件，之后便可以使用组件标签
    Header,
    Footer,
    Todo
  }
};
</script>


<style lang="stylus" scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: #555;
  opacity: 0.5;
  z-index: -1;
}
</style>
