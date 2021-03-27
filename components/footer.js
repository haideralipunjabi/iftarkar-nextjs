import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { translate } from "../utils/utils";
import {useSettingsContext} from "../context/settings";

export default function Footer() {
  const {settings} = useSettingsContext();
  return (
    <footer className="footer has-text-primary-light">
      <div className="content has-text-centered">
        {settings.language == "en" && (
          <p className="is-size-6">
            Made with{" "}
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="mx-2"
              icon={["fas", "heart"]}
            />{" "}
            by{" "}
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haider Ali Punjabi
            </a>{" "}
            | © {new Date().getFullYear()}
          </p>
        )}
        {settings.language == "ur" && (
          <p className="is-size-6">
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              حیدر علی پنجابی
            </a> نے
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="mx-2"
              icon={["fas", "heart"]}
            />{" "}
            سے بنایاہے{" "}
            | © {translate("ur",new Date().getFullYear())}
          </p>
        )}
      </div>
    </footer>
  );
}
