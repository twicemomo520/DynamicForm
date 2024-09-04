import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state(){
    return{
        ngrokPath:"https://0ebf-60-249-247-226.ngrok-free.app",
        localhost: "http://localhost"
    }
  }
})
