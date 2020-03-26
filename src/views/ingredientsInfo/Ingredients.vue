<template>
    <div class="home">
        <div class="content" v-if="infoData.foodName">
            <div class="bannerbg" :style="{backgroundImage:'url(' + infoData.imageUrl + ')'}">
                <div class="bannerbg-box">
                    <div class="bannerbg-box-cont">
                        <div class="ctn bannerbg-cont">
                            <span>{{infoData.foodName}}</span>
                            <layBg :bg0="false"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ctn food-box">
                <template v-if="infoData.efficiency[0]">
                    <h3 class="food-tit">
                        <img :src="'pc_icon_zygx.png' | PUBLIC_PATH">
                        中医功效
                    </h3>
                    <div class="cont">{{infoData.efficiency.join('、')}}</div>
                </template>
                <template v-if="infoData.tcmProperties&&infoData.tcmProperties.length>0">
                    <h3 class="food-tit">
                        <img :src="'pc_icon_scsx.png' | PUBLIC_PATH">
                        食物属性
                    </h3>
                    <div class="list4">
                        <div
                            :class="['item-tag',gottleColor(item,1) ]"
                            v-for="(item,index) in nature"
                            :key="`i1${index}`"
                        >性{{item}}</div>
                        <div
                            :class="['item-tag',gottleColor(item,2) ]"
                        
                            v-for="(item,index) in taste"
                            :key="`i2${index}`"
                        >味{{item}}</div>
                                        <div
                            :class="['item-tag','tag5']"
                        
                        >归经{{through}}</div>
                        <div
                        :class="['item-tag','tag7']"
                        v-if="foodTag"
                        >食药同源</div>
                    </div>
                </template>
                <template v-if="infoData.taboos[0]">
                    <h3 class="food-tit">
                        <img :src="'pc_icon_ysjj.png' | PUBLIC_PATH">
                        食物禁忌
                    </h3>
                    <div class="cont">{{infoData.taboos.join('、')}}</div>
                </template>
                <layBg/>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
import { getIngredientsInfo } from "@/service/api/ingredientsInfo";
import LayBg from '@/components/common/LayBg';
export default {
    data() {
        return {
            infoData: {
                imageUrl:"",
                foodName:"",
                describe:"",
                relationNameList:[],
                tcmProperties:[],
                efficiency:[],
                taboos:[]
            },
            nature:[],//性
            taste:[],//味
            through:"",//归经
            foodTag:false,//食药同源
        };
    },
    components: {
        LayBg
    },
    computed: {
        ...mapState(["code", "userId"]),
        ...mapState('created',['resultType'])
    },
    created() {
        this.init()
    },
    mounted() {
        this.$nextTick(() => {
            this.getBrief();
        });
    },
    methods: {
        init() {
            this.infoData = {
                imageUrl:"",
                foodName:"",
                describe:"",
                relationNameList:[],
                tcmProperties:[],
                efficiency:[],
                taboos:[]
            }
            this.nature = [] //性
            this.taste = [] //味
            this.through = "" //归经
            this.foodTag = false//食药同源
        },
        async getBrief() {
            let type;
            if (this.$route.query.type) {
                type = this.$route.query.type;
            }else{
                type='1';
            }
            if(this.$route.query.foodId){
                let foodId = this.$route.query.foodId;
                let foodCount = this.$route.query.foodCount;
                const res = await getIngredientsInfo(this.userId,foodId,this.code,type,foodCount,this.resultType)
                this.infoData = res;
                res.tcmProperties.forEach((item,index)=>{
                    // 当type是1代表是性
                    if(item.type=="1"){
                        this.nature = item.property;
                    }
                    // 当type是2代表是味
                    if(item.type=="2"){
                        this.taste = item.property;
                    }
                    if(item.type=="3"){
                        this.through = item.property.join('、');
                    }
                    if(item.type=="4"){
                        this.foodTag = true;
                    }
                })
            }
        },
        // 自动匹配颜色
        gottleColor(name,type) {
            if(type==3){
                return "tag5";
            }
            if(type!=3){
                if (name.indexOf("寒") != "-1"||name.indexOf("酸") != "-1") {
                    return "tag1";
                } else if (name.indexOf("凉") != "-1"||name.indexOf("辛") != "-1") {
                    return "tag2";
                }
                if (name.indexOf("平") != "-1" ||name.indexOf("甘") != "-1") {
                    return "tag3";
                } else if (name.indexOf("温") != "-1"||name.indexOf("苦") != "-1") {
                    return "tag4";
                }
                if (name.indexOf("热") != "-1"||name.indexOf("咸") != "-1") {
                    return "tag5";
                } 
            }
        }
    }
};
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.mt56 {
    margin-top: 1.4rem;
}
.home {
    width: 100%;
    min-height: 100%;
    padding: 0.8rem 0.75rem 1.8rem /* 72/40 */;
    box-sizing: border-box;
    @include border8(1px solid);
    @include bg_color1();
    .content {
        border-radius: .2rem;
        overflow: hidden;
        @include box_shodow1(0 0.3rem 1rem 0);
        .bannerbg {
            width: 100%;
            height: 9rem;
            background-size: cover;
            background-position: center center;
            padding: 0.25rem;
            box-sizing: border-box;
            @include bg_color6();
            .bannerbg-box {
                padding: 0.25rem;
                @include border7(1px solid);
                height: 100%;
                box-sizing: border-box;
                display: flex;
                align-items: center;
                justify-content: center;
                .bannerbg-box-cont {
                    @include bg_color14();
                    padding: 0.15rem;
                    border-radius: 0.1rem;
                }
                .bannerbg-cont {
                    align-items: center;
                    justify-content: center;
                    font-weight: bold;
                    padding-top: 0.15rem;
                    padding-bottom: 0.15rem;
                    background: rgba(255,255,255,0);
                    @include border5(0.05rem solid);
                    span {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        height: 100%;
                        @include font_color1();
                        font-weight: bold;
                        font-size: .85rem;
                    }
                }
            }
            .ctn {
                padding: 0.3rem 1.05rem;
                border-radius: 0;
            }
        }
        .ctn {
            @include bg_color6();
            padding: 0rem 1.05rem 1.3rem;
            box-sizing: border-box;
            position: relative;
        }
        .food-box {
            @include bg_color6();
            display: flex;
            flex-direction: column;
            .food-tit {
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                font-size: 0.85rem;
                height: 1.2rem;
                @include font_color4();
                align-items: center;
                margin-top: 1.4rem;
                img {
                    width: 0.76rem;
                    height: 0.76rem;
                    margin-right: 0.5rem;
                }
            }
            .cont {
                border: 1px solid ;
                @include border-color3();
                padding: 0.8rem 0.65rem;
                margin-top: 0.6rem;
                font-size: 0.75rem;
                line-height: 1.05rem /* 42/40 */;
                box-sizing: border-box;
                @include bg_color6();
                @include font_color8();
                @include border5(1px solid);
            }
            .list4 {
                box-sizing: border-box;
                position: relative;
                margin-top: .1rem /* 4/40 */;
                font-size: 0;
                .item-tag {
                    font-size: 0.8rem;
                    display: inline-block;
                    @include bg_color8();
                    padding: 0.225rem 0.8rem;
                    margin-top: 0.5rem;
                    margin-right: 0.5rem;
                    @include font_color6;
                    font-weight: bold;
                }
                .tag1 {
                    // 性寒
                    @include bg_color15();
                }
                .tag2 {
                    // 性凉
                    @include bg_color16();
                }
                .tag3 {
                    // 性平
                    @include bg_color17();
                }
                .tag4 {
                    // 性温
                    @include bg_color18();
                }

                .tag5 {
                    // 性热
                    @include bg_color19();
                }
                .tag6 {
                    // 归经
                    @include bg_color20();
                }
                .tag7 {
                    // 药食同源
                    @include bg_color21();
                }
                .list4-s {
                    margin-left: 0.225rem /* 9/40 */;
                    padding-left: 0.8rem;
                    box-sizing: border-box;
                    position: relative;
                    padding-bottom: 0.6rem /* 24/40 */;
                    box-sizing: border-box;
                    font-weight: bold;
                    .list4-s-icon {
                        width: 0.45rem /* 18/40 */;
                        height: 0.45rem /* 18/40 */;
                        background-repeat: no-repeat;
                        background-size: 0.45rem /* 18/40 */ 0.45rem /* 18/40 */;
                        @include bg_color6();
                        display: inline-block;
                        position: absolute;
                        z-index: 2;
                        left: -0.25rem;
                        top: 0.4rem;
                    }
                    span {
                        font-size: 0.75rem;
                        @include bg_color8();
                    }
                }
                .list4-s:last-child::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    z-index: 22;
                    left: -0.25rem;
                    top: 0.8rem;
                    width: 0.45rem;
                    height: 100%;
                    display: inline-block;
                    @include bg_color6();
                }
            }
        }
    }
}
</style>
