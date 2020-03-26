<template>
    <div class="questions-style clearfix">
        <div class="quesPhoto"></div>
        <div class="questions-bg" v-if="!loading">
            <div class="speak-c">
                <p class="speak">{{ text }}</p>
            </div>
        </div>
        <transition name="pull-up-remark">
            <div class="remark" v-show="!loading"></div>
        </transition>
        <div class="loading_box" v-if="loading">
            <lottie :options="defaultOptions"/>
        </div>
    </div>
</template>
<script>
    import * as animationData from '@/assets/lottie/dialogue.json';
    export default {
        data () {
            return {
                defaultOptions: { animationData: animationData.default }
            }
        },
        props: {
            text: {
                type: String
            },
            loading: {
                type: Boolean,
                default: false
            }
        }
    }
</script>
<style lang="scss">
    .pull-up-remark-enter-active{
        transition: all .8s;
    }
    .pull-up-remark-enter,
    .pull-up-remark-leave-active {
        transform: translateX(-13.5rem);
    }
</style>
<style lang="scss" scoped>
    .questions-style {
        padding-bottom: 1rem;
        position: relative;
        .quesPhoto {
            width: 2.4rem;
            height: 2.4rem;
            border-radius: 50%;
            float: left;
            margin-right: 0.5rem;
            border: 1px solid #f1d8bd;
            box-sizing: border-box;
            background-image: linear-gradient(142deg, #eacec8 1%, #dcbfb8 100%);
        }
        .questions-bg {
            padding: 0.25rem;
            box-sizing: border-box;
            box-shadow: 0 0.3rem 1rem 0 rgba(211, 170, 160, 0.1);
            border-radius: 0.2rem;
            background: #ffffff;
            max-width: 13.15rem;
            float: left;
            .speak-c {
                padding: 0.35rem 0.65rem;
                box-sizing: border-box;
                background: url("../../assets/images/home/sy_bg_zuoshang.png") top
                        left no-repeat,
                    url("../../assets/images/home/sy_bg_youshang.png") top right
                        no-repeat,
                    url("../../assets/images/home/sy_bg_zuoxia.png") bottom left
                        no-repeat,
                    url("../../assets/images/home/sy_bg_youxia.png") bottom right
                        no-repeat;
                background-size: 0.475rem, 0.475rem;
                .speak {
                    width: 100%;
                    font-size: 0.8rem;
                    color: #333;
                    line-height: 1.2rem;
                    word-break: break-all;
                }
            }
        }
        .remark {
            width: 13.15rem;
            background: #f6f1ec;
            position: absolute;
            top: -.5rem;
            left: 16rem;
            right: 0;
            bottom: .5rem;
            z-index: 222;
        }
    }
    .loading_box {
        padding-top: .75rem;
        width: 1.6rem /* 64/40 */;
        height: auto;
        float: left;
        box-sizing: border-box;
    }
</style>
