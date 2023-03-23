import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { DateTime } from "luxon";

export const methods = [
    {
        name: {
            "en": "Muslim World League",
            "ur": "مسلم ورلڈ لیگ",
            "kmr": "مسلم ورلڈ لیگ",
        } ,
        description: "Muslim World League. Standard Fajr time with an angle of 18°. Earlier Isha time with an angle of 17°.",
        function: CalculationMethod.MuslimWorldLeague
    },
    {
        name: {
            "en": "Egyptian General Authority of Survey",
            "ur": "مصری جنرل اتھارٹی آف سروے",
            "kmr": "مصری جنرل اتھارٹی آف سروے",
        },
        description:"Egyptian General Authority of Survey. Early Fajr time using an angle 19.5° and a slightly earlier Isha time using an angle of 17.5°.",
        function: CalculationMethod.Egyptian
    },
    {
        name:{
            "en": "University of Islamic Sciences, Karachi",
            "ur": "یونیورسٹی آف اسلامی سائنسس، کراچی",
            "kmr": "یونیورسٹی آف اسلامی سائنسس، کراچی",
        },
        description:"University of Islamic Sciences, Karachi. A generally applicable method that uses standard Fajr and Isha angles of 18°.",
        function: CalculationMethod.Karachi
    },
    {
        name:{
            "en": "Umm al-Qura University, Makkah",
            "ur": "ام القری یونیورسٹی مکہ مکرمہ",
            "kmr": "ام القری یونیورسٹی مکہ مکرمہ",
        },
        description:"Umm al-Qura University, Makkah. Uses a fixed interval of 90 minutes from maghrib to calculate Isha. And a slightly earlier Fajr time with an angle of 18.5°. Note: you should add a +30 minute custom adjustment for Isha during Ramadan.",
        function: CalculationMethod.UmmAlQura
    },
    {
        name:{
            "en": "Dubai",
            "ur": "دبئی",
            "kmr": "دبئی",
        },
        description:"Used in the UAE. Slightly earlier Fajr time and slightly later Isha time with angles of 18.2° for Fajr and Isha in addition to 3 minute offsets for sunrise, Dhuhr, Asr, and Maghrib.",
        function: CalculationMethod.Dubai
    },
    {
        name:{
            "en": "Qatar",
            "ur": "قطر",
            "kmr": "قطر",
        },
        description:"Same Isha interval as UmmAlQura but with the standard Fajr time using an angle of 18°.",
        function: CalculationMethod.Qatar
    },
    {
        name:{
            "en": "Kuwait",
            "ur": "کویت",
            "kmr": "کویت",
        },
        description:"Standard Fajr time with an angle of 18°. Slightly earlier Isha time with an angle of 17.5°.",
        function: CalculationMethod.Kuwait
    },
    {
        name:{
            "en": "Moonsighting Committee",
            "ur": "چاند دیکھنے والی کمیٹی",
            "kmr": "چاند دیکھنے والی کمیٹی",
        },
        description:"Method developed by Khalid Shaukat, founder of Moonsighting Committee Worldwide. Uses standard 18° angles for Fajr and Isha in addition to seasonal adjustment values. This method automatically applies the 1/7 approximation rule for locations above 55° latitude. Recommended for North America and the UK.",
        function: CalculationMethod.MoonsightingCommittee
    },
    {
        name:{
            "en": "Singapore, Malaysia, and Indonesia",
            "ur": "سنگاپور، ملائیشیا اور انڈونیشیا",
            "kmr": "سنگاپور، ملائیشیا اور انڈونیشیا",
        },
        description:"Used in Singapore, Malaysia, and Indonesia. Early Fajr time with an angle of 20° and standard Isha time with an angle of 18°.",
        function: CalculationMethod.Singapore
    },
    {
        name:{
            "en": "Turkey",
            "ur": "ترکی",
            "kmr": "ترکی",
        },
        description:"An approximation of the Diyanet method used in Turkey. This approximation is less accurate outside the region of Turkey.",
        function: CalculationMethod.Turkey
    },
    {
        name:{
            "en": "University of Tehran",
            "ur": "تہران یونیورسٹی",
            "kmr": "تہران یونیورسٹی",
        },
        description:"Institute of Geophysics, University of Tehran. Early Isha time with an angle of 14°. Slightly later Fajr time with an angle of 17.7°. Calculates Maghrib based on the sun reaching an angle of 4.5° below the horizon.",
        function: CalculationMethod.Tehran
    },
    {
        name:{
            "en": "Islamic Society of North America",
            "ur": "اسلامک سوسائٹی آف نارتھ امریکہ",
            "kmr": "اسلامک سوسائٹی آف نارتھ امریکہ",
        },
        description:"Can be used for North America, but the moonsightingCommittee method is preferable. Gives later Fajr times and early Isha times with angles of 15°.",
        function: CalculationMethod.NorthAmerica
    },
    
]
// const firstDay = DateTime.fromISO("2023-03-24")
// const lastDay = DateTime.fromISO("2023-04-22")

export function getGeneralTimings(coordLat, coordLong, method,sehriOffset=0,iftarOffset=0,firstDay=DateTime.fromISO("2023-03-23")) {
    const firstSehri = getSehriIftar(coordLat, coordLong, method,firstDay, sehriOffset, iftarOffset).sehri;
    const lastIftar = getSehriIftar(coordLat, coordLong, method,firstDay.plus({days:30}),sehriOffset, iftarOffset).iftar;
    const now = DateTime.now()
    if(now < firstSehri) {
        return {
            timeStart: null,
            timeEnd: firstSehri,
            timeType: "sehri",
            hijri: null,
          };
    }
    else if (now > lastIftar) {
        return {
            timeStart: null,
            timeEnd: null,
            timeType: "EM",
            hijri: null,
          };
    }
    const {sehri, iftar} = getSehriIftar(coordLat, coordLong, method,now,sehriOffset, iftarOffset);
    if(sehri < now && now < iftar) {
        return {
            timeStart: sehri,
            timeEnd: iftar,
            timeType: "iftar",
            hijri: null,
          };
    }
    else if(now > iftar){
        const nextDay = now.plus({days:1});
        const {sehri: nextSehri} = getSehriIftar(coordLat, coordLong, method, nextDay,sehriOffset, iftarOffset);
        return {
            timeStart: iftar,
            timeEnd: nextSehri,
            timeType: "sehri",
            hijri: null,
        };
    }
    else if(now < sehri){
        const prevDay = now.minus({days:1})
        const {iftar: prevIftar} = getSehriIftar(coordLat, coordLong, method, prevDay,sehriOffset, iftarOffset);
        return {
            timeStart: prevIftar,
            timeEnd: sehri,
            timeType: "sehri",
            hijri: null,
        }
    }
}

export function getSehriIftar(coordLat, coordLong, method,date, sehriOffset=0,iftarOffset=0) {
    const coords = new Coordinates(coordLat, coordLong);
    const prayerTimes = new PrayerTimes(coords, date.toJSDate(), methods[method].function())
    // const intl = new Intl.DateTimeFormat("en-IN");
    return {
        sehri: DateTime.fromJSDate(prayerTimes.fajr).plus({minutes: sehriOffset}), 
        iftar: DateTime.fromJSDate(prayerTimes.maghrib).plus({minutes: iftarOffset})
      };
}

export function getTimingsTable(coordLat,coordLong,method,sehriOffset=0,iftarOffset=0,firstDay=DateTime.fromISO("2023-03-23")) {
    let iterator = firstDay;
    const table = [];
    while(iterator <= firstDay.plus({days:30})) {
        const {sehri, iftar} =getSehriIftar(coordLat, coordLong,method, iterator,sehriOffset, iftarOffset);
        table.push({
            "dates": {
                "gregorian": sehri.toFormat("dd/LL"),
                "hijri": iterator.diff(firstDay, 'days').toObject()["days"] + 1,
            },
            "day": sehri.toFormat("cccc"),
            "sahar": sehri.toFormat("hh:mm a"),
            "iftar": iftar.toFormat("hh:mm a")
        })
        iterator = iterator.plus({days:1})
    }
    return table;
}