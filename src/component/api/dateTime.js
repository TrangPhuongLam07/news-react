export function convertDate(date){
    var currentDate = new Date().getTime();
    var dateCreate = Date.parse(date);
    var ms = currentDate - dateCreate
    var hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    var minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds

    if(hours > 0){
       var day = parseInt(hours / 24);
       if(day > 0){
           return day +" ngày trước";
       }else {
           return hours +" giờ trước";
       }
    }else if(minutes > 0){
        return minutes +" phút trước";
    }else {
        return "1 phút trước"
    }
}

