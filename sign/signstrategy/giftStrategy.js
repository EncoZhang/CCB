const giftStrategy = {
    execute: function() {
      takeGift();
    }
  };

// 领礼物
function takeGift() {
  // 延迟几秒 等礼物控件出现！    
  var giftInfoParent = className("android.widget.TextView").text("签到成功").findOne(6000);
  // 如果控件存在
  if(giftInfoParent != null){
      var giftInfo = giftInfoParent.parent();
      // 获取礼物列表
      var gift =  giftInfo.child(2);
      // 领取礼物
      var takeGiftInfo =  giftInfo.child(3);
      var giftList = gift.children();
      for (var i=0,len=giftList.length; i<len; i++){
              var takeOutCouponInfo = giftList[i];
              var giftText = takeOutCouponInfo.child(1).text();
              console.info("giftText:",giftText);
              if(giftText.includes("4元外卖券") || giftText.includes("8元外卖券") ){
                  console.info("当前礼物包含外卖券:",giftText);
                  // 选择外卖券
                  takeOutCouponInfo.click();
                  console.info("选择完毕:",giftText);
                  // 确认领取
                  console.info("确认领取");
                  takeGiftInfo.click();
                  break;
              }
          }
  }else{
      // 控件不存在 采取坐标点击
      console.info("当前礼物控件不存在采取坐标方式点击:");
      // 点击选中礼物
      press(559.5, 1130.8, 60);
      // 领取
      press(559.0, 1698.5, 60);
  }
  // 领完会弹窗,要关闭
  closeGtSuccessTab();
}

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
  
module.exports = giftStrategy;