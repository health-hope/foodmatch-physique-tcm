<template>
    <div class="home" v-cloak  v-if="foodDetailsData.imageUrl">
        <div class="content">
            <div class="bannerbg" :style="{ backgroundImage: `url(${ foodDetailsData.imageUrl })`}">
                <div class="bannerbg-box">
                    <div class="bannerbg-box-cont">
                        <div class="bannerbg-cont">
                            <span>{{foodDetailsData.foodName}}</span>
                            <!-- bg 元素 -->
                            <layBg :bg0="false"/>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ctn food-box">
                <template v-if="foodDetailsData.efficiency[0]">
                    <h3 class="food-tit mt56">
                        <img :src="'pc_icon_zygx.png' | PUBLIC_PATH">
                        中医功效
                    </h3>
                    <div class="cont">{{foodDetailsData.efficiency.join('、')}}</div>
                </template>
                <template v-if="foodDetailsData.material.majorMaterialList && foodDetailsData.material.majorMaterialList.length">
                    <h3 class="food-tit mt56">
                        <img :src="'pc_icon_sc.png' | PUBLIC_PATH">
                        {{foodDetailsData.material.title}}
                    </h3>
                    <div class="foodlist">
                        <div class="foodlist-cont" v-for="(item,i) in foodDetailsData.material.majorMaterialList" :key="i">
                            <dl>
                                <dt><img :src="item.imageUrl"></dt>
                                <dd>{{item.foodName}}</dd>
                            </dl>
                            <p>{{item.count}}{{item.unit}}</p>
                        </div>
                    </div>
                </template>
                <layBg/>
            </div>
        </div>
        <!-- 食物参照量 -->
        <Reference :hackReset.sync="hackReset" :imgUrl="imageUrls" class="reference"/>
        <div class="food-box1" v-show="foodDetailsData.cookingStepList && foodDetailsData.cookingStepList.length>0">
            <h3 class="food-tit" v-show="foodDetailsData.cookingStepList && foodDetailsData.cookingStepList.length>0">
                <img  :src="'pc_icon_zzff.png' | PUBLIC_PATH">
                制作方法
            </h3>
            <div class="list4">
                <template>
                    <div class="list4-s" v-for="(item,i) in foodDetailsData.cookingStepList" :key="i">
                        <img class="list4-s-icon" :src="'pc_icon_zysx.png' | PUBLIC_PATH">
                        <span>{{item.content}}</span>
                    </div>
                </template>
            </div>
            <layBg/>
        </div>
    </div>
</template>
<script>
    import { mapState } from 'vuex'
    import { apiFoodDetails } from '@/service/api/details'
    import LayBg from '@/components/common/LayBg';
    import Reference from '@/components/common/Reference.vue'
    export default {
        data () {
            return {
                hackReset: false, 
                foodDetailsData: {
                    material:{
                        title:""
                    },
                    cookingStepList:[],
                    imageUrl:"",
                    foodName:"",
                    efficiency:""
                }, // 食物信息整体数据
                foodId: "",// 获取路由参数 foodId
                mealType: "", // 食谱类型 7为茶饮，其他为食材
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                if(from.path !== "/ingredientsInfo"){
                    vm.hackReset = false
                }
            })
        },
        components: {
            LayBg,
            Reference
        },
        computed: {
            ...mapState(['code','userId']),
            ...mapState('created',['imageUrls','resultType']),
        },
        activated () {
            this.foodDetailsData = {
                material:{
                    title:""
                },
                cookingStepList:[],
                imageUrl:"",
                foodName:"",
                efficiency:""
            } // 食物信息整体数据
            this.foodId = "" // 获取路由参数 foodId
            this.mealType = "" // 食谱类型 7为茶饮，其他为食材
            // 加载食物信息
            this.loadData();
        },
        methods: {
            async loadData () {
                this.foodId = this.$route.query.foodId
                this.mealType = this.$route.query.mealType
                let foodCount = this.$route.query.foodCount
                const data = await apiFoodDetails(this.code,this.userId,this.foodId,this.mealType,this.resultType,foodCount)
                this.foodDetailsData = data;
            }
        }
    }
</script>
<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
    .mt56{
        margin-top: 1.4rem;
    }
    .home {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem 0.75rem 0;
        box-sizing: border-box;
        @include bg_color1();
        padding-bottom: 1.7rem;
        .content {
            border-radius: .2rem;
            overflow: hidden;
            @include box_shodow1(0 0.3rem 1rem 0);
            .bannerbg{
                background-repeat: no-repeat;
                background-position: center center;
                width: 100%;
                height: 9rem;
                background-size: cover;
                padding:.25rem;
                box-sizing: border-box;
                @include bg_color6();
                .bannerbg-box{
                    padding:.25rem;
                    @include  border7(1px solid);
                    height: 100%;
                    box-sizing: border-box;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    .bannerbg-box-cont{
                        @include bg_color22();
                        padding:.15rem;
                        border-radius: .1rem;
                        .bannerbg-cont{
                            align-items: center;
                            justify-content: center;
                            padding: 0.15rem 1.05rem 0.15rem;
                            background: rgba(255,255,255,0);
                            position: relative;
                            @include border5(0.05rem solid);
                            box-sizing: border-box;
                            span{
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
                }
            }
        }
        .food-box{
            @include bg_color6();
            display: flex;
            flex-direction: column;
            padding: 0 1.05rem /* 42/40 */ 1.4rem /* 56/40 */;
            box-sizing: border-box;
            position: relative;
            .food-tit{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                font-size: .85rem;
                @include font_color4();
                align-items: center;
                img{
                    width: .75rem;
                    height: .75rem;
                    margin-right: .5rem;
                }
            }
            .cont{
                @include border2(1px solid);
                padding:.8rem .65rem;
                margin-top: .6rem;
                font-size: .75rem;
                color: #666666;
            }
            .foodlist{
                display: flex;
                flex-direction: column;
                .foodlist-cont{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    margin-top: .8rem /* 32/40 */;
                    dl{
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: center;
                        font-size: 0;
                        dt{
                            img{
                                width: 2.2rem;
                                height: 2.2rem;
                                border-radius: 50%;
                                margin-right: .5rem;
                            }
                        }
                        dd{
                            @include font_color4();
                            font-size: .75rem;
                            font-weight: bold;
                        }
                    }
                    p{
                        font-size: .7rem;
                        @include font_color();
                    }
                }
            }
        }
        .reference {
            margin: .8rem 0;
        }
        .food-box1{
            @include bg_color6();
            border-radius: .2rem;
            overflow: hidden;
            @include box_shodow1(0 0.3rem 1rem 0);
            display: flex;
            flex-direction: column;
            padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */ 0.2rem;
            box-sizing: border-box;
            position: relative;
            .food-tit{
                display: flex;
                flex-direction: row;
                justify-content: flex-start;
                font-size: .85rem;
                @include font_color4();
                align-items: center;
                img{
                    width: .75rem;
                    height: .75rem;
                    margin-right: .5rem;
                }
            }
            .list4 {
                padding-top: 1.2rem /* 48/40 */;
                box-sizing: border-box;
                position: relative;
                top: -0.6rem;
                &::before {
                    content: "";
                    position: absolute;
                    top: 1.2rem;
                    z-index: 22;
                    left: 0;
                    width: 0.45rem;
                    height: 0.4rem;
                    display: inline-block;
                    @include bg_color6();
                }
                .list4-s {
                    @include border_left(1px solid);
                    margin-left: 0.225rem /* 9/40 */;
                    padding-left: 0.8rem;
                    box-sizing: border-box;
                    position: relative;
                    padding-bottom: 0.6rem /* 24/40 */;
                    box-sizing: border-box;
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
                    span{
                        font-size: .75rem;
                        @include font_color8;
                    }
                }
                .list4-s:last-child::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    z-index: 22;
                    left: -0.25rem;
                    top: 0.839rem;
                    width: 0.45rem;
                    height: 100%;
                    display: inline-block;
                    @include bg_color6();
                }
            }
        }
    }
</style>
