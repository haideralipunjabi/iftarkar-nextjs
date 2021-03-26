const NUMDICT = {
    "0":"٠",
    "1":"١",
    "2":"٢",
    "3":"٣",
    "4":"۴",
    "5":"٥",
    "6":"٦",
    "7":"٧",
    "8":"٨",
    "9":"٩",
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