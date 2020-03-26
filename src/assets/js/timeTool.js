/**
* @desc 时间类工具
* @prop {string} year 年
* @prop {string} month 月
* @prop {string} day 日
* @prop {string} hour 时
* @prop {string} minute 分
* @prop {string} second 秒
* @prop {string} week 星期几
* @prop {string} monthDays 月天数
* @prop {string} fullDate 精确到天的日期 eg:20180927
* @prop {number} timeStamp 时间戳
* @prop {date} date 标准时间对象
*/
class TimeTool {
	/**
	 * @desc 初始化时间
	 * @param {string | Date} param  基准时间参数 默认为当前时间 eg  2018-09-27、2018/9/27  2018/09/27/21/56/33 、20180927、new Date() 等
	 */
    constructor (param) {
        this.setDate(param)
    }
	/**
	 * @desc 更新实例的基准时间 其他相应的 年月日 时分秒 已及星期随之更新
	 * @param {string} param  基准时间参数 默认为当前时间
	 * @return {Object} this  返回实例所有信息
	 */
    setDate (param) {
        const detailInfo = this.getDetail(param)
        Object.assign(this, detailInfo)
        return this;
    }
	/**
	 * @desc 根据传入时间 返回 年 月 日 星期 以及精确到日的时间等信息
	 * @param {string|Date} param  时间参数  eg 2018-09-27、2018/9/27  2018/09/27/21/56/33 、20180927 等
	 * @return {Object}  object
	 */
    getDetail (date) {
        const { zeroize } = this;
        if (!this.isDate(date)) {
            date = this.parseDate(date)
        }
        const year = String(date.getFullYear());
        const month = String(zeroize(date.getMonth() + 1));
        const day = String(zeroize(date.getDate()));
        const hour = String(zeroize(date.getHours()));
        const minute = String(zeroize(date.getMinutes()));
        const second = String(zeroize(date.getSeconds()));
        const week = String(date.getDay() === 0 ? 7 : date.getDay());
        const timeStamp = date.getTime();
        const monthDays = String(this.getMonthDays(String(date.getFullYear()), String(zeroize(date.getMonth() + 1))));
        const fullDate = Number(year + month + day);
        return {
            year,
            month,
            day,
            hour,
            minute,
            second,
            week,
            date,
            timeStamp,
            monthDays,
            fullDate
        }
    }
	/**
	 * @desc 断言是否为一个标准对象类型
	 * @param {any} param
	 * @return {Boolean}
	 */
    isDate (param) {
        return param instanceof Date
    }
	/**
	 * @desc 传入一个字符串 返回一个标准对象
	 * @param {string} date 字符串
	 *
	 */
    parseDate (date = '') {
        const { zeroize } = this;
        if (this.isDate(date)) return date;
        date = String(date);
        // date = date.split(/[-|\/|\\|-|\:|年|月|日|号|_]/).map(val => zeroize(val)).join("");
        date = date.split(/[-|/|\\|-|:|年|月|日|号|_]/).map(val => zeroize(val)).join('');
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6, 8);
        const hour = date.substring(8, 10) || null;
        const minute = date.substring(10, 12) || null;
        const second = date.substring(12, 14) || null;

        const date1 = new Date();
        if (year.length === 4) {
            date1.setFullYear(Number(year), (day ? Number(month) - 1 : Number(month)), Number(day));
        }
        if (hour) {
            date1.setHours(hour, minute, second);
        }
        return date1;
    }
	/**
	 * @desc 格式化时间戳
	 * @param {string} [typ] 格式化形式  见switch语句
	 * @param {timestamp} [init] 时间戳 默认为当前时间
	 * @param {string} [link] 连接符 当日期和时间同时出现时 时 分秒之间恒定为 ":"
	 * @return {Date} 被格式化后的日期对象
	 */
    parseTime (typ, init, link = '-') {
        const {
            year,
            month,
            day,
            minute,
            hour,
            second
        } = this;
        switch (typ) {
            case 'hh-mm-ss':
                return hour + link + minute + link + second;
            case 'yyyy-mm-dd-hh-mm-ss':
                return year + link + month + link + day + ' ' + hour + ':' + minute + ':' + second;
            case 'yyyy-mm-dd':
                return year + link + month + link + day;
            default:
                return '';
        }
    }
	/**
	 * @desc 获取指定时间长度后的时间
	 * @param {number} [expires] 到期时间长度
	 * @param {string} [typ] 单位描述 day :天
	 * @return {timestamp} 对应时间
	 */
    getFulture (expires = 1, begin = this.date, typ = 'day') {
        begin = this.getDetail(begin);
        const date = begin.timeStamp;
        const monthDays = begin.monthDays;
        switch (typ) {
            case 'day':
                {
                    const add_ms = expires * 1000 * 60 * 60 * 24;
                    return this.getDetail(new Date(add_ms + date));
                }
            case 'month':
                {
                    const add_ms = expires * 1000 * 60 * 60 * 24 * monthDays;
                    return this.getDetail(new Date(add_ms + date));
                }
            default:
                break;
        }
    }
	/**
	 * @desc 获取某月分的天数
	 * @param {string}  year 年份
	 * @param {string} month
	 * @return {number} days 天数
	 */
    getMonthDays (year, month) {
        const months = parseInt(month, 10);
        const d = new Date(year, months, 0);
        return d.getDate();
    }
	/**
	 * @desc 传入一个 数字或者数值型字符串 补齐 0
	 * @param {string} params 参数
	 * @return {string}
	 * @example zeroize(2)=>02 zeroize(11)=>11
	 */
    zeroize (params) {
        if (params === '') {
            return ''
        }
        const n = Number(params)
        return JSON.stringify(parseInt(n / 10)) + JSON.stringify(parseInt(n % 10))
    }
	/**
	 * @desc 传入起止日期 返回该时间段内的日期列表
	 * @param {string} start  开始时间
	 * @param {string} end  结束时间
	 * @return {List<Object>}
	 * @example new Timetool().getRangeDate("20180903","20180904")
	 */
    getRangeDate (start, end) {
        const startDate = this.parseDate(start);
        const endDate = this.parseDate(end)
        const _start = startDate.getTime();
        const _end = endDate.getTime();
        start = Math.min(_start, _end)
        end = Math.max(_start, _end)
        const days = parseInt((end - start) / (24 * 3600 * 1000));
        let arr = []
        for (var i = 0; i < days + 1; i++) {
            const currentDay = this.getFulture(i, startDate);
            arr.push(currentDay)
        }
        return arr;
    }
	/**
	 * @desc 传入日期 返回该日期相邻的周一和周末日期
	 * @return {object} Obj
	 * @return {object}	Obj.before  周一日期
	 * @return {object}	Obj.after  周日日期
	 * @example new Timetool().getNeighborDay("20180903")
	 */
    getNeighborDay (date = this.date) {
        date = this.parseDate(date);
        const currentWeek = this.getDetail(date).week;
        const before = this.getFulture(1 - currentWeek, date)

        const after = this.getFulture(7 - currentWeek, date);

        return {
            before,
            after
        }
    }

	/***
	 * 格式转换将 m 转 为 m's"
	 * @param {string}  minutes 分钟数
	 * @param {string}  type 格式 1 xx分xx秒
	 */
    format_MinutesToSecond (minutes, type) {
        // 转为s
        let t = Math.floor(minutes * 60);
        // 计算分钟,秒
        let m, s, result;
        if (t > 60) {
            m = parseInt(t / 60);
            s = parseInt(t % 60);
            if (type && type == '1') {
                result = m + '分' + s + '秒';
            } else {
                result = m + "'" + s + '"';
            }
        } else {
            s = parseInt(t % 60);
            if (type && type == '1') {
                result = s + '秒';
            } else {
                result = s + '"';
            }
        }
        return result;
    }
}

/**
 * 获取这个月的总天数
 * @param {*} year
 * @param {*} month
 */
const getDaysInOneMonth = (year, month) => {
    let months = parseInt(month, 10);
    let d = new Date(year, months, 0);
    return d.getDate();
}

/**
 * @desc 传入一个 数字或者数值型字符串 补齐 0
 * @param {string} params 参数
 * @return {string}
 * @example zeroize(2)=>02 zeroize(11)=>11
 */
const zeroize = (params) => {
    const n = Number(params)
    return JSON.stringify(parseInt(n / 10)) + JSON.stringify(parseInt(n % 10))
}

export {
    TimeTool,
    getDaysInOneMonth,
    zeroize
}
