// 礼物策越上下文
const giftContext = require('./signstrategy/giftContext.js');
/**
 * 正常
*/
const NORMAL = 1;
/**
 * 有礼物
*/
const HAVE_GIFT = 2;
/**
 * 补签
*/
const UNCLAIMED = 3;

function SignOperation() {
    // 跳转签到页面
    className("android.widget.Image").text("851a06d4-5aec-4906-b48d-7b895c6cd9d8").findOne(2000).parent().click();
    this.execute = function (){
        var signCurrentDay = getSignCurrentDay();
        console.info("当前签到天数:", signCurrentDay);
        if(signCurrentDay == 2 || signCurrentDay == 6){
            sign(HAVE_GIFT);
            return;
        }
        sign(NORMAL);
    }
}

function sign(signStatus) {
    // 获取签到按钮信息
    var signButton = className("android.widget.Button").findOne();
    var signButtonText = signButton.text();
    if(signButtonText == "立即签到"){
        console.info("尚未签到 开始签到");
        // 签到
        signButton.click();
        var strategy = giftContext.getStrategy(signStatus)
        strategy.execute();
    }
    console.info("今天签到完成-->>返回主页");
    // 签到结束 返回首页
    className("android.widget.Image").text("m8EwMzOjYVZiUjVLuzkCM377NicwkoBhCJVDjbMRsGFiBR6YrQpbOra+7CP8UsVUJC5QYMDoYSEmksOr9wvKugqc7whjogAAAABJRU5ErkJggg==").findOne(400).parent().click();
    console.info("返回成功");
}

// 获取当前天数
function getSignCurrentDay(){
    sleep(1000);
    // 找到签到页面上当前签到提示
    var signHint = className("android.view.View").clickable(true).depth(15).findOne();
    // 获取签到提示文字
    var signHintOne = signHint.child(0).text();
    var length = signHintOne.length
    // 截取
    return signHintOne.substring(length - 2, length - 1);
}

module.exports = SignOperation;