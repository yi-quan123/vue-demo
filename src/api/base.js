const base = {
    host: 'http://localhost:7878',
    getGoodsList: '/projectList', //商品列表：获取分页 {total:'',arr:[{},{},{}],pagesize:8,}
    search: '/search', //商品查询接口 search
    selectCategory: '/backend/itemCategory/selectItemCategoryByParentId', //类目选择
    uploadUrl: '/api/upload', //图片上传接口
    add: '/backend/item/insertTbItem', //添加
    delete: '/backend/item/deleteItemById', //删除
    update: '/backend/item/updateTbItem', //修改
    login: '/login', //登录
    paramsUrl:'/backend/itemParam/selectItemParamAll',//规格参数列表
    insertItemParam:'/backend/itemParam/insertItemParam', //规格参数 添加
    categoryData:'/category/data',//规格参数类目结构数据获取 cid
}

export default base