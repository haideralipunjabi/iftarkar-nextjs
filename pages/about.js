import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Languages from "../data/languages.json";
import {useSettingsContext} from "../context/settings";

export default function About() {
  const {settings} = useSettingsContext();
  if (!settings) return <></>;
  return (
    <div className="container px-6 my-6 has-text-centered switchColor">
      <h1 className="title">{Languages[settings.language].about}</h1>
      <p className="is-size-4 has-text-justified">
        {settings.language === "en" && (
          <>
            Iftarkar is a Web App which provides Iftar and Sahar timings during
            the Holy month of Ramadan for the regions of Jammu, Kashmir, Ladakh
            and Kargil. The Web App is available as a{" "}
            <a
              href="https://iftarkar.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              website
            </a>{" "}
            from where it can be installed on every platform. It is also
            available on{" "}
            <a
              href="https://play.google.com/store/apps/details?id=org.hackesta.iftarkar"
              target="_blank"
              rel="noopener noreferrer"
            >
              Google Play Store
            </a>
            .
            <hr />
            We use the following sources for the different timings:
            <ul>
              <li>Group 1: </li>
              <li>Group 2: </li>
              <li>Group 3: </li>
            </ul>
            <hr />
            Developed By: <br />
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haider Ali Punjabi
            </a>
          </>
        )}
        {settings.language === "ur" && (
          <>
            افطارکر ایک ویب ایپ ہے جو رمضان کے مقّدس مہینے کے دوران جموں و
            کشمیر، لداخ اور کرگل کے علاقوں میں افطار اور سحری کے اوقات مہیا کرتی
            ہے۔ ویب ایپ ایک{" "}
            <a
              href="https://iftarkar.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              ویب سائٹ
            </a>{" "}
            کے طور پر دستیاب ہے جہاں سے اسے ہر پلیٹ فارم پر انسٹال کیا جاسکتا
            ہے۔ یہ{" "}
            <a
              href="https://play.google.com/store/apps/details?id=org.hackesta.iftarkar"
              target="_blank"
              rel="noopener noreferrer"
            >
              گوگل پلے اسٹور
            </a>{" "}
            پر بھی دستیاب ہے۔
            <hr />
            ہم مختلف اوقات کے لئے درج ذیل ذرائع کا استعمال کرتے ہیں۔
            <ul>
              <li>Group 1: </li>
              <li>Group 2: </li>
              <li>Group 3: </li>
            </ul>
            <hr />
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              حیدر علی پنجابی
            </a>{" "}
            کی تیار کردہ
          </>
        )}
        <br />
        <ul className="icons">
          <li>
            <a
              href="https://twitter.com/HAliPunjabi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
          </li>
          <li>
            <a
              href="https://instagram.com/haideralipunjabi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
          </li>
          <li>
            <a
              href="https://github.com/haideralipunjabi"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "github"]} />
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/haideralipunjabi/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "linkedin"]} />
            </a>
          </li>
          <li>
            <a href="mailto:developer@hackesta.org">
              <FontAwesomeIcon icon={["fas", "envelope"]} />
            </a>
          </li>
        </ul>
      </p>
    </div>
  );
}
