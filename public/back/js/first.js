$(function () {
    var currentPage = 1;
    var pageSize = 5;

    render(); // 先调用一下
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: currentPage,
                pageSize: pageSize,
            },
            dataType: 'json',
            success: function (info) {
                // console.log(info);
                var htmlStr = template('firstTpl', info)
                $('tbody').html(htmlStr)
                //  // 数据回来, 进行分页初始化
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPage: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        console.log(page)
                        currentPage = 1,
                            render();
                    },
                })
            }
        })

    }


// 模态框显示
$('#addBtn').click(function () {
    $('#addModal').modal('show');
})

// 表单校验
$("#form").bootstrapValidator({
        // 配置表单校验
        feedbackIcons: {
            valid: "glyphicon glyphicon-ok", //校验成功
            invalid: "glyphicon glyphicon-remove", //校验失败
            validating: "glyphicon glyphicon-refresh" // 校验中
        },
        fields: {
            categoryName: {
                validators: {
                    notEmpty: {
                        message: '请输入一级分类名称'
                    }
                }
            }
        }

    }),

    // 4. 注册表单校验成功事件, 阻止默认的提交, 通过  ajax 提交
    $("#form").on("success.form.bv", function (e) {
        e.preventDefault(); //阻止默认的提交，

        $.ajax({
            type: "post",
            url: "/category/addTopCategory",
            data: $("#form").serialize(),
            dataType: "json",
            success: function (info) {
                console.log(info);
                if (info.success) {
                    $('#addModal').modal('hide');
                    // 重新渲染
                    currentPage = 1;
                    render();
                    $('#form').data("bootstrapValidator").resetForm(true)
                }

            }
        })
    })

})    