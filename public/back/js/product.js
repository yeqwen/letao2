// import { template } from "handlebars";

$(function () {
    // 一进入页面先发送ajax请求
    currentpPage = 1;
    pageSize = 5;

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/product/queryProductDetailList',
            data: {
                page: currentpPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function (info) {
                console.log(info);
                var htmlStr = template('productTpl', info)
                $('tbody').html(htmlStr)
                // 分页项
                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    currentPage: info.page, //当前页
                    totalPages: Math.ceil(info.total / info.size), //总页数
                    onPageClicked: function (a, b, c, page) {
                        currentPage = page,
                            render();

                    }
                })
            }
        })
    }


    // 点击按钮 发送ajax渲染
    $('#addBtn').click(function(){
        $('#addModal').modal('show');


        $.ajax({
            type:"get",
            url:"/category/querySecondCategoryPaging",
            data:{
                // 模拟全部的数据列表下拉效果
                page:1,
                pageSize:100,
            },
            dataType:'json',
            success:function(info){
                console.log(info);
                var htmlStr = template('dropdownTpl',info)
                $('.dropdown-menu').html(htmlStr)

            }
        })
    });

    // 给下拉列表的a注册点击事件
    // 3. 给下拉列表的 a 添加点击事件 (事件委托注册)
    $('.dropdown-menu').on('click','a',function(){
       var txt = $(this).text();
    //    将a中的文本赋值给ul的文本
       $('#dropdownText').text(txt);

    //    获取id，赋值给隐藏域
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
    
    // 将隐藏域的校验状态，更新成VALID
    // $('#form').data("bootstrapValidator").updateStatus("brandId", "VALID");
    });

    // 4.配置文件上传插件


})