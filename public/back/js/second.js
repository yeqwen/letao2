$(function () {

    // 已进入页面请求发送ajax请求渲染页面
    var currentPage = 1;
    var pageSize = 5;
    // var currentId = id
    // var
    render();

    function render() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('secondTpl', info);
                $('tbody').html(htmlStr);
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page;
                        render();
                    }
                })
            }

        })
    }

    // 点击按钮 然模态框显示

    $('#addBtn').click(function () {

        $('#addModal').modal('show')
        // 发送请求, 获取一级分类的全部数据
        // 通过写死 page 和 pageSize 模拟获取全部一级分类的接口
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 100,
            },
            dataType: 'json',
            success: function (info) {
                console.log(info);
                var htmlStr = template('dropdownTpl', info)
                $('.dropdown-menu').html(htmlStr)
            }
        })

    });
    // 个下拉列表的a 注册点击事件
    $('.dropdown-menu').on('click', 'a', function () {
        // 获取文本值
        var txt = $(this).text();
        $('#dropdownText').text(txt);
        // 获取id
        var id = $(this).data('id');
        // 设置隐藏域
        $('[name="categoryId"]').val(id);

        // 调用updateStatus更新隐藏域 校验状态成VALID
        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID");
    });
    // 4.配置文件上传插件，让插件发送异步文件上传请求
    $('#fileupload').fileupload({
        dataType: "json",
        // done表示文件上传完成的回调函数
        done: function (e, data) {
            // console.log(data);
            // 后台返回的对象
            // 返回数据
            var picObj = data.result;
            // 获取图片地址，设置给img src
            var picUrl = picObj.picAddr;
            $('#imgBox img').attr('src', picUrl);
            // 给隐藏域设置图片地址
            $('[name="brandLogo"]').val(picUrl);
            // 调用updateStatus更新隐藏域 校验状态成VALID
            $('#form').data('bootstrapValidator').updateStatus("brandLogo", "VALID")
        }
    });

    // 添加表单校验功能
    $('#form').bootstrapValidator({
        // 重置排除项，都校验，不排除
        excluded: [],
        // 配置较验图标
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok",
            invalid: "glyphicon glyphicon-remove",
            validating: "glyphicon glyphicon-refresh"
        },
        // 指定校验字段
        fields: {
            categoryId: {
                validators: {
                    notEmpty: {
                        message: '请选择一级分类'
                    }
                }
            },
            brandName: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            },
            brandLogo: {
                validators: {
                    notEmpty: {
                        message: '请输入二级分类名称'
                    }
                }
            }
        }
    });

        // 6:注册表单校验成功事件，阻止默认的表单提交，通过ajax提交
        $('#form').on('success.form.bv',function(e){
            e.preventDefault(); //阻止默认的提交
            $.ajax({
                type:'post',
                url:'/category/addSecondCategory',
                data:$('#form').serialize(),
                dataType:'json',
                success:function(info){
                    console.log(info);
                    if(info.success){
                        // 添加成功。 关闭模态框
                        $('#addModal').modal('hide');
                        // 页面重新渲染
                        currentPage = 1;
                        render();

                        // 重置表单内容和状态，resetForm (true);
                        $('#form').data('bootstrapValidator').resetForm(true);

                        // 由于下拉菜单和图片不是表单元素，需要手动重置
                        $('#dropdownText').text('请选择一级分类');
                        $('#imgBox img').attr('src',"./images/none.png");
                    
                    
                    }
                }
            })
        })

})