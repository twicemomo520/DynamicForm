import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state(){
    return{
        ngrokPath:"https://452d-2001-b011-c006-f6c2-ad3e-82f6-de31-f689.ngrok-free.app",
        localhost: "http://localhost"
    }
  }
})
