import request from '../../request'
/**
 * 加载中医配餐封面内容。
 * @param {String} type 配餐类型
 */
export const apiHomeData = (type) => request('/ego-gw/v3/viscera/food/meal/recommendation/index.do', { type },{loading:true})
/**
 * 查询配餐状态。
 * @param {String} type 配餐类型
 */
export const apiFoodStatus = (type,userId) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/status/find.do', { type,userId })
