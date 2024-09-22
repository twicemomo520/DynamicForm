<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'
import { ref, onMounted, onBeforeUnmount } from 'vue'

const loadCircleWorklet = async () => {

    if ('paintWorklet' in CSS) {
      await CSS.paintWorklet.addModule('https://unpkg.com/css-houdini-circles/dist/circles.js');
    } 
    else {
      console.error('Your browser does not support Paint Worklet.');
    }
}

onMounted(() => {
  loadCircleWorklet();
})

</script>

<template>
  
  <div class="outerArea">
    <!-- <mouseEffect /> -->
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

  --colors: #f941447d, #f3722c81, #f8961e77, #f9844a79, #f9c64f80, #90be6d7c, #43aa8b7c, #4d908e75, #57759075, #277ca179;
    --min-radius: 20;
    --max-radius: 100;
    --num-circles: 30;
    --min-opacity: 10;
    --max-opacity: 50;
    --seed: 42;
  // --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
  //   --min-radius: 20;
  //   --max-radius: 100;
  //   --num-circles: 30;
  //   --min-opacity: 10;
  //   --max-opacity: 50;
  //   --seed: 42;
    background-image: paint(circles);
  
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
    // margin-bottom: 5%;


  }
}



</style>
