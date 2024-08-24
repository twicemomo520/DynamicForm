
<script>
    import axios from 'axios';
    export default {
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
        sendToJava(){
          axios.post('http://localhost:8080/quiz/create', 
          {
              "name": "晚餐",
              "description":"調查今天晚餐吃什麼",
              "startDate":"2024-09-25",
              "endDate":"2024-09-30",
              "published":false,
              "quesList":[{
                  "quizId":1,
                  "id":4,
                  "qu":"請問你要吃什麼晚餐呢?",
                  "type":"單選",
                  "necessary":false,
                  "options":"義大利麵"
              }]
          })

            .then(response => {
                alert(response);
                console.log(response.data.message);
                })
            .catch(error => {
                console.error('Failed to save data:', error);
              });
        }
      }
    };
</script>



<template>
  
  <div id="app" class="fleck-background">
    <h1>Hello Houdini!</h1>
    <button @click="sendToJava">發送到JAVA</button>
  </div>

</template>


<style scoped lang="scss">
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.fleck-background {
  // --fleck-seed: 123456;
  // --fleck-count: 1000;
  // --fleck-size-base: 5px;
  // --fleck-color-1: #ffb5d7;
  // --fleck-color-2: #a6bfeb;
  // --fleck-color-3: #cce0ee;
  // --fleck-color-4: #ebaedc;
  // background-color: hsl(213, 48%, 97%);
  // background-image: paint(fleck);
  // height: 100vh; /* 背景覆盖整个视口 */
  // display: flex;
  // align-items: center;
  // justify-content: center;


  --colors: #f94144, #f3722c, #f8961e, #f9844a, #f9c74f, #90be6d, #43aa8b, #4d908e, #577590, #277da1;
  --min-radius: 20;
  --max-radius: 100;
  --num-circles: 30;
  --min-opacity: 10;
  --max-opacity: 50;
  --seed: 42;
  background-image: paint(circles);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button{
    font-size: 30px;
    border-radius: 10px;
    border: none;
    background: #f9844a;
    cursor: pointer;
    &:active{
    background: black;
    color: white;
  }
  }


}
</style>