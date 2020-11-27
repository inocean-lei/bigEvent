$(function() {
    let form = layui.form;
    let layer = layui.layer;



    getInfo();
    // 获取用户的基本信息
    function getInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                // console.log(res);
                // $('input[name="username"]').val(res.data.username);
                // $('input[name="nickname"]').val(res.data.nickname);
                // $('input[name="email"]').val(res.data.email);

                if (res.status !== 0) {
                    return layer.msg("获取用户基本信息失败！");
                };
                // 获取信息成功，把响应回来的数据填充到form中
                // 给表单赋值 语法：form.val('filter', object);
                // userForm 即 class="layui-form" 所在元素属性 lay-filter="" 对应的值
                form.val("userForm", res.data);
                //   需要注意：给表单赋值，这个是按照name属性来一一对应的
            }
        });
    }

    // 给表单注册submit提交事件
    $('form').on('submit', function(e) {

        e.preventDefault();
        let data = $(this).serialize();
        console.log(data);

        // 更新用户的基本信息
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data,
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg("修改用户信息失败！");
                }

                layer.msg("修改用户信息成功！");

                // 通过window.parent来获取到父页面（既index.html）
                window.parent.getAvatarAndName();

            }
        });
    });

    // 重置功能
    $('button[type="reset"]').on('click', function(e) {
        e.preventDefault(); //阻止刷新和重置表单内容
        getInfo();
    })
})