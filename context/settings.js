import { DateTime } from "luxon";
import { useContext, createContext, useState, useEffect } from "react";

const SettingsContext = createContext({});
export function SettingsWrapper({ children }) {
  const [settingsOpened, setSettingsOpened] = useState(false);
  const [settings, setSettings] = useState();
  useEffect(() => {
    const preferDarkMode = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    setSettings({
      timing: localStorage.getItem("settings-timing") ?? "Group A",
      timingIndex: parseInt(localStorage.getItem("settings-timingIndex") ?? 0),
      offset: parseInt(localStorage.getItem("settings-offset") ?? 0),
      theme:
        localStorage.getItem("settings-theme") ??
        (preferDarkMode ? "dark" : "light"),
      // language: langOverride==="ur" ? "ur": (localStorage.getItem("settings-language") ?? "en"),
      usingGeneralTimings:
        localStorage.getItem("settings-usingGeneralTimings") === "true",
      method: parseInt(localStorage.getItem("settings-method") ?? 0),
      latitude: isNaN(parseFloat(localStorage.getItem("settings-latitude") ?? 0.0)) ? 0.0: parseFloat(localStorage.getItem("settings-latitude") ?? 0.0),
      longitude: isNaN(parseFloat(localStorage.getItem("settings-longitude") ?? 0.0)) ? 0.0 : parseFloat(localStorage.getItem("settings-longitude") ?? 0.0),
      sehriOffset: isNaN(parseInt(localStorage.getItem("settings-sehriOffset") ?? 0)) ? 0 : parseInt(localStorage.getItem("settings-sehriOffset") ?? 0),
      iftarOffset: isNaN(parseInt(localStorage.getItem("settings-iftarOffset") ?? 0))?0:parseInt(localStorage.getItem("settings-iftarOffset") ?? 0),
      hijriDate: parseInt(localStorage.getItem("settings-hijriDate") ?? 0),
      generalStartDate: DateTime.fromISO(
        localStorage.getItem("settings-generalStartDate") ?? "2023-03-23"
      ),
    });
  }, []);
  useEffect(() => {
    if (settings) {
      document.getElementsByTagName("body")[0].dataset["theme"] =
        settings.theme;
      document
        .getElementById("rootDiv")
        .classList.remove("has-background-dark");
      document
        .getElementById("rootDiv")
        .classList.remove("has-background-light");
      document
        .getElementById("rootDiv")
        .classList.add("has-background-" + settings.theme);
    }
  }, [settings]);
  const updateSettings = (key, value) => {
    gtag('event','settings',{
      'key': key,
      'value': value
    });
    localStorage.setItem("settings-" + key, value);
    setSettings((settings) => ({
      ...settings,
      [key]: value,
    }));
  };
  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        settingsOpened,
        setSettingsOpened,
        updateSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
export function useSettingsContext() {
  return useContext(SettingsContext);
}
