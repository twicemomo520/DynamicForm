<template>
  <canvas id="canvas" ref="canvas"></canvas>
</template>

<script>
// 將 Ball 類定義為外部類
class Ball {
  constructor(mouse, rgb) {
    this.mouse = mouse;
    this.rgb = rgb;
    this.getRandomInt = (min, max) => Math.round(Math.random() * (max - min)) + min;
    this.easeOutQuart = x => 1 - Math.pow(1 - x, 4);

    this.start = {
      // x: mouse.x + this.getRandomInt(-20, 20),
      // y: mouse.y + this.getRandomInt(-20, 20),
      // size: this.getRandomInt(30, 40),
      x: mouse.x + this.getRandomInt(10, 30),
      y: mouse.y + this.getRandomInt(10, 30),
      size: this.getRandomInt(2, 2),
    };
    this.end = {
      // x: this.start.x + this.getRandomInt(-300, 300),
      // y: this.start.y + this.getRandomInt(-300, 300),
      x: this.start.x + this.getRandomInt(-30, 300),
      y: this.start.y + this.getRandomInt(-30, 300),
    };

    this.x = this.start.x;
    this.y = this.start.y;
    this.size = this.start.size;
    this.style = rgb[this.getRandomInt(0, rgb.length - 1)];
    this.time = 0;
    this.ttl = 30;
  }

  draw(ctx) {
    ctx.fillStyle = this.style;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size+4, 0, Math.PI * 2);
    // ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }

  update() {
    if (this.time <= this.ttl) {
      let progress = 1 - (this.ttl - this.time) / this.ttl;
      this.size = this.start.size * (1 - this.easeOutQuart(progress));
      this.x += (this.end.x - this.x) * 0.01;
      this.y += (this.end.y - this.y) * 0.01;
    }
    this.time++;
  }
}

export default {
  data() {
    return {
      w: 0,
      h: 0,
      balls: [],
      mouse: {
        x: undefined,
        y: undefined,
      },
      rgb: [
        // "rgb(26, 188, 156)",
        // "rgb(46, 204, 113)",
        // "rgb(52, 152, 219)",
        // "rgb(155, 89, 182)",
        // "rgb(241, 196, 15)",
        // "rgb(230, 126, 34)",
        // "rgb(231, 76, 60)",
        // "#f9fbff",
        // "#f4f6fb",
        // "#eef1f6",
        // "#e1e5ee",
        // "#767b91",
        // "#4f546c",
        // "#2a324b",
        // "#161d34",
        // "#fff0c2",


        "#f9fbff",
        "#FF477E",
        "#FF5C8A",
        "#FF7096",
        "#FF85A1",
        "#FF99AC",
        "#FBB1BD",
        "#F9BEC7",
        "#F7CAD0",
        "#FAE0E4",


        // "#6930c3",
        // "#5e60ce",
        // "#5390d9",
        // "#4ea8de",
        // "#48bfe3",
        // "#56cfe1",
        // "#64dfdf",
        // "#72efdd",
        // "#80ffdb",
      ],
      ctx: null,
    };
  },
  methods: {
    init() {
      this.resizeReset();
      this.animationLoop();
    },
    resizeReset() {
      this.w = this.$refs.canvas.width = window.innerWidth;
      this.h = this.$refs.canvas.height = window.innerHeight;
    },
    animationLoop() {
      this.ctx.clearRect(0, 0, this.w, this.h);
      this.ctx.globalCompositeOperation = 'lighter';
      this.drawBalls();

      this.balls = this.balls.filter(ball => ball.time <= ball.ttl);

      requestAnimationFrame(this.animationLoop);
    },
    drawBalls() {
      this.balls.forEach(ball => {
        ball.update();
        ball.draw(this.ctx);
      });
    },
    mousemove(e) {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;

      for (let i = 0; i < 3; i++) {
        this.balls.push(new Ball(this.mouse, this.rgb));
      }
    },
    mouseout() {
      this.mouse.x = undefined;
      this.mouse.y = undefined;
    },
  },
  mounted() {
    this.ctx = this.$refs.canvas.getContext("2d");
    this.init();
    window.addEventListener("resize", this.resizeReset);
    window.addEventListener("mousemove", this.mousemove);
    window.addEventListener("mouseout", this.mouseout);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeReset);
    window.removeEventListener("mousemove", this.mousemove);
    window.removeEventListener("mouseout", this.mouseout);
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  height: 100dvh;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent; /* 確保畫布背景透明 */
  pointer-events: none; /* 使畫布不攔截鼠標事件 */
  z-index: 1; 
}
</style>