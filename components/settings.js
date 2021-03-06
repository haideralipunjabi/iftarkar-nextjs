import { useRouter } from "next/router";
import Timings from "../data/timings.json";
import Languages from "../data/languages.json";
import classNames from "classnames";
import { useSettingsContext } from "../context/settings";

export default function Settings(props) {
  const {
    settingsOpened,
    setSettingsOpened,
    settings,
    updateSettings,
  } = useSettingsContext();
  const router = useRouter();
  const Language = Languages[router.locale];
  const handleOnChange = (e) => {
    updateSettings(e.target.id, e.target.selectedOptions[0].text);
  };
  if (!settings) return <></>;
  return (
    <div className={classNames("modal", { "is-active": settingsOpened })}>
      <div className="modal-background"></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{Language.settings}</p>
          <button
            onClick={() => setSettingsOpened(false)}
            className="delete"
            aria-label="close"
          ></button>
        </header>
        <section className={classNames("modal-card-body")}>
          <form>
            <div className="field">
              <label htmlFor="" className="label">
                {Language.timings}
              </label>
              <div className="control">
                <div className="select">
                  <select
                    id="timing"
                    onChange={(e) => {
                      updateSettings(
                        "timing",
                        e.target.selectedOptions[0].value
                      );
                      updateSettings("timingIndex", e.target.selectedIndex);
                      updateSettings("offset", 0);
                    }}
                    value={Timings[settings.timingIndex].name[router.locale]}
                  >
                    {Timings.map((timing, idx) => (
                      <option key={idx} value={timing.name[router.locale]}>
                        {timing.full_name[router.locale]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            {Timings[settings.timingIndex]["offsets"].length > 0 && (
              <div className="field">
                <label htmlFor="" className="label">
                  {Language.area}
                </label>
                <div className="control">
                  <div className="select">
                    <select
                      id="offset"
                      onChange={(e) => {
                        updateSettings(
                          "offset",
                          parseInt(e.target.selectedOptions[0].value)
                        );
                      }}
                      value={settings.offset}
                    >
                      {Timings[settings.timingIndex]["offsets"].map(
                        (offset, key) => (
                          <option key={key} value={offset.offset}>
                            {offset.name[router.locale]}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
              </div>
            )}
            <div className="field">
              <label htmlFor="" className="label">
                {Language.theme}
              </label>
              <div className="control">
                <div className="select">
                  <select
                    name=""
                    id="theme"
                    onChange={(e) => {
                      updateSettings(
                        "theme",
                        e.target.selectedOptions[0].value
                      );
                    }}
                    value={settings.theme}
                  >
                    <option value="light">{Language.light}</option>
                    <option value="dark">{Language.dark}</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
