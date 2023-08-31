const noGiftStrategy = {
    execute: function() {
      closeGtSuccessTab();
    }
  };

function closeGtSuccessTab() {
    // 关闭 领取成功弹窗
    var giftInfo = className("android.widget.TextView").text("知道了").findOne(1000);
    if(giftInfo != null){
        // 关闭提示
        giftInfo.click();
    }else{
        console.info("当前礼物领取提示控件不存在采取坐标方式点击关闭");
        press(516.0, 1727.0, 60);
    }
  }
module.exports = noGiftStrategy;