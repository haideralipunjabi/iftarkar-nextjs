import styles from "./timer.module.scss";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Timings from "../data/timings.json";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../utils/utils";
import Languages from "../data/languages.json";
import {useSettingsContext} from "../context/settings";

export default function Timer() {
  const { settings, setSettingsOpened } = useSettingsContext();
  const getTimes = () => {
    let timings = Timings[settings.timingIndex].timings;
    let dates = timings.map((timing) => timing.dates.gregorian);
    let now = DateTime.now();
    let idx = dates.indexOf(now.toFormat("dd/MM"));
    let offset = settings.offset;
    let firstSehri = DateTime.fromSeconds(timings[0].timestamps.sehri).plus({
      minutes: offset,
    });
    let lastIftar = DateTime.fromSeconds(
      timings[timings.length - 1].timestamps.iftar
    ).plus({ minutes: offset });
    if (idx !== -1) {
      let timeStart, timeEnd;
      let iftarTime = DateTime.fromSeconds(timings[idx].timestamps.iftar).plus({
        minutes: offset,
      });
      let sehriTime = DateTime.fromSeconds(timings[idx].timestamps.sehri).plus({
        minutes: offset,
      });
      let prevIftar, nextSehri;
      if (idx !== 0) {
        prevIftar = DateTime.fromSeconds(
          timings[idx - 1].timestamps.iftar
        ).plus({ minutes: offset });
      }
      if (idx + 1 < dates.length) {
        nextSehri = DateTime.fromSeconds(
          timings[idx + 1].timestamps.sehri
        ).plus({ minutes: offset });
      }
      if (!prevIftar) {
        timeStart = sehriTime;
        timeEnd = sehriTime;
      } else if (!nextSehri) {
        timeStart = lastIftar;
        timeEnd = lastIftar;
      } else if (now < sehriTime) {
        timeStart = prevIftar;
        timeEnd = sehriTime;
      } else if (now > sehriTime && now < iftarTime) {
        timeStart = sehriTime;
        timeEnd = iftarTime;
      } else if (now > iftarTime && nextSehri) {
        timeStart = iftarTime;
        timeEnd = nextSehri;
      }
      return {
        timeStart: timeStart,
        timeEnd: timeEnd,
        hijri: timings[idx].dates.hijri
      };
    } else if (now < firstSehri)
      return {
        timeStart: firstSehri,
        timeEnd: firstSehri,
      };
    else if (now > lastIftar)
      return {
        timeStart: lastIftar,
        timeEnd: lastIftar,
      };
  };
  const times = getTimes();
  const [timeStart, setTimeStart] = useState(times.timeStart);
  const [timeEnd, setTimeEnd] = useState(times.timeEnd);
  const [timeLeft, setTimeLeft] = useState(timeEnd.diffNow(['hours','minutes','second']));
  const [hijri, setHijri] = useState(times.hijri);
  const getPercentDone = () =>
    ((DateTime.now().diff(timeStart) * 100) / timeEnd.diff(timeStart)).toFixed(
      2
    );
  const [percentDone, setPercentDone] = useState(getPercentDone());
  const setTimes = () => {
    const times = getTimes();
    setTimeStart(times.timeStart);
    setTimeEnd(times.timeEnd);
    setHijri(times.hijri)
  };
  useEffect(() => {
    let interval = setInterval(() => {

      setTimeLeft(timeEnd.diffNow(['hours','minutes','second']));
      setPercentDone(getPercentDone());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeEnd]);
  useEffect(() => {
    if (timeLeft.values.milliseconds <= 0) {
      setTimes();
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimes();
  }, [settings]);
  return (
    <div className="is-flex is-flex-direction-column is-justify-content-center has-text-centered">
      {timeEnd > DateTime.now() && (
        <>
        {
            hijri && (
            <h2 className={classNames(
              styles.timerSubtitle,"has-text-weight-bold", "switchColor"
            )}>{translate(settings.language,hijri)} {Languages[settings.language].ramadan} {translate(settings.language,1441)}</h2>
          )
        }
        
        <h2 className={classNames(styles.timerDetails,"switchColor")}>
          {Timings[settings.timingIndex].name[settings.language]} {
            Timings[settings.timingIndex].offsets.length > 0 && (
              " - " + Timings[settings.timingIndex].offsets.filter(offset=>(offset.offset==settings.offset))[0]?.name[settings.language]
            )
          }
          <FontAwesomeIcon
            className={classNames("mx-4", {"has-text-primary": settings.theme === "light"},{"has-text-info": settings.theme==="dark"})}
            icon={["fas", "cogs"]}
            onClick={()=>setSettingsOpened(true)}
          />
          </h2>
          <div>
            <p
              className={classNames(
                styles.timerTitle,
                "my-2 has-text-weight-semi-bold switchColor"
              )}
            >
              {/* {translate(settings.language,timeLeft.toFormat("hh:mm:ss"))} */}
              <span className="timeContainer">
                <span class="timeTitle">{translate(settings.language,timeLeft.toFormat("hh:mm:ss").split(":")[0])}</span>
                <span className="timeSubtitle">{Languages[settings.language][(timeLeft.hours===1?"hour":"hours")]}</span>
              </span>:
              <span className="timeContainer">
                <span class="timeTitle">{translate(settings.language,timeLeft.toFormat("hh:mm:ss").split(":")[1])}</span>
                <span className="timeSubtitle">{Languages[settings.language][(timeLeft.minutes===1?"minute":"minutes")]}</span>
              </span>:
              <span className="timeContainer">
                <span class="timeTitle">{translate(settings.language,timeLeft.toFormat("hh:mm:ss").split(":")[2])}</span>
                <span className="timeSubtitle">{Languages[settings.language][(parseInt(timeLeft.seconds)===1?"second":"seconds")]}</span>
              </span>
            </p>
            <div className={classNames("container",styles.progressContainer)}>
              <progress
                className={classNames("progress","is-primary",styles.progress)}
                value={percentDone}
                max="100"
              >
                {percentDone}
              </progress>
              <p className={styles.progressValue}>{translate(settings.language,percentDone)}%</p>
            </div>
          </div>
        </>
      )}
      {timeEnd < DateTime.now() && (
        <h1 className={styles.timerTitle, "switchColor"}>Eid Mubarak</h1>
      )}
    </div>
  );
}
