let SignOperation = require("./sign/签到.js");
let CCBeanSignOperation = require("./sign/CC豆签到.js");
console.show(true); 
auto.waitFor();
auto.setMode("normal");
var opend = launchApp("建行生活");
console.info("找到建行生活，等待开启");
if(!opend){
    console.info("找不到该应用，请确定是否安装");
}
sleep(8000);
console.info("打开完成，开始签到");
// 日常签到
new SignOperation().execute();

console.info("开始进行CC豆签到");
// CC豆签到
new CCBeanSignOperation().takeCCBean();
