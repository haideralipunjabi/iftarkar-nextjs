import styles from "./timer.module.scss";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Timings from "../data/timings.json";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Timer(props) {
  const { settings, setSettingsOpened } = props;
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
  const [timeLeft, setTimeLeft] = useState(timeEnd.diffNow());
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

      setTimeLeft(timeEnd.diffNow());
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
            )}>{hijri} Ramadan 1442</h2>
          )
        }
        
        <h2 className={classNames(styles.timerDetails,"switchColor")}>
          {Timings[settings.timingIndex].name} {
            Timings[settings.timingIndex].offsets.length > 0 && (
              " - " + Timings[settings.timingIndex].offsets.filter(offset=>(offset.offset==settings.offset))[0]?.name
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
                "has-text-weight-semi-bold switchColor"
              )}
            >
              {timeLeft.toFormat("hh:mm:ss")}
            </p>
            <div className={classNames("container",styles.progressContainer)}>
              <progress
                className={classNames("progress","is-primary",styles.progress)}
                value={percentDone}
                max="100"
              >
                {percentDone}
              </progress>
              <p className={styles.progressValue}>{percentDone}%</p>
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
