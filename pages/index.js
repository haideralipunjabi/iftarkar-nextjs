
import Timer from "../components/timer";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Duas from "../components/duas";
import { useSettingsContext } from "../context/settings";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Settings from "../components/settings";

export default function Home() {
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
const {settings} = useSettingsContext();
if(!settings) return <></>
  return (
    <div
          className={classNames(
            "is-flex is-flex-direction-column is-justify-content-space-between",
            "has-background-" + settings?.theme ?? "light",
            { arabic: settings?.language === "ur" }
          )}
          style={{ minHeight: "100%" }}
        >
          <Navbar />
      <div className="my-6">
        <h1 className="arabic"></h1>
          <Timer/>
        <Duas/>
      </div>
      <Settings />
          <Footer />
        </div>
  )
}