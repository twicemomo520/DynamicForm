import { defineStore } from "pinia";
import { useRoute, useRouter } from 'vue-router'
export const useHeaderPageStore = defineStore('HeaderPage',{
    state(){
        return{
            currentHeaderPage:useRoute().path
        }
    }
})