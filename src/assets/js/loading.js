
/**
 * @desc vue 插件挂载 
 */
import Loading from "@/components/common/Loading";
export default {
    install(Vue) {
        this.initLoading(Vue);
    },
    /**
     * 初始化loading
     */
    initLoading(Vue) {
        const el = document.createElement("div");
        el.id = "loading_el";
        document.querySelector("body").appendChild(el);
        const loading = Vue.extend(Loading)
        const dom = new loading().$mount("#loading_el")
        Vue.prototype.$loading = dom;
    }
}