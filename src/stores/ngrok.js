import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state: () => ({
    ngrokPath: "https://2b5a-61-64-13-28.ngrok-free.app",
    localhost: "http://localhost:8081"
  }),
})