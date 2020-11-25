$(function() {
    let layer = layui.layer;


    // 退出功能
    $('#logout').click(function() {
        layer.confirm('确定退出吗？', { icon: 3, title: '提示' }, function(index) {
            // 退出需要做的事情
            // 1. 清除token
            localStorage.removeItem('token');
            // 2. 跳转到登录页面
            location.href = 'login.html'

            layer.close(index);
        });
    });

    // 获取用户的信息，渲染到页面中
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            console.log(res);
            if (res.status === 0) {
                let name = res.data.nikename || res.data.username;
                // console.log(name[0]);
                $('.welcome').text('欢迎' + name);

                if (res.data.user_pic) {
                    $('.layui-nav-img').attr('src', res.data.user_pic);
                    $('.text-avatar').hide();
                } else {
                    $('.layui-nav-img').hide();
                    $('.text-avatar').text(name[0].toUpperCase());
                }
            };
        },

        // complete: function(xhr) {
        //     // 请求完成就会执行的函数（不论是失败还是成功都会执行的）
        //     // 形参可以获取到xhr对象
        //     //   console.log(xhr);
        //     if (
        //         xhr.responseJSON.status === 1 &&
        //         xhr.responseJSON.message === "身份认证失败！"
        //     ) {
        //         // 回到登录页面重新登录
        //         // 把token也清除掉
        //         localStorage.removeItem("token");
        //         location.href = "login.html";
        //         // 页面会跳一下，因为代码从上到下执行，到这个请求需要时间，后面会处理
        //         // 且其他请求也需要做此操作，要不然可以直接进，不安全且信息是错误的，所以放到baseajax中

        //     }
        // },
    })


})