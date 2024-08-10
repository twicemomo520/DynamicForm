<script>
import Furiosa from "../components/Furiosa.vue";
import CheckboxInitial from "../components/checkboxStyle/CheckboxInitial.vue";
import CehckboxChecked from "../components/checkboxStyle/CheckboxChecked.vue";
import CheckboxCheckedDisabled from "../components/checkboxStyle/CheckboxCheckedDisabled.vue";
import CehckboxDisabled from "../components/checkboxStyle/CheckboxDisabled.vue";
export default{
    data(){
        return{

        }
    },
    components:{
        CheckboxInitial,
        CehckboxChecked,
        CheckboxCheckedDisabled,
        CehckboxDisabled,
        Furiosa,
    }
}
</script>

<template>
    <CheckboxInitial/>
    <CehckboxChecked/>
    <CheckboxCheckedDisabled/>
    <CehckboxDisabled/>
    <Furiosa/>
</template>


<style>
</style>