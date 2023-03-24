/***
 * export2Excel(columns,list) 导出excel表格，我是测试码云的，111111
 * columns Arrary=[{},{}]  表头 =[{title:'',key:''}]
 * list =[] table的数据 [{},{}],我是本地修改的，还没推送远程
 * 122222222222222222
 */
export function export2Excel(columns,list,name){
    require.ensure([], () => {
        const { export_json_to_excel } = require('../../excel/Export2Excel');
        let tHeader = []
        let filterVal = []
        console.log(columns)
        if(!columns){
            return;
        }
        columns.forEach(item =>{
            tHeader.push(item.title)
            filterVal.push(item.key)
        })
        const data = list.map(v => filterVal.map(j => v[j]))
        export_json_to_excel(tHeader, data,name);
    })
}