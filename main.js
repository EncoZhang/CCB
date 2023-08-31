
var day = getSignCurrentDay();

console.info("day", day);

function getSignCurrentDay(){
    // 找到签到页面上当前签到提示
    var signHint = className("android.view.View").clickable(true).depth(15).findOne();
    // 获取签到提示文字
    var signHintOne = signHint.child(0).text();
    var length = signHintOne.length
    console.info(signHintOne)
    // 截取
    return signHintOne.substring(length - 2, length - 1);
}