<template>
    <div v-if="homeShow" class="home" :style="{ backgroundImage: `url(${ homeData.imageUrl })`}">
        <!-- 内容 -->
        <div class="ctn">
            <!-- 适合人群 -->
            <div class="ctn-top">
                <div class="title">
                    <span class="mon" v-if="homeData.suitCrowd">{{ homeData.suitCrowd.title }}</span>
                </div>
                <ul class="content" v-if="homeData.suitCrowd">
                    <li class="item" v-for="(item, i) in homeData.suitCrowd.dataList" :key="i">
                        <div class="img">
                            <img :src="item.imageUrl">
                        </div>
                        <div class="text">{{ item.content }}</div>
                    </li>
                </ul>
            </div>
            <!-- 你将收获 -->
            <div class="ctn-top">
                <div class="title">
                    <span class="mon" v-if="homeData.gains">{{ homeData.gains.title }}</span>
                </div>
                <ul class="content" v-if="homeData.gains">
                    <li class="item" v-for="(item, i) in homeData.gains.dataList" :key="i">
                        <div class="img">
                            <img :src="item.imageUrl">
                        </div>
                        <div class="text">{{ item.content }}</div>
                    </li>
                </ul>
            </div>
            <!-- bg 元素 -->
            <LayBg/>
        </div>
        <!-- 参考文献 -->
        <div class="pro-endorsement" v-if="homeData.proEndorsement">
            <dl>
                <dt>参考文献</dt>
                <dd v-for="(item,i) in homeData.proEndorsement" :key="i">{{item}}</dd>
            </dl>
            <!-- bg 元素 -->
            <LayBg bg1="sy_ckwxbg_zuoshang.png" bg2="sy_ckwxbg_youshang.png" bg3="sy_ckwxbg_zuoxia.png" bg4="sy_ckwxbg_youxia.png"/>
        </div>
        <!-- logo -->
        <div class="logo">
            <img :src="'sy_logo_jkyy.png' | PUBLIC_PATH" alt>
        </div>
        <p class="remark">北京健康有益科技有限公司提供技术服务</p>
        <!-- 开始配餐 -->
        <div class="button tap_events" :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"  @click="start">开始配餐</div>
    </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
import { apiHomeData,apiFoodStatus } from "@/service/api/home";
import LayBg from '@/components/common/LayBg';
export default {
    data() {
        return {
            homeData: {},
            homeShow: false
        };
    },
    components: {
        LayBg
    },
    computed: {
        ...mapState(["code", "userId"])
    },
    created() {
        // 加载中医封面内容
        this.getBrief();
    },
    methods: {
        ...mapMutations('created', ['setResultType','setDayLength']),
        async getBrief() {
            if(this.code && this.userId){
                const foodStatus = await apiFoodStatus(this.code,this.userId);
                if(foodStatus.resultType) {
                    this.setResultType(foodStatus.resultType)
                }
                if(foodStatus.dayLength) {
                    this.setDayLength(foodStatus.dayLength)
                }else {
                    this.setDayLength(0)
                }
                if(foodStatus.foodMatchStatus == 1){//配餐中
                    this.$router.replace("/result");
                }else {
                    const data = await apiHomeData(this.code);
                    this.homeData = data;
                    this.homeShow = true
                }
            }
        },
        start() {
            this.$router.push("/configure");
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.home {
    width: 100%;
    min-height: 100%;
    padding: 16.7rem 0.75rem 0;
    box-sizing: border-box;
    background-size: 100% auto;
    @include bg_color1();
    background-repeat: no-repeat;
    // 适合人群及您将获得
    .ctn {
        @include bg_color6();
        @include box_shodow1(0 0.3rem 1rem 0);
        border-radius: 0.2rem;
        padding: 1.35rem /* 54/40 */ 1.05rem /* 42/40 */ .3rem /* 12/40 */;
        box-sizing: border-box;
        position: relative;
        .ctn-top {
            margin-bottom: 1.65rem /* 66/40 */;
            .title {
                position: relative;
                height: 1.4rem;
                display: flex;
                align-items: center;
                margin-bottom: .75rem /* 30/40 */;
                .mon {
                    font-size: 0.85rem;
                    @include font_color4;
                    font-weight: bold;
                }
            }
            .content {
                position: relative;
                .item {
                    & + .item {
                        margin-top: .5rem /* 20/40 */;
                    }
                }
                .img {
                    width: 1.2rem;
                    height: 1.2rem;
                    position: absolute;
                    left: 0;
                    right: 0;
                    img {
                        width: 100%;
                        height: 100%;
                        display: inline-block;
                        border-radius: 50%;
                        @include bg_color6();
                    }
                }
                .text {
                    font-size: 0.75rem;
                    @include font_color5;
                    line-height: 1.1rem /* 44/40 */;
                    margin-left: 1.65rem;
                }
            }
        }
    }
    // 参考文献
    .pro-endorsement {
        border-radius: 0.2rem;
        position: relative;
        @include bg_color23;
        margin-top: 1.1rem;
        padding: .9rem /* 36/40 */ 1.05rem /* 42/40 */;
        box-sizing: border-box;
        dl {
            text-align: center;
            dt {
                font-size: 0.7rem;
                line-height: 1rem;
                @include font_color;
                margin-bottom: 0.4rem;
                font-weight: bold;
            }
            dd {
                font-size: 0.6rem;
                line-height: .825rem /* 33/40 */;
                @include font_color12;
            }
        }
    }
    .logo {
        margin-bottom: 0.5rem;
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
            width: 4.3rem;
            height: auto;
        }
    }
    .remark {
        opacity: 0.6;
        font-size: 0.55rem;
        line-height: 0.55rem;
        @include font_color;
        text-align: center;
        padding-bottom: 4.55rem;
    }
    .button {
        width: 15.5rem;
        height: 2.5rem;
        @include box_shodow(0 .3rem .75rem 0);
        border-radius: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1rem;
        font-weight: bold;
        @include font_color6;
        position: fixed;
        bottom: 1rem;
        left: 50%;
        z-index: 100;
        transform: translateX(-50%);
        background-position: center;
        background-repeat: no-repeat;
        @include bg_color();
        background-size: 15rem 2rem;
    }
}
</style>
