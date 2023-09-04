/**
 * 微信键盘策略
 * 
*/
const weChatkeyBoardStrategy = {
    inMoney: function(money) {
        var moneyList = money.split("");
        moneyList.forEach(element => {
        var amount = payIn(element);
        sleep(5);
        //点击
        press(amount.bounds().centerX(), amount.bounds().centerY(), 10);
        });
    }
  };

function payIn(key) {
    switch (key) {
        case "0": return id("tenpay_keyboard_0").findOne();
        case "1": return id("tenpay_keyboard_1").findOne();
        case "2": return id("tenpay_keyboard_2").findOne();
        case "3": return id("tenpay_keyboard_3").findOne();
        case "4": return id("tenpay_keyboard_4").findOne();
        case "5": return id("tenpay_keyboard_5").findOne();
        case "6": return id("tenpay_keyboard_6").findOne();
        case "7": return id("tenpay_keyboard_7").findOne();
        case "8": return id("tenpay_keyboard_8").findOne();
        case "9": return id("tenpay_keyboard_9").findOne();
        default:
            break;
    }
}
module.exports = weChatkeyBoardStrategy;