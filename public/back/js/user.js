$(function () {
    var currentPage = 1;
    var pageSize = 5
    var currentId;
    var isDelete;
    // 1. 一进入页面, 发送ajax请求, 请求列表数据, 进行渲染(通过模板引擎)
    render();
    // ajax 封装
    function render() {
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template('tmp', info)
                $('tbody').html(htmlStr);
                // 在ajax请求回来后, 根据最新的数据, 进行初始化分页插件
                $('#pagination').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.pege,
                    totalPages: Math.ceil(info.total / info.size),
                    onPageClicked: function (a, b, c, page) {
                        // console.log(page)
                        currentPage = page,
                            render();
                    }
                })
            }
        });
    }

    // 按钮切换
    // 2. 给所有的按钮, 添加点击事件(通过事件委托)
    //    事件委托的两大好处:
    //    (1) 可以给动态生成的元素, 绑定事件
    //    (2) 可以批量注册事件, 性能效率高
    $('tbody').on("click", '.btn', function () {
        $('#userModal').modal('show');
        currentId = $(this).parent().data('id');
        // 根据按钮的类名, 决定修改用户成什么状态
        // 禁用按钮 ? 0 : 1;
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
    });
    // 求当前有多少条，
        $('#confirmBtn').click(function(){
            $.ajax({
                type:'post',
                url:'/user/updateUser',
                // 获取每一个点击按钮的用户id
                data:{
                    id:currentId,
                    isDelete:isDelete
                },
                dataType:'json',
                success:function(info){
                    // console.log(info);
                    if(info.success){
                        // 如果显示成功，就然模态框隐藏
                        $('#userModal').modal('hide');
                        render();
                    }
                }
            })
        })


})