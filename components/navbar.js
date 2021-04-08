import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Languages from "../data/languages.json";
import { useSettingsContext } from "../context/settings";
import Image from "next/image";

export default function Navbar() {
  const [menuOpened, setMenuOpened] = useState(false);
  const { setSettingsOpened } = useSettingsContext();
  const router = useRouter();
  const Language = Languages[router.locale];
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
              <a className={classNames("navbar-item", "is-size-5")}>
                <Image src={`/logo_horizontal${(router.locale!=="en")?"_urdu":""}.svg`} width={395} height={100} />
              </a>
            </Link>
            <ActiveLink href="/timings" icon={["fas", "calendar-alt"]}>
              {Language.timings}
            </ActiveLink>
            <a
              onClick={() => setSettingsOpened(true)}
              className="navbar-item is-size-5"
            >
              <FontAwesomeIcon
                className="is-size-7 mx-2"
                icon={["fas", "cogs"]}
              />
              {Language.settings}
            </a>
            <ActiveLink href="/about" icon={["fas", "info-circle"]}>
              {Language.about}
            </ActiveLink>
            <div className="navbar-item has-dropdown is-hoverable">
              <div className="navbar-link is-size-5">{Language.language}</div>
              <div className="navbar-dropdown">
                {Object.keys(Languages).map((lang,key) => (
                  <Link key={key} href={router.pathname} locale={lang}>
                    <a  className="navbar-item is-size-5">{Language[lang]}</a>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

function ActiveLink({ href, className, icon, children }) {
  const router = useRouter();
  return (
    <Link href={href}>
      <a
        className={classNames("navbar-item", "is-size-5", {
          "is-active": router.pathname === href,
        })}
      >
        <FontAwesomeIcon className="is-size-7 mx-2" icon={icon} />
        {children}
      </a>
    </Link>
  );
}
