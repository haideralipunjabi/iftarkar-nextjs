import "../styles/globals.scss";
import Head from "next/head";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import classNames from "classnames";
import Settings from "../components/settings";

function MyApp({ Component, pageProps }) {
  const [settingsOpened,setSettingsOpened] = useState(false);
  const [settings,setSettings] = useState({
    "timing": "Group A",
    "timingIndex": 0,
    "offset": 0,
    "theme":"light",
    "language":"en"
  });
  useEffect(() => {
    setSettings({
    "timing": localStorage.getItem("settings-timing") ?? "Group A",
    "timingIndex": parseInt(localStorage.getItem("settings-timingIndex") ?? 0),
    "offset": parseInt(localStorage.getItem("settings-offset") ?? 0),
    "theme": localStorage.getItem("settings-theme") ?? "light",
    "language": localStorage.getItem("settings-language") ?? "en",
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
  library.add(fab, fas, far);
  const handlePrompt = (e) => {
    e.preventDefault();
  };
  useEffect(()=>{
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
    };
  })
  pageProps = {...pageProps, "settings": settings,"setSettings":setSettings,'settingsOpened':settingsOpened,"setSettingsOpened":setSettingsOpened};
  return( 
    <>
    <Head>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicons/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicons/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicons/favicon-16x16.png"
      />
      <link rel="manifest" href="/manifest.json" />
      <link rel="mask-icon" href="/favicons/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap"
        crossOrigin
      />
    </Head>
    <DefaultSeo {...SEO} />
    <div
    className={classNames("is-flex is-flex-direction-column is-justify-content-space-between","has-background-"+settings?.theme??"light",{"arabic":settings.language==="ur"})}
    style={{ minHeight: "100%" }}
  >
  {
    settings &&
    <>
    <Navbar settings={settings} setSettingsOpened={setSettingsOpened}/>
  <Component {...pageProps} />
    <Settings active={settingsOpened} setActive={setSettingsOpened} settings = {settings} updateSettings={updateSettings}/>
    </>
  }

  <Footer/>
    </div>
  </>)
}

export default MyApp
