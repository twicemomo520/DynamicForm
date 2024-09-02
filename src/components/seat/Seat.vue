<script>
</script>

<template>
    <div class="container">
        <div class="innerContainer">
            <h1>哈囉</h1>
            <i class='bx bxs-add-to-queue'></i>
        </div>
    </div>
</template>

<style scoped lang ="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.container{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5% 0;
    .innerContainer{
        width: 80%;
        height: 100%;
        overflow-y: auto;
        background-color: aqua;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

    }
}
</style>