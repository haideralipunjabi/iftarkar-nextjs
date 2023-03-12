import "../styles/globals.scss";
import Head from "next/head";
import { useEffect } from "react";
import { DefaultSeo } from "next-seo";
import SEO from "../next-seo.config";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { SettingsWrapper } from "../context/settings";
import Navbar from "../components/navbar";
import Footer from "../components/footer";
import Settings from "../components/settings";

function MyApp({ Component, pageProps }) {
  library.add(fab, fas, far);

  const handlePrompt = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", handlePrompt);
    return () => {
      window.removeEventListener("beforeinstallprompt", handlePrompt);
    };
  });

  return (
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
        <link
          rel="mask-icon"
          href="/favicons/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicons/favicon.ico" />
        <meta name="apple-mobile-web-app-title" content="Iftarkar" />
        <meta name="application-name" content="Iftarkar" />
        <meta name="msapplication-TileColor" content="#131836" />
        <meta
          name="msapplication-config"
          content="/favicons/browserconfig.xml"
        />
        <meta name="theme-color" content="#ffffff" />
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <DefaultSeo {...SEO} />
      <SettingsWrapper>
        <div
          id="rootDiv"
          className="is-flex is-flex-direction-column is-justify-content-space-between"
          style={{ minHeight: "100%" }}
        >
          <Navbar />

          <Component {...pageProps} />
          <Settings />
          <Footer />
        </div>
      </SettingsWrapper>
    </>
  );
}

export default MyApp;
