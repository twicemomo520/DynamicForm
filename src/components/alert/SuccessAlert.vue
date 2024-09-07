<script>
import {useAlertStore} from "@/stores/alert"

    export default{
        data(){
            return{
                visible: null
            }
        },
        created(){
            this.visible = useAlertStore().showAlert
        },
        methods:{
            disableSuccessBox(){
                const successBox = this.$refs.successBox
                successBox.style.display = "none";
                useAlertStore().hideAlert()
            },
        }
    }
</script>

<template>
        <div id="container">
            <div ref="successBox" id="success-box">
                <div class="dot"></div>
                <div class="dot two"></div>
                <div class="face">
                <div class="eye"></div>
                <div class="eye right"></div>
                <div class="mouth happy"></div>
                </div>
                <div class="shadow scale"></div>
                <div class="message">
                    <div class="alert alertContainer">
                        <slot></slot>
                    </div>
                </div>
                <button class="button-box" @click="disableSuccessBox"><h1 class="green">continue</h1></button>
            </div>
        </div>
</template>

<style scoped lang = "scss">
    $white: #FCFCFC;
    $gray: #CBCDD3;
    $dark: #777777;
    $error: #EF8D9C;
    $orange: #FFC39E;
    $success: #B0DB7D;
    $secondary: #99DBB4;

    @import url('https://fonts.googleapis.com/css?family=Lato:400,700');

    $font: 'Lato', sans-serif;

    html {
    display: grid;
    min-height: 100%;
    }

    body {
    display: grid;
    overflow: hidden;
    font-family: $font;
    text-transform: uppercase;
    text-align: center;
    }

    #container {
    position: fixed;
    margin: auto;
    overflow: hidden;
    width: 1000px;
    height: 500px;
    left:10%;
    top:0%;
    z-index: 99;
    }

    .alertContainer{
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 3px;
    padding-top: 5px;
    color: $white;
    padding-bottom: 5px;
    text-transform: uppercase;
    }

    h1 {
    font-size: 0.9em;
    font-weight: 100;
    letter-spacing: 3px;
    padding-top: 5px;
    color: $white;
    padding-bottom: 5px;
    text-transform: uppercase;
    }

    .green {
    color: darken($secondary, 20%);
    }

    .red {
    color: darken($error, 10%);
    }

    .alert {
    font-weight: 700;
    letter-spacing: 5px;
    }

    p {
    margin-top: -5px;
    font-size: 0.5em;
    font-weight: 100;
    color: darken($dark, 10%);
    letter-spacing: 1px;
    }

    button, .dot {
    cursor: pointer;
    }

    #success-box {
    position: absolute;
    width: 45%;
    height: 80%;
    left: 50%;
    background: linear-gradient(to bottom right, $success 40%, $secondary 100%);
    border-radius: 20px;
    box-shadow: 5px 5px 20px rgba($gray, 10%);
    perspective: 40px;
    transition: 2s;
    animation: slideInFromTop 0.5s forwards; /* 滑入動畫 */

    }

    #success-box.show {
        animation: slideOutToTop 0.5s forwards; /* 初始狀態設置為滑出 */
    }

    #error-box {
    position: absolute;
    width: 35%;
    height: 100%;
    left: 35%;
    background: linear-gradient(to bottom left, $error 40%, $orange 100%);
    border-radius: 20px;
    box-shadow: 5px 5px 20px rgba($gray, 10%);
    transition:  2s;
    }

    .dot {
    width: 8px;
    height: 8px;
    background: $white;
    border-radius: 50%;
    position: absolute;
    top: 4%;
    right: 6%;
    &:hover {
        background: darken($white, 20%);
    }
    }

    .two {
    right: 12%;
    opacity: .5;
    }

    .face {
    position: absolute;
    width: 22%;
    height: 22%;
    background: $white;
    border-radius: 50%;
    border: 1px solid $dark;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: bounce 1s ease-in infinite;
    }

    .face2 {
    position: absolute;
    width: 22%;
    height: 22%;
    background: $white;
    border-radius: 50%;
    border: 1px solid $dark;
    top: 21%;
    left: 37.5%;
    z-index: 2;
    animation: roll 3s ease-in-out infinite;
    }

    .eye {
    position: absolute;
    width: 5px;
    height: 5px;
    background: $dark;
    border-radius: 50%;
    top: 40%;
    left: 20%;
    }

    .right {
    left: 68%;
    }

    .mouth {
    position:absolute;
    top: 43%;
    left: 41%;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    }

    .happy {
    border: 2px solid;
    border-color: transparent $dark $dark transparent;
    transform: rotate(45deg);
    }

    .sad {
    top: 49%;
    border: 2px solid;
    border-color: $dark transparent transparent $dark;
    transform: rotate(45deg);
    }

    .shadow {
    position: absolute;
    width: 21%;
    height: 3%;
    opacity: .5;
    background: $dark;
    left: 40%;
    top: 43%;
    border-radius: 50%;
    z-index: 1;
    }

    .scale {
    animation: scale 1s ease-in infinite;
    }
    .move {
    animation: move 3s ease-in-out infinite;
    }


    .message {
    position: absolute;
    width: 100%;
    text-align: center;
    height: 40%;
    top: 47%;
    }

    .button-box {
    position: absolute;
    background: $white;
    width: 50%;
    height: 15%;
    border-radius: 20px;
    top: 73%;
    left: 25%;
    outline: 0;
    border: none;
    box-shadow: 2px 2px 10px rgba($dark, .5);
    transition: all .5s ease-in-out;
    &:hover {
        background: darken($white, 5%);
        transform: scale(1.05);
        transition: all .3s ease-in-out;
    }
    }

    @keyframes bounce {
    50% {
        transform: translateY(-10px);
    }
    }

    @keyframes scale {
    50% {
        transform: scale(0.9);
    }
    }

    @keyframes roll {
    0% {
        transform: rotate(0deg);
        left: 25%;
    }
    50% {
        left: 60%;
        transform: rotate(168deg);
    }
    100% {
        transform: rotate(0deg);
        left: 25%;
    }
    }

    @keyframes move {
    0% {
        left: 25%;
    }
    50% {
        left: 60%;
    }
    100% {
        left: 25%;
    }
    }

    @keyframes slideInFromTop {
        0% {
            transform: translateY(-100%); /* 初始位置在視窗上方 */
            opacity: 0; /* 初始不可見 */
        }
        100% {
            transform: translateY(0); /* 滑入到原來的位置 */
            opacity: 1; /* 最終完全可見 */
        }
    }

    @keyframes slideOutToTop {
        0% {
            transform: translateY(0); /* 初始位置在原來的位置 */
            opacity: 1; /* 初始可見 */
        }
        100% {
            transform: translateY(-100%); /* 滑出到視窗上方 */
            opacity: 0; /* 最終不可見 */
        }
    }



</style>