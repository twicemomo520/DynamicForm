import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state(){
    return{
        ngrokPath: "https://4189-2001-b011-c006-3a52-1c21-d10a-a2d3-8aca.ngrok-free.app",
        localhost: "http://localhost"
    }
  }
})
