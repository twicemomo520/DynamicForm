import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state: () => ({
    ngrokPath: "https://2ba1-1-173-235-3.ngrok-free.app",
    localhost: "http://localhost:8081"
  }),
})