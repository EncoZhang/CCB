var KeyboardManager = require('./keyboardstrategy/KeyboardContext.js');
console.show(true); 
var opend = launchApp("微信");
console.info("微信");
if(!opend){
    console.info("找不到微信，请确定是否安装");
}
// 微信点击更多功能按钮
var moreFunctionButInfo = desc("更多功能按钮").findOne(10000);
if(moreFunctionButInfo == null){
    console.info("当前不在微信首页");
}
console.info("点击更多按钮");
// 点击更多按钮
moreFunctionButInfo.click();

// 唤起更多选项
var moreFunctionInfo = className("android.widget.ListView").findOne(300);
if(moreFunctionInfo == null){
    console.info("更多选项不存在");
}
// 定位到扫一扫
console.info("定位到扫一扫");
var sweepButInfo = moreFunctionInfo.child(2);

// 点击扫一扫
console.info("点击扫一扫");
sweepButInfo.click();

// 找到相册
console.info("找到相册");
var photoAlbumBut = desc("相册，按钮").findOne(200);

// 打开相册
console.info("打开相册");
photoAlbumBut.click();
sleep(3000);
// 点击下拉
id("f6").findOne(5000).click();

// 点击收藏
id("ebv").className("android.widget.TextView").text("收藏").findOne(30000).parent().parent().click();
console.info("点击收藏");
sleep(3000);

var imgInfo = id("gqb").findOne(10000);
var imgOne = imgInfo.child(1);

// 点击选图片
console.info("点击选图片");
imgOne.click();
console.info("等待进入支付页面");
// 等待进入支付页面
sleep(10000);
console.info("进入成功");

var strategy = KeyboardManager.getStrategy("工行");
// 输入价格
strategy.inMoney("1");
console.info("去支付");

var pay = text("付款").findOne(5000);
click(137.8, 1085);

// 密码输入
var passWord = KeyboardManager.getStrategy("微信");
passWord.inMoney("199145");




