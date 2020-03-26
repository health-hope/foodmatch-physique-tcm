import axios from 'axios';
import Vue from 'vue';
import { getRandomNum, isEmpty, getUrlParam } from '@/assets/js/util';
import { TimeTool } from '@/assets/js/timeTool';
import doSign from '@/assets/js/doSign';
import { env } from '@/service/env';
let token = getUrlParam('token')

axios.defaults.timeout = 100000;
/**
 * 请求数据封装
 * @param url 请求地址
 * @param code 请求类型
 * @param params 请求参数
 */
let pending = []; //声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let cancelToken = axios.CancelToken;
let removePending = (config) => {
    for (let p in pending) {
        if (pending[p].u === config.url + '&' + config.method) { //当当前请求在数组中存在时执行函数体
            pending[p].f(`${config.url} 中断重复请求`); //执行取消操作
            pending.splice(p, 1); //把这条记录从数组中移除
        }
    }
}
//添加请求拦截器
axios.interceptors.request.use(config => {
    if (token) {
        config.headers['token'] = token
    }
    removePending(config); //在一个ajax发送前执行一下取消操作
    config.cancelToken = new cancelToken((c) => {
        // 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
        pending.push({ u: config.url + '&' + config.method, f: c });
    });
    return config;
}, error => {
    return Promise.reject(error);
});

export default async (url = '', params = {}, options = {}) => {
    let defaultOptions = {
        baseUrl: env.BASEURL, // 基础url
        loading: true, // 是否显示Loading
        method: 'post', // 请求方法
        needSign: true, // 是否需要签名
        dataPath: 'resData', // 返回数据所在路径(相对于response.data)
        enterSilence: false, // 是否不再输出入参日志
        outputSilence: false// 是否不再输出出参日志
    }
    Object.assign(defaultOptions, options);
    if (defaultOptions.loading) {
        Vue.prototype.$loading.show();
    }
    /**
     *  需要加签 ，提供两种形式，1.通过signUrl加签，通过私钥加签
     */
    if (defaultOptions.needSign) {
        let { signUrl,privateKey } = window.config;
        if (token) {
            const nonceStr = getRandomNum();//随机字符串
            const timeTools = new TimeTool();
            const timestamp = timeTools.parseTime("yyyy-mm-dd-hh-mm-ss");
            let {
                appId,
                version
            } = window.config;
            // 优先采用token模式
            params = {
                reqData: params,
                appId,
                version,
                timestamp,
                nonceStr
            }
        } else if (!isEmpty(signUrl)) {
            await axios.get(signUrl, {}).then(res => {
                if (res.status === 200) {
                    let data = res.data;
                    params = {
                        reqData: params,
                        appId: data.appId,
                        version: data.version,
                        timestamp: data.timestamp,
                        sign: data.sign,
                        nonceStr: data.nonceStr
                    }
                }
            })
        } else if (!isEmpty(privateKey)) {
            const nonceStr = getRandomNum();// 随机字符串
            const timeTools = new TimeTool();
            const timestamp = timeTools.parseTime('yyyy-mm-dd-hh-mm-ss');
            let {
                appId,
                version,
                privateKey
            } = window.config;
            if (privateKey) {
                privateKey = `-----BEGIN PRIVATE KEY-----${privateKey}-----END PRIVATE KEY-----`;
            }
            const signStr = `appId=${appId}&nonceStr=${nonceStr}&timestamp=${timestamp}&version=${version}`;
            const sign = doSign(signStr, privateKey);
            params = {
                reqData: params,
                appId,
                version,
                timestamp,
                sign,
                nonceStr
            }
        } else {
            Vue.prototype.$toast('请检查秘钥或配置token！')
        }
    }
    let response = await axios({
        url: defaultOptions.baseUrl + url + '?code=' + `${getUrlParam('code') || window.sessionStorage.getItem("mealCode")}`,
        method: defaultOptions.method,
        data: JSON.stringify(params),
        headers: {
            'Content-Type': 'application/json'
        },
        xhrFields: { withCredentials: true },
        dataType: 'json'
    }).catch(err => {
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
    });
    if (response.status == 200) {
        let data = defaultOptions.dataPath ? response.data[defaultOptions.dataPath] : response.data;
        try {
            data = JSON.parse(data)
        } catch (err) {
            console.err(err)
        }
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
        if (data.retCode === 'SUCCESS') {
            return data;
        } else {
            Vue.prototype.$toast(data.retInfo || data.tooltip || '请求失败，请稍后再试！')
            Vue.prototype.$loading.hide();
        }
    } else {
        Vue.prototype.$toast('网络好像有点问题，请检查后重试')
        if (defaultOptions.loading) {
            Vue.prototype.$loading.hide();
        }
    }
}
