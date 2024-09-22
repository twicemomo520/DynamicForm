<script>
import * as echarts from 'echarts';
import axios from 'axios';
export default{
    data(){
        return{
            currentHead:'日',
            dateForDay: new Date(),
            dateForMonth: new Date(),
            dateForYear: new Date(),

            startDate: this.getTodayDate(),
            endDate: this.getTodayDate(),

            joinOrderList:[],

            optionPie: {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    top: '10%',
                    left: 'center',
                    textStyle: {
                        fontSize: 18,  // 設置圖例的字體大小
                        color: '#000'                      
                    }
                },
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        center: ['50%', '65%'],  // 將圓餅圖下移以增加與圖例的距離
                        itemStyle: {
                            borderRadius: 10,
                            borderColor: '#fff',
                            borderWidth: 2
                        },
                        label: {
                            show: false,  // 確保標籤顯示
                            fontSize: 16,  // 調整 name 字體大小
                            fontWeight: 'bold',  // 設置字體粗細
                            formatter: '{b}',  // b 代表 name，這樣只顯示 name 不會顯示 value
                            position: 'outside'  // 確保標籤在圓餅外部
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
            },
            optionLine:{
                tooltip: {
                        trigger: 'axis',  // 當軸上的數據被觸發時顯示 tooltip
                    },
                legend: {
                    data:['銷售額'],
                    // top: '10%',
                    left: 'center',
                    textStyle: {
                        fontSize: 18,  // 設置圖例的字體大小
                        color: '#000'                      
                    }
                },      
                grid: {
                    top: '10%',
                    left: '3%',
                    right: '3%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu'],
                    boundaryGap: false // 不留白，从原点开始
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        name:'銷售額',
                        type: 'line',
                        label: {
                                show: false,  // 顯示數據標籤
                                position: 'top'  // 數值顯示在數據點上方
                            },
                        //显示出来折线图的面积
                        areaStyle: {
                            normal: {
                                // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: 'rgba(80,141,255,0.39)'
                                }, {
                                    offset: 0.25,
                                    color: 'rgba(56,155,255,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(38,197,254,0.00)'
                                }])
                            }
                        },
                        data: [32, 51, 41, 49, 50, 25,16],

                    }
                ]
            }
        }
    },    
    created(){

    },
    mounted() {
        axios.post("http://localhost:8080/pos/statistics", {   
                        "startDate":this.startDate,
                        "endDate":this.endDate
        })
        .then(response => {
            this.joinOrderList = response.data.joinOrderList
        })
        
        
        this.drawChart()
        
    },
    computed:{
        currentDay() {
            const year = this.dateForDay.getFullYear();
            const month = String(this.dateForDay.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，需加 1
            const day = String(this.dateForDay.getDate()).padStart(2, '0'); // 格式化日期，確保兩位數
            return `${year}年${month}月${day}日`;
        },
        previousDay() {
            const newDate = new Date(this.dateForDay); // 先複製當前日期
            newDate.setDate(newDate.getDate() - 1); // 修改新日期的值
            this.dateForDay = newDate; // 賦值給 date，這樣 Vue 才能監測變化
        },
        nextDay() {
            const newDate = new Date(this.dateForDay); // 先複製當前日期
            newDate.setDate(newDate.getDate() + 1); // 修改新日期的值
            this.dateForDay = newDate; // 賦值給 date，這樣 Vue 才能監測變化
        },

        ///////////////////////////////////////////////////////////
        currentMonth() {
            const year = this.dateForMonth.getFullYear();
            const month = String(this.dateForMonth.getMonth()+1).padStart(2, '0'); // 月份從 0 開始，需加 1
            return `${year}年${month}月`;
        },
        previousMonth(){
            const newDate = new Date(this.dateForMonth);
            newDate.setMonth(newDate.getMonth() - 1);
            this.dateForMonth = newDate;
        },
        nextMonth(){
            const newDate = new Date(this.dateForMonth);
            newDate.setMonth(newDate.getMonth() + 1);
            this.dateForMonth = newDate;        
        },
        ///////////////////////////////////////////////////////////
        currentYear() {
            const year = this.dateForYear.getFullYear();
            return `${year}年`;
        },
        previousYear(){
            const newDate = new Date(this.dateForYear);
            newDate.setFullYear(newDate.getFullYear() - 1);
            this.dateForYear = newDate;
        },
        nextYear(){
            const newDate = new Date(this.dateForYear);
            newDate.setFullYear(newDate.getFullYear() + 1);
            this.dateForYear = newDate;        
        },




    },
    methods:{
        drawChart() {
            const myChart = echarts.init(document.querySelector(".echart"))
            myChart.setOption(this.optionLine)
        },
        selectPeriod(type){
            this.currentHead = type
        },

        getTodayDate() {
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0'); // 月份從 0 開始，需加 1
            const day = String(today.getDate()).padStart(2, '0'); // 確保日期是兩位數
            return `${year}-${month}-${day}`;
        },
    },


}
</script>

<template>
    <div class="container">

        <div class="innerContainer">

            <div class="dashboardContainer">
                <h1 class="dashboardLeft">Dashboard</h1>
                <div class="dashboardRight">
                    <i class='bx bxs-grid'></i>
                    <button>Export CSV</button>
                </div>
            </div>
            <div class="navHead">
                <h1 class="headStyle" :class="{headStyleClick: currentHead == '日'}" @click="selectPeriod('日')">日</h1>
                <h1 class="headStyle" :class="{headStyleClick: currentHead == '月'}" @click="selectPeriod('月')">月</h1>
                <h1 class="headStyle" :class="{headStyleClick: currentHead == '年'}" @click="selectPeriod('年')">年</h1>
                <h1 class="headStyle" :class="{headStyleClick: currentHead == '自訂'}" @click="selectPeriod('自訂')">自訂</h1>
            </div>
            <div class="echartContainer" v-if="currentHead=='日'">
                <div class="leftRightContainer">
                    <i class='bx bxs-chevron-left-circle bx-tada' @click="previousDay"></i>
                    <p>{{ currentDay }}</p>
                    <i class='bx bxs-chevron-right-circle bx-tada' @click="nextDay"></i>
                </div>
            </div>
            <div class="echartContainer" v-if="currentHead=='月'">
                <div class="leftRightContainer">
                    <i class='bx bxs-chevron-left-circle bx-tada' @click="previousMonth"></i>
                    <p>{{ currentMonth }}</p>
                    <i class='bx bxs-chevron-right-circle bx-tada' @click="nextMonth"></i>
                </div>
            </div>
            <div class="echartContainer" v-if="currentHead=='年'">
                <div class="leftRightContainer">
                    <i class='bx bxs-chevron-left-circle bx-tada' @click="previousYear"></i>
                    <p>{{ currentYear }}</p>
                    <i class='bx bxs-chevron-right-circle bx-tada' @click="nextYear"></i>
                </div>
            </div>
            <div class="echartContainer" v-if="currentHead=='自訂'">
                <p>請選擇日期範圍</p>
                <div class="leftRightContainer">
                    <p>開始</p>
                    <input type="date" v-model="startDate">
                    <p>結束</p>
                    <input type="date" v-model="startDate">
                </div>
            </div>
        </div>

        <div class="innerContainer2">
            <div class="innerContainer2-Left">
                <div class="compareContainer">
                    <div class="compareItem">
                        <p class="title">總銷售額</p>
                        <div class="content">
                            <p class="contentNumber">23,568</p>
                            <div class="contentRateUp" v-if="ascend">
                                <p>5%</p>
                                <i class='bx bx-trending-up'></i>
                            </div>
                            <div class="contentRateDown" v-if="!ascend">
                                <p>5%</p>
                                <i class='bx bx-trending-down'></i>
                            </div>
                        </div>
                        <p class="compareWhat">Compare to last month</p>
                    </div>
                    <div class="compareItem">
                        <p class="title">總銷售量</p>
                        <div class="content">
                            <p class="contentNumber">1,250</p>
                            <div class="contentRateUp" v-if="ascend">
                                <p>5%</p>
                                <i class='bx bx-trending-up'></i>
                            </div>
                            <div class="contentRateDown" v-if="!ascend">
                                <p>5%</p>
                                <i class='bx bx-trending-down'></i>
                            </div>
                        </div>
                        <p class="compareWhat">Compare to last month</p>
                    </div>
                    <div class="compareItem">
                    </div>
                </div>
                <div class="chartContainer">
                <div class="chartLeft">
                    <h1>銷售額分析</h1>
                    <div class="echart" >
                    </div>
                </div>
                
                </div>
            </div>
            <div class="innerContainer2-Right">
            </div>
        </div>
    </div>
</template>

<style scoped lang ="scss">

$up-background: #ffcdd2;
$up-font: #c62828;
$down-background: #c8e6c9;
$down-font: #388e3c;

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;

}
.container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    .innerContainer{
        width: 100%;
        height: 30%;
        background-color: #dcdddfaa;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .dashboardContainer{
            width: 100%;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2% 5%;
            position: relative;
            &:before{
                position: absolute;
                content: "";
                width: 100%;
                height: 1px;
                left: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.232);
            }
            
            .dashboardLeft{
                font-size: 25px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            .dashboardRight{
                display: flex;
                align-items: center;
                justify-content: space-between;
                i{
                    font-size: 25px;
                    margin: 0 10px 0 0;
                    cursor: pointer;

                }

                button{
                    width: 120px;
                    height: 40px;
                    font-size: 18px;
                    color: white;
                    border: none;
                    border-radius: 10px;
                    background-color: #2DB976;
                    cursor: pointer;
                }
            }
        }
        .navHead{
            width: 30%;
            height: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: rgba(130, 130, 130, 0.503);
            border-radius: 10px;
            margin: 30px 0 0 0;
            // padding: 0 10px;
            position: relative;
            .headStyle{
                width: 25%;
                height: 40px;
                font-size: 20px;
                text-align: center;
                display: flex;
                justify-content: center;  /* 水平居中 */
                align-items: center;      /* 垂直居中 */
                cursor: pointer;

                &:hover{
                    color: white;
                    background-color: rgba(0, 0, 255, 0.301);
                    border-radius: 10px;
                }
            }

            .headStyleClick {
                color: white;
                background-color: rgba(0, 0, 255, 0.301);
                border-radius: 10px;
            }

        }
        .echartContainer {
            width: 100%;
            height: 90px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            margin-top: 10px;
            position: relative;
            &:before{
                position: absolute;
                content: "";
                width: 100%;
                height: 1px;
                left: 0;
                bottom: 0;
                background-color: rgba(0, 0, 0, 0.232);
            }
            .leftRightContainer{
                width: 100%;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                i{
                    font-size: 40px;
                    cursor: pointer;
                }
                p{
                    font-size: 25px;
                    margin: 0 20px;
                }
                input{
                    width: 150px;
                    height: 40px;
                    border-radius: 12px;
                }
            }
        }
    }
    .innerContainer2{
        width: 100%;
        height: 70%;
        background-color: #dcdddfaa;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        padding: 20px 20px ;
        .innerContainer2-Left{
            width: 70%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            background-color: white;
            border-radius: 12px;
            .compareContainer{
                width: 100%;
                height: 180px;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                padding: 0 5%;
                position: relative;
                &:before{
                    position: absolute;
                    content: "";
                    width: 100%;
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.232);
                }

                .compareItem{
                    width: 35%;
                    height: 100%;
                    padding: 20px 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: center;
                    position: relative;
                    &:nth-child(-n+2):before{
                        position: absolute;
                        content: "";
                        width: 1px;                   /* 線的寬度，1px 即為細線 */
                        height: 80%;                 /* 讓線佔滿元素的高度 */
                        top: 10%;                       /* 讓線從頂部開始 */
                        right: 0;                     /* 將線放在元素的右邊 */
                        background-color: rgba(0, 0, 0, 0.232); /* 線的顏色 */
                
                    }
                    .title{
                        font-size: 18px;
                        color: #212528;
                        font-weight: 600;
                    }
                    .content{
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        .contentNumber{
                            font-size: 50px;
                            margin: 0 15px 0 0;
                        }
                        .contentRateUp{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            text-align: center;
                            background-color: $up-background;
                            p{
                                color: $up-font;
                            }
                            i{
                                color: $up-font;
                            }
                        }
                        .contentRateDown{
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 60px;
                            text-align: center;
                            background-color: $down-background;
                            p{
                                color: $down-font;
                            }
                            i{
                                color: $down-font;
                            }
                        }

                    }
                    .compareWhat{
                        color: #5D6165;
                    }
                }
            }
            .chartContainer{
                width: 100%;
                height: 350px;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 0 5%;
                position: relative;
                &:before{
                    position: absolute;
                    content: "";
                    width: 100%;
                    height: 1px;
                    left: 0;
                    bottom: 0;
                    background-color: rgba(0, 0, 0, 0.232);
                }
                .chartLeft{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    justify-content: flex-start;
                    padding: 10px 10px ;
                    position: relative;
                    h1{
                        font-size: 20px;
                    }
                    .echart{
                        width: 100%;
                        height: 100%;
                    }
                    &:before{
                        position: absolute;
                        content: "";
                        width: 1px;                   /* 線的寬度，1px 即為細線 */
                        height: 80%;                 /* 讓線佔滿元素的高度 */
                        top: 10%;                       /* 讓線從頂部開始 */
                        right: 0;                     /* 將線放在元素的右邊 */
                        background-color: rgba(0, 0, 0, 0.232); /* 線的顏色 */
                
                    }
                }

            }
        }
        .innerContainer2-Right{
            width: 30%;
            height: 100%;
        }

    }
    
}
</style>