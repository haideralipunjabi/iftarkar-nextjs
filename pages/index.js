import Timer from "../components/timer";
import { useEffect, useState } from "react";
import classNames from "classnames";
import Duas from "../components/duas";
import { useSettingsContext } from "../context/settings";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Settings from "../components/settings";

export default function Home() {
  const { settings } = useSettingsContext();
  return (
    <div
      className={classNames(
        "is-flex is-flex-direction-column is-justify-content-space-between",
        "has-background-" + useSettingsContext().settings?.theme ?? "light"
      )}
      style={{ minHeight: "100%" }}
    >
      <Navbar />
      <div className="my-6">
        <Timer />
        <Duas />
      </div>
      <Settings />
      <Footer />
    </div>
  );
}
