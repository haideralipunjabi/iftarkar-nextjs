import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import AppleModal from "./appleModal";
import { isApple, isInstallable } from "./hooks";

export default function DownloadModal(props) {
  const { modalOpened, setModalOpened } = props;
  const [isAppleShown, setIsAppleShown] = useState(false);
  const installPWA = isInstallable();
  const isAppleDevice = isApple();

  return (
    <>
      <div className={classNames("modal", { "is-active": modalOpened })}>
        <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Download</p>
              <button
                className="delete"
                aria-label="close"
                onClick={() => setModalOpened(false)}
              ></button>
            </header>
            <section className="modal-card-body is-flex is-flex-direction-column ">
              <button
                className={classNames("button is-primary is-rounded", {
                  "is-hidden": !isAppleDevice && !installPWA,
                })}
                onClick={() => {
                  if (isAppleDevice) setIsAppleShown(true);
                  else installPWA.prompt();
                }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={["fas", "globe-asia"]} />
                </span>
                <span>Download Web App (Desktop & Android)</span>
              </button>
              <br/>
              <a
                className="button is-rounded is-primary"
                href="https://play.google.com/store/apps/details?id=org.hackesta.iftarkar"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <FontAwesomeIcon icon={["fab", "google-play"]} />
                </span>
                <span>Download from Play Store</span>
              </a>
              <br/>
              <button
                className={classNames("button is-primary is-rounded", {
                  "is-hidden": !isAppleDevice,
                })}
                onClick={() => {
                  setIsAppleShown(true);
                  setModalOpened(false);
                }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={["fab", "apple"]} />
                </span>
                <span>What about iOS?</span>
              </button>
            </section>
        </div>
      </div>
      <AppleModal
        isActive={isAppleShown}
        handleClose={() => {
          setIsAppleShown(false);
        }}
      />
    </>
  );
}
