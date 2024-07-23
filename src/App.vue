<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
</script>

<template>
  
  <div class="outerArea">
    <div class="header">
      <Header />
    </div>
    <div class="content">
      <RouterView />
    </div>
  </div>
</template>

<style scoped lang = "scss">
.outerArea{
  width:100dvw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: 
        linear-gradient(rgba(255,255,255, 0.7), rgba(0,0,0, 0.7)), /* 半透明背景颜色 */
        url("./assets/mapleStory.png");
 

  
  .header{
  width:100%;
  height:10dvh;
  }
  .content{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
}



</style>
