import request from '../../request'
/**
 * 食材信息
 * @param {String} userId 用户Id
 * @param {String} foodId 食物id
 * @param {String} foodCount 食物重量
 */
export const getIngredientsInfo = (userId,foodId,type,materialType,foodCount,resultType) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/material/info.do', { userId,foodId,type,materialType,foodCount,resultType },{loading:true})

