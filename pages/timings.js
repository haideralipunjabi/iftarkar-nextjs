import TimingsData from "../data/timings.json";
import { DateTime } from "luxon";
import {translate} from "../utils/utils";
import Languages from "../data/languages.json";
import { useSettingsContext } from "../context/settings";

export default function Timings() {
  const { settings, setSettings, settingsOpened, setSettingsOpened } = useSettingsContext();
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
  if (!settings) return <></>;
  return (
    <div className="my-6">
      <h1 className=" has-text-centered is-size-2 title switchColor">
      {Languages[settings.language].timings}
      </h1>
      <h2 className="has-text-centered is-size-4 subitle switchColor">
        {TimingsData[settings.timingIndex].name[settings.language]}
        {TimingsData[settings.timingIndex].offsets.length > 0 &&
          " - " +
          TimingsData[settings.timingIndex].offsets.filter(
              (offset) => offset.offset == settings.offset
            )[0]?.name[settings.language]}
      </h2>
      <div className="table-container">
      <table className="table is-bordered has-text-centered switchColor mx-a my-2">
        <thead>
          <tr>
            <th className="switchColor">{Languages[settings.language].islamicdate}</th>
            <th className="switchColor">{Languages[settings.language].gregoriandate}</th>
            <th className="switchColor">{Languages[settings.language].day}</th>
            <th className="switchColor">{Languages[settings.language].sahar}</th>
            <th className="switchColor">{Languages[settings.language].iftar}</th>
          </tr>
        </thead>
        <tbody>
          {TimingsData[settings.timingIndex].timings.map((timing, idx) => {
            return (
              <tr key={idx}>
                <td>{translate(settings.language,timing.dates.hijri)}</td>
                <td>{translate(settings.language,timing.dates.gregorian)}</td>
                <td>{translate(settings.language,getTimes(timing).day)}</td>
                <td>{translate(settings.language,getTimes(timing).sahar)}</td>
                <td>{translate(settings.language,getTimes(timing).iftar)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    </div>
  );
}
