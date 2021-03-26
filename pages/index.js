
import Timer from "../components/timer";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Duas from "../components/duas";
export default function Home(props) {
  const {settings, setSettings, settingsOpened, setSettingsOpened} = props;
  
  
  if(!settings) return(<div></div>)
  return (
      settings && 
      <div className="my-6">
          <Timer settings={settings} setSettingsOpened={setSettingsOpened}/>
        <Duas settings={settings} />
      </div>
    
  )
}