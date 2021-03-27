import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Languages from "../data/languages.json";
import { useRouter } from "next/router";
import Link from "next/link";
import {useSettingsContext} from "../context/settings";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const router = useRouter();
  const {settings,setSettingsOpened} = useSettingsContext();
  console.log("TEST", settings);
if(!settings) return <></>

  return (
    <>
      <nav
        className="navbar is-primary"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a
            role="button"
            className={classNames("navbar-burger", { "is-active": menuOpened })}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={() => setMenuOpened(!menuOpened)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={classNames("navbar-menu has-background-primary", {
            "is-active": menuOpened,
          })}
        >
          <div className="navbar-start ml-a">
            <Link href="/">
              <a className={classNames("navbar-item is-size-6",{"is-active":router.pathname==="/"})}>
                {Languages[settings.language].home}
              </a>
            </Link>
            <Link href="/timings">
              <a className={classNames("navbar-item is-size-6",{"is-active":router.pathname==="/timings"})}>
                {Languages[settings.language].timings}
              </a>
            </Link>
            <a
              onClick={() => setSettingsOpened(true)}
              className="navbar-item is-size-6"
            >
              {Languages[settings.language].settings}
            </a>
            <Link href="/about">
            <a className={classNames("navbar-item is-size-6",{"is-active":router.pathname==="/about"})}>
              {Languages[settings.language].about}
            </a>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
