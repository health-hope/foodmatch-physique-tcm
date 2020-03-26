<template>
    <div id="app" v-cloak>
        <keep-alive>
            <router-view v-if="$route.meta.cache"></router-view>
        </keep-alive>
        <transition name="fade" mode="out-in">
            <router-view v-if="!$route.meta.cache"></router-view>
        </transition>
    </div>
</template>
<script>
import { getUrlParam } from "@/assets/js/util.js";
import { mapState, mapMutations } from "vuex";
export default {
    data() {
        return {
            onLine: navigator.onLine
        };
    },
    created() {
        let code = getUrlParam("code");
        if (code) {
            this.setFoodmatchType(code);
        } else {
            this.$toast("配餐类型不能为空！");
        }
        let userId = getUrlParam("user-id");
        if (userId) {
            this.setUserId(userId);
        } else {
            this.$toast("用户编码不能为空！");
        }
    },
    computed: {
        ...mapState(["code"])
    },

    methods: {
        ...mapMutations(["setFoodmatchType", "setUserId"]),
        updateOnlineStatus(e) {
            const { type } = e;
            this.onLine = type === 'online';
            if(this.onLine !== 'online') {
                this.$toast('网络好像有点问题，请检查后重试！')
            }
        }
    },
    mounted() {
        window.document.documentElement.setAttribute("data-theme", this.code);
        window.addEventListener("offline", this.updateOnlineStatus);
    },
    beforeDestroy(){
        window.removeEventListener('offline', this.updateOnlineStatus);
    }
};
</script>

<style lang="less">
//  1px 解决方案
@import "~vux/src/styles/1px.less";
html,
body,
#app {
    width: 100%;
    height: 100%;
}
</style>
