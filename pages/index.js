
import Timer from "../components/timer";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Duas from "../components/duas";
export default function Home(props) {
  const {settings, setSettings, settingsOpened, setSettingsOpened} = props;
  const NUMDICT = {
    "0":"۰",
    "1":"	١",
    "2":"٢",
    "3":"٣",
    "4":"۴",
    "5":"٥",
    "6":"٦",
    "7":"٧",
    "8":"٨",
    "9":"٩",
}
  
  if(!settings) return(<div></div>)
  return (
      settings && 
      <div className="my-6">
        <h1 className="arabic"></h1>
          <Timer settings={settings} setSettingsOpened={setSettingsOpened}/>
        <Duas settings={settings} />
      </div>
    
  )
}