<script>
import PiniaCount from "../components/PiniaCount.vue"
import PiniaLoveTalk from "../components/PiniaLoveTalk.vue"
import Adam from "../components/Adam.vue"
import Cat from "../components/Cat.vue"

export default{
    data(){
        return{
            
        }
    },
    components:{
        Cat,
        Adam,
        PiniaCount,
        PiniaLoveTalk
    }
}
</script>

<template>
    <Cat/>
    <Adam/>
    <PiniaCount/>
    <PiniaLoveTalk/>

</template>


<style scoped lang="scss">
</style>