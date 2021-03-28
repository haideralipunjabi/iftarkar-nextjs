
import {useContext,createContext, useState, useEffect} from "react";

const SettingsContext = createContext({});
export function SettingsWrapper({ children }) {
    const [settingsOpened, setSettingsOpened] = useState(false);
    const [settings, setSettings] = useState({
      timing: "Group A",
      timingIndex: 0,
      offset: 0,
      theme: "light",
      language: "en",
    });
    useEffect(() => {
      setSettings({
        timing: localStorage.getItem("settings-timing") ?? "Group A",
        timingIndex: parseInt(localStorage.getItem("settings-timingIndex") ?? 0),
        offset: parseInt(localStorage.getItem("settings-offset") ?? 0),
        theme: localStorage.getItem("settings-theme") ?? "light",
        language: localStorage.getItem("settings-language") ?? "en",
      });
    }, []);
    useEffect(()=>{
      document.getElementsByTagName("body")[0].dataset["theme"] = settings.theme;
    },[settings])
    const updateSettings = (key, value) => {
      localStorage.setItem("settings-" + key, value);
      setSettings((settings) => ({
        ...settings,
        [key]: value,
      }));

    };
    return(
        <SettingsContext.Provider value={{
            settings,setSettings,settingsOpened,setSettingsOpened,updateSettings
        }}>
            {children}
        </SettingsContext.Provider>

    )
}
export function useSettingsContext(){
    return useContext(SettingsContext);
}