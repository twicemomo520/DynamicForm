import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state(){
    return{
        ngrokPath:"https://8e18-2001-b011-c006-526e-44ac-a12f-ab3a-50d5.ngrok-free.app",
        localhost: "http://localhost"
    }
  }
})
