$(function() {
    // 去注册账号
    $('#gotoRegister').click(function() {
        // console.log('哈哈哈');
        $('.login').hide();
        $('.register').show();
    });
    // 去登录账号
    $('#gotoLogin').click(function() {
        // console.log('哈哈哈');
        $('.login').show();
        $('.register').hide();
    });


    // 从layui中获取到form表单的功能


    let form = layui.form;
    let layer = layui.layer;


    // 登录和注册表单校验

    form.verify({

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pass: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repass: function(value, item) {
            // value：表单的值、item：表单的DOM对象
            let pwd = $('.register input[name=password]').val();
            if (value !== pwd) {
                return '两次输入的密码不一致';
            }
        }
    });



    // 注册功能
    $('.register form').on('submit', function(e) {
        e.preventDefault(); //注意后面没有s
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data,
            success: function(res) {
                // console.log(res);
                if (res.status !== 0) {
                    // return alert('注册失败' + res.message)
                    return layer.msg('注册失败！+res.message');
                };
                // alert('注册成功');
                layer.msg('注册成功');
                // 注册成功，显示登陆form（去登录）
                $('#gotoLogin').click();
            }
        });
    });

    // 登录功能
    $('.login form').on('submit', function(e) {
        e.preventDefault();
        let data = $(this).serialize();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data,
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    // return alert(res.message)
                    return layer.msg('登录失败！')
                };
                // alert('登录成功，即将跳转到主页');

                localStorage.setItem('token', res.token);

                layer.msg('登录成功，即将跳转到主页', {
                    time: 2000 //2秒关闭（如果不配置，默认是3秒）
                }, function() {
                    //do something
                    location.href = 'index.html';
                });

            }
        })
    })

})