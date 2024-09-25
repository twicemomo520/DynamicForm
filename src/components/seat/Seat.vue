<template>
    <div
      class="hidden-panel"
      :style="{ transform: `translateX(${translateX}px)` }"
      @mousedown="startDrag"
      @mouseup="endDrag"
      @mousemove="onDrag"
      @mouseleave="cancelDrag"
    >
      <div class="content">隱藏內容</div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isDragging: false,
        startX: 0,
        translateX: 300, // 初始隱藏的區塊位置
        panelWidth: 300,
        screenWidth: window.innerWidth,
        isHovered: false, // 追蹤滑鼠是否在最右邊
      };
    },
    methods: {
      startDrag(event) {
        this.isDragging = true;
        this.startX = event.clientX;
      },
      onDrag(event) {
        if (this.isDragging) {
          const dragDistance = event.clientX - this.startX;
          this.translateX = Math.min(0, Math.max(-this.panelWidth, dragDistance + this.panelWidth));
        }
      },
      endDrag() {
        if (this.isDragging) {
          const halfway = this.panelWidth / 2;
          // 如果超過一半，展開；否則收回
          if (Math.abs(this.translateX) > halfway) {
            this.translateX = 0; // 完全展開
          } else {
            this.translateX = -this.panelWidth; // 收回去
          }
        }
        this.isDragging = false;
      },
      cancelDrag() {
        this.isDragging = false;
      },
      handleMouseMove(event) {
        // 當滑鼠移動到最右邊 20px 時，顯示部分隱藏內容
        if (event.clientX > this.screenWidth - 20 && !this.isDragging) {
          this.translateX = this.translateX - 20; // 顯示 20px 寬度
        //   this.isHovered = true;
        } else if (this.isHovered && !this.isDragging) {
          // 如果滑鼠離開最右邊，隱藏內容自動收回
          this.translateX = -this.panelWidth;
          this.isHovered = false;
        }
      },
    },
    mounted() {
      // 監聽滑鼠移動事件
      window.addEventListener("mousemove", this.handleMouseMove);
    },
    beforeDestroy() {
      // 移除事件監聽器
      window.removeEventListener("mousemove", this.handleMouseMove);
    },
  };
  </script>
  
  <style scoped>
  .hidden-panel {
    position: fixed;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: #f0f0f0;
    transform: translateX(300px); /* 初始完全隱藏 */
    transition: transform 0.3s ease;
    cursor: grab;
  }
  
  .content {
    padding: 20px;
  }
  </style>
  