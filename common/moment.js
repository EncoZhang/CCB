

const Moment = {
    // 获取当前时间
    nowDate: function(){
        var now = new Date(); 
        const year = now.getFullYear(); // 年
        const month = now.getMonth() + 1; // 月
        const day = now.getDate(); // 日
        console.info(now);
        return year + "" + month +""+  day;
    }, 

    // 获取昨天时间
    yesterday: function(){
        var now = new Date(); 
        var yesterday = new Date(); 
        yesterday.setDate(now.getDate() - 1);
        const year = yesterday.getFullYear(); // 年
        const month = yesterday.getMonth() + 1; // 月
        const day = yesterday.getDate(); // 日
        return year + "" + month +""+ day;
    }
}
module.exports = Moment;