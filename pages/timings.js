import { useRouter } from "next/router";
import Head from "next/head";
import { DateTime } from "luxon";
import { translate } from "../utils/utils";
import Languages from "../data/languages.json";
import TimingsData from "../data/timings.json";
import { useSettingsContext } from "../context/settings";

export default function Timings() {
  const {
    settings,
    setSettings,
    settingsOpened,
    setSettingsOpened,
  } = useSettingsContext();
  const router = useRouter();
  const Language = Languages[router.locale];
  const getTimes = (timing) => {
    let offset = settings.offset;
    let iftarTime = DateTime.fromSeconds(timing.timestamps.iftar).plus({
      minutes: offset,
    });
    let saharTime = DateTime.fromSeconds(timing.timestamps.sehri).plus({
      minutes: offset,
    });
    return {
      day: saharTime.toFormat("cccc"),
      sahar: saharTime.toFormat("hh:mm a"),
      iftar: iftarTime.toFormat("hh:mm a"),
    };
  };
  return (
    <>
    <Head>
     <title>{Language.timings} | {Language.iftarkar}</title>
   </Head>
      <div className="my-6">
        <h1 className=" has-text-centered is-size-2 title">
          {Language.timings}
        </h1>
        <h2 className="has-text-centered is-size-4 subitle">
          {TimingsData[settings.timingIndex].name[router.locale]}
          {TimingsData[settings.timingIndex].offsets.length > 0 &&
            " - " +
              TimingsData[settings.timingIndex].offsets.filter(
                (offset) => offset.offset == settings.offset
              )[0]?.name[router.locale]}
        </h2>
        <div className="table-container">
          <table className="table is-bordered has-text-centered mx-a my-2">
            <thead>
              <tr>
                <th>
                  {Language.islamicdate}
                </th>
                <th>
                  {Language.gregoriandate}
                </th>
                <th>
                  {Language.day}
                </th>
                <th>
                  {Language.sahar}
                </th>
                <th>
                  {Language.iftar}
                </th>
              </tr>
            </thead>
            <tbody>
              {TimingsData[settings.timingIndex].timings.map((timing, idx) => {
                return (
                  <tr key={idx}>
                    <td>{translate(router.locale, timing.dates.hijri)}</td>
                    <td>
                      {translate(router.locale, timing.dates.gregorian)}
                    </td>
                    <td>
                      {translate(router.locale, getTimes(timing).day)}
                    </td>
                    <td>
                      {translate(router.locale, getTimes(timing).sahar)}
                    </td>
                    <td>
                      {translate(router.locale, getTimes(timing).iftar)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
