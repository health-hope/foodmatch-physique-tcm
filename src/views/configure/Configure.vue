<template>
    <div class="crad-wrap" ref="cradWrap">
        <div class="crad-item">
            <BaseZyTempTitle bgClass="jgy_bg_xxzhcp" tempTitle="体质类型"></BaseZyTempTitle>
            <div class="crad-content">
                <LinkTop></LinkTop>
                <div class="content">
                    <div class="item-link tap_events" @click="showPops1('type',nameType)">
                        <div class="select-name">
                            <span>类型</span>
                        </div>
                        <div class="select-box">
                            <div class="select-font">{{nameType?nameType:"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                </div>
                <LinkBottom></LinkBottom>
            </div>
        </div>
        <div class="crad-item">
            <BaseZyTempTitle bgClass="jgy_bg_wsmhdzxyx" tempTitle="基本信息"></BaseZyTempTitle>
            <div class="crad-content">
                <LinkTop></LinkTop>
                <div class="content">
                    <div class="item-link tap_events" @click="showPops1('time',basicInfo.birthday)">
                        <div class="select-name">
                            <span>出生日期</span>
                        </div>
                        <div class="select-box">
                            <div class="select-font">{{basicInfo.birthday?basicInfo.birthday:"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('gender',basicInfo.gender)">
                        <div class="select-name">
                            <span>性别</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{basicInfo.gender?toggleSex(basicInfo.gender):"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('height',basicInfo.height)">
                        <div class="select-name">
                            <span>身高</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{basicInfo.height?basicInfo.height+"厘米":"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('weight',basicInfo.weight)">
                        <div class="select-name">
                            <span>体重</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{basicInfo.weight?(basicInfo.weight*10)/10+"公斤":"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('level',basicInfo.weight)">
                        <div class="select-name">
                            <span>劳动强度</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{basicInfo.userActivityLevel?activityLevel(basicInfo.userActivityLevel):"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('nation',basicInfo.nation)">
                        <div class="select-name">
                            <span>民族</span>
                            <span class="optional">（选填）</span>
                        </div>
                        <div class="select-box">
                            <div class="select-font">{{basicInfo.nation.value?basicInfo.nation.name:"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div
                        class="item-link tap_events"
                        @click="showPops1('province',basicInfo.province)"
                    >
                        <div class="select-name">
                            <span>地区</span>
                            <span class="optional">（选填）</span>
                        </div>
                        <div class="select-box">
                            <div class="select-font">{{basicInfo.province.value?basicInfo.province.name:"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                </div>
                <LinkBottom></LinkBottom>
            </div>
        </div>
        <div class="crad-item">
            <BaseZyTempTitle bgClass="jgy_bg_smsxyx" tempTitle="饮食偏好"></BaseZyTempTitle>
            <div class="crad-content">
                <LinkTop></LinkTop>
                <div class="content">
                    <div class="item-link tap_events" @click="showPops1('taste')">
                        <div class="select-name">
                            <span>口味</span>
                            <span class="optional">（选填）</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{dietRecommend.taste?tasteToggle(dietRecommend.taste):"请选择"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div class="item-link tap_events" @click="showPops1('noFood')">
                        <div class="select-name">
                            <span>不吃食材</span>
                            <span class="optional">（选填）</span>
                        </div>
                        <div class="select-box">
                            <div class="select-font">
                                <template
                                    v-if="dietRecommend.notEatFoodIdList && dietRecommend.notEatFoodIdList.length"
                                >
                                    {{dietRecommend.notEatFoodIdList | textFliter}}
                                </template>
                                <template v-else>{{"请输入食材名称"}}</template>
                            </div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                    <div
                        class="item-link tap_events"
                        @click="showPops1('extraMealList',dietRecommend.extraMealList)"
                    >
                        <div class="select-name">
                            <span>餐次</span>
                        </div>
                        <div class="select-box">
                            <div
                                class="select-font"
                            >{{dietRecommend.extraMealList.indexOf('0')==-1?extraMealText.join('、'):"早餐、午餐、晚餐"}}</div>
                            <span
                                class="jt"
                                :style="{backgroundImage: 'url(pctj_icon_jiantou.png)'}  | PUBLIC_PATH"
                            ></span>
                        </div>
                    </div>
                </div>
                <LinkBottom></LinkBottom>
            </div>
        </div>
        <div
            v-if="isActive"
            class="btn tap_events"
            :style="{backgroundImage: 'url(jgy_button_bg_huang.png)'}  | PUBLIC_PATH"
            @click="commit"
        >立即配餐</div>
        <div
            class="btnun"
            :style="{backgroundImage: 'url(jgy_button_bg_weijihuohuang.png)'}  | PUBLIC_PATH"
            v-else
        >立即配餐</div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectTypePop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <ul class="select-btn">
                        <li
                            :class="['radius2 tap_events',item.key==typeIndex?'active tap_events':'tap_events']"
                            @click="selectType(item.key)"
                            v-for="(item,index) in  resultTypeList"
                            :key="item.key"
                        >{{item.value}}</li>
                    </ul>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom class="timeWrap">
            <x-dialog
                v-model="selectTimePop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn font-big tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <datetime-view
                        :style="{marginTop: '.625rem',padding: '0 1rem'}"
                        :start-date="startDay"
                        :end-date="endDay"
                        v-model="time"
                        ref="datetime"
                        :format="format"
                    ></datetime-view>
                    <div
                        class="btn-commit tap_events"
                        @click="btnTime"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectSexPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <div class="sex-box">
                        <div
                            :class="[item.className,index==basicInfo.gender-1?'active tap_events':'tap_events']"
                            v-for="(item,index) in sexArr"
                            :key="index"
                            @click="selectSexHandle(index)"
                        >
                            <div
                                class="avatar"
                                :style="{backgroundImage: 'url(cpy_icon_nan.png)'}  | PUBLIC_PATH"
                                v-if="item.className=='sex-boy'"
                            ></div>
                            <div
                                class="avatar"
                                :style="{backgroundImage: 'url(cpy_icon_nv.png)'}  | PUBLIC_PATH"
                                v-if="item.className=='sex-women'"
                            ></div>
                        </div>
                    </div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom class="heightWrap">
            <x-dialog
                v-model="selectHeightPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn font-big tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <picker
                        ref="sPicker"
                        :style="{marginTop: '.625rem'}"
                        :data="heightArr"
                        v-model="selectHeightNum"
                        @on-change="changeHeight"
                    ></picker>
                    <div
                        class="btn-commit tap_events"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                        @click="selectHeight"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom class="weightWrap">
            <x-dialog
                v-model="selectWeightPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn font-big tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <picker
                        ref="wPicker"
                        :style="{marginTop: '.625rem'}"
                        :data="weightArr"
                        v-model="selectWeightNum"
                        @on-change="changeWeight"
                    ></picker>
                    <div
                        class="btn-commit tap_events"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                        @click="selectWeight"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectLevelPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <ul class="select-btn">
                        <li
                            :class="['radius2', index==levelIndex?'active tap_events':'tap_events']"
                            @click="levelHandle(index)"
                            v-for="(item,index) in  level"
                            :key="index"
                        >{{item}}</li>
                    </ul>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectTastePop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <ul class="select-btn">
                        <li
                            :class="['radius2', index+1==tasteIndex?'active tap_events':'tap_events']"
                            @click="tasteHandle(index+1)"
                            v-for="(item,index) in  taste"
                            :key="index"
                        >{{item}}</li>
                    </ul>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectCityPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn font-big tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <picker ref="cPicker" :style="{marginTop: '.625rem'}" :data="selectCity" v-model="initCity" @on-change="changeDietRecommend"></picker>
                    <div
                        class="btn-commit tap_events"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                        @click="selectCityBtn"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectNationPop"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="dialogHide"
            >
                <div class="pop1-select-btn font-big tap_events" @click="no">
                    <LinkTop></LinkTop>
                    <picker ref="nPicker" :style="{marginTop: '.625rem'}" :data="selectNation" v-model="initNation" @on-change="changeNation"></picker>
                    <div
                        class="btn-commit tap_events"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                        @click="selectNationBtn"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
        <div v-transfer-dom>
            <x-dialog
                v-model="selectExtraMeal"
                hide-on-blur
                @on-show="dialogShow"
                @on-hide="clasePop($event)"
            >
                <div class="pop1-select-btn tap_events" @click="no">
                    <div class="icon-text">多选</div>
                    <LinkTop></LinkTop>
                    <ul class="select-btn select-btn-add tap_events">
                        <li
                            @click="mealHandle(index,item)"
                            class="tap_events"
                            v-for="(item,index) in  extraMealActiveList"
                            :key="index"
                        >
                            <div
                                class="btn"
                                :class="['radius1',index<=2?'active':'',index<=2?'mix-fonts':'' ,dietRecommend.extraMealList.indexOf(`${index+1}`)!=-1?'active':'','mix-height-li']"
                            >{{item}}</div>
                            <div class="must-text" v-if="index==2">
                                <span class="link"></span>
                                <div>以上餐次必选</div>
                                <span class="link"></span>
                            </div>
                        </li>
                    </ul>
                    <div
                        class="btn-commit tap_events"
                        :style="{backgroundImage: 'url(sy_button_bg.png)'}  | PUBLIC_PATH"
                        @click="clasePopBtn($event)"
                    >确定</div>
                    <LinkBottom></LinkBottom>
                </div>
            </x-dialog>
        </div>
    </div>
</template>
<script>
    import { getUrlParam } from '@/assets/js/util.js'
    import { mapState, mapMutations } from "vuex";
    import LayBg from "../../components/common/LayBg.vue"
    import {
        XDialog,
        Cell,
        Group,
        Picker,
        GroupTitle,
        XButton,
        DatetimeView,
        TransferDomDirective as TransferDom
    } from "vux";

    import LinkTop from "../../components/common/LinkTop";
    import LinkBottom from "../../components/common/LinkBottom";
    import BaseZyTempTitle from "../../components/common/BaseZyTempTitle";
    import { getUserInfo, postUpsert } from "../../service/api/condition/index";
    export default {
        data() {
            return {
                selectTypePop: false, //选择类型的弹框
                selectTimePop: false, //选择时间的弹框
                selectSexPop: false, //选择性别的弹框
                selectHeightPop: false, //选择身高的弹框
                nameType: "", //类型名字
                resultType: -1, //已选类型
                resultTypeList: [], //l类型列表
                //用户信息
                basicInfo: {
                    birthday: "",
                    height: "",
                    gender: "", //性别 1:男 2：女 //空是请选择
                    userActivityLevel: "",
                    weight: "",
                    nation: {},
                    province: {}
                },
                time: "1990-01-01",
                format: "YYYY-MM-DD",
                // 性别
                sexArr: [{ className: "sex-boy" }, { className: "sex-women" }],
                selectSex: -1,
                // 身高start
                selectHeightNum: ["160"],
                nationText: "汉族",
                address: "北京市",
                addresskey:'',
                nationkey:'',
                heightArr: [],
                height: "", //滑动的身高值
                // 身高end

                // 体重 start
                selectWeightPop: false,
                selectNationPop: false,
                selectWeightNum: ["50.0"],
                weightArr: [],
                weight: "", //滑动的身高值
                // 体重 end

                selectLevelPop: false, //劳动强度弹框

                level: [
                    //劳动强度
                    "极轻体力，长时间久坐，如银行职员，办公室职员",
                    "轻体力，以坐为主有轻微体力活动，如老师、学生",
                    "中体力，体力活动较多，如服务员",
                    "重体力，体力活动为主，如搬运工"
                ],
                typeIndex: -1,
                levelIndex: -1, //等级默认选中哪个劳动级别

                taste: ["清淡", "甜", "辣", "咸", "不挑食，都可以"], // 口味
                tasteIndex: -1, //口味默认值
                selectTastePop: false, //口味弹框

                dietRecommend: {
                    extraMealList: ['0'],
                    taste: "",
                    notEatFoodIdList: []
                },
                otherInfoNeed: {
                    extraMealList: ["0"] //加餐列表 0：默认，1：早餐，2：午餐，3：晚餐，4：早加，5：午加，6：晚加
                },
                extraMealActiveList: [
                    "早餐",
                    "午餐",
                    "晚餐",
                    "早加",
                    "午加",
                    "晚加"
                ],
                extraMealText: [],
                selectExtraMeal: false, //加餐弹框
                isselectExtraMeal: false,
                selectCityPop: false, //城市弹框
                selectCity: [], //选择省市
                initCity: [], //初始化的
                initNation: [],
                selectNation: []
            };
        },
        filters: {
            textFliter(obj) {
                let arr = []
                obj.forEach(item => {
                    arr.push(item.foodName)
                })
                return arr.join('、')
            }
        },
        computed: {
            ...mapState(["code", "userId"]),
            isActive() {
                if (
                    this.nameType &&
                    this.basicInfo.birthday &&
                    this.basicInfo.gender &&
                    this.basicInfo.height &&
                    this.basicInfo.weight &&
                    this.basicInfo.userActivityLevel
                ) {
                    return true;
                } else {
                    return false;
                }
            },
            startDay() {
                let time = new Date();
                return `${time.getFullYear() - 70}-${this.add0(
                    time.getMonth() + 1
                )}-${this.add0(time.getDate())}`;
            },
            endDay() {
                let time = new Date();
                return `${time.getFullYear() - 14}-${this.add0(
                    time.getMonth() + 1
                )}-${this.add0(time.getDate())}`;
            },
        },
        directives: {
            TransferDom
        },
        components: {
            LinkTop,
            LinkBottom,
            BaseZyTempTitle,
            Picker,
            XDialog,
            DatetimeView,
            LayBg
        },
        beforeRouteEnter(to, from, next) {
            if (from.name == 'nofood') {
                next(vm => {
                    vm.initData1()
                })
            } else {
                next(vm => {
                    vm.initData()
                })
            }
        },
        watch: {
            "dietRecommend.extraMealList": {
                handler(n, o) {
                    let arr = [];
                    n.forEach(item => {
                        if (item == "1") {
                            arr.push("早餐");
                        } else if (item == "2") {
                            arr.push("午餐");
                        } else if (item == "3") {
                            arr.push("晚餐");
                        } else if (item == "4") {
                            arr.push("早加");
                        } else if (item == "5") {
                            arr.push("午加");
                        } else if (item == "6") {
                            arr.push("晚加");
                        }
                    });
                    this.extraMealText = arr;
                },
                deep: true
            },
        },
        beforeDestroy() {
            //为避免用户使用按键返回，需在页面离开时移除禁用即可
            this.$modalHelper.beforeClose()
        },
        deactivated() {
            this.$modalHelper.beforeClose()
        },
        methods: {
            ...mapMutations('created', ['setResultType','setCreated']),
            initData1() {
                let searchSureList = JSON.parse(window.sessionStorage.getItem('searchSureList') || "[]")
                this.$set(this.dietRecommend, 'notEatFoodIdList', searchSureList || [])
                let scrollTop = window.sessionStorage.getItem('c-scroll')
                if (Number(scrollTop)) {
                    this.$refs.cradWrap.scrollTop = scrollTop
                }
            },
            async initData() {
                let code = getUrlParam('code');
                const res = await getUserInfo(this.code, this.userId, config.isAssociated)
                this.resultTypeList = res.resultTypeList;
                if (res.resultType) {
                    this.typeIndex = res.resultType;
                    this.selectType(res.resultType);
                } else {
                    this.typeIndex = -1;
                    this.selectType(this.typeIndex);
                }
                // 当是新用户的时候res.basicInfo是null
                if (res.basicInfo) {
                    this.basicInfo = res.basicInfo;
                    this.time = res.basicInfo.birthday;
                    this.$refs.datetime.render();
                    // 当有身高初始值，把选择身高设置为默认值。
                    this.selectHeightNum = [`${res.basicInfo.height}`];
                    this.selectWeightNum = [`${res.basicInfo.weight.toFixed(1)}`];
                    // 劳动强度回显
                    this.levelIndex = res.basicInfo.userActivityLevel;
                    // 回显民族
                    if(res.basicInfo.nation) {
                        let nationObj={};
                        nationObj.value= res.basicInfo.nation
                        this.initNation=[res.basicInfo.nation]
                        res.nationList.some(item=>{
                            return item.key==res.basicInfo.nation?(nationObj.name=item.value):nationObj.name=''
                        })
                        this.basicInfo.nation =nationObj;
                    }
                    //回显地区
                    if(res.basicInfo.province) {
                        let cityObj={};
                        cityObj.value= res.basicInfo.province
                        this.initCity=[res.basicInfo.province]
                            res.regionList.some(item=>{
                            return item.key==res.basicInfo.province?(cityObj.name=item.value):cityObj.name=''
                        })
                        this.basicInfo.province=cityObj;
                    }
                } else {
                    this.basicInfo = {
                        birthday: "",
                        height: "",
                        gender: "",
                        userActivityLevel: "",
                        weight: "",
                        province: {},
                        nation: {}
                    };
                }
                if (res.dietRecommend) {
                    this.tasteIndex = res.dietRecommend.taste;
                    let dietRecommend = res.dietRecommend;
                    dietRecommend.extraMealList = Array.from(new Set([...dietRecommend.extraMealList, "1", "2", "3"]))
                    dietRecommend.notEatFoodIdList = res.notEatFoodList || []
                    this.dietRecommend = dietRecommend
                } else {
                    this.dietRecommend.notEatFoodIdList = []
                    this.dietRecommend.extraMealList = ["1", "2", "3"]
                }
                if (res.otherInfoNeed) {
                    this.otherInfoNeed = res.otherInfoNeed;
                }
                //民族
                let regionList=[];
                    if(res.regionList){
                        res.regionList.forEach((region)=>{
                        region.name=region.value;
                        region.value=region.key;
                    })
                        regionList.push(res.regionList);
                    }
                this.selectCity = regionList;
                //地区
                let nationList=[];
                if(res.nationList){
                    res.nationList.forEach((nation)=>{
                        nation.name=nation.value;
                        nation.value=nation.key;
                    })
                    nationList.push(res.nationList);
                }
                this.selectNation =nationList;
                // 生成身高
                let height = [];
                for (
                    var i = parseInt(res.userInfoNeed.height.min);
                    i <= parseInt(res.userInfoNeed.height.max);
                    i++
                ) {
                    height.push({
                        name: i,
                        value: i,
                        key: i
                    });
                }
                this.heightArr = [height];
                // 体重
                let weight = [];
                for (
                    var i = parseInt(res.userInfoNeed.weight.min) * 10;
                    i <= parseInt(res.userInfoNeed.weight.max) * 10;
                    i++
                ) {
                    weight.push({
                        name: (i / 10).toFixed(1),
                        value: (i / 10).toFixed(1),
                        key: i / 10
                    });
                }
                this.weightArr = [weight];
            },
            dialogShow() {
                this.$modalHelper.afterOpen()
            },
            dialogHide() {
                this.$modalHelper.beforeClose()
            },
            // 单项滑动弹框显示隐藏
            showPops1(types, text) {
                if (types == "type") {
                    this.selectTypePop = true;
                } else if (types == "time") {
                    this.time = this.basicInfo.birthday || '1990-01-01'
                    this.selectTimePop = true;
                    this.$refs.datetime.render();
                } else if (types == "gender") {
                    this.selectSexPop = true;
                } else if (types == "height") {
                    this.selectHeightNum = this.basicInfo.height ? [String(this.basicInfo.height)] : ["160"]
                    this.height = String(this.basicInfo.height) || "160"
                    this.selectHeightPop = true;
                    this.$refs.sPicker.render();
                } else if (types == "weight") {
                    this.selectWeightNum = this.basicInfo.weight ? [String(Number(this.basicInfo.weight).toFixed(1))] : ["50.0"]
                    this.weight = this.basicInfo.weight ? String(Number(this.basicInfo.weight).toFixed(1)) : "50.0"
                    this.selectWeightPop = true;
                    this.$refs.wPicker.render();
                } else if (types == "level") {
                    this.selectLevelPop = true;
                } else if (types == "taste") {
                    this.selectTastePop = true;
                } else if (types == "province") {
                    if (this.basicInfo.province) {
                        this.initCity = [this.basicInfo.province.value]
                        this.address = this.basicInfo.province.name || this.address
                        this.addresskey = this.basicInfo.province.value || this.addresskey
                    }
                    this.selectCityPop = true;
                } else if (types == "extraMealList") {
                    this.selectExtraMeal = true;
                    this.isselectExtraMeal = true;
                    window.sessionStorage.setItem(
                        "selectExtraMealOld",
                        JSON.stringify(text)
                    );
                } else if (types == "nation") {
                    if (this.basicInfo.nation) {
                        this.initNation = [this.basicInfo.nation.value]
                        this.nationText = this.basicInfo.nation.name || this.nationText
                        this.nationkey = this.basicInfo.nation.value || this.nationkey
                    }
                    this.selectNationPop = true
                } else if (types == "noFood") {
                    window.sessionStorage.setItem('searchSureList', JSON.stringify(this.dietRecommend.notEatFoodIdList || []))
                    window.sessionStorage.setItem('c-scroll', this.$refs.cradWrap.scrollTop)
                    this.$router.push('/nofood')
                }
            },
            // 点击哪个类型
            selectType(e) {
                this.typeIndex = e;
                this.resultTypeList.forEach(item => {
                    if (item.key == e) {
                        this.nameType = item.value;
                    }
                });
            },
            // 选择性别
            selectSexHandle(index) {
                this.selectSex = index;
                setTimeout(() => {
                    this.selectSexPop = false;
                }, 50);
                switch (index) {
                    case 0:
                        return (this.basicInfo.gender = "1");
                        breack;
                    case 1:
                        return (this.basicInfo.gender = "2");
                        breack;
                }
            },
            toggleSex(n) {
                if (n == 1) {
                    return "男";
                } else if (n == 2) {
                    return "女";
                } else {
                    return "请选择";
                }
            },
            tasteToggle(n) {

                switch (n) {
                    case "1":
                        return "清淡";
                        breack;
                    case "2":
                        return "甜";
                        breack;
                    case "3":
                        return "辣";
                        breack;
                    case "4":
                        return "咸";
                        breack;
                    case "5":
                        return "不挑食，都可以";
                        breack;
                }
            },
            // 选择身高
            changeHeight(value) {
                this.height = value[0];
            },
            // 选择身高
            changeWeight(value) {
                this.weight = value[0];
            },
            selectHeight() {
                this.basicInfo.height = this.height;
                this.selectHeightPop = false;
            },
            selectWeight() {
                this.basicInfo.weight = this.weight;
                this.selectWeightPop = false;
            },
            // 选择的劳动强度
            levelHandle(index) {
                this.levelIndex = index;
                this.basicInfo.userActivityLevel = `${index}`;
                setTimeout(() => {
                    this.selectLevelPop = false;
                }, 50);
            },
            // 选择口味
            tasteHandle(index) {
                this.tasteIndex = index;
                this.dietRecommend.taste = `${index}`;
                setTimeout(() => {
                    this.selectTastePop = false;
                }, 50);
            },
            // 换算劳动强度
            activityLevel(n) {
                switch (n) {
                    case "0":
                        return "极轻";
                        breack;
                    case "1":
                        return "轻度";
                        breack;
                    case "2":
                        return "中度";
                        breack;
                    case "3":
                        return "重度";
                        breack;
                }
            },
            changeDietRecommend(value) {
                 this.address = this.$refs.cPicker.getNameValues()
                 this.addresskey=value[0];
            },
            changeNation(value) {
                this.nationText = this.$refs.nPicker.getNameValues()
                this.nationkey=value[0];
            },
            selectCityBtn() {
                 let cityObj={};
                 cityObj.name=this.address
                 cityObj.value=this.addresskey;
                 this.basicInfo.province=cityObj;
                 this.$forceUpdate()
                this.selectCityPop = false;
            },
            selectNationBtn() {
                let nationObj={};
                nationObj.name=this.nationText
                nationObj.value=this.nationkey
                this.basicInfo.nation=nationObj
                this.$forceUpdate()
                this.selectNationPop = false;
            },
            // 选择加餐
            mealHandle(index, text) {
                if (text != "早餐" && text != "午餐" && text != "晚餐") {
                    if (
                        this.dietRecommend.extraMealList.indexOf(`${index + 1}`) !=
                        "-1"
                    ) {
                        this.dietRecommend.extraMealList.splice(
                            this.dietRecommend.extraMealList.indexOf(
                                `${index + 1}`
                            ),
                            1
                        );
                    } else {
                        this.dietRecommend.extraMealList.push(`${index + 1}`);
                    }
                }
                this.$forceUpdate();
            },
            // 点击加餐蒙层，弹框自动关闭的回调函数
            clasePop(event) {
                this.$modalHelper.beforeClose()
                this.selectExtraMeal = false;
                if (this.isselectExtraMeal) {
                    this.dietRecommend.extraMealList = JSON.parse(
                        window.sessionStorage.getItem("selectExtraMealOld")
                    );
                }
            },
            // 点击加餐确定按钮
            clasePopBtn(event) {
                this.isselectExtraMeal = false;
                this.selectExtraMeal = false;
            },
            btnTime() {
                this.basicInfo.birthday = this.time;
                this.selectTimePop = false;
            },
            no() {
                this.selectTypePop = false;
            },
            add0(v) {
                if (v <= 9) {
                    return "0" + v;
                } else {
                    return v;
                }
            },
            // 提交配餐
            async commit() {
                var code = this.code,
                    userId = this.userId,
                    resultType = this.typeIndex,
                    basicInfo = this.basicInfo,
                    dietRecommend = {
                        taste: this.dietRecommend.taste,
                        extraMealList: this.dietRecommend.extraMealList, //extraMealText
                        notEatFoodIdList: []
                    };
                basicInfo.nation = basicInfo.nation.value?basicInfo.nation.value: ""
                basicInfo.province = basicInfo.province.value?basicInfo.province.value:""
                if (this.dietRecommend.notEatFoodIdList.length) {
                    this.dietRecommend.notEatFoodIdList.forEach(item => {
                        dietRecommend.notEatFoodIdList.push(item.foodId)
                    })
                }
                this.setResultType(resultType)
                await postUpsert(code, userId, resultType, basicInfo, dietRecommend)
                this.setCreated("1")
                this.$router.push({name: "result"});
            }
        },
    };
</script>
<style lang="scss" scoped>
    @import "@/assets/style/mixin.scss";
    .crad-wrap {
        width: 100%;
        padding: 0.8rem 0.75rem 1.1rem;
        box-sizing: border-box;
        height: 100%;
        @include bg_color1();
        overflow-y: auto;
        .select-name {
            @include font_color4();
            display: flex;
            align-items: center;
            .optional {
                font-size: 0.65rem;
                @include font_color1;
            }
        }
        .select-font {
            @include font_color5();
            max-width: 7.2rem /* 288/40 */;
            word-break: break-all;
            line-height: 1.2rem /* 48/40 */;
        }
        .crad-item {
            width: 100%;
            @include bg_color6;
            @include box_shodow1(0 0.3rem 1rem 0);
            border-radius: 0.2rem;
            & + .crad-item {
                margin-top: 0.8rem;
            }
            .crad-content {
                width: 100%;
                height: 100%;
                overflow: hidden;
                .content {
                    width: 100%;
                    height: 100%;
                    padding: .575rem /* 23/40 */ 1.05rem;
                    box-sizing: border-box;
                    font-size: 0.8rem;
                    .item-link {
                        width: 100%;
                        line-height: 1.2rem /* 48/40 */;
                        margin-top: 1.3rem /* 52/40 */;
                        display: flex;
                        justify-content: space-between;
                        align-items: flex-start;
                    }
                    & .item-link:nth-child(1) {
                        margin-top: 0;
                    }
                    .select-box {
                        display: flex;
                        align-items: center;
                        .jt {
                            display: inline-block;
                            width: 0.3rem;
                            height: 0.6rem;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: 100% 100%;
                            margin-left: 0.5rem;
                        }
                    }
                }
            }
        }
        .btn {
            width: 10.25rem;
            height: 2.5rem;
            margin: 1.1rem auto;
            font-size: 0.9rem;
            @include font_color6;
            border-radius: 1.25rem;
            background-position: center;
            background-repeat: no-repeat;
            @include bg_color();
            display: flex;
            justify-content: center;
            align-items: center;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 9.7275rem 2rem;
            font-weight: bold;
            @include box_shodow2(0 0.3rem 0.75rem 0);
        }
        .btnun {
            width: 10.25rem;
            height: 2.5rem;
            margin: 1.1rem auto 0;
            font-size: 0.9rem;
            @include font_color6;
            border-radius: 1.25rem;
            background-position: center;
            background-repeat: no-repeat;
            @include bg_color25();
            display: flex;
            justify-content: center;
            align-items: center;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 9.7275rem 2rem;
            font-weight: bold;
        }
        .pop1 {
            position: fixed;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            .btn-commit {
                background-size: 100% 100%;
                width: 15.15rem;
                height: 2.4rem;
                @include bg_color;
                border-radius: 1.25rem;
                margin: 1rem auto .275rem /* 11/40 */;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 0.9rem;
                @include font_color6;
                @include box_shodow2(0 0.3rem 0.75rem 0);
            }
            .pop1-box {
                width: 17.25rem;
                @include bg_color6;
                border-radius: 0.2rem;
                overflow: hidden;
            }
            // 性别弹框
            .pop1-sex {
                width: 17.25rem;
                height: 8.4rem;
                @include bg_color6;
                border-radius: 0.2rem;
                overflow: hidden;
                .sex-box {
                    width: 100%;
                    height: 5rem;
                    margin: 1rem auto;
                    padding: 0 2.25rem;
                    box-sizing: border-box;
                    display: flex;
                    justify-content: space-between;
                    .sex-boy {
                        width: 5rem;
                        height: 5rem;
                        @include bg_color6;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        .avatar {
                            width: 4.5rem;
                            height: 4.5rem;
                            background-size: cover;
                        }
                    }
                    .sex-women {
                        width: 5rem;
                        height: 5rem;
                        @include bg_color6;
                        border-radius: 50%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-sizing: border-box;
                        .avatar {
                            width: 4.5rem;
                            height: 4.5rem;
                            background-size: cover;
                        }
                    }
                    .active {
                        @include border1(0.125rem solid);
                    }
                }
            }
            .select-btn {
                width: 100%;
                li {
                    margin: 0 auto;
                    box-sizing: border-box;
                    width: 15.15rem;
                    padding: 0.4rem 1.3rem;
                    font-size: 0.8rem;
                    @include bg_color6;
                    @include font_color4;
                    margin: 0.5rem auto;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                .active {
                    @include bg_color();
                    @include font_color6;
                }
            }
            // 选项按钮组件
        }
    }
    .font-big {
        font-weight: bold;
    }
    .pop1-select-btn {
        @include bg_color6;
        border-radius: 0.2rem;
        .icon-text {
            font-weight: bold;
            position: absolute;
            left: -0.75rem;
            top: -1.2rem;
            width: 3.4rem;
            height: 1.7rem;
            @include bg_color();
            @include box_shodow4(0 0.3rem 0.75rem 0);
            border-radius: 0 0.85rem 0.85rem 0;
            border-radius: 0px 0.85rem 0.85rem 0px;
            font-size: 0.7rem;
            @include font_color6;
            text-align: center;
            line-height: 1.7rem;
        }
        .select-btn {
            width: 100%;
            .radius2 {
                border-radius: 3.2rem;
            }
            .radius1{
                border-radius: .3rem /* 12/40 */;
            }
            li {
                font-weight: 500 !important;
                margin: 0 auto;
                box-sizing: border-box;
                width: 15.15rem /* 606/40 */;
                padding: 0.4rem 1.3rem;
                border: 1px solid;
                @include border_color();
                font-size: 0.8rem;
                @include bg_color6;
                @include font_color4;
                margin: 0.5rem auto;
                display: flex;
                justify-content: center;
                align-items: center;
                text-align: center;
            }
            .active {
                @include bg_color();
                @include font_color6;
                font-weight: 600;
                @include border1(1px solid);
                font-weight: bold !important;
            }
        }
        .btn-commit {
            background-size: 100% 100%;
            width: 15.15rem;
            height: 2.4rem;
            background-position: center center;
            background-repeat: no-repeat;
            background-size: 14.6275rem 1.9rem;
            @include box_shodow2(0 0.3rem 0.75rem 0);
            @include bg_color;
            border-radius: 1.25rem;
            margin: 1.6rem /* 64/40 */ auto .275rem /* 11/40 */;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 0.9rem;
            @include font_color6;
        }
        // sex
        .sex-box {
            width: 100%;
            height: 5rem;
            margin: 1rem auto;
            padding: 0 2.25rem;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .sex-boy {
                width: 5rem;
                height: 5rem;
                @include bg_color6;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                .avatar {
                    width: 4.5rem;
                    height: 4.5rem;
                    background-size: cover;
                }
            }
            .sex-women {
                width: 5rem;
                height: 5rem;
                @include bg_color6;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                box-sizing: border-box;
                .avatar {
                    width: 4.5rem;
                    height: 4.5rem;
                    background-size: cover;
                }
            }
            .active {
                @include border1(0.125rem solid);
                font-weight: 600;
            }
        }
        // 单独处理后加的样式
        .select-btn-add {
            li {
                font-weight: 600;
                padding: 0 !important;
                display: flex;
                flex-direction: column;
                border: none !important;
                .active {
                    @include bg_color6;
                    @include font_color10;
                    @include border1(0.025rem solid);
                }
                .mix-fonts {
                    font-weight: 500;
                }
                .mix-height-li {
                    height: 2rem;
                    display: flex;
                    align-items: center;
                    flex-direction: column;
                }
            }
            .must-text {
                border: none !important;
                width: 100%;
                height: .9rem /* 36/40 */;
                margin-top: .8rem /* 32/40 */;
                margin-bottom: .3rem /* 12/40 */;
                display: flex;
                align-items: center;
                font-weight: 400;
                span {
                    width: 8.45rem;
                    height: 1px;
                    @include bg_color24();
                }
                div {
                    min-width: 4rem;
                    font-size: 0.6rem;
                    @include font_color();
                    margin: 0 1.2rem;
                    opacity: 0.6;
                }
            }
            .btn {
                width: 100% !important;
                height: 100%;
                padding: 0.4rem 1.3rem;
                box-sizing: border-box;
                border: 0.025rem solid;
                @include border_color();
            }
        }
    }
</style>
<style lang="scss">
    @import "@/assets/style/mixin.scss";
    .dp-content {
        padding: 0!important;
    }
    .scroller-indicator {
        background-image: none !important;
    }
    .scroller-item {
        font-size: 0.7rem !important;
        color: #666666;
        font-weight: bold;
    }
    .scroller-item-selected {
        font-size: 1.1rem !important;
        padding-top: 1px;
        color: #666666;
    }
    .weui-dialog {
        width: 92% !important;
        max-width: 100% !important;
        overflow: auto !important;
    }
    .heightWrap {
        .scroller-indicator:after {
            content: "厘米";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.5rem 0 -0.2rem 1.5rem;
            z-index: 2;
            font-size: 0.8rem;
            width: 2.6rem;
            height: 0.4rem;
            @include font_color5();
            font-weight: 500;
        }
    }
    .weightWrap {
        .scroller-indicator:after {
            content: "公斤";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.5rem 0 -0.2rem 1.5rem;
            z-index: 2;
            font-size: 0.8rem;
            width: 2.6rem;
            height: 0.4rem;
            @include font_color5();
            font-weight: 500;
        }
    }
    [data-role="year"] {
        .scroller-indicator:after {
            content: "年";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.5rem 0 -0.2rem 1.7rem;
            z-index: 2;
            font-size: 0.8rem;
            width: 0.8rem;
            height: 0.4rem;
            @include font_color5();
            font-weight: 500;
        }
    }
    [data-role="month"] {
        .scroller-indicator:after {
            content: "月";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.52rem 0 -0.2rem 1rem;
            z-index: 2;
            font-size: 0.8rem;
            width: 0.8rem;
            height: 0.4rem;
            @include font_color5();
            font-weight: 500;
        }
    }
    [data-role="day"] {
        .scroller-indicator:after {
            content: "日";
            position: absolute;
            top: 50%;
            left: 50%;
            margin: -0.52rem 0 -0.2rem 1rem;
            z-index: 2;
            font-size: 0.8rem;
            width: 0.8rem;
            height: 0.4rem;
            @include font_color5();
            font-weight: 500;
        }
    }
</style>
