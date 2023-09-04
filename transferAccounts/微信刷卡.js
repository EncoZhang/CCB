var KeyboardManager = require('./keyboardstrategy/KeyboardContext.js');
var StringUtil = require('../common/stringHandle.js');
console.show(true);

// // 打开微信
openWeChatApp();
// 微信点击更多功能按钮
clickMoreFunctionButton();
// 点击扫一扫
clickSweepButton();
// 打开相册
openPhotoAlbum();
// 点击指定商户收款码
clickFolderInQRImg("彭妙妙商户码");
// 输入支付价格
inputPayPrice("100");
// 支付
pay();


function openWeChatApp() {
    var opend = launchApp("微信");
    console.info("打开微信");
    if (!opend) {
        console.info("找不到微信，请确定是否安装");
        return;
    }
}

function clickMoreFunctionButton() {
    var moreFunctionButInfo = desc("更多功能按钮").findOne(10000);
    if (moreFunctionButInfo == null) {
        console.info("当前不在微信首页");
        return;
    }
    console.info("点击更多按钮");
    // 点击更多按钮
    moreFunctionButInfo.click();
}

function clickSweepButton() {
    // 唤起更多选项
    var moreFunctionInfo = className("android.widget.ListView").findOne(300);
    if (moreFunctionInfo == null) {
        console.info("更多选项不存在");
    }
    // 定位到扫一扫
    console.info("定位到扫一扫");
    var sweepButInfo = moreFunctionInfo.child(2);

    // 点击扫一扫
    console.info("点击扫一扫");
    sweepButInfo.click();
}

function openPhotoAlbum() {
    console.info("找到相册");
    var photoAlbumBut = desc("相册，按钮").findOne(200);
    // 打开相册
    photoAlbumBut.click();
    console.info("打开相册 等待相册控件出现 3秒");
    sleep(3000);
}

function clickFolderInQRImg(folderName) {
    // 点击下拉
    id("f6").findOne(5000).click();
    sleep(4000);
    // 找图片文件夹
    let folder = null;
    while (folder == null) {
        folder = id("ebv").className("android.widget.TextView").text(folderName).findOne(3000);
        if (folder == null) {
            // 滑动
            className("android.widget.ListView").findOne().scrollForward();
            console.info("文件夹不存在, 正在尝试往下滑动!! 等待3秒让控件出现");
            sleep(3000);
        }
    }
    console.info("点击文件夹：", folderName);
    // 进入收藏夹
    folder.parent().parent().click();
    console.info("等4秒让控件充分展示");
    sleep(4000);
    // 点击选图片
    console.info("点击选图片");
    var imgInfo = id("gqb").findOne(10000);
    var imgOne = imgInfo.child(1);
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

function pay(cardInfo) {
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
        var cardListInfo = bankCardScroll.child(0);
        bankCardScroll.scrollDown();
        var cardList = cardListInfo.children();
        for (let index = 0; index < cardList.size(); index++) {
            const element = cardList.get(index);
            var icbc = element.child(0).child(0).child(0);
            if(icbc != null){
                element.click();
            }
        }
        console.info("下滑到底等待控件出现");
        sleep(3000);
        var icbcInfo = className("android.widget.TextView").text("工商银行信用卡(5864)").findOne(5000);
        if(icbcInfo == null){
            throw Error("指定的工行信用卡不存在");
        }
        // 选中
        console.info("开始选中");
        var icbcInfoParant = icbcInfo.parent().parent().parent().parent();
        icbcInfoParant.click();
        console.info("已选中");
    }
    console.info("准备输入密码");
    sleep(3000);
    // // 密码输入
    var passWord = KeyboardManager.getStrategy("微信");
    passWord.inMoney("009510");
}

function checkBankCardInfo(bankCardLastFour, bankCardName){
    var check = bankCardLastFour != '5864' || !bankCardName.includes("工商银行信用卡");
    console.info("check=", check);
    return check;
}



