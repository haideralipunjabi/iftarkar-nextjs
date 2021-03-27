import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import Languages from "../data/languages.json";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSettingsContext } from "../context/settings";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const { settings, setSettingsOpened } = useSettingsContext();
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
            <ActiveLink href="/">
              {Languages[settings.language].home}
            </ActiveLink>
            <ActiveLink href="/timings">
              {Languages[settings.language].timings}
            </ActiveLink>
            <a
              onClick={() => setSettingsOpened(true)}
              className="navbar-item is-size-6"
            >
              {Languages[settings.language].settings}
            </a>
            <ActiveLink href="/about">
              {Languages[settings.language].about}
            </ActiveLink>
          </div>
        </div>
      </nav>
    </>
  );
}

function ActiveLink({ href, className, children }) { 

  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={classNames("navbar-item", "is-size-6", {
          "is-active": router.pathname === href,
        })}
      >
        {children}
      </a>
    </Link>
  );
}
