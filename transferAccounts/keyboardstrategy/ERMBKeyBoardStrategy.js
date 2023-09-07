/**
 * 微信键盘策略
 * 
*/
const eRMBKeyBoardStrategy = {
    inMoney: function(money) {
        var moneyList = money.split("");
        moneyList.forEach(element => {
        payIn(element);
        sleep(5);
        });
    }
  };

function payIn(key) {
    switch (key) {
        case "0": 
            press(521,2275.6, 200);
        break 
        case "1": 
            press(149,1775.5, 200);
        break 
        case "2": 
            press(511,1799.1, 200);
        break 
        case "3": 
            press(883,1791, 200);
        break 
        case "4":   
            press(178,1930, 200);
        break 
        case "5": 
            press(552,1956, 200);
        break 
        case "6": 
            press(892,1947, 200);
        break 
        case "7": 
            press(193,2096, 200);
        break 
        case "8": 
            press(527.7,2107, 200);
        break 
        case "9": 
            press(890,2095, 200);
        break 
        default:
            break;
    }
}
module.exports = eRMBKeyBoardStrategy;