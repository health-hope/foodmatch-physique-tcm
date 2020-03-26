import request from '../../request'
/**
 * 查询用户基本信息
 * @param {String} type 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} associated 是否关联测评结果 null/0：不关联，1：关联
 */ 
export const getUserInfo = (type, userId,associated) => request('/ego-gw/v3/viscera/food/meal/recommendation/user/find.do', { type,userId,associated },{loading:true})
/**
 * 保存更新饮食推荐用户信息
 * @param {String} type 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} resultType 配餐类型信息
 * @param {Object} basicInfo 用户基本信息 
 * @param {Object} dietRecommend 饮食偏好
 */
export const postUpsert = (type,userId,resultType,basicInfo,dietRecommend) => request('/ego-gw/v3/viscera/food/meal/recommendation/user/save.do', { type,userId,resultType,basicInfo,dietRecommend})
/**
 * 饮食推荐查询食物搜索记录。
 * @param {String} userId 用户id
 * @param {String} size 返回食物记录数量
 */
export const apiGetNoFood = (userId,size) => request('/ego-gw/v3/food/meal/recommendation/food/search/record/find.do', {userId,size})
/**
 * 饮食推荐查询食物。
 * @param {String} foodName 食物名称
 * @param {Object} pageInfo 分页对象
 */
export const apiSearchFood = (foodName,pageInfo) => request('/ego-gw/v3/food/meal/recommendation/food/search/find.do', {foodName,pageInfo},{loading:false})
/**
 * 饮食推荐保存食物搜索记录。
 * @param {String} foodId 食物id
 * @param {Object} userId 用户id
 */
export const apiSaveSearchFood = (foodId,userId) => request('/ego-gw/v3/food/meal/recommendation/food/search/record/save.do', {foodId,userId})