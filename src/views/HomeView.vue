<script>
import mouseEffect from '@/components/mouseEffect/mouseEffect.vue';
import {useHeaderPageStore} from "@/stores/headerPage"
  export default {
    components:{
        // mouseEffect
    },
    data(){
        return{
            currentEevee:"eevee1",
            current:0,
            eeveeList:["eevee1","eevee2","eevee3"],
            
        }
    },
    mounted() {
      this.loadPaintWorklet();
      this.loadCircleWorklet();
    },
    methods: {
      async loadPaintWorklet() {
        // 检查浏览器是否支持 Paint Worklet
        if ('paintWorklet' in CSS) {
          // 加载 fleck 的 Paint Worklet
          CSS.paintWorklet.addModule('https://unpkg.com/@georgedoescode/houdini-fleck');
        } else {
          console.error('Your browser does not support Paint Worklet.');
        }
      },

      async loadCircleWorklet() {
        // 检查浏览器是否支持 Paint Worklet
        if ('paintWorklet' in CSS) {
          // 加载 fleck 的 Paint Worklet
          CSS.paintWorklet.addModule('https://unpkg.com/css-houdini-circles/dist/circles.js');
        } else {
          console.error('Your browser does not support Paint Worklet.');
        }
      },
      nextEevee(){
        this.current+=1
        let index = this.current% this.eeveeList.length
        this.currentEevee = this.eeveeList[index]
      },
      previousEevee(){
        this.current= this.current-1+this.eeveeList.length
        let index = this.current% this.eeveeList.length
        this.currentEevee = this.eeveeList[index]
      }
    }
  };
</script>

<template>
    <!-- <mouseEffect/> -->
    <div class="">
        <input type="checkbox" class="toggle" id = "rounded">
        <label for="rounded" data-checked="Checked" class="rounded" data-unchecked="Unchecked">你好啊</label>
    </div>

    <div class="entrance">
        <div class="container">

            <i class="fa-solid fa-circle-arrow-left" @click="previousEevee"></i>
            <img src="https://media.tenor.com/1u2Ec4YuB7wAAAAj/yumereborn-eevee.gif" alt="" v-if="currentEevee == 'eevee1'">
            <img src="https://media1.tenor.com/m/y4Oz22A3Y0MAAAAC/eevee.gif" alt="" v-if="currentEevee == 'eevee2'">
            <img src="https://media.tenor.com/lqHAZvFWKYQAAAAi/eeveelution-pokemon.gif" alt="" v-if="currentEevee == 'eevee3'">
            <i class="fa-solid fa-circle-arrow-right" @click="nextEevee"></i>

            <div class="manageSurvey-container">
                <i class='bx bxs-file ' ></i>
                <RouterLink class = "manageSurvey"  to="/ManageSurvey" @click="useHeaderPageStore().currentHeaderPage = 'ManageSurvey'">管理問卷</RouterLink>
            </div>
            <div class="fillSurvey-container">
                <!-- <i class="fa-solid fa-file-signature"></i> -->
                <i class='bx bx-edit-alt bx-tada' ></i>
                <RouterLink class = "fillSurvey"  to="/FillSurvey" @click="useHeaderPageStore().currentHeaderPage = 'FillSurvey'">填問卷</RouterLink>
            </div>
        </div>
    </div>   
</template>

<style scoped lang="scss">

@keyframes spin  {
            0% {
                transform: rotateX(0deg);
            }
            100% {
                transform: rotateX(7200deg);
            }
        }
@keyframes orbit {
            0% {
                transform: rotate(0deg) translateX(100px);
            }
            100% {
                transform: rotate(360deg) translateX(100px);
            }
        }        
@keyframes slideAnimation {
            0%, 100% {
                transform: translateX(0);   /* 在动画开始和结束时，按钮处于原始位置 */
            }
            50% {
                transform: translateX(100dvw); /* 在动画中间，按钮向右移动100像素 */
            }
}
.entrance{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    // background:linear-gradient(45deg, #FFAFBD, #ffc3a0);
    // background:linear-gradient(145deg, #c7a8ef 0%, #c7a8ef 50%, #8249cd 50%, #8249cd 100%);

    // --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
    // --min-radius: 20;
    // --max-radius: 100;
    // --num-circles: 30;
    // --min-opacity: 10;
    // --max-opacity: 50;
    // --seed: 42;
    // background-image: paint(circles);
    // height: 100vh; /* 背景覆盖整个视口 */
    // display: flex;
    // align-items: center;
    // justify-content: center;
   
    .container{
        width: 80%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        img{
            border-radius: 50%;
            width: 300px;
            height: 300px;
        }
        i{
            font-size: 40px;
            cursor: pointer;
        }

        .manageSurvey-container{
            width: 350px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #8249cd;
            border-radius: 55px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            cursor: pointer;

            &:hover{
                transition: 0.5s;
                transform: rotateX(720deg) scale(1.05);

            }

            .manageSurvey,.fa-file-lines{
                text-decoration: none;
                color: white;
                font-size: 28px;
                font-weight: 500;
                margin-left: 8px;
            }
        }
        .fillSurvey-container{
            width: 350px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #c7a8ef;
            border-radius: 55px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            cursor: pointer;
            // animation: spin 5s linear infinite, orbit 5s linear infinite;
            transform-origin: -50px 50%;
            &:hover{
                transition: 0.5s;
                transform: rotateZ(360deg) scale(1.05); 

            }

            .fillSurvey,.fa-file-signature{
                text-decoration: none;
                color: black;
                font-size: 28px;
                font-weight: 500;
                margin-left: 8px;
            }
        }
    }
}
</style>
