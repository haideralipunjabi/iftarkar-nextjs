import { Coordinates, CalculationMethod, PrayerTimes } from 'adhan';
import { DateTime } from "luxon";

export const methods = [
    {
        name: "Muslim World League",
        description: "Muslim World League. Standard Fajr time with an angle of 18°. Earlier Isha time with an angle of 17°.",
        function: CalculationMethod.MuslimWorldLeague
    },
    {
        name:"Egyptian General Authority of Survey",
        description:"Egyptian General Authority of Survey. Early Fajr time using an angle 19.5° and a slightly earlier Isha time using an angle of 17.5°.",
        function: CalculationMethod.Egyptian
    },
    {
        name:"University of Islamic Sciences, Karachi",
        description:"University of Islamic Sciences, Karachi. A generally applicable method that uses standard Fajr and Isha angles of 18°.",
        function: CalculationMethod.Karachi
    },
    {
        name:"Umm al-Qura University, Makkah",
        description:"Umm al-Qura University, Makkah. Uses a fixed interval of 90 minutes from maghrib to calculate Isha. And a slightly earlier Fajr time with an angle of 18.5°. Note: you should add a +30 minute custom adjustment for Isha during Ramadan.",
        function: CalculationMethod.UmmAlQura
    },
    {
        name:"Dubai",
        description:"Used in the UAE. Slightly earlier Fajr time and slightly later Isha time with angles of 18.2° for Fajr and Isha in addition to 3 minute offsets for sunrise, Dhuhr, Asr, and Maghrib.",
        function: CalculationMethod.Dubai
    },
    {
        name:"Qatar",
        description:"Same Isha interval as UmmAlQura but with the standard Fajr time using an angle of 18°.",
        function: CalculationMethod.Qatar
    },
    {
        name:"Kuwait",
        description:"Standard Fajr time with an angle of 18°. Slightly earlier Isha time with an angle of 17.5°.",
        function: CalculationMethod.Kuwait
    },
    {
        name:"Moonsighting Committee",
        description:"Method developed by Khalid Shaukat, founder of Moonsighting Committee Worldwide. Uses standard 18° angles for Fajr and Isha in addition to seasonal adjustment values. This method automatically applies the 1/7 approximation rule for locations above 55° latitude. Recommended for North America and the UK.",
        function: CalculationMethod.MoonsightingCommittee
    },
    {
        name:"Singapore",
        description:"Used in Singapore, Malaysia, and Indonesia. Early Fajr time with an angle of 20° and standard Isha time with an angle of 18°.",
        function: CalculationMethod.Singapore
    },
    {
        name:"Turkey",
        description:"An approximation of the Diyanet method used in Turkey. This approximation is less accurate outside the region of Turkey.",
        function: CalculationMethod.Turkey
    },
    {
        name:"University of Tehran",
        description:"Institute of Geophysics, University of Tehran. Early Isha time with an angle of 14°. Slightly later Fajr time with an angle of 17.7°. Calculates Maghrib based on the sun reaching an angle of 4.5° below the horizon.",
        function: CalculationMethod.Tehran
    },
    {
        name:"ISNA",
        description:"Also known as the ISNA method. Can be used for North America, but the moonsightingCommittee method is preferable. Gives later Fajr times and early Isha times with angles of 15°.",
        function: CalculationMethod.NorthAmerica
    },
    
]
const firstDay = DateTime.fromISO("2023-03-24")
const lastDay = DateTime.fromISO("2023-04-22")

export function getGeneralTimings(coordLat, coordLong, method) {
    const firstSehri = getSehriIftar(coordLat, coordLong, method,firstDay).sehri;
    const lastIftar = getSehriIftar(coordLat, coordLong, method,lastDay).iftar;
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
    const {sehri, iftar} = getSehriIftar(coordLat, coordLong, method,now);

    if(sehri < now < iftar) {
        return {
            timeStart: sehri,
            timeEnd: iftar,
            timeType: "iftar",
            hijri: null,
          };
    }
    else if(now > iftar){
        const nextDay = now.plus({days:1});
        const {nextSehri = sehri} = getSehriIftar(coordLat, coordLong, method, nextDay);
        return {
            timeStart: iftar,
            timeEnd: nextSehri,
            timeType: "sehri",
            hijri: null,
        };
    }
    else if(now < sehri){
        const prevDay = now.minus({days:1})
        const {prevIftar = iftar} = getSehriIftar(coordLat, coordLong, method, prevDay);
        return {
            timeStart: prevIftar,
            timeEnd: sehri,
            timeType: "sehri",
            hijri: null,
        }
    }
}

function getSehriIftar(coordLat, coordLong, method,date) {
    const coords = new Coordinates(coordLat, coordLong);
    const prayerTimes = new PrayerTimes(coords, date.toJSDate(), methods[method].function())
    // const intl = new Intl.DateTimeFormat("en-IN");
    return {
        sehri: DateTime.fromJSDate(prayerTimes.fajr),
        iftar: DateTime.fromJSDate(prayerTimes.maghrib)
      };
}

export function getTimingsTable(coordLat,coordLong,method) {
    let iterator = firstDay;
    const table = [];
    while(iterator <= lastDay) {
        const {sehri, iftar} =getSehriIftar(coordLat, coordLong,method, iterator);
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