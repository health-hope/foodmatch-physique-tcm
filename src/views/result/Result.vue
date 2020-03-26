<template>
    <div class="home" v-if="evaluationResult.resultTypeDisplayName">
        <div class="top-c">
            <!-- 测评结果模块 -->
            <div
                class="evaluation-result"
                :style="{ backgroundImage: `url(${ evaluationResult.imageUrl })`}"
            >
                <dl>
                    <dt>{{evaluationResult.title}}</dt>
                    <dd class="siyuan">{{evaluationResult.resultTypeDisplayName}}</dd>
                </dl>
            </div>
            <!-- 建议内容 -->
            <div class="result-cont">
                <ul>
                    <li v-for="(item,i) in evaluationResult.content" :key="`res${i}`">
                        <img :src="item.imageUrl" />
                        <p>{{ item.content}}</p>
                    </li>
                </ul>
                <!-- bg 元素 -->
                <layBg />
            </div>
        </div>
        <!-- 每日配餐方案 -->
        <div class="days-programme">
            <!-- 标题 -->
            <div
                class="programme-tit"
                :style="{backgroundImage: 'url(jgy_bg_wsmhdzxyx.png)'}  | PUBLIC_PATH"
            >
                <div class="pro-tit">每日配餐方案</div>
            </div>
            <!-- 内容 -->
            <div class="ctn days-cont">
                <!-- 日历 -->
                <div class="calendar-c">
                    <BetterScroll key="scroll111" :data="recipesInfo.recipes" :scrollX="true" @example="scrollEXP2">
                        <div class="calendar" ref="scrollView" :style="{width: `${scrollWidth}px`}">
                            <div class="ys"></div>
                            <div class="calendar-box" v-for="(item, i) in recipesInfo.recipes" :key="`${i}a`">
                                <div class="top">
                                    <span
                                        v-if="item.isCurDay == '2'"
                                        :class="item.isCurDay =='2' ? 'orange-col':''"
                                        :key="`${i}a`"
                                    >今日</span>
                                    <span
                                        v-else
                                        :class="item.isCurDay =='2' ? 'orange-col':''"
                                        :key="`${i}b`"
                                    >{{item.recipesDate | getCutWeek}}</span>
                                </div>
                                <div class="bto">
                                    <span
                                        @click="loadRecipeDetails(item.recipesDate,i)"
                                        :class="(i == curRecipesDateIndex) ? 'orange-col':''"
                                    >{{item.recipesDate | getCutDay}}</span>
                                </div>
                            </div>
                            <div class="ys"></div>
                        </div>
                    </BetterScroll>
                    <img class="r-left" :src="'bg_calendar_left_mask.png' | PUBLIC_PATH" alt>
                    <img class="r-right" :src="'bg_calendar_right_mask.png' | PUBLIC_PATH" alt>
                </div>
                <!-- 节气 -->
                <div class="jieqi">
                    <SolarTerms :code="solarTerms.solarTerm" :content="solarTerms.content"/>
                </div>
                <!-- 饮食方案内容 -->
                <div class="diet-recommendation">
                    <div class="diet-recommendation-tit">
                        <BetterScroll key="scroll222" :data="recipesInfo.recipes" :scrollX="true" @example="scrollEXP1">
                            <ul ref="scrollView1" :style="{width: `${scrollWidth1}px`}">
                                <li class="ys"></li>
                                <li
                                    :class="currentType== diet.mealType ?'curli li':'li'" 
                                    v-for="(diet, index) in dietList" :key="`list${index}`"
                                    @click="getMealType(diet.mealType)"
                                >{{ diet.mealTypeDispalyName }}</li>
                                <li class="ys"></li>
                            </ul>
                        </BetterScroll>
                        <img class="r-left" :src="'bg_cc_left_mask.png' | PUBLIC_PATH" alt>
                        <img class="r-right" :src="'bg_cc_right_mask.png' | PUBLIC_PATH" alt>
                    </div>
                    <template v-for="(diet, index) in dietList">
                        <div
                            class="diet-cont"
                            :key="`li${index}`"
                            v-show="currentType == diet.mealType"
                        >
                            <div class="box">
                                <p>{{diet.description}}</p>
                            </div>
                            <ul class="recommended-list">
                                <li
                                    v-for="(item,i) in diet.foodList"
                                    :key="i"
                                    @click="foodInformation(item,diet.mealType)"
                                >
                                    <dl>
                                        <dt v-if="item.imageUrl">
                                            <img :src="item.imageUrl" />
                                        </dt>
                                        <dd>
                                            {{item.foodName}}
                                            <p>{{item.foodHeat}}大卡/{{item.foodCount}}克</p>
                                        </dd>
                                    </dl>
                                    <!-- replaceFood 允许替换 “1”:可以替换；”2”:不能替换-->
                                    <img
                                        v-if="item.replaceFood == '1'"
                                        class="icon-change"
                                        :src="'pc_button_hyh.png' | PUBLIC_PATH"
                                        @click.stop="changeRecipe(item,diet.mealType)"
                                    />
                                </li>
                                <li class="toast" v-if="toastFlag">
                                    点击可以查看食物详情哦~
                                    <LayBg bg1="bg_huang_zuoshang.png" bg2="bg_huang_youshang.png" bg3="bg_huang_zuoxia.png" bg4="bg_huang_youxia.png"/>
                                    <img @click="closeBtn" :src="'bth_record_bshutdown.png' | PUBLIC_PATH" alt class="close">
                                </li>
                            </ul>
                        </div>
                    </template>
                </div>
                <!-- 推荐茶饮 -->
                <div
                    class="tea-cont"
                    v-if="drink && drink.mealTypeDispalyName"
                >
                    <div class="tea-tit">
                        <img :src="'pc_icon_tjcy.png' | PUBLIC_PATH" />
                        <span>{{ drink.mealTypeDispalyName }}</span>
                    </div>
                    <ul class="recommended-list">
                        <li
                            v-for="(item,i) in drink.foodList"
                            :key="i"
                            @click="foodInformation(item,drink.mealType)"
                        >
                            <dl>
                                <dt v-if="item.imageUrl">
                                    <img :src="item.imageUrl" />
                                </dt>
                                <dd>
                                    {{item.foodName}}
                                </dd>
                            </dl>
                        </li>
                    </ul>
                </div>
                <!-- bg 元素 -->
                <LayBg />
            </div>
        </div>
        <!-- 食物参照量 -->
        <Reference :hackReset.sync="hackReset" class="reference" :imgUrl="estimate.imageUrls"/>
        <!-- 调整配餐 按钮 -->
        <div class="icon reset-meal-icon">
            <button
                @click="resetMeal"
                :style="{backgroundImage: 'url(jgy_button_bg_bai.png)'}  | PUBLIC_PATH"
            >调整配餐</button>
        </div>
        <!-- 换一换列表 -->
        <transition name="fade-in">
            <div class="toggle-c" v-if="toggleFlag"></div>
        </transition>
        <transition name="pull-up-deep">
            <div class="toggle" v-if="toggleFlag">
                <header>
                    可替换食物列表
                    <img @click="toggleClose" class="r-left" :src="'bth_record_shutdown.png' | PUBLIC_PATH" alt>
                </header>
                <BetterScroll key="scroll333" data="" :scrollY="true" class="scroll-c">
                    <ul class="lists">
                        <li @click="changeFoods(item)" v-for="(item,i) in changeFoodList" :key="`q${i}`">
                            <img :src="item.imageUrl"/>
                            <div class="lis">
                                <span>{{item.foodName}}</span>
                                <span>{{item.foodHeat}}大卡/{{item.foodCount}}{{item.unit}}</span>
                            </div>
                        </li>
                    </ul>
                </BetterScroll>
            </div>
        </transition>
    </div>
</template>
<script>
    import { mapState, mapMutations } from 'vuex'
    import { apiRecommendation, apiDietDetail, apiChangement, apiSaveChangement } from '@/service/api/result'
    import { TimeTool } from "@assets/js/timeTool.js";
    import { isEmpty } from "@assets/js/util.js";
    import LayBg from '@/components/common/LayBg';
    import BetterScroll from '@/components/common/BetterScroll.vue'
    import SolarTerms from '@/components/common/SolarTerms.vue'
    import Reference from '@/components/common/Reference.vue'
    export default {
        data() {
            return {
                imageUrls: [],
                hackReset: false,
                toggleFlag: false,
                dietList: [],
                solarTerms: {},
                drink: {},
                toastFlag: false,
                scrollWidth: 0,
                scrollWidth1: 0,
                evaluationResult: {},
                recipesInfo: {},
                estimate: {},
                currentType: 1, //当前餐次的值，默认是早餐,初始化值为1
                recipesDate: "", //当前食谱日期 格式yyyy-MM-dd
                curRecipesDateIndex: '', //当前食谱日期Index
                recipesId: "", // 当前食谱id
                changeFoodList: [],
                changeLists: [],
                scroll111: null,   // 餐次滚动实例
                scroll222: null,   // 日历滚动实例
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                if (from.path == "/configure") {
                    if(Number(vm.isCreated) === 1) {
                        vm.currentType = 1; //当前餐次的值，默认是早餐,初始化值为1
                        vm.init();
                        vm.loadData();
                    }
                } else {
                    vm.setCreated("")
                }
            })
        },
        components: {
            LayBg,
            BetterScroll,
            SolarTerms,
            Reference
        },
        computed: {
            ...mapState(['code', 'userId']),
            ...mapState('created',['resultType','isCreated','dayLength'])
        },
        created() {
            // 获取toastFlag 用户有没有查看过
            if(window.localStorage.getItem(`toast${this.userId}`) === "true") {
                this.toastFlag = false
            }else {
                this.toastFlag = true
            }
            // 加载数据
            this.loadData();
        },
        // 过滤器
        filters: {
            // 获取当前天的值
            getCutDay: function (date) {
                return new TimeTool().getDetail(date).day;
            },
            // 获取当前天对应的周 或者今日
            getCutWeek: function (date) {
                let weekNum = new TimeTool().getDetail(date).week;
                let weekString;
                if (weekNum == 1) {
                    weekString = "一"
                } else if (weekNum == 2) {
                    weekString = "二"
                } else if (weekNum == 3) {
                    weekString = "三"
                } else if (weekNum == 4) {
                    weekString = "四"
                } else if (weekNum == 5) {
                    weekString = "五"
                } else if (weekNum == 6) {
                    weekString = "六"
                } else if (weekNum == 7) {
                    weekString = "日"
                }
                return weekString;
            }
        },
        methods: {
            ...mapMutations('created', ['setCreated','saveImageUrls']),
            init() {
                this.evaluationResult = {};
                this.estimate = {};
                this.recipesInfo = {};
                this.scrollWidth = 0
                this.recipesId = ""
                this.recipesDate = ""
                this.dietList = []
                this.solarTerms = {}
                this.drink = {}
                this.scrollWidth1 = 0
            },
            scrollEXP1(val) {
                this.scroll111 = val
            },
            scrollEXP2(val) {
                this.scroll222 = val
            },
            closeBtn() {
                this.toastFlag = false
                window.localStorage.setItem(`toast${this.userId}`,'true')
            },
            // 点击日历重新查看食谱详情
            loadRecipeDetails: async function (date, i) {
                this.scroll111.scrollTo(0,0,500)
                this.curRecipesDateIndex = i;
                this.currentType = 1;
                // 加载食谱详情
                this.recipesDate = date;
                this.loadDietDetail();
            },
            // 换一换
            async changeRecipe(item, mealType) {
                this.changeLists = []
                const data = await apiChangement(this.code,this.userId,item.foodId,item.foodName,item.foodHeat,item.initialHeat,mealType,this.recipesId,this.recipesDate,this.resultType)
                // 保存一下要换的食物
                this.changeLists = [this.code,this.userId,item.foodId,item.foodName,item.foodHeat,item.initialHeat,mealType,this.recipesId,this.recipesDate,this.resultType]
                this.changeFoodList = data.foodList
                this.$modalHelper.afterOpen()
                this.toggleFlag = true
            },
            async changeFoods(item) {
                const data = await apiSaveChangement(...this.changeLists,{foodId:item.foodId,foodName:item.foodName,foodCount:item.foodCount,foodHeat:item.foodHeat,unit:item.unit,initialHeat:item.initialHeat,replaceFood: item.replaceFood})
                this.$modalHelper.beforeClose()
                this.loadDietDetail()
                this.toggleFlag = false
            },
            toggleClose() {
                this.$modalHelper.beforeClose()
                this.toggleFlag = false
            },
            // 查看食物信息
            foodInformation(item, type) {
                if(this.toastFlag) {
                    this.toastFlag = false
                    window.localStorage.setItem(`toast${this.userId}`,'true')
                }
                if (item.foodProperty == "01") {
                    // 跳转查询食材
                    this.$router.push({
                        path: '/ingredientsInfo',
                        query: {
                            type: "1",
                            foodId: item.foodId,
                            foodCount: item.foodCount
                        }
                    })
                } else if (item.foodProperty == "02" || item.foodProperty == "03") {
                    // 跳转查询食物
                    this.$router.push({
                        path: '/details',
                        query: {
                            code: this.code,
                            userId: this.userId,
                            foodId: item.foodId,
                            foodCount: item.foodCount,
                            mealType: type
                        }
                    })
                }
            },
            // 点击餐次显示不同的餐别 获取mealType
            getMealType(type) {
                this.currentType = type;
            },
            // 首先等配餐结果拿到数据
            async loadData() {
                this.scrollWidth1 = 0
                this.scrollWidth = 0
                let dayLength = config.dayLength
                if(Number(this.dayLength) > 0) dayLength = this.dayLength
                const data = await apiRecommendation(this.code, this.userId, dayLength, this.isCreated, this.resultType);
                this.setCreated("")
                if (data.status == "1") {// 1有效
                    this.evaluationResult = data.evaluationResult;
                    this.estimate = data.estimate;
                    this.saveImageUrls(this.estimate.imageUrls)
                    this.recipesInfo = data.recipesInfo;
                    this.$nextTick(()=>{
                        this.scrollWidth = this.$refs.scrollView.scrollWidth
                    })
                    // 循环遍历数据拿到当前天的i，赋值给curRecipesDateIndex
                    this.dataTraversal();
                    //食谱id赋值，获取当天食谱日期并赋值，加载食谱详情接口
                    this.recipesId = this.recipesInfo.recipesId; //食谱id赋值，单独使用
                    // 获取当天食谱日期
                    this.recipesDate = this.getCurRecipes(this.recipesInfo.recipes);
                    // 加载食谱详情接口
                    this.loadDietDetail();
                } else {
                    this.$router.replace("/")
                }
            },
            // 初始化循环数据遍历 在生成配餐页面
            dataTraversal() {
                this.recipesInfo.recipes.some((item, i) => {
                    if (item.isCurDay == "2") {
                        this.curRecipesDateIndex = i
                        let clientWidth = document.documentElement.clientWidth
                        let scrollLeft = (clientWidth / (750 / 90) * i)
                        this.$nextTick(() => {
                            setTimeout(()=>{
                                this.scroll222.scrollTo(-scrollLeft,0,500)
                            },500)
                        })
                        return
                    }
                })
            },
            async loadDietDetail() {
                const dietDetail= await apiDietDetail(this.code, this.userId, this.recipesId, this.recipesDate,this.resultType);
                let dietList = [    // 6餐
                    dietDetail.breakfast,
                    dietDetail.breakfastAddition,
                    dietDetail.lunch,
                    dietDetail.lunchAddition,
                    dietDetail.dinner,
                    dietDetail.dinnerAddition
                ]
                this.dietList = dietList.filter(item => !isEmpty(item))
                this.solarTerms = dietDetail.solarTerms     // 茶饮推荐
                this.drink = dietDetail.drink     // 节气
                this.$nextTick(()=>{
                    // 动态获取横线滚动的宽度
                    this.scrollWidth1 = this.$refs.scrollView1.scrollWidth
                })
            },
            // 调整配餐
            resetMeal() {
                this.$router.push('/configure')
            },
            // 获取当天食谱的日期
            getCurRecipes(obj) {
                for (let i = 0; i < obj.length; i++) {
                    // 判断是当天 1:过去天，3:未来天
                    if (obj[i].isCurDay == "2") {
                        return obj[i].recipesDate;
                    }
                }
            }
        },
        beforeDestroy() {
            this.$modalHelper.beforeClose()
        },
        deactivated () {
            this.$modalHelper.beforeClose()
        },
    }
</script>
<style lang="scss">
    .pull-up-deep-enter-active,.pull-up-deep-leave-active {
        transition: all 0.5s;
    }
    .pull-up-deep-enter,
    .pull-up-deep-leave-to {
        opacity: 0;
        transform: translateY(1200px);
    }
    .fade-in-enter-active, .fade-in-leave-active {
        transition: opacity 0.5s;
    }
    .fade-in-enter, .fade-in-leave-to {
        opacity: 0;
    }
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    /*隐藏滚动条bar*/
    .hide_bar::-webkit-scrollbar {
        display: none;
    }
    *::-webkit-scrollbar {
        display: none;
    }
    .reference {
        margin-top: 1rem;
    }
    .toggle-c {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background:rgba(0,0,0,.5);
        z-index: 5555;
    }
    .toggle {
        width: 100%;
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        background:#fff;
        border-radius: .5rem /* 20/40 */ .5rem /* 20/40 */ 0 0;
        z-index: 55555;
        header {
            width: 100%;
            height: 2.3rem /* 92/40 */;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: .925rem /* 37/40 */;
            line-height: 1.3rem /* 52/40 */;
            color: #1F1F1F;
            position: relative;
            font-weight: bold;
            img {
                width: 1.3rem /* 52/40 */;
                height: 1.3rem /* 52/40 */;
                flex-shrink: 0;
                position: absolute;
                right: .5rem /* 20/40 */;
                top: .5rem /* 20/40 */;
            }
        }
        .scroll-c {
            height: 20.55rem /* 822/40 */;
            overflow-y: auto;
            .lists {
                li {
                    display: flex;
                    align-items: center;
                    height: 3.4rem /* 136/40 */;
                    & + li .lis {
                        border-top: 1px solid #EDEDED;
                    }
                    img {
                        width: 2.2rem /* 88/40 */;
                        height: 2.2rem /* 88/40 */;
                        border-radius: 50%;
                        margin-left: .8rem /* 32/40 */;
                        margin-right: .5rem /* 20/40 */;
                        flex-shrink: 0;
                    }
                    .lis {
                        height:100%;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 100%;
                        font-size: 0;
                        span:nth-child(1) {
                            font-size: .75rem /* 30/40 */;
                            color: #333333;
                            font-weight: bold;
                            line-height: 1.05rem /* 42/40 */;
                            margin-bottom: .1rem /* 4/40 */;
                        }
                        span:nth-child(2) {
                            font-size: .6rem /* 24/40 */;
                            color: #999999;
                            line-height: .825rem /* 33/40 */;
                        }
                    }
                }
            }
        }
    }
    .reset-meal-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.1rem /* 44/40 */;
        button {
            width: 6.5rem;
            height: 2.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            background-repeat: no-repeat;
            background-position: center center;
            @include bg_color6();
            background-size: 6rem 2rem;
            @include font_color1();
            font-size: 0.9rem;
            @include box_shodow3(0 0.3rem 0.75rem 0);
            border-radius: 1.25rem;
            font-weight: bold;
        }
    }
    .home {
        width: 100%;
        min-height: 100%;
        padding: 0.8rem 0.75rem 1.7rem /* 68/40 */;
        box-sizing: border-box;
        @include bg_color1();
        .top-c {
            background: #fff;
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .evaluation-result {
                background-repeat: no-repeat;
                background-size: 100% auto;
                width: 100%;
                height: 5.5rem;
                .siyuan {
                    font-family: "SourceHanSerifCN-Bold";
                }
                dl {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    padding-left: 1.05rem;
                    padding-top: 1rem;
                    dt {
                        display: flex;
                        align-items: flex-start;
                        @include font_color1();
                        font-size: 0.7rem;
                        line-height: 1rem;
                        margin-bottom: 0.3rem;
                        opacity: 0.6;
                    }
                    dd {
                        font-size: 1.6rem;
                        @include font_color1();
                        line-height: 1.8rem;
                    }
                }
            }
            .result-cont {
                position: relative;
                padding: 1.4rem /* 56/40 */ 1.05rem /* 42/40 */;
                box-sizing: border-box;
                ul {
                    li {
                        position: relative;
                        & + li {
                            margin-top: 0.475rem /* 19/40 */;
                        }
                        img {
                            width: 1.2rem /* 48/40 */;
                            height: 1.2rem /* 48/40 */;
                            border-radius: 50%;
                            position: absolute;
                            left: 0;
                            top: 0;
                        }
                        p {
                            font-size: 0.75rem /* 30/40 */;
                            line-height: 1.05rem /* 42/40 */;
                            color: #333333;
                            margin-left: 1.7rem /* 68/40 */;
                            word-break: break-all;
                        }
                    }
                }
            }
        }
        .days-programme {
            margin-top: 0.8rem;
            @include box_shodow1(0 0.3rem /* 12/40 */ 1rem /* 40/40 */ 0);
            background: #fff;
            border-radius: 0.2rem /* 8/40 */;
            overflow: hidden;
            .programme-tit {
                background-repeat: no-repeat;
                width: 100%;
                height: 2.2rem;
                background-size: cover;
                box-sizing: border-box;
                padding: 0 1.05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .pro-tit {
                    @include font_color6();
                    font-size: 0.85rem;
                    font-weight: bold;
                }
                .time {
                    font-size: 0.85rem;
                    @include font_color1();
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    img {
                        width: 0.475rem;
                        height: 0.3rem;
                        margin-left: 0.3rem;
                    }
                }
            }
            .ctn {
                padding: 1.4rem /* 56/40 */ 0 .1rem /* 4/40 */;
                box-sizing: border-box;
                position: relative;
                .diet-recommendation {
                    .diet-recommendation-tit {
                        display: flex;
                        overflow-x: scroll;
                        width: 100%;
                        position: relative;
                        ul {
                            display: flex;
                            justify-content: space-between;
                            white-space: nowrap;
                            .li {
                                flex-shrink: 0;
                                font-size: 0.85rem;
                                @include font_color5();
                                line-height: 1.2rem;
                                height: 2.5rem /* 100/40 */;
                                text-align: center;
                                & + .li {
                                    margin-left: 1.4rem;
                                }
                            }
                            .ys {
                                width: 1.05rem /* 42/40 */;
                                height: 1.7rem /* 68/40 */;
                                display: flex;
                                flex-shrink: 0;
                                margin: 0;
                            }
                            .curli {
                                @include font_color10();
                                position: relative;
                                font-weight: bold;
                                &::after {
                                    width: 0.29rem;
                                    height: 0.29rem;
                                    @include bg_color();
                                    border-radius: 50%;
                                    content: "";
                                    position: absolute;
                                    top: 1.4rem;
                                    left: 38%;
                                }
                            }
                        }
                        .r-left {
                            width: 1.05rem /* 42/40 */;
                            height: 1.7rem /* 68/40 */;
                            position: absolute;
                            right: 0;
                            top: 0;
                            bottom: 0;
                        }
                        .r-right {
                            width: 1.05rem /* 42/40 */;
                            height: 1.7rem /* 68/40 */;
                            position: absolute;
                            left: 0;
                            top: 0;
                            bottom: 0;
                        }
                    }
                    // 饮食推荐内容
                    .diet-cont {
                        padding: 0 .8rem /* 32/40 */;
                        box-sizing: border-box;
                        .box {
                            @include bg_color23();
                            padding: 0.25rem;
                            margin-bottom: .45rem /* 18/40 */;
                            p {
                                @include border5(1px solid);
                                font-size: 0.75rem;
                                @include font_color1();
                                line-height: 1.025rem;
                                padding: .55rem /* 22/40 */;
                                font-weight: bold;
                            }
                        }
                    }
                }
            }
        }
        .calendar-c {
            position: relative;
            width: 100%;
            .calendar {
                width: 100%;
                overflow-x: auto;
                display: flex;
                .calendar-box {
                    width: 1.6rem /* 64/40 */;
                    height: 2.875rem /* 115/40 */;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    align-items: center;
                    white-space: nowrap;
                    flex-shrink: 0;
                    & + .calendar-box {
                        margin-left: .65rem /* 26/40 */;
                    }
                    .top {
                        font-size: 0.7rem;
                        span {
                            @include font_color14();
                            &.orange-col {
                                @include font_color10();
                            }
                        }
                    }
                    .bto {
                        span {
                            @include font_color4();
                            font-size: 0.85rem;
                            border-radius: 50%;
                            width: 1.6rem;
                            height: 1.6rem;
                            font-weight: bold;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            &.orange-col {
                                @include bg_color();
                                @include font_color6();
                            }
                        }
                    }
                }
                .ys {
                    width: 1.05rem /* 42/40 */;
                    height: 2.875rem /* 115/40 */;
                    display: flex;
                    flex-shrink: 0;
                }
            }
            .r-left {
                width: 1.05rem /* 42/40 */;
                height: 2.875rem /* 115/40 */;
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
            }
            .r-right {
                width: 1.05rem /* 42/40 */;
                height: 2.875rem /* 115/40 */;
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
            }
        }
        .jieqi {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: .8rem /* 32/40 */ auto 1.4rem /* 56/40 */;
        }
        .tea-cont {
            padding: 0 .8rem /* 32/40 */;
            box-sizing: border-box;
            .tea-tit {
                display: flex;
                align-items: center;
                padding: 0 .25rem /* 10/40 */;
                box-sizing: border-box;
                img {
                    width: 0.75rem;
                    height: 0.75rem;
                    margin-right: 0.5rem;
                }
                span {
                    font-size: 0.85rem;
                    @include font_color4();
                    font-weight: bold;
                }
            }
        }
        // 推荐饮食和推荐茶饮模板样式
        .recommended-list {
            padding: .6rem /* 24/40 */ .25rem 1.6rem /* 64/40 */;
            box-sizing: border-box;
            position: relative;
            .toast {
                width: 14.325rem /* 573/40 */;
                height: 2.225rem /* 89/40 */;
                box-shadow: 0 .3rem /* 12/40 */ .75rem /* 30/40 */ 0 rgba(222,150,72,0.50);
                border-radius: .2rem /* 8/40 */;
                @include bg_color();
                position: absolute;
                top: -2.225rem /* 89/40 */;
                left: .25rem /* 10/40 */;
                padding-left: .8rem /* 32/40 */;
                font-size: .8rem /* 32/40 */;
                color: #FFFFFF;
                box-sizing: border-box;
                margin: 0!important;
                z-index: 222;
                &:before{
                    content: "";
                    width: 0px;
                    height: 0px;
                    border-top: .375rem /* 15/40 */ solid #de9648;
                    border-left: .375rem /* 15/40 */ solid transparent;
                    border-right: .375rem /* 15/40 */ solid transparent;
                    position: absolute;
                    bottom: -.375rem /* 15/40 */;
                    left: 2.3rem /* 92/40 */;
                }
                .close {
                    width: 1.3rem /* 52/40 */;
                    height: 1.3rem /* 52/40 */;
                    margin-right: .825rem /* 33/40 */;
                }
            }
            li {
                display: flex;
                justify-content: space-between;
                align-items: center;
                & + li {
                    margin-top: .8rem /* 32/40 */;
                }
                dl {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    dt {
                        margin-right: 0.5rem;
                        display: flex;
                        align-items: center;
                        img {
                            width: 2.2rem;
                            height: 2.2rem;
                            border-radius: 50%;
                        }
                    }
                    dd {
                        font-size: 0.75rem;
                        @include font_color4();
                        font-weight: bold;
                        p {
                            margin-top: 0.1rem;
                            font-size: 0.6rem;
                            @include font_color5();
                            font-weight: normal;
                        }
                    }
                }
                .icon-change {
                    width: 1.8rem;
                    height: 1.8rem /* 72/40 */;
                }
            }
        }
    }
</style>
