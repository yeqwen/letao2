import { template } from "handlebars";

$(function(){
    var currentPage = 1;
    var pageSize = 5;
    
    render(); // 先调用一下
    function render(){
       $.ajax({
        type:'get',
        url:'/category/queryTopCategoryPaging',
        data:{
            page:page,
            pageSize:pageSize,
        },
        dataType:'json',
        success:function(info){
            console.log(info);
            var htmlStr = template('firstTpl,info')
            $('tbody').html(htmlStr)
        }
    })

    }
})