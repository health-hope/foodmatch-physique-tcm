<template>
    <div class="lay-bg">
        <template v-if="bg0">
            <div class="bg1" :style="{backgroundImage: `url(${bg1})`}  | PUBLIC_PATH"></div>
            <div class="bg2" :style="{backgroundImage: `url(${bg2})`}  | PUBLIC_PATH"></div>
            <div class="bg3" :style="{backgroundImage: `url(${bg3})`}  | PUBLIC_PATH"></div>
            <div class="bg4" :style="{backgroundImage: `url(${bg4})`}  | PUBLIC_PATH"></div>
        </template>
        <template v-else>
            <div class="bg11" :style="{backgroundImage: `url(${bg1})`}  | PUBLIC_PATH"></div>
            <div class="bg22" :style="{backgroundImage: `url(${bg2})`}  | PUBLIC_PATH"></div>
            <div class="bg33" :style="{backgroundImage: `url(${bg3})`}  | PUBLIC_PATH"></div>
            <div class="bg44" :style="{backgroundImage: `url(${bg4})`}  | PUBLIC_PATH"></div>
        </template>
    </div>
</template>

<script>
    export default {
        props: {
            bg1: {
                type: String,
                default: 'sy_bg_zuoshang.png'
            },
            bg2: {
                type: String,
                default: 'sy_bg_youshang.png'
            },
            bg3: {
                type: String,
                default: 'sy_bg_zuoxia.png'
            },
            bg4: {
                type: String,
                default: 'sy_bg_youxia.png'
            },
            bg0: {
                type: Boolean,
                default: true
            }
        }
    }
</script>

<style lang="scss" scoped>
.lay-bg{
    &> div{
        position: absolute;
        width: .475rem;
        height: .475rem;
    }
    .bg1{
        top: .25rem;
        left: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg2{
        top: .25rem;
        right: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg3{
        bottom: .25rem;
        left: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg4{
        bottom: .25rem;
        right: .25rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg11{
        top: -0.05rem;
        left: -0.05rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg22{
        top: -0.05rem;
        right: -0.05rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg33{
        bottom: -0.05rem;
        left: -0.05rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
    .bg44{
        bottom: -0.05rem;
        right: -0.05rem;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        z-index: 222;
    }
}
</style>