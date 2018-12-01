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
            type:'get',
            url:'/category/querySecondCategoryPaging',
            data:{
                page:1,
                pagesize:20,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template('secondTpl',info)
                $('tbody').html(htmlStr) 
            }
        })

    });
    // 个下拉列表的a 注册点击事件
    


})