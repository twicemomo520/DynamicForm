<script>
import axios from 'axios'
import moment from 'moment';
import { useEditStore } from "@/stores/databaseEdit"

// test
export default {
    data() {
        return {
            quiz: null,
            feedbackList: [],
            feedbackMapList: [],
            subData: [],

            feedbackSingleList: null,

            nowPage: "singleInfoList" //or singleInfo
        }
    },

    created() {
        const formId = this.$route.query.formId;
        this.quiz = JSON.parse(formId)
        let quizId = this.quiz.id
        this.fetchFeedbackList(quizId)

    },

    methods: {
        fetchFeedbackList(quizId) {
            axios.post(`http://localhost:8080/quiz/feedback?quizId=${quizId}`)
                .then(response => {
                    const uniqueSet = new Set();

                    this.feedbackList = response.data.feedbackList
                    this.feedbackList.forEach(feedback => {
                        feedback.ans = feedback.ans.split(';')
                        const uniqueKey = `${feedback.name}-${feedback.email}`;
                        if (!uniqueSet.has(uniqueKey)) {
                            uniqueSet.add(uniqueKey); // 将唯一键添加到 Set 中
                            let info = {
                                "name": feedback.name,
                                "phone": feedback.phone,
                                "email": feedback.email,
                                "age": feedback.age,
                                "fillinDateTime": feedback.fillinDateTime
                            }
                            this.feedbackMapList.push(info)
                        }
                    })
                    this.subData = this.feedbackMapList.splice(0, 10)
                })
                .catch(error => {
                    console.error('Error fetching data:', error);  // 錯誤處理
                });
        },
        toSingleInfoPage(item) {
            this.nowPage = 'singleInfo'

            this.feedbackSingleList = this.feedbackList.filter(map => {
               return map.email == item.email
            })
        },
        findAnswer(feedbackSingleList, type, id, option){
            let feedbackSingleMap = feedbackSingleList.filter(map => {
                return map.quId == id})
            feedbackSingleMap = feedbackSingleMap[0]

            console.log(feedbackSingleMap)
            let ansList = feedbackSingleMap.ans
            return ansList.includes(option);

        },
        findAnswerText(feedbackSingleList,type, id){
            let feedbackSingleMap = feedbackSingleList.filter(map => {
                return map.quId == id})
            feedbackSingleMap = feedbackSingleMap[0]

            let ansList = feedbackSingleMap.ans
            return ansList[0];
        }


    },
    computed: {
        generateBottombar() {
            return Math.ceil(this.feedbackList.length / 10);
        }
    }
}
</script>

<template>

    <div class="full">
        <div class="singleInfoList" v-if="nowPage == 'singleInfoList'">
            <div class="tableContainer">
                <div class="content">
                    <table>
                        <thead>
                            <tr>
                                <th>編號</th>
                                <th>姓名</th>
                                <th>E-mail</th>
                                <th>填寫時間</th>
                                <th>查看統計</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(item, index) in subData"
                                :key="item.id"
                            >
                                <td class="formId">{{ index }}</td>
                                <td class="formName">{{ item.name }}</td>
                                <td class="formEmail">{{ item.email }}</td>
                                <td class="fillinDate">{{ item.fillinDateTime }}</td>
                                <td @click="toSingleInfoPage(item)">查看統計</td>
                            </tr>
                        </tbody>
                    </table>

                </div>
            </div>
            <div class="bottomBar">
                <i class="fa-regular fa-circle-left"></i>
                <div class="numberBar">
                    <span
                        v-for="index in generateBottombar"
                        :key="index"
                        @click="changeTab(index)"
                        :class="{ active: currentPage === index }"
                    >
                        {{ index }}
                    </span>
                </div>
                <i class="fa-regular fa-circle-right"></i>
            </div>
        </div>


        <div class="singleInfo" v-if="nowPage == 'singleInfo'">
            <div class="maxArea">
                <h1>{{ quiz.name }}</h1>
                <div class="formDescribe">{{ quiz.description }}</div>
                <div class="personalData">
                    <div class="personalDetail">
                        <p>姓名: {{ feedbackSingleList[0].name }}</p>
                    </div>
                    <div class="personalDetail">
                        <p>手機: {{ feedbackSingleList[0].phone }}</p>
                    </div>
                    <div class="personalDetail">
                        <p>E-mail: {{ feedbackSingleList[0].email }}</p>
                    </div>
                    <div class="personalDetail">
                        <p>年齡: {{ feedbackSingleList[0].age }}</p>
                    </div>
                </div>
                
                <div class="formTable" v-for="(item, index) in quiz.quesList">
                    <div class="formQuestion">
                        <p>{{ item.id }}. </p>
                        <p>{{ item.qu }}</p>
                        <p>{{ item.necessary ? "*" : "" }}</p>
                        <p>({{ item.type }})</p>
                    </div>

                    <div class="formSingle" v-if="item.type == '單選'" v-for="(option, optIndex) in item.options">

                        <div class="formSingleSub">
                            <i class='bx bx-radio-circle-marked ' v-if="findAnswer(feedbackSingleList,item.type,item.id,option)"></i>
                            <i class='bx bx-radio-circle' v-else></i>
                            <p>{{ option }}</p>
                        </div>
                    </div>

                    <div class="formMulti" v-if="item.type == '多選'" v-for="(option, optIndex) in item.options">

                        <div class="formMultiSub">
                            <i class='bx bxs-check-square ' v-if="findAnswer(feedbackSingleList,item.type,item.id,option)"></i>
                            <i class='bx bx-checkbox' v-else></i>
                            <p>{{ option }}</p>
                        </div>
                    </div>

                    <div class="formSelect"v-if="item.type == '選單'">

                        <div class="formSelectSub" v-for="option in item.options">
                            <i class='bx bxs-badge-check' v-if="findAnswer(feedbackSingleList,item.type,item.id,option)"></i>
                            <i class='bx bx-badge' v-else></i>
                            <p>{{ option }}</p>
                        </div>

                    </div>

                    <div class="formInput" v-if="item.type == '詳述'">
                        <p>{{ findAnswerText(feedbackSingleList,item.type,item.id) }}</p>
                    </div>

                </div>
            </div>

            <div class="button">
                <button @click="nowPage = 'singleInfoList'">上一頁</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
/*   color variables */
$clr-primary: #81d4fa;
$clr-primary-light: #e1f5fe;
$clr-primary-dark: #4fc3f7;
$clr-gray100: #f9fbff;
$clr-gray150: #f4f6fb;
$clr-gray200: #eef1f6;
$clr-gray300: #e1e5ee;
$clr-gray400: #767b91;
$clr-gray500: #4f546c;
$clr-gray600: #2a324b;
$clr-gray700: #161d34;
$clr-pending: #fff0c2;
$clr-pending-font: #a68b00;
$clr-unpaid: #ffcdd2;
$clr-unpaid-font: #c62828;
$clr-paid: #c8e6c9;
$clr-paid-font: #388e3c;
$clr-unpublished: #e0e0e0;
$clr-unpublished-font: #4b4b4b;
$clr-link: #2962ff;

/*   border radius */
$radius: 12px;

$fuschia: #ff0081;
$button-bg: $fuschia;
$button-text-color: #fff;
$baby-blue: #f8faff;

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.full {
    width: 80%;
    height: auto;
    padding: 5% 5%;
    // display: flex;
    // flex-direction: column;
    // align-items: center;
    // justify-content: center;
    flex-wrap: wrap;
    border-radius: 6px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
    .singleInfoList {
        .tableContainer {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            .content {
                table {
                    width: 100%;
                    table-layout: fixed;
                    border-collapse: collapse;
                    border-spacing: 0;
                    background-color: white;
                    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);

                    thead {
                        box-shadow: 0 5px 10px $clr-gray300;
                    }

                    tr {
                        background-color: white;
                        border-radius: 12px;
                    }

                    tr:nth-child(even) {
                        background-color: $clr-gray200;
                    }

                    th {
                        padding: 10px 20px;
                        text-align: left;
                        letter-spacing: 0.1rem;
                        font-weight: 900;
                        font-size: 20px;
                        background-color: $clr-gray300;

                    }

                    td {
                        padding: 10px 20px;
                        text-align: left;
                        letter-spacing: 0.1rem;
                        font-size: 20px;
                    }

                    td:last-child {
                        cursor: pointer;
                        color: rgba(25, 18, 238, 0.774);
                    }

                    td:nth-child(6) {
                        cursor: pointer;
                        color: rgba(25, 18, 238, 0.774);
                    }

                    tr.hovered {
                        transition: all 0.2s ease-in;
                        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);
                    }

                    tr.selected {
                        // background:  #c3c9ee; 
                        background: #ced6fd;
                        box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.5), -1px -1px 8px rgba(0, 0, 0, 0.2);
                        // border-bottom: 2px solid rgba(0, 0, 255, 0.54);
                    }

                }
            }

        }

        .bottomBar {
            width: 100%;
            height: 5%;
            display: flex;
            align-items: center;
            justify-content: space-around;
            margin: 30px 0;

            .numberBar {
                display: flex;

                .active {
                    border-radius: 10px;
                    background-color: #795334;
                    color: white;
                }

                span {
                    display: block; // 为了让内容居中
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    font-size: 30px;
                    cursor: pointer;
                    transition: 0.3s;
                    text-align: center;
                    line-height: 40px;
                    color: black;

                    &:hover {
                        border-radius: 10px;
                        background: #7953347d;
                        transition: 0.3s;
                    }
                }
            }

            .fa-regular {
                font-size: 30px;
                cursor: pointer;

                &:hover {
                    transform: scale(1.2);
                    transition: 0.3s;
                }
            }
        }
    }

    .singleInfo {
        .maxArea{

            p {
                font-size: 20px;
            }
            h1{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }

            .formDescribe{
                margin: 20px 0;
                padding: 0 20%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
            }
            .personalData{
                margin-bottom: 30px ;
                padding: 0 30%;
                .personalDetail{
                    background-color: #f8d5d580;;
                    margin-bottom: 30px ;
                }
            }
            .formTable{

                .formQuestion{
                    display: flex;
                    margin: 50px 0 15px 0;
                }
                .formSingle{
                    .formSingleSub{
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }
                }
                .formMulti{
                    .formMultiSub{
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }
                }
                .formSelect{
                    .formSelectSub{
                        display: flex;
                        align-items: center;
                        margin-left: 20px;
                    }
                }
                .formInput{
                    display: flex;
                    align-items: center;
                    margin-left: 20px;
                }
            }
        }
        .button{
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 20px 0;
        }
    }
}
</style>
