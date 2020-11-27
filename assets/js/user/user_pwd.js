$(function() {
    let form = layui.form;
    let layer = layui.layer;

    // 表单校验
    form.verify({
        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]

        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],

        // 校验新密码和原密码是否一致
        newPwd: function(value, item) { //value：表单的值、item：表单的DOM对象
            let oldPwd = $('input[name="oldPwd"]').val();
            if (value === oldPwd) {
                return '新密码不能和原密码相同';
            }
        },
        rePwd: function(value, item) {
            let newPwd = $('input[name="newPwd"]').val();
            if (value !== newPwd) {
                return '两次密码不一致';
            }
        }
    });

    // 提交form表单 ==> 密码重置
    $('form').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('修改密码失败' + res.message);
                };
                layer.msg('修改密码成功');
                // 重置表单中的密码框内容
                $('button[type="reset"]').click();
                // 也可以用form对象中的reset方法
                // $('form')[0].reset();
            }
        })
    })

})