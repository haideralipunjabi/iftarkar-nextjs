const NUMDICT = {
    "0":"۰",
    "1":"۱",
    "2":"۲",
    "3":"۳",
    "4":"۴",
    "5":"۵",
    "6":"۶",
    "7":"۷",
    "8":"۸",
    "9":"۹",
    "am":"صبح",
    "pm":"شام",
    "sunday":"اتوار",
    "monday":"سوموار",
    "tuesday":"منگل",
    "wednesday":"بدھ",
    "thursday":"جمعرات",
    "friday":"جمعہ",
    "saturday":"ہفتہ"
}
export const translate = (lang,text) =>{
    if(typeof(text) !== String) {
        text = text.toString();
    }
    if(lang==="en") return text;
    Object.entries(NUMDICT).forEach(i=>{
        text=text.toLowerCase().replace(new RegExp(i[0],"g"),i[1])
    })
    return text;
}