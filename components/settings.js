import { useRouter } from "next/router";
import Timings from "../data/timings.json";
import Languages from "../data/languages.json";
import classNames from "classnames";
import { useSettingsContext } from "../context/settings";
import { useEffect, useState } from "react";
import { methods } from "../utils/adhanWrapper";
import { DateTime } from "luxon";
export default function Settings() {
  const { settingsOpened, setSettingsOpened, settings, updateSettings } =
    useSettingsContext();
  const router = useRouter();
  const Language = Languages[router.locale];
  const [generalTimings, setGeneralTimings] = useState(
    settings?.usingGeneralTimings ?? false
  );
  const [locationError, setLocationError] = useState(false);
  useEffect(() => {
    setGeneralTimings(settings?.usingGeneralTimings ?? false);
  }, [settings]);

  const getLatLong = () => {
    setLocationError(false);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        if (position) {
          updateSettings("latitude", position.coords.latitude);
          updateSettings("longitude", position.coords.longitude);
          return;
        } else {
          setLocationError(true);
        }
      });
    } else {
      setLocationError(true);
    }
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
            {!generalTimings && (
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
            )}
            {!generalTimings &&
              Timings[settings.timingIndex]["offsets"].length > 0 && (
                <div className="field my-2">
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
            {generalTimings && (
              <>
                <div className="field">
                  <label htmlFor="" className="label">
                    {Language.timings}
                  </label>
                  <div className="control">
                    <div className="select">
                      <select
                        id="method"
                        onChange={(e) => {
                          updateSettings("method", e.target.selectedIndex);
                        }}
                        value={settings.method}
                      >
                        {methods.map((method, idx) => (
                          <option key={idx} value={idx}>
                            {method.name[router.locale]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label className="label">{Language.location}</label>
                  <div className="field-body">
                    <div className="field">
                      <label htmlFor="">{Language.latitude}</label>
                      <p className="control">
                        <input
                          onChange={(e) => {
                            updateSettings("latitude", e.target.value);
                          }}
                          type="number"
                          className="input my-2 has-text-black"
                          placeholder="Latitude"
                          value={settings.latitude}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <label htmlFor="">{Language.longitude}</label>

                      <p className="control">
                        <input
                          onChange={(e) => {
                            updateSettings("longitude", e.target.value);
                          }}
                          type="number"
                          className="input my-2 has-text-black"
                          placeholder="Longitude"
                          value={settings.longitude}
                        />
                      </p>
                    </div>
                  </div>
                  <div onClick={getLatLong} className="button is-primary">
                    {Language.locate}
                  </div>
                  {locationError && (
                    <div className="has-text-danger">
                      {Language.LocationErrorMessage}
                    </div>
                  )}
                </div>
                <div className="field">
                  <label className="label">{Language.offsets}</label>
                  <div className="field-body">
                    <div className="field">
                      <label htmlFor="">{Language.sahar}</label>
                      <p className="control">
                        <input
                          onChange={(e) => {
                            updateSettings("sehriOffset", e.target.value);
                          }}
                          type="number"
                          className="input my-2 has-text-black"
                          placeholder="Sehri Offset"
                          value={settings.sehriOffset}
                        />
                      </p>
                    </div>
                    <div className="field">
                      <label htmlFor="">{Language.iftar}</label>

                      <p className="control">
                        <input
                          onChange={(e) => {
                            updateSettings("iftarOffset", e.target.value);
                          }}
                          type="number"
                          className="input my-2 has-text-black"
                          placeholder="Iftar Offset"
                          value={settings.iftarOffset}
                        />
                      </p>
                    </div>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="" className="label">
                    {Language.firstDate}
                  </label>
                  <div className="control">
                    <div className="select">
                      <input
                        id="generalStartDate"
                        name="generalStartDate"
                        onChange={(e) => {
                          updateSettings("generalStartDate", DateTime.fromISO(e.target.value));
                        }}
                        value={settings.generalStartDate.toISODate()}
                        type="date"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="field my-2">
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
            <div className="field my-2">
              <label htmlFor="generalTimings" className="checkbox">
                <input
                  className="mx-2"
                  type="checkbox"
                  name="generalTimings"
                  id="generalTimings"
                  checked={generalTimings}
                  onChange={(e) => {
                    setGeneralTimings(e.target.checked);
                    updateSettings("usingGeneralTimings", e.target.checked);
                  }}
                />
                {Language.GeneralSettingsMessage}
              </label>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}
