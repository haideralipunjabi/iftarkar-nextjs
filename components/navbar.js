import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
export default function Navbar({setSettingsOpened}) {
  const [menuOpened, setMenuOpened] = useState(false);
  return (
    <>
    <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a role="button" className={classNames("navbar-burger",{"is-active":menuOpened})} aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={()=>setMenuOpened(!menuOpened)}>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div id="navbarBasicExample" className={classNames("navbar-menu",{"is-active":menuOpened})}>
      <div className="navbar-start ml-a">
        <a href="/" className="navbar-item">Home</a>
        <a onClick={()=>setSettingsOpened(true)} className="navbar-item">Settings</a>
        <a href="/about" className="navbar-item">About</a>
      </div>
    </div>
  </nav>
  </>
  );
}

