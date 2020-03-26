import request from '../../request'
/**
 * 加载食物信息
 * @param {String} type 配餐类型
 * @param {String} userId 用户唯一Id
 * @param {String} foodId 食物id
 */
export const apiFoodDetails = (type,userId,foodId,mealType,resultType,foodCount	) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/food/info.do', { type,userId,foodId,mealType,resultType,foodCount },{loading:true})
