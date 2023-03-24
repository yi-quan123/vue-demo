/**
 * 导出所有的接口请求函数
 */
import base from './base'
import req from './req'


/**
 * 规格参数 添加 
 * 参数：itemCatId,content,specsName
 * @param {*} params 
 * @returns 
 */
export const addParams = (params) => req.get(base.insertItemParam, {
    params
})


/**
 * 规格参数类目结构数据获取 cid
 * @param {*} params   {cid:''}
 * @returns 
 */
export const getCategoryData=(params)=>req.get(base.categoryData,{params})



/**
 * * 商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
 * 参数：page 页码
 * @returns 
 */
export const getGoodsList = (params) => req.get(base.getGoodsList, {
    params
})


/**
 *  商品查询接口 search
 * 参数：search  {search:xx}
 * 
 * get 传参：
 * 1、字符串拼接  ?search=xxx&name=123
 * 2、params  {search：xxxx}
 * @param {*} params  {search：xxxx}
 * @returns 
 */
export const getSearch = (params) => req.get(base.search, {
    params
})


/**
 * 类目选择
 * @param {*} params   {id:cid}
 * @returns 
 */
export const getCategory = (params) => req.get(base.selectCategory, {
    params
})


/**
 * 商品添加
 * 参数： title cid  category sellPoint price num descs paramsInfo image
 */
export const addGoods = (params) => req.get(base.add, {
    params
})

/**
 * 删除
 * @param {*} params   {id:'123'}
 * @returns 
 */
export const delGoods = (params) => req.get(base.delete, {
    params
})

/**
 * 修改
 * @param {*} params {id:'',......}
 * @returns 
 */
export const updateGoods = (params) => req.get(base.update, {
    params
})

/**
 * 登录
 * @param {*} params 
 * @returns 
 * 对象：{userame:'xxx',password:'123'}
 * urlencode :'username=''&password=''  password=123&username=admin
 */
export const login = (params) => {
    // console.log(qs.stringify(params)); //password=123&username=admin
    return req.post(base.login, params)
}

/**
 * 规格参数列表  参数 page
 * @param {*} params 
 * @returns  {page:1}
 */
export const getParamsList = (params) => req.get(base.paramsUrl, {
    params
})