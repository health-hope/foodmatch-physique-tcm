<template>
    <div class="link-bottom">
        <div class="link-left" :style="{ backgroundImage: `url(sy_bg_zuoxia.png)`}| PUBLIC_PATH"></div>
        <div class="link-right" :style="{ backgroundImage: `url(sy_bg_youxia.png)`}| PUBLIC_PATH"></div>
    </div>
</template>

<script>
    import LayBg from '@/components/common/LayBg.vue';
    export default {
        components: {
            LayBg
        },
    }
</script>

<style lang="scss" scoped>
.link-bottom{
    margin-bottom:.25rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0 .25rem;
    box-sizing: border-box;
    div{
        width: .4rem;
        height: .4rem;
    }
    .link-left{
        background-position:center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    .link-right{
        background-position:center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
}
</style>