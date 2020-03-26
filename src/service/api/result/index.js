import request from '../../request'
/**
 * 加载中医生成食谱接口。
 * @param {String} type 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} dayLength 周期 范围1-31天 默认7天(配置文件形式提供)
 * @param {String} isCreated 是否重新生成 1：重新生成 
 * @param {String} resultType 证候结果类型
 */
export const apiRecommendation = (type,userId,dayLength,isCreated,resultType) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/create.do', { type,userId,dayLength,isCreated,resultType })

/**
 * 食谱详情
 * @param {String} type 中医证候类型
 * @param {String} userId 用户Id
 * @param {String} recipesId 食谱id
 * @param {String} recipesDate 食谱日期
 * @param {String} resultType 证候结果类型
 */
export const apiDietDetail = (type,userId,recipesId,recipesDate,resultType) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/detail.do', { type,userId,recipesId,recipesDate,resultType })

/**
 *用于置换食谱中食物或者茶饮推荐数据列表。
 * @param {String} type 中医配餐类型
 * @param {String} userId 用户Id
 * @param {String} foodId 食物id
 * @param {String} foodName 食物名称
 * @param {String} foodHeat 食物热量
 * @param {String} initialHeat 食物初始热量
 * @param {String} mealType 餐别
 * @param {String} recipesId 食谱id
 * @param {String} recipesDate 食谱日期,格式yyyy-MM-dd
 * @param {String} resultType 证候结果类型
 */
export const apiChangement = (type,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate,resultType) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/replacement/list.do', { type,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate,resultType })

/**
 *用于置换食谱中食物或者茶饮推荐数据保存。
 * @param {String} type 中医配餐类型
 * @param {String} userId 用户Id
 * @param {String} foodId 食物id
 * @param {String} foodName 食物名称
 * @param {String} foodHeat 食物热量
 * @param {String} initialHeat 食物初始热量
 * @param {String} mealType 餐别
 * @param {String} recipesId 食谱id
 * @param {String} recipesDate 食谱日期,格式yyyy-MM-dd
 * @param {String} resultType 证候结果类型
 * @param {Object} foodInfo 换一换食物信息
 */
export const apiSaveChangement = (type,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate,resultType,foodInfo) => request('/ego-gw/v3/viscera/food/meal/recommendation/recipes/replacement/save.do', { type,userId,foodId,foodName,foodHeat,initialHeat,mealType,recipesId,recipesDate,resultType,foodInfo })