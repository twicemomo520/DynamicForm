<script>
export default{
    data(){
        return{
            firstPage:{
                formName:'',
                formDescribe:'',
                startDate:'',
                endDate:''   
            },

        }
    },
    props:["databaseItem", "testItem"],
    
    // computed: {
    //     formattedItem() {
    //         return JSON.parse(JSON.stringify(this.databaseItem));
    //     }
    // },

    methods:{
        nextPage(){
            sessionStorage.setItem('inputDataTitle', JSON.stringify(this.firstPage)) //名字叫inputData，存firstPage進去
            sessionStorage.setItem('inputDataAll', JSON.stringify(this.firstPage))

            this.$emit('changeView', 'QuestionContent')
        },
        inputBox(text){
            let len = text.length
            let height = parseInt(len / 32)
            let width = len % 32
            return [width, height]
        },
        updateStartTime(){
            let now = new Date()
            now.setDate(now.getDate() + 2); 

            let year = now.getFullYear();       
            let month = String(now.getMonth() + 1).padStart(2, '0');   
            let day = String(now.getDate()).padStart(2, '0');
            this.firstPage.startDate = `${year}-${month}-${day}`;
        },
        updateEndTime(){
            let now = new Date()
            now.setDate(now.getDate() + 7); 

            let year = now.getFullYear();       
            let month = String(now.getMonth() + 1).padStart(2, '0');   
            let day = String(now.getDate()).padStart(2, '0');
            this.firstPage.endDate = `${year}-${month}-${day}`;
        },
        clearTableSession(){
            sessionStorage.removeItem("inputDataTitle")
        }
    },
    created(){
        this.updateStartTime();
        this.updateEndTime();
        let savedData = sessionStorage.getItem('inputDataTitle')
        if (savedData){
            this.firstPage = JSON.parse(savedData)  
        }

        if (this.databaseItem){
            this.firstPage = this.databaseItem.firstPage
        }
 
        // this.firstPage = this.databaseItem.firstPage

        window.addEventListener("beforeunload", this.clearTableSession)
    },

    
}
</script>

<template>
    <div class="maxArea">
        <!-- <h1>哈囉{{ testItem }}</h1> -->
        <!-- <h1>{{ databaseItem}}</h1> -->
        <div class="inputArea">
            <p>問卷名稱: </p>
            <textarea type="text" class="inputResize" v-model="firstPage.formName" v-bind:style="{width: inputBox(firstPage.formName)[0]+'px', height:inputBox(firstPage.formName)[1]}+'px'"  placeholder="問卷名稱">
            </textarea>
        </div>  
        
        <div class="inputArea">
            <p>問卷說明: </p>
            <textarea type="text" class="inputResize" v-model="firstPage.formDescribe" placeholder="問卷說明">
            </textarea> 
        </div>

        <div class="inputArea">
            <p>開始時間: </p>
            <input type="date" class="inputFixed" v-model="firstPage.startDate">
        </div>
        
        <div class="inputArea">
            <p>結束時間: </p>
            <input type="date" class="inputFixed" v-model="firstPage.endDate">
        </div>

        <button v-on:click="nextPage">下一頁</button>
    </div>

</template>


<style scoped lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.maxArea{    

    width: 60%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 12px;
    box-shadow: 2px 2px 12px rgba(0,0,0,0.2), -1px -1px 8px rgba(0,0,0,0.2);
    padding: 4% 2%;
    margin-bottom: 2%;

    .inputArea{
        width: 100%;
        height: auto;
        display: flex;
        align-items: center;
        justify-content: left;
        p{
            font-weight: 400;
        }

        input, textarea{
            width: 150px;
            height:30px;
            margin-left: 20px;  
            flex-wrap: wrap;
            background-color:#ffe3e3;
            color:#737373;
            border: 1px solid rgb(207, 111, 131);
            border-radius: 6px;
            padding: 10px;
            &:focus {
                outline: none; /* 移除默認的focus邊框 */
                border: 1px solid rgb(207, 111, 131);
            }
            &:nth-child(0){
                width: 500px;

            }
        }
        .inputResize{
            width: 500px;
            height: 100px;
            margin-top: 1%;

        }

    }
    button{
        width: 100px;
        height: 50px;
        cursor: pointer;
        border-radius: 15px;
        border:none;
        color:white;
        font-size: 20px;
        background: #5fa8d3;  /* fallback for old browsers */
        &:hover{
            background-color: rgb(215, 231, 124);
            color: #023e8a;
        }


    }
}


</style>