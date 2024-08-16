<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import mouseEffect from './components/mouseEffect/mouseEffect.vue';

</script>

<template>
  
  <div class="outerArea">
    <mouseEffect />
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
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-repeat: no-repeat;      
  background-size: cover;
 

  
  .header{
    width:15%;
    height: 100%;
  }
  .content{
    width:85%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }
}



</style>
