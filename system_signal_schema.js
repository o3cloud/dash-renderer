const schema = {
    "__system__": {
        "events": [{
            // 重定向
            "type":"redirect",
            "params": {
                /**
                 * 要跳转的url
                 * 项目内部页面写path(eg: /page-2)
                 * 项目外部页面写url(eg: https://www.google.com)
                 */
                "url": "",
                // 是否跳转到外部页面
                "external": false
            }
        }, {
          /**
           * 调用web端方法(暂未实现)
           * 预设在window.customFunctions对象里 
           */
          "type": "call",
          "params": {
            // 函数名称
            "functionName": "",
            // 函数参数
            "functionParams": {}
          }
        }],
        // 依赖全量替换
        "dependencies": {},
    }
}

export default schema;
