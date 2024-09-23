import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state(){
    return{
        ngrokPath:" https://14a0-2001-b011-c006-786f-6904-79ef-1ca4-6c86.ngrok-free.app",
        localhost: "http://localhost"
    }
  }
})
