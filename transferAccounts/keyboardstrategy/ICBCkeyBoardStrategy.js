/**
 * 工行键盘策略
 * 
*/
const iCBCkeyBoardStrategy = {
    inMoney: function(money) {
        console.info("输入价格");
        var moneyList = money.split("");
        moneyList.forEach(element => {
        var amount = payIn(element);
        //点击
        press(amount.bounds().centerX(), amount.bounds().centerY(), 10);
        });
        console.info("输入完毕");
    },
  };

function payIn(key) {
    switch (key) {
        case "0": return className("android.widget.TextView").text(key).findOne();
        case "1": return className("android.widget.TextView").text(key).findOne();
        case "2": return className("android.widget.TextView").text(key).findOne();
        case "3": return className("android.widget.TextView").text(key).findOne();
        case "4": return className("android.widget.TextView").text(key).findOne();
        case "5": return className("android.widget.TextView").text(key).findOne();
        case "6": return className("android.widget.TextView").text(key).findOne();
        case "7": return className("android.widget.TextView").text(key).findOne();
        case "8": return className("android.widget.TextView").text(key).findOne();
        case "9": return className("android.widget.TextView").text(key).findOne();
        default:
            break;
    }
}
module.exports = iCBCkeyBoardStrategy;