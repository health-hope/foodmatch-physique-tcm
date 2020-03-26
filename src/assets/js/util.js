
/*
 * 获取url参数
 */
const getUrlParam = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) return unescape(r[2]); return null
}
/**
 * @desc 加载vconsole调试器
 */
const initVconsole = () => {
    const scriptDom = document.createElement("script")
    scriptDom.src = "https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js"
    document.body.insertBefore(scriptDom, document.querySelector("#app"))
    scriptDom.onload = () => {
        /* eslint-disable */
        new VConsole()
        /* eslint-disable */
    }
}
/**
 * 生成uuid
 */
const uuid = () => {
    let s = []
    let hexDigits = '0123456789abcdef'
    for (let i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4'
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
    s[8] = s[13] = s[18] = s[23] = '-'
    let uuid = s.join('')
    return uuid
}
/**
 * @desc 产生指定长度随机数
 * @param {int} [length=32] 指定的长度
 * @return {number} 随机字符串
 */
const getRandomNum = (length = 32) => {
    const chars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
    let nums = ''
    for (var i = 0; i < length; i++) {
        var id = parseInt(Math.random() * 61)
        nums += chars[id]
    }
    return nums
}
/**
 * 判断是否为空
 */
const isEmpty = (keys) => {
    if (typeof keys === 'string') {
        keys = keys.replace(/"|&nbsp;|\\/g, '').replace(/(^\s*)|(\s*$)/g, '');
        if (keys == '' || keys == null || keys == 'null' || keys === 'undefined') {
            return true;
        } else {
            return false;
        }
    } else if (typeof keys === 'undefined') { // 未定义
        return true;
    } else if (typeof keys === 'number') {
        return false;
    } else if (typeof keys === 'boolean') {
        return false;
    } else if (typeof keys === 'object') {
        if (JSON.stringify(keys) == '{}') {
            return true;
        } else if (keys == null) { // null
            return true;
        } else {
            return false;
        }
    }
    if (keys instanceof Array && keys.length == 0) { // 数组
        return true;
    }
}
/**
 * @des 判断是不是isIPhoneX
 * @author haotengfei
 * @date 20190527
 */
const isIPhoneX = () => {
    var u = navigator.userAgent;
    var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
    if (isIOS) {
        if (screen.height == 812 && screen.width == 375) {
            return true
        } else {
            return false
        }
    }
}
// 判断安卓
const isAndroid = () => {
    var u = navigator.userAgent;
    if (u.indexOf("Android") > -1 || u.indexOf("Linux") > -1) {
        if (window.ShowFitness !== undefined) return true;
    }
    return false;
}
// 判断设备为 ios
const isIos = () => {
    var u = navigator.userAgent;
    if (u.indexOf("iPhone") > -1 || u.indexOf("iOS") > -1) {
        return true;
    }
    return false;
}
/**
 * @des 读Cookie
 * @author haotengfei
 * @date 20190527
 * @param {String} key cookie键名
 */
const getCookie = (key) => {
    var arrStr = document.cookie.split('; ');
    for (var i = 0; i < arrStr.length; i++) {
        var temp = arrStr[i].split('=');
        if (temp[0] == key) return unescape(temp[1]);
    }
    return '';
}
/**
 * @des 设置cookie的值
 * @author haotengfei
 * @date 20190527
 * @param {String} key cookie键名
 * @param {String} value cookie键值
 * @param {String} time cookie有效期 单位 s
 */
const setCookie = (key, value, time) => {
    var d = new Date();
    d.setTime(d.getTime() + (time * 1000));
    var expires = 'expires=' + d.toGMTString();
    document.cookie = `${key}=${escape(value)};${expires}`;
}

/**
 * 防抖函数
 * @param {Function} fn 函数
 * @param {Number} time 时间
 */
const _debounce = (fn, time) => {
    let delay = time || 1000;
    let timer;
    return function () {
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            timer = null;
            fn.apply(this, args);
        }, delay);
    };
};

/**
 * 节流函数
 * @param {*} fn
 * @param {*} time
 */
const _throttle = (fn, time) => {
    let last; let timer; let interval = time || 1000;
    return function () {
        let args = arguments;
        let now = +new Date();
        if (last && now - last < interval) {
            clearTimeout(timer);
            timer = setTimeout(() => {
                last = now;
                fn.apply(this, args);
            }, interval);
        } else {
            last = now;
            fn.apply(this, args);
        }
    };
};

export {
    getUrlParam,
    uuid,
    getRandomNum,
    isIPhoneX,
    getCookie,
    setCookie,
    _debounce,
    _throttle,
    isEmpty,
    initVconsole,
    isAndroid,
    isIos
}
