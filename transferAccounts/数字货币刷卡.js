var KeyboardManager = require('./keyboardstrategy/KeyboardContext.js');
var StringUtil = require('../common/stringHandle.js');
var Cache = require('../common/cache.js');
var DateUtil = require('../common/moment.js');
//console.show(true);
checkHasDone();
// // 打开数字人民币
openWeChatApp();
// 点击扫一扫
clickSweepButton();
// 打开相册
openPhotoAlbum();
// 点击指定商户收款码
clickFolderInQRImg("郭金秀数币");
// 输入支付价格
inputPayPrice("288");
// 支付
pay("199145");
// 丢缓存
Cache.putStorage("eRMB", DateUtil.nowDate() + "建行卡", "288");



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
    press(title_center_view_text.bounds().centerX(), title_center_view_text.bounds().centerY(), 200);
    sleep(2000);
    // 找图片文件夹 
    let folder = null;
    while (folder == null) {
        folder = className("android.widget.TextView").text("郭金秀数币").findOne(5000);
        if (folder == null) {
            // 滑动
            id("rv_album_list").findOne().scrollForward();
            console.info("文件夹不存在, 正在尝试往下滑动!! 等待3秒让控件出现");
            sleep(3000);
        }
    }
    var folderParent = folder.parent().parent().parent();
    console.info("点击文件夹：", folderName, folderParent);
    console.info(folderParent.bounds().centerX(), folderParent.bounds().centerY());
    click(folderParent.bounds().centerX(), folderParent.bounds().centerY());
    // 进入数币文件夹
    console.info("等3秒让控件充分展示");
    sleep(2000);
    // 点击选图片
    console.info("点击选图片");
    var imgOne = className("android.view.View").descContains("已收藏").findOne();
    imgOne.click();
}

function inputPayPrice(payPrice) {
    console.info("等待进入支付页面");
    // 等待进入支付页面
    sleep(3000);
    console.info("进入成功");
    var et_scan_input_edit = id("et_scan_input_edit").findOne();
    et_scan_input_edit.setText(payPrice);
    console.info("去支付");
    press(940,2202.3, 700);
    var cashier_main_tv_psw = id("cashier_main_tv_psw").findOne(7000);
    cashier_main_tv_psw.click();
    sleep(5000);
}

function pay(payMoney) {
    var strategy = KeyboardManager.getStrategy("数币");
    strategy.inMoney(payMoney);
}

function checkHasDone() {
    console.info(DateUtil.nowDate());
    console.info(DateUtil.yesterday());
    var payMoney = Cache.getStorage("eRMB", DateUtil.nowDate() + "建行卡");
    Cache.removeStorage("eRMB", DateUtil.yesterday() + "建行卡");
    if(payMoney != null){
        throw Error("今日建行数币已做完");
    }
}