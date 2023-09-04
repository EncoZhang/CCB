/**
 * 字符串处理
*/
const StringHandle = {

    // 获取字符串中的数字
    getNumber : function (str) {
        return str.match(/[0-9]/g).join(""); 
    },
    // 获取字符串中的汉字
    getChineseChars : function (str) {
        return str.match(/[\u4e00-\u9fa5]/g).join("");
    }
}
module.exports = StringHandle;

