import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTalkStore = defineStore('talk', {
  state(){
    return{
      talkList:[
        {id:"1", title:"今天你有點怪，怪好看的"},
        {id:"2", title:"草莓藍莓蔓越莓，你今天想我了沒"},
        {id:"3", title:"我給你留了塊地我的死心踏地"},
      ]
    }
  }
})
