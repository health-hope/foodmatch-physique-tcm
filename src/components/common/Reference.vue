<template>
    <div class="food-reference">
        <div class="food-reference-tit" @click="toggleSlide">
            <span>食物参照量</span>
            <img
                :src="'rili_icon_zhankai.png' | PUBLIC_PATH"
                :class="hackReset ? 'toggle':'toggle1'"
            />
        </div>
        <vertical-toggle>
            <div class="food-reference-cont" v-if="hackReset">
                <div class="reference-list">
                    <dl v-for="(item,i) in imgUrl" :key="i">
                        <dt>
                            <img :src="item" />
                        </dt>
                    </dl>
                </div>
                <!-- bg 元素 -->
                <LayBg />
            </div>
        </vertical-toggle>
    </div>
</template>
<script>
    import LayBg from '@/components/common/LayBg';
    export default {
        data() {
            return {}
        },
        components: {
            LayBg
        },
        props: {
            imgUrl: {
                type: Array,
                default: ()=>{
                    return []
                }
            },
            hackReset: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            // 切换显示隐藏
            toggleSlide() {
                this.$emit("update:hackReset", !this.hackReset); 
            },
        },
        deactivated () {
            if(this.$route.name != 'details')this.$emit("update:hackReset", false); 
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.food-reference {
    .food-reference-tit {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: bold;
        span {
            font-size: 0.85rem;
            @include font_color10();
            margin-right: 0.6rem;
            font-weight: bold;
            padding-left: 0.25rem;
        }
        img {
            width: 0.475rem;
            height: 0.4rem;
        }
        img.toggle {
            transform: rotate(180deg);
            transition: transform 0.3s;
        }
        img.toggle1 {
            transform: rotate(0deg);
            transition: transform 0.3s;
        }
    }
    .food-reference-cont {
        padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */ .8rem /* 32/40 */;
        box-sizing: border-box;
        position: relative;
        background-color: #fff;
        @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
        border-radius: .2rem /* 8/40 */;
        margin-top: 1rem /* 40/40 */;
        .reference-list {
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            dl {
                dt {
                    img {
                        width: 7.35rem /* 294/40 */;
                        height: 5.775rem /* 231/40 */;
                        margin-bottom: .6rem /* 24/40 */;
                    }
                }
            }
        }
    }
}
</style>