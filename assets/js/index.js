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

});

getAvatarAndName();
// 获取用户的信息， 渲染到页面中, 不能放在入口函数中， 要不然会变成局部的

function getAvatarAndName() {
    // 获取用户的信息，渲染到页面中
    $.ajax({
        url: '/my/userinfo',
        success: function(res) {
            // console.log(res);
            if (res.status === 0) {
                let name = res.data.nickname || res.data.username;
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

    })
};