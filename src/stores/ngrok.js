import { defineStore } from 'pinia'

export const useNgrokStore = defineStore('ngrok', {
  state: () => ({
    ngrokPath: " https://ac49-2001-b011-c006-d1dd-f846-ea9c-1392-4ae9.ngrok-free.app",
    localhost: "http://localhost:8081"
  }),
})