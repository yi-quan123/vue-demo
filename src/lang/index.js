

// 1、导入
import Vue from 'vue'
import VueI18N from 'vue-i18n'

import enLocale from 'element-ui/lib/locale/lang/en'  //英文语言包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'//中文语言包
import ElementLocale from 'element-ui/lib/locale'

import enlish from './en'
import chinese from './zh'

// 2、安装
Vue.use(VueI18N);


// 3、准备翻译的语言环境信息
const messages = {
    // 英文
    en: {
        ...enlish,
        // 导入elementUI里的国际化英文包
        ...enLocale
    },
    // 中文
    zh: {
        ...chinese,
        ...zhLocale

    }
}


// 4、通过选项创建 VueI18n 实例
const i18n = new VueI18N({
    locale: 'en', // 设置地区
    messages:messages, // 设置地区信息
})


ElementLocale.i18n((key, value) => i18n.t(key, value))



// 5、导出
export default i18n
