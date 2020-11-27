// ajax的基础设置
$.ajaxPrefilter(function(options) {
    // 在每次jQ发送ajax请求前会执行该函数，通过该函数的形参options可以获取到每次ajax的配置项
    // 来修改每次请求的配置项
    options.url = 'http://ajax.frontend.itheima.net' + options.url;
    // console.log(options.url);

    // 返回值不为-1，说明有/my
    if (options.url.indexOf('/my') !== -1) {
        // indexOf中的of中的o要大写，否则会报错

        options.headers = {
            Authorization: localStorage.getItem('token'),
        }
    };
    options.complete = function(xhr) {
        // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
        // 形参可以获取到xhr对象
        console.log(xhr);
        if (
            xhr.responseJSON.status === 1 &&
            xhr.responseJSON.message === "身份认证失败！"
        ) {
            // 回到登录页面重新登录
            // 把token也清除掉
            localStorage.removeItem("token");
            location.href = "login.html";
            // 页面会跳一下，因为代码从上到下执行，到这个请求需要时间，后面会处理
            // 且其他请求也需要做此操作，要不然可以直接进，不安全且信息是错误的，所以放到baseajax中

        }
    };
});