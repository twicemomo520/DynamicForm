<script setup>
</script>

<template>
    <div class="entrance">
        <div class="container">
            <div class="manageSurvey-container">
                <i class="fa-solid fa-file-lines"></i>
                <RouterLink class = "manageSurvey"  to="/ManageSurvey">管理問卷</RouterLink>
            </div>
            <div class="fillSurvey-container">
                <i class="fa-solid fa-file-signature"></i>
                <RouterLink class = "fillSurvey"  to="/FillSurvey">填問卷</RouterLink>
            </div>
        </div>
    </div>   
</template>

<style scoped lang="scss">

@keyframes spin  {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
@keyframes orbit {
            0% {
                transform: rotate(0deg) translateX(100px);
            }
            100% {
                transform: rotate(360deg) translateX(100px);
            }
        }        
@keyframes slideAnimation {
            0%, 100% {
                transform: translateX(0);   /* 在动画开始和结束时，按钮处于原始位置 */
            }
            50% {
                transform: translateX(100dvw); /* 在动画中间，按钮向右移动100像素 */
            }
}
.entrance{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    align-items: center;
    justify-content: center;
    // background:linear-gradient(45deg, #FFAFBD, #ffc3a0);
    background:linear-gradient(145deg, #c7a8ef 0%, #c7a8ef 50%, #8249cd 50%, #8249cd 100%);

    .container{
        width: 80%;
        height: 60%;
        display: flex;
        align-items: center;
        justify-content: space-around;

        .manageSurvey-container{
            width: 350px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #8249cd;
            border-radius: 55px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            cursor: pointer;

            &:hover{
                transition: 0.5s;
                transform: rotateX(720deg) scale(1.4);

            }

            .manageSurvey,.fa-file-lines{
                text-decoration: none;
                color: white;
                font-size: 40px;
                font-weight: 500;

            }
            .manageSurvey,.fa-file-lines{
                font-size: 28px;
                margin-left: 8px;

            }
        }
        .fillSurvey-container{
            width: 350px;
            height: 90px;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #c7a8ef;
            border-radius: 55px;
            box-shadow: 0 5px 10px rgba(0,0,0,0.2);
            cursor: pointer;
            animation: spin 5s linear infinite, orbit 0.5s linear infinite;
            transform-origin: -50px 50%;
            &:hover{
                transition: 0.5s;
                transform: rotateX(720deg) scale(1.4); 

            }

            .fillSurvey,.fa-file-signature{
                text-decoration: none;
                color: black;
                font-size: 40px;
                // font-weight: 500;
            }
            .fillSurvey,.fa-file-signature{
                font-size: 28px;
                margin-left: 8px;

            }
        }
    }
}
</style>
