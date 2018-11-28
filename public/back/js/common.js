// import { EINPROGRESS } from "constants";

// 进度条效果
// NProgress.start(); // 开启进度条
// NProgress.done(2000); // 关闭进度条

// 第一个ajax发送的时候开启进度条
// 等待所有的ajax都完成后关闭进度条
// ajax 全局事件
// 1 $.ajaxComplete() //每个ajax完成时调用(不管成功还是失败)
// 2 $.ajaxSuccess() //每个ajax成功是调用
// 3 $.ajaxError() //每个ajax失败是调用
// 4 $.ajaxSend() //每个ajax发送前调用
// 5 $.ajaxStar() // 第一个aja开始的时候调用
// 6 $.ajaxStop() // 等所有的ajax请求都完成时调用
// $(document).ajaxStart(function () {
//     NProgress.start();
// })
// $(document).ajaxStop(function () {
//     NProgress.done();
// })

$(document).ajaxStart(function () {
  // 开启进度条
  NProgress.start();
})

$(document).ajaxStop(function () {
  // 模拟网络延迟
  setTimeout(function () {
    // 关闭进度条
    NProgress.done();
  }, 2000)
});
// 入口函数

$(function () {
  // 公共功能
  // 左侧二级菜单切换

  $('.category').click(function () {
    $(this).next().stop().slideToggle();
  })

})
// 左侧侧边栏切换
$('.icon_left').click(function () {
  $('.lt_aside').toggleClass("hidemenu");
  $('.lt_main').toggleClass("hidemenu");
  $('.lt_topbar').toggleClass("hidemenu");
})


// 右边退出功能
$('.icon_right').click(function () {
  $('#myModalout').modal('show');

  // 模态框退出
  $('#logoutBut').click(function () {
    // 发送ajax 
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if(info.success){
          location.href = 'login.html';
        }
      }
    })
  })
})