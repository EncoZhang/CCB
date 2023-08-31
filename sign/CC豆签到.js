
function CCBeanSignOperation() {
    this.takeCCBean = function (){
        console.info("打开CC豆签到页面, CC豆签到页面加载比较慢");
        // 跳转签到页面
        className("android.widget.Image").text("0db2d998-9021-4a4e-9dfa-5c6356b9e966").findOne(100000).parent().click();
        // 做任务得超多奖励
        console.info("获取做任务得超多奖励, 这个页面加载也比较慢");
        var buttonInfo = className("android.widget.Image").text("button-main-1.c515b6e4").findOne(500000);
        if(buttonInfo == null){
            return
        }
        // 点击去任务页面
        buttonInfo.click();
        console.info("点击进入任务页面");
        // 获取豆子信息
        var takeBeanInfo = className("android.widget.Image").text("popup-ccd.a7e9caaf").findOne(10000);
        if(takeBeanInfo != null){
            // 领豆子
            console.info("点击领豆子");
            takeBeanInfo.click();
        }
        // 未签到
        var unSign = className("android.widget.Button").text("签到").findOne(1000);
        if(unSign != null){
            console.info("点击签到");
            unSign.click();
        }
        // 返回上级
        id("web_ib_back").findOne(100000).click();
        console.info("返回做任务得超多奖励");
        // 返回主页面
        id("web_ib_back").findOne(100000).click();
        console.info("返回主页面");
    }
}
module.exports = CCBeanSignOperation;