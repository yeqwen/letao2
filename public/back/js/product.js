$(function(){
    // 一进入页面先发送ajax请求
    currentpPage = 1;
    pageSize =5;

    $.ajax({
        type:'get',
        url:'//product/queryProductDetailList',
        data:{
            page:currentpPage,
            pageSize:pageSize
        },
        dataType:"json",
        success:function(info){
            console.log(info);
            
    }


    })
})