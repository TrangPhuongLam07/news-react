export function convertDate(date){
    let currentDate = new Date().getTime();
    let dateCreate = Date.parse(date);

    let ms = currentDate - dateCreate
    let hours = Math.floor(ms / 3600000); // 1 Hour = 36000 Milliseconds
    let minutes = Math.floor((ms % 3600000) / 60000); // 1 Minutes = 60000 Milliseconds

    if(date === undefined){
        return "";
    }else {
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
}

