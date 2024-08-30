<script>
import axios from 'axios';
import * as echarts from 'echarts';
export default {
    data() {
        return {
            quiz: null,
            statisticsList: [],
            option: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '5%',
                    left: 'center'
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,
                            position: 'center'
                        },
                        emphasis: {
                            label: {
                                show: true,
                                fontSize: 20,
                                fontWeight: 'bold'
                            }
                        },
                        labelLine: {
                            show: false,
                            
                        },
                        data: [

                        ]
                    }
                ]
            }
        }
    },
    created() {
        this.quiz = JSON.parse(this.$route.query.formId)
        let quizId = this.quiz.id
        this.fetchStatistics(quizId)
    },

    methods: {
        async fetchStatistics(quizId) {
            try {
                const response = await axios.post(`http://localhost:8080/quiz/statistics?quizId=${quizId}`)
                this.statisticsList = await response.data.statisticsList
                this.drawAllCharts()
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },
        drawAllCharts() {
            this.statisticsList.forEach((statistics) => {
                this.drawChart(statistics.optionCountMap, statistics.quId);
            });
        },
        drawChart(obj, quId) {
            this.option.series[0].data = []
            

            for (const key in obj) {
                const value = obj[key];
                this.option.series[0].data.push({ "name":key, "value":value })
            }

            const myChart = echarts.init(document.querySelector(`.echart-${quId}`))
            myChart.setOption(this.option)
        }
    }
}
</script>

<template>
    <div class="maxArea">
        <!-- <h1>{{ quiz }}</h1>\n -->
        <!-- <h1>{{ statisticsList[0] }}</h1>\n -->
        <!-- <h1>{{ option.series[0].data }}</h1> -->

        <h1>{{ quiz.name }}</h1>
        <div class="formDescribe">{{ quiz.description }}</div>
        
        <div class="formTable" v-for="(ques, index) in quiz.quesList">

            <div class="formQuestion">
                <p>{{ ques.id }}.</p>
                <p>{{ ques.qu }}</p>
                <p>{{ ques.necessary ? "*" : "" }}</p>
                <p>({{ ques.type }})</p>
            </div>
            
            <div class="echart" :class="`echart-${ques.id}`" v-if="ques.type!='詳述'">

            </div>
            
            <div  v-if="ques.type=='詳述'">

            </div>
        </div>

    </div>
</template>


<style scoped lang="scss">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Zen Kaku Gothic New", sans-serif;
}

.maxArea {

    width: 80%;
    height: auto;
    padding: 5% 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 6px;
    box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2), -1px -1px 8px rgba(0, 0, 0, 0.2);

    .formDescribe {
        margin-top: 20px;
        font-size: 20px;
        margin: 50px 0;
    }

    .personalData {
        width: 100%;

        .personalDetail {
            width: 100%;
            height: 100px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: -40px;

            &:last-child {
                margin-bottom: 0;
            }

            p {
                width: 50px;
                height: 20px;
                font-weight: 400;
            }

            input {
                width: 300px;
                height: 30px;
                margin-left: 2%;
                flex-wrap: wrap;
                background-color: #f8d5d5;
                color: #737373;
                border-left: none;
                /* 去除左边框 */
                border-right: none;
                /* 去除右边框 */
                border-top: none;
                /* 去除上边框 */
                border-bottom: 1px solid rgb(207, 111, 131);
                outline: none;

                &:focus {
                    outline: none;
                    /* 移除默認的focus邊框 */

                }

            }


        }
    }

    .formTable {
        width: 100%;
        margin-bottom: 40px;

        .formQuestion {
            display: flex;
            align-items: center;
            justify-content: start;
            margin-bottom: 5px;
            font-size: 20px;

            p {
                &:nth-child(3) {
                    color: red;
                }

                &:last-child {
                    margin-left: 10px; //為p標籤增加左邊間距
                }

            }
        }

        .echart {
            width: 100%;
            height: 300px;
        }

        input,
        select {
            border-radius: 6px;
            border: 1px solid #F7F7F5;
        }

        textarea {
            width: 500px;
            height: 200px;
            flex-wrap: wrap;
            background-color: #ffe3e3;
            color: #737373;
            border: 1px solid rgb(207, 111, 131);
            outline: none;
            resize: none;
        }

    }

    .submitButton {
        display: flex;
        align-items: center;
        justify-content: start;

        button {
            width: 100px;
            height: 50px;
            margin: 20px;
            cursor: pointer;
            border-radius: 15px;
            border: none;
            color: white;
            font-size: 20px;
            background: #5fa8d3;

            /* fallback for old browsers */
            &:hover {
                background-color: rgb(215, 231, 124);
                color: #023e8a;
            }
        }

        .button-link {
            display: flex;
            /* 使用 flexbox */
            align-items: center;
            /* 垂直居中 */
            justify-content: center;
            /* 水平居中 */
            width: 100px;
            height: 50px;
            margin: 20px;
            cursor: pointer;
            border-radius: 15px;
            border: none;
            color: white;
            font-size: 20px;
            background: #5fa8d3;
            /* fallback for old browsers */
            text-decoration: none;

            /* 移除默认的下划线 */
            &:hover {
                background-color: rgb(215, 231, 124);
                color: #023e8a;
            }
        }
    }
}
</style>