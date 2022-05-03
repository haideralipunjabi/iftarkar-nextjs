import { useRouter } from "next/router";
import styles from "./timer.module.scss";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import Timings from "../data/timings.json";
import classNames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../utils/utils";
import Languages from "../data/languages.json";
import { useSettingsContext } from "../context/settings";
import Head from "next/head";
import DonationModal, { Food4Kashmir } from "./donationModal";

export default function Timer() {
  const { settings, setSettingsOpened, updateSettings } = useSettingsContext();
  const router = useRouter();
  const Language = Languages[router.locale];

  // const [isDonationShown,setIsDonationShown] = useState(false);
  // const [isFoodShown, setIsFoodShown] = useState(false);
  // Get timeStart, timeEnd & timeType
  const getTimes = () => {
    let timingIndex;
    if (settings.timingIndex >= Timings.length) {
      updateSettings("timingIndex", 0);
      timingIndex = 0;
    } else {
      timingIndex = settings.timingIndex;
    }
    let timings = Timings[timingIndex].timings;
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
    if (idx === -1) {
      // We are not in the month of Ramzan
      if (now < firstSehri)
        // Before Ramzan Starts,
        return {
          timeStart: null,
          timeEnd: firstSehri,
          timeType: "sehri",
          hijri: null,
        };
      else if (now > lastIftar)
        // After Ramzan Ends
        return {
          timeStart: null,
          timeEnd: null,
          timeType: "EM",
          hijri: null,
        };
    }
    let timeStart, timeEnd, timeType;
    let iftarTime = DateTime.fromSeconds(timings[idx].timestamps.iftar).plus({
      // Today's Iftar Time
      minutes: offset,
    });
    let sehriTime = DateTime.fromSeconds(timings[idx].timestamps.sehri).plus({
      // Today's Sehri Time
      minutes: offset,
    });
    let prevIftar, nextSehri; // Yesterday's Iftar time, Tommorow's Sehri Time
    if (idx !== 0) {
      prevIftar = DateTime.fromSeconds(timings[idx - 1].timestamps.iftar).plus({
        minutes: offset,
      });
    }
    if (idx + 1 < dates.length) {
      nextSehri = DateTime.fromSeconds(timings[idx + 1].timestamps.sehri).plus({
        minutes: offset,
      });
    }
    // 00:00 - sehriTime & we had a Iftar yesterday, return time from yesterday's Iftar to today's Sehri
    if (now < sehriTime && prevIftar) {
      timeStart = prevIftar;
      timeEnd = sehriTime;
      timeType = "sehri";
    }
    // sehriTime - IftarTime, during day return from today's Sehri to today's Iftar
    else if (now > sehriTime && now < iftarTime) {
      timeStart = sehriTime;
      timeEnd = iftarTime;
      timeType = "iftar";
    }
    // IftarTime - 00:00, post Iftar, return time from Iftar to tomorrow's Sehri
    else if (now > iftarTime && nextSehri) {
      timeStart = iftarTime;
      timeEnd = nextSehri;
      timeType = "sehri";
    }
    // Today is sehri (i.e, first Sehri) return only the Sehri Time
    else if (!prevIftar) {
      timeStart = null;
      timeEnd = firstSehri;
      timeType = "sehri";
    }
    // Today was last iftar
    else if (!nextSehri) {
      timeStart = null;
      timeEnd = null;
      timeType = "EM";
    }
    return {
      timeStart: timeStart,
      timeEnd: timeEnd,
      timeType: timeType,
      hijri: timings[idx].dates.hijri,
    };
  };
  const times = getTimes();
  if (times.timeType === "EM")
    return (
      <div className="is-flex is-flex-direction-column is-justify-content-center has-text-centered">
        <h2 className={styles.title}>{Language.eidmubarak}</h2>
      </div>
    );

  const [timeStart, setTimeStart] = useState(times.timeStart);
  const [timeEnd, setTimeEnd] = useState(times.timeEnd);
  const [timeType, setTimeType] = useState(times.timeType);
  const [timeLeft, setTimeLeft] = useState(
    timeEnd?.diffNow(["days", "hours", "minutes", "second"])
  );
  const [hijri, setHijri] = useState(times.hijri);
  const getPercentDone = () => {
    if (!timeStart) return 0.0;
    return (
      (DateTime.now().diff(timeStart) * 100) /
      timeEnd.diff(timeStart)
    ).toFixed(2);
  };
  const [percentDone, setPercentDone] = useState(getPercentDone());
  const setTimes = () => {
    const times = getTimes();
    setTimeStart(times.timeStart);
    setTimeEnd(times.timeEnd);
    setTimeType(times.timeType);
    setHijri(times.hijri);
    1;
  };

  const isAndroidApp = () => router.query["utm_source"] === "androidapp";
  const setAlarm = (hour, minute, message) => {
    window.location = `intent://iftarkar.com?hour=${hour}&minute=${minute}&message=${message}#Intent;scheme=myscheme;package=org.hackesta.iftarkar;action=alarmaction;end`;
  };
  // Main Clock Timer
  useEffect(() => {
    let interval = setInterval(() => {
      setTimeLeft(timeEnd.diffNow(["days", "hours", "minutes", "second"]));
      setPercentDone(getPercentDone());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeEnd]);

  // Get new times when time ends
  useEffect(() => {
    if (timeLeft.values.seconds <= 0) {
      setTimes();
      setTimeLeft(timeEnd.diffNow(["days", "hours", "minutes", "second"]));
      setPercentDone(getPercentDone());
    }
  }, [timeLeft]);

  useEffect(() => {
    setTimes();
    setTimeLeft(timeEnd.diffNow(["days", "hours", "minutes", "second"]));
    setPercentDone(getPercentDone());
  }, [settings]);
  // Eid Mubarak
  if (timeType === "EM") {
    return (
      <div className="is-flex is-flex-direction-column is-justify-content-center has-text-centered">
        {/* <h2 className={styles.timeTitle}>{Language.eidmubarak}</h2> */}
        <h2 className={styles.title}>We will return next year</h2>
      </div>
    );
  }
  return (
    <div className="is-flex is-flex-direction-column is-justify-content-center has-text-centered">
      <Head>
        <title>
          {translate(
            router.locale,
            timeLeft.toFormat("dd:hh:mm:ss").split(":")[1]
          )}
          :
          {translate(
            router.locale,
            timeLeft.toFormat("dd:hh:mm:ss").split(":")[2]
          )}
          :
          {translate(
            router.locale,
            timeLeft.toFormat("dd:hh:mm:ss").split(":")[3]
          )}{" "}
          | {Language.iftarkar}
        </title>
      </Head>
      {
        <>
          {
            <h2 className={styles.timerSubtitle}>
              {hijri && (
                <>
                  <span>
                    {translate(router.locale, hijri)} {Language.shawal}{" "}
                    {translate(router.locale, 1443)} {Language.ah}
                  </span>
                  <div></div>
                </>
              )}
              <span className="time">
                {translate(router.locale, DateTime.now().toFormat("dd LLLL y"))}{" "}
                {Language.ce}
              </span>
            </h2>
          }

          <h2 className={styles.timerDetails}>
            {Timings[settings.timingIndex].name[router.locale]}{" "}
            {Timings[settings.timingIndex].offsets.length > 0 &&
              " - " +
                Timings[settings.timingIndex].offsets.filter(
                  (offset) => offset.offset == settings.offset
                )[0]?.name[router.locale]}
            {/* <FontAwesomeIcon
              className={classNames(
                "mx-4",
                { "has-text-primary": settings.theme === "light" },
                { "has-text-info": settings.theme === "dark" }
              )}
              icon={["fas", "cogs"]}
              onClick={() => setSettingsOpened(true)}
            /> */}
            <a
              className="mx-2 is-size-6 is-primary underline"
              onClick={() => setSettingsOpened(true)}
            >
              ({Language.change})
            </a>
          </h2>
          <h2 className={styles.timerDetails}>
            {Language["next"][timeType]}:{" "}
            <span className="time">
              {translate(router.locale, timeEnd.toFormat("hh:mm a"))}
            </span>
            <FontAwesomeIcon
              className={classNames(
                "mx-4",
                { "has-text-primary": settings.theme === "light" },
                { "has-text-info": settings.theme === "dark" },
                { "is-hidden": !isAndroidApp() }
              )}
              icon={["fas", "bell"]}
              onClick={() => {
                const [hour, minute] = timeEnd.toFormat("HH:mm").split(":");
                setAlarm(
                  hour,
                  minute,
                  timeType[0].toUpperCase() + timeType.slice(1)
                );
              }}
            />
          </h2>
          <div>
            <p
              className={classNames(
                styles.timerTitle,
                "my-2 has-text-weight-semi-bold"
              )}
            >
              {timeLeft.days > 0 && (
                <>
                  <span className={styles.timeContainer}>
                    <span className={styles.timeTitle}>
                      {translate(
                        router.locale,
                        timeLeft.toFormat("dd:hh:mm:ss").split(":")[0]
                      )}
                    </span>
                    <span className={styles.timeSubtitle}>
                      {Language[timeLeft.days === 1 ? "day" : "days"]}
                    </span>
                  </span>
                  <span className={styles.timeContainer}>
                    <span className={styles.timeSeparator}>:</span>
                  </span>
                </>
              )}
              <span className={styles.timeContainer}>
                <span className={styles.timeTitle}>
                  {translate(
                    router.locale,
                    timeLeft.toFormat("dd:hh:mm:ss").split(":")[1]
                  )}
                </span>
                <span className={styles.timeSubtitle}>
                  {Language[timeLeft.hours === 1 ? "hour" : "hours"]}
                </span>
              </span>
              <span className={styles.timeContainer}>
                <span className={styles.timeSeparator}>:</span>
              </span>
              <span className={styles.timeContainer}>
                <span className={styles.timeTitle}>
                  {translate(
                    router.locale,
                    timeLeft.toFormat("dd:hh:mm:ss").split(":")[2]
                  )}
                </span>
                <span className={styles.timeSubtitle}>
                  {Language[timeLeft.minutes === 1 ? "minute" : "minutes"]}
                </span>
              </span>
              {timeLeft.days < 1 && (
                <>
                  <span className={styles.timeContainer}>
                    <span className={styles.timeSeparator}>:</span>
                  </span>
                  <span className={styles.timeContainer}>
                    <span className={styles.timeTitle}>
                      {translate(
                        router.locale,
                        timeLeft.toFormat("dd:hh:mm:ss").split(":")[3]
                      )}
                    </span>
                    <span className={styles.timeSubtitle}>
                      {
                        Language[
                          parseInt(timeLeft.seconds) === 1
                            ? "second"
                            : "seconds"
                        ]
                      }
                    </span>
                  </span>
                </>
              )}
            </p>
            <a
              style={{ whiteSpace: "normal" }}
              href="https://pippin.news?utm_source=iftarkar"
              target="_blank"
              rel="noopener noreferrer"
              className="py-5 button is-normal is-primary is-rounded m-2"
              onClick={() => {
                gtag("event", "link_click", {
                  event_category: "link_click",
                  event_label: "pippin",
                });
              }}
            >
              Pippin - Local News and Stories at your fingertips
            </a>
            {timeStart && (
              <div
                className={classNames("container", styles.progressContainer)}
              >
                <progress
                  className={classNames(
                    "progress",
                    "is-primary",
                    styles.progress
                  )}
                  value={percentDone}
                  max="100"
                >
                  {percentDone}
                </progress>
                <p className={styles.progressValue}>
                  {translate(router.locale, percentDone)}%
                </p>
              </div>
            )}
          </div>
          {/* <DonationModal isActive={isDonationShown} handleClose={()=>{setIsDonationShown(false)}}/>
          <Food4Kashmir isActive={isFoodShown} handleClose={()=>{setIsFoodShown(false)}}/> */}
        </>
      }
    </div>
  );
}
