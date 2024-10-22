import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state: () => ({
    ngrokPath: "https://5a7c-61-222-241-251.ngrok-free.app",
    localhost: "http://localhost"
  }),
})