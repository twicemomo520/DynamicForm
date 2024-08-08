import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state(){
    return{
      sum:6,
      school:"台積電",
      address:" 新竹科學園區"
    }
  }
})
