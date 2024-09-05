<script>
import {useAlertStore} from "@/stores/alert"

export default{
    
    data(){
        return{
            alertStore: null 
        }
    },
    created() {
        this.alertStore = useAlertStore()
    },
    methods:{
        ableSuccessAlert(){
            this.alertStore.show("哈哈你好");
        }
    },
    computed:{
        successAlert() {
            return this.alertStore.showAlert; // 將 `showAlert` 狀態作為計算屬性
        }
    }
}
</script>


<template>
    <SuccessAlert v-if="this.alertStore.showAlert == true">
        <h1>{{this.alertStore.alertMessage}}</h1>
    </SuccessAlert>
    <h1>{{ alertStore }}</h1>
    <button @click="ableSuccessAlert">點擊</button>
</template>

<style scoped lang="scss">
</style>