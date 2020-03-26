<template>
    <div class="nofood">
        <div class="search-d">
            <div class="top" ref="search-ref2">
                <!-- 确定项 -->
                <div class="sure" v-show="firstFlag">
                    <div class="left">
                        <template v-if="searchSure.length" >
                            <div class="item tap_events" v-for="(food,i) in searchSure" :key="`s${food.foodId}`">
                                <span class="text">{{food.foodName}}</span>
                                <img @click.prevent="delFood(i)" :src="'ic_condition_delete.png' | PUBLIC_PATH">
                            </div>
                        </template>
                        <div v-else class="item1">确定不添加任何不吃食材？</div>
                    </div>
                    <div class="rightB tap_events" @click="selectNoFood(1)">确定</div>
                </div>
                <!-- 搜索 -->
                <div class="input">
                    <input :class="isIos?'ios':'android'" v-model.trim="search" type="text" placeholder="请输入食材名称，最多三项" />
                    <div class="clear" @click.stop="clear1();return false;">
                        <img v-show="search.length" :src="'ic_condition_delete.png' | PUBLIC_PATH"
                         class="tap_events">
                    </div>
                    <div class="canser tap_events" @click="selectNoFood(2)">取消</div>
                </div>
                <div class="fg"></div>
            </div>
            <div v-show="resList" class="bottom" :style="{ paddingTop: `${dynamicHeight}px` }">
                <!-- 最近搜过 -->
                <div class="list" v-if="foodSearchRecordList.length">
                    <div class="tit">最近搜过</div>
                    <div class="item" @click="addList(food)" v-for="(food) in foodSearchRecordList" :key="`s1${food.foodId}`">{{food.foodName}}</div>
                </div>
                <!-- 大家常搜 -->
                <div class="list" v-if="regularSearchList.length">
                    <div class="tit">大家常搜</div>
                    <div class="item" @click="addList(food)" v-for="(food) in regularSearchList" :key="`of${food.foodId}`">{{food.foodName}}</div>
                </div>
            </div>
            <div v-show="!resList && yesData" ref="scroller" class="pullup-bswrapper">
                <div class="pullup-scroller" :style="{ paddingTop: `${dynamicHeight}px` }">
                    <ul class="pullup-list">
                        <li @click="addList(food)" v-for="food in searchList" :key="`s3${food.foodId}`"      class="pullup-list-item tap_events">
                            <div class="ctt" v-html="serachFilter(food.foodName)"></div>
                        </li>
                        <!-- 我是有底线的 -->
                        <li class="dixian" v-if="dixianFlag">
                            <div class="tip">我是有底线的</div>
                        </li>
                    </ul>
                    <div class="pullup-wrapper" v-show="!dixianFlag">
                        <div class="after-trigger">
                            <img :src="'bg_condition_loading.png' | PUBLIC_PATH" />
                        </div>
                    </div>
                </div>
            </div>
            <div v-show="!resList && !yesData" class="wu" :style="{ paddingTop: `${dynamicHeight}px` }">
                <img :src="'img_condition_noresult.png' | PUBLIC_PATH" />
                <div>无此项食材</div>
            </div>
        </div>
    </div>
</template>
<script>
    import { mapState } from "vuex";
    import BScroll from 'better-scroll'
    import { debounce } from 'vux'
    import { isEmpty,isIos } from '@/assets/js/util.js'
    import { apiGetNoFood, apiSearchFood, apiSaveSearchFood } from '@/service/api/condition'
    export default {
        data() {
            return {
                firstFlag: false,
                resList: true,
                searchSure: [],
                search: "",
                foodSearchRecordList: [],           // 最近搜过
                regularSearchList: [],           // 大家常搜
                dynamicHeight: 0,   // 动态高度 滚动，输入法改变布局 上拉加载,
                screenHeight: document.documentElement.clientHeight,//屏幕高度
                dixianFlag: false,
                yesData: true,
                pageInfo: {
                    pageSize: 20,
                    pageNum: 1
                },
                searchList: [],
                foodSize: "5",
                isIos: isIos()
            }
        },
        watch: {
            searchSure: {
                handler() {
                    this.changeH()
                    this.$nextTick(()=>{
                        setTimeout(()=>{
                            if(this.bscroll)this.bscroll.refresh()
                        },500)
                    })
                },
                deep: true
            },
            search(val) {
                this.searchList = []
                this.pageInfo.pageNum = 1
                this.dixianFlag = false
                if(val.trim().length) {
                    // 发送请求
                    this.getList()
                }else {
                    this.resList = true
                }
            }
        },
        created() {
            this.bscroll = null
            let searchSureList = []
            if(window.sessionStorage.getItem('searchSureList')) searchSureList = JSON.parse(window.sessionStorage.getItem('searchSureList'))
            if(searchSureList.length) {
                this.firstFlag = true
                this.searchSure = searchSureList
            }
            this.getNoFood()
        },
        computed: {
            ...mapState(["userId"]),
        },
        mounted () {
            this.changeH()  
            this.initBscroll()
        },
        methods: {
            async getNoFood() {
                const {regularSearchList, foodSearchRecordList} = await apiGetNoFood(this.userId, this.foodSize)
                this.regularSearchList = regularSearchList
                this.foodSearchRecordList = foodSearchRecordList
            },
            addList(food) {
                // 判断有没有
                if(this.searchSure.length == 3) {
                    this.$toast("至多添加3项不吃食材")
                }else if(this.searchSure.some(item => item.foodId == food.foodId)) {
                    this.$toast("已添加过此项食材了")
                }else {
                    this.firstFlag = true
                    this.searchSure.push(food)
                    this.saveRecord(food.foodId)
                }
            },
            // 保存最近搜索记录
            async saveRecord(foodId) {
                await apiSaveSearchFood(foodId,this.userId)
            },
            getList: debounce(async function() {
                if(!this.search || this.dixianFlag) return
                this.resList = false
                this.yesData = true
                const data = await apiSearchFood(this.search, this.pageInfo)
                this.pageInfo.pageNum++
                if(data.foodList && data.foodList.length) {
                    if(data.foodList.length < 20) this.dixianFlag = true
                    if(this.searchList.length) {
                        this.searchList = [...this.searchList, ...data.foodList]
                    }else {
                        this.searchList = [...data.foodList]
                    }
                }else if( this.searchList.length && isEmpty(data.foodList)) {
                    // 下拉加载结束
                    this.dixianFlag = true
                }else {
                    this.yesData = false
                }
                this.bscroll.finishPullUp()
                this.bscroll.refresh()
            },500),
            serachFilter(item) {
                let reg = new RegExp(this.search, 'g')
                let replaceString = `<span class="search-text">${this.search}</span>`
                return String(item).replace(reg,replaceString)
            },
            initBscroll() {
                this.bscroll = new BScroll(this.$refs.scroller, {
                    scrollY: true,
                    pullUpLoad: true,
                    click: true,
                })
                this.bscroll.on('pullingUp', this.getList)
            },
            delFood(i) {
                this.searchSure.splice(i,1)
            },
            changeH() {
                this.$nextTick(()=>{
                    this.dynamicHeight = this.$refs['search-ref2'].offsetHeight
                })
            },
            clear1() {
                if(this.search){
                    this.search = '';
                }
            },
            selectNoFood(val) {
                if(val === 1) {
                    window.sessionStorage.setItem('searchSureList',JSON.stringify(this.searchSure || []))
                }
                this.$router.replace('/configure')
            }
        }
    }
</script>
<style>
.search-text {
    color: #999999;
}
</style>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .nofood {
        height: 100%;
        .search-d {
            width: 100%;
            height: 100%;
            position: relative;
            text-align: left;
            .top {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                width: 100%;
                z-index: 222;
                background: #fff;
                .sure {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: .75rem /* 30/40 */;
                    padding-left: .9rem;
                    padding-right: .9rem;
                    padding-top: .55rem;
                    padding-bottom: .2rem /* 8/40 */;
                    box-sizing: border-box;
                    background-color: #fafafa;
                    .left {
                        width: 13.5rem;
                        font-size: 0;
                        .item1 {
                            font-size: .8rem;
                            height: 1.7rem;
                            line-height: 1.7rem /* 68/40 */;
                            margin-bottom: .35rem /* 14/40 */;
                            padding-left: .5rem;
                            box-sizing: border-box;
                            @include font_color10();
                        }
                        .item {
                            font-size: 0;
                            display: inline-block;
                            padding: .2rem .4rem .2rem .5rem;
                            @include bg_color27;
                            border-radius: 1rem;
                            margin-right: .5rem;
                            margin-bottom: .43rem;
                            .text {
                                font-size: .7rem;
                                line-height: 1rem;
                                color: #333333;
                                letter-spacing: 0;
                                vertical-align: middle;
                            }
                            img {
                                width: .75rem;
                                height: .75rem;
                                margin-left: .4rem;
                                vertical-align: middle;
                            }
                        }
                    }

                    .rightB {
                        width: 2.6rem /* 104/40 */;
                        height: 1.7rem /* 68/40 */;
                        @include bg_color();
                        @include box_shodow(0 .15rem .45rem 0);
                        border-radius: .85rem /* 34/40 */;
                        font-size: .8rem;
                        color: #FFFFFF;
                        letter-spacing: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        box-sizing: border-box;
                        font-weight: bold;
                    }
                }
                .input {
                    width: 13.75rem /* 550/40 */;
                    height: 1.7rem /* 68/40 */;
                    position: relative;
                    margin-left: .9rem;
                    margin-bottom: .525rem /* 21/40 */;
                    margin-top: .55rem /* 22/40 */;
                    input {
                        outline-style: none;
                        border: none;
                        background: #F1F1F1;
                        border-radius: .85rem /* 34/40 */;
                        width: 100%;
                        height: 100%;
                        font-size: .8rem;
                        line-height: normal; /* for non-ie */  
                        color: #333333;
                        padding: 0 2.15rem 0 .5rem;
                        box-sizing: border-box;
                        outline: 0;
                        -webkit-box-shadow: none;
                        -webkit-appearance: none;
                        box-shadow: none;
                        @include caret-color1();
                    }

                    input::-webkit-input-placeholder {
                        color: #B2B2B2;
                        text-shadow: none;
                        -webkit-text-fill-color: #B2B2B2;
                    }
                    .ios::-webkit-input-placeholder {
                        color: #B2B2B2;
                        text-shadow: none;
                        -webkit-text-fill-color: #B2B2B2;
                        transform: translate(0, -.06rem);
                    }
                    .android::-webkit-input-placeholder {
                        color: #B2B2B2;
                        text-shadow: none;
                        -webkit-text-fill-color: #B2B2B2;
                        transform: translate(0, .06rem);
                    }
                    .clear {
                        position: absolute;
                        right: 0;
                        top: 0;
                        width: 2.15rem /* 86/40 */;
                        height: 1.7rem /* 68/40 */;
                        z-index: 22;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        img {
                            width: .75rem /* 30/40 */;
                            height: .75rem;
                            z-index: 22;
                        }
                    }
                    .canser {
                        position: absolute;
                        right: -2.7rem /* 108/40 */;
                        top: 50%;
                        font-size: .8rem;
                        line-height: .8rem;
                        color: #666666;
                        transform: translateY(-50%);
                        font-weight: bold;
                    }
                }
                .fg {
                    width: 100%;
                    height: 1px;
                    @include bg_color26();
                }
            }
            .bottom {
                padding-left: .9rem /* 36/40 */;
                padding-right: .9rem /* 36/40 */;
                box-sizing: border-box;
                .list {
                    margin-bottom: .7rem;
                    &:first-child{
                        margin-top: 1.2rem /* 48/40 */;
                    }
                    .tit {
                        font-size: .8rem;
                        color: #333333;
                        font-weight: bold;
                        line-height: 1.125rem /* 45/40 */;
                        margin-bottom: .7rem;
                    }

                    .item {
                        display: inline-block;
                        font-size: .7rem;
                        color: #999999;
                        line-height: 1rem;
                        padding: .2rem .5rem;
                        background: #F7F7F7;
                        border-radius: 1rem;
                        margin-right: .5rem;
                        margin-bottom: .5rem;
                    }
                }
            }
            .pullup-bswrapper {
                height: 100%;
                overflow-y: hidden;
                padding-left: .9rem /* 36/40 */;
                padding-right: .9rem /* 36/40 */;
                .pullup-scroller {
                    .pullup-list {
                        .pullup-list-item {
                            padding: .45rem /* 18/40 */ 0 .425rem /* 17/40 */;
                            display: flex;
                            align-items: center;
                            border-bottom: 1px solid #EDEDED;
                            box-sizing: border-box;
                            .ctt {
                                line-height: 1.125rem /* 45/40 */;
                                word-break: break-all;
                                font-size: .8rem /* 32/40 */;
                                color: #151515;
                            }
                        }
                        .dixian {
                            height: 3rem /* 120/40 */;
                            width: 100%;
                            padding-top: .8rem /* 32/40 */;
                            box-sizing: border-box;
                            text-align: center;
                            .tip {
                                font-size: .65rem /* 26/40 */;
                                line-height: .925rem /* 37/40 */;
                                color: #999999;
                                &:before {
                                    display: inline-block;
                                    content: '';
                                    width: 3.25rem /* 130/40 */;
                                    height: 1px;
                                    background: #EDEDED;
                                    border-radius: .2rem /* 8/40 */;
                                    vertical-align: middle;
                                    margin-right: .6rem /* 24/40 */;
                                }
                                &:after {
                                    display: inline-block;
                                    content: '';
                                    width: 3.25rem /* 130/40 */;
                                    height: 1px;
                                    background: #EDEDED;
                                    border-radius: .2rem /* 8/40 */;
                                    vertical-align: middle;
                                    margin-left: .6rem /* 24/40 */;
                                }
                            }
                        }
                    }
                    .pullup-wrapper {
                        .after-trigger {
                            height: 3rem /* 120/40 */;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            img {
                                width: 1.3rem /* 52/40 */;
                                height: 1.3rem /* 52/40 */;
                                animation: load 1s infinite linear;
                            }
                            @keyframes load{
                                from{
                                transform: rotate(0deg);
                                }
                                to{
                                transform: rotate(360deg);
                                }
                            }
                        }
                    }
                }
            }
            .wu {
                text-align: center;
                img {
                    margin-top: 4.5rem /* 180/40 */;
                    width: 10.25rem /* 410/40 */;
                    height: 5.5rem /* 220/40 */;
                    margin-bottom: 1.1rem /* 44/40 */;
                }
                div {
                    font-size: .7rem /* 28/40 */;
                    line-height: 1rem /* 40/40 */;
                    color: #999999;
                }
            }
        }
    }

</style>
