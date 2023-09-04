var KeyboardManager = require('./keyboardstrategy/KeyboardContext.js');
var StringUtil = require('../common/stringHandle.js');
var Cache = require('../common/cache.js');
var DateUtil = require('../common/moment.js');
//console.show(true);
// checkHasDone();
// // 打开数字人民币
openWeChatApp();
// 点击扫一扫
clickSweepButton();
// 打开相册
openPhotoAlbum();
// 点击指定商户收款码
clickFolderInQRImg("郭金秀数币");
// 输入支付价格
// inputPayPrice("100");
// 支付
// pay("100");


function openWeChatApp() {
    var opend = launchApp("数字人民币");
    console.info("数字人民币");
    if (!opend) {
        console.info("找不到数字人民币，请确定是否安装");
        return;
    }
}

function clickSweepButton() {
    console.info("点击扫一扫");
    var ll_scan = id("ll_scan").findOne(4000);
    if(ll_scan == null){
        throw Error("控件未加载完全！ 不会执行数币刷卡任务！");
    }
    ll_scan.click();
}

function openPhotoAlbum() {
    sleep(3000);
    id("scan_iv_album").findOne().click();
    // 点击相册
    console.info("进入相册成功！");
}

function clickFolderInQRImg(folderName) {
    sleep(3000);
    console.info("点击 显示根目录 ");
    className("android.widget.ImageButton").findOne(100).click();
    sleep(3000);
    // 点击相册
    console.info("点击进入相册");
    var 相册 = className("android.widget.TextView").text("相册").findOne();

    click(相册.bounds().centerX(), 相册.bounds().centerY());

    sleep(1000);
    var title_center_view_text = id("title_center_view_text").findOne(5000);
    press(title_center_view_text.bounds().centerX(), title_center_view_text.bounds().centerY(), 700);
    // 找图片文件夹 
    let folder = null;
    while (folder == null) {
        folder = id("item_name").className("android.widget.TextView").text("郭金秀数币").findOne(3000)
        if (folder == null) {
            // 滑动
            id("rv_album_list").findOne().scrollForward();
            console.info("文件夹不存在, 正在尝试往下滑动!! 等待3秒让控件出现");
            sleep(3000);
        }
    }
    console.info("点击文件夹：", folderName);
    // 进入收藏夹
    folder.click();
    console.info("等3秒让控件充分展示");
    sleep(3000);
    // 点击选图片
    console.info("点击选图片");
    var imgOne = className("android.view.View").descContains("已收藏").findOne();
    imgOne.click();
}

function inputPayPrice(payPrice) {
    console.info("等待进入支付页面");
    // 等待进入支付页面
    sleep(6000);
    console.info("进入成功");
    var strategy = KeyboardManager.getStrategy("工行");
    // 输入价格
    strategy.inMoney(payPrice);
    console.info("去支付");

    var pay = text("付款").findOne(5000);
    // 目前就只能
    click(137.8, 1085);
}

function pay(payMoney) {
    // 如果有原价显示代表当前银行卡有立减金，
    var originalPrice = className("android.widget.TextView").text("原价").findOne(3000);
    if(originalPrice != null){
        console.info("当前银行卡支付存在优惠，准备取消使用立减金, 点击进入立减金页面");
        var discounts = className("android.widget.Button").clickable(true).depth(19).findOne(5000);
        if (discounts != null) {
            // 进入优惠列表
            discounts.click();
            console.info("进入优惠列表");
            var choiceCoupon = className("android.view.ViewGroup").descContains("已选择").findOne(1000);
            choiceCoupon.click();
            // 确定不使用优惠
            sleep(1000);
            console.info("取消使用优惠券");
            var but = id("fga").className("android.widget.Button").desc("确定").findOne(6000).parent();
            console.info("确定不使用优惠券");
            click(but.bounds().centerX(), but.bounds().centerY());
        }
    }
    // 选择银行卡支付
    var getPayInfo = className("android.widget.Button").clickable(true).depth(18).findOne(5000);
    var payDesc = getPayInfo.desc();
    console.info(payDesc);
    var bankCardLastFour = StringUtil.getNumber(payDesc);
    console.info("bankCardLastFour= ", bankCardLastFour);
    var bankCardName = StringUtil.getChineseChars(payDesc);
    console.info("bankCardName= ", bankCardName);
    // 非指定银行卡就切换成
    if(checkBankCardInfo()){
        getPayInfo.click();
        console.info("点击进入 进入切换银行卡页面");
        sleep(2000);
        var bankCardScroll = className("android.widget.ScrollView").findOne(4000);
        bankCardScroll.scrollDown();
        console.info("下滑到底等待控件出现");
        sleep(3000);
        var icbcInfo = className("android.widget.TextView").text("工商银行信用卡(5864)").findOne(50000);
        if(icbcInfo == null){
            throw Error("指定的工行信用卡不存在");
        }
        // 查找这个银行可以点击的控件
        var icbcInfoParent = icbcInfo.parent().parent().parent().parent().parent();
        // 选中
        icbcInfoParent.click();
        console.info("已选中");
    }
    console.info("准备输入密码");
    sleep(3000);
    // // 密码输入
    var passWord = KeyboardManager.getStrategy("微信");
    passWord.inMoney("00951");
    Cache.putStorage("Wechat", DateUtil.nowDate() + "工商银行信用卡:5864", payMoney);

}

function checkBankCardInfo(bankCardLastFour, bankCardName){
    var check = bankCardLastFour != '5864' || !bankCardName.includes("工商银行信用卡");
    console.info("check=", check);
    return check;
}

function checkHasDone() {
    console.info(DateUtil.nowDate());
    console.info(DateUtil.yesterday());
    var payMoney = Cache.getStorage("Wechat", DateUtil.nowDate() + "工商银行信用卡:5864");
    Cache.removeStorage("Wechat", DateUtil.yesterday() + "工商银行信用卡:5864");
    if(payMoney != null){
        throw Error("今日微信扫码支付已进做完了");
    }
}

