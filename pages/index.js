import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Timer from "../components/timer";
import Settings from "../components/settings";
import { useEffect, useState } from "react";

export default function Home(props) {
  const [settingsOpened,setSettingsOpened] = useState(false);
  const [settings,setSettings] = useState();
  useEffect(() => {
    setSettings({
    "timing": localStorage.getItem("settings-timing") ?? "Group A",
    "timingIndex": parseInt(localStorage.getItem("settings-timingIndex")) ?? 0,
    "offset": parseInt(localStorage.getItem("settings-offset")) ?? 0
  })
  }, [])
  useEffect(() => {
    console.table("Settings have changed", settings)
  }, [settings]);
  const updateSettings = (key,value) =>{
    localStorage.setItem("settings-"+key,value);
    setSettings(settings=>({
      ...settings,
      [key]: value
    }))
  }
  
  return (
    <div
    className="is-flex is-flex-direction-column is-justify-content-space-between"
    style={{ height: "100%" }}
  >
    <Navbar setSettingsOpened={setSettingsOpened}/>
    {
      settings && 
      <>
        <div>
          <Timer settings={settings}/>
        </div>
        <Settings active={settingsOpened} setActive={setSettingsOpened} settings = {settings} updateSettings={updateSettings}/>
      </>
    }
    <Footer/>
    </div>
  )
}