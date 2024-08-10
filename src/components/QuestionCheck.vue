<script>

export default{
    data(){
        return{
            firstPage:null,
        }
    },
    methods:{
        previousPage(){
            this.$emit("changeView", 'QuestionContent')
        },
        formOption(formOption){
            formOption
        }

    },
    created(){
        let firstPage= sessionStorage.getItem("inputTitleContent")
        if (firstPage){
            this.firstPage = JSON.parse(firstPage)
        }
    },

}
</script>

<template>
    
    <div class="maxArea">
        <!-- <h1>{{ firstPage }}</h1> -->

        <h1>{{firstPage.firstPage.formName}}</h1>
        <div class="formDescribe">{{firstPage.firstPage.formDescribe}}</div>
        <div class="personalData">
            <div class = "personalDetail">
                <p>姓名:</p>
                <input type="text">
            </div>
            <div class = "personalDetail">
                <p>手機:</p>
                <input type="tel">
            </div>
            <div class = "personalDetail">
                <p>E-mail:</p>
                <input type="email">
            </div>
            <div class = "personalDetail">
                <p>年齡:</p>
                <input type="number">
            </div>
        </div>
        <div class="formTable" v-for="item in firstPage.firstPage.tableData">
            <div class="formQuestion">
                <p>{{ item.formQuestion }}</p>
                <p>({{ item.formSingleOrMulti }})</p>
                <p>({{ item.formMustCheckbox ? "必填" : "選填"}})</p>
            </div>
            <p>{{ item.formOption }}</p>
        </div>

        <button v-on:click="previousPage">上一頁</button>

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
    padding: 5% 5%;
    width: 60%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    flex-wrap: wrap;
    .formDescribe{
        margin-top: 20px;
    }

    .personalData{
        width: 100%;
        .personalDetail{
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: -40px;
            &:last-child{
                margin-bottom: 0;
            }
            p{
                width: 50px; 
                font-weight: 400;
            }
            input{
                width: 300px;
                height:30px;
                margin-left: 5%;
                flex-wrap: wrap;
                background-color:#ffe3e3;
                color:#737373;
                border: 1px solid rgb(207, 111, 131);
                
                &:focus {
                    outline: none; /* 移除默認的focus邊框 */
                    border: 1px solid rgb(207, 111, 131);
                }

            }

            
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
    .formTable{
        width: 100%;
        margin-bottom: 40px;
        .formQuestion{
            display: flex;
            align-items: center;
            justify-content: start;
            
            p{
                &:first-child{
                    margin-left: 0; /* 为其他 <p> 标签添加左边距 */
                }

                margin-left: 10px; /* 为其他 <p> 标签添加左边距 */
            }

        }
    }
}
</style>