import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Languages from "../data/languages.json";
import Head from "next/head";
import Timings from "../data/timings.json";
export default function About() {
  const router = useRouter();
  const Language = Languages[router.locale];
  
  return (
    <>
      <Head>
        <title>
          {Language.about} | {Language.iftarkar}
        </title>
      </Head>

      <div className="container px-2 my-6 has-text-centered">
        <h1 className="title">{Language.about}</h1>
        <p className="is-size-4 has-text-justified">
          {router.locale === "en" && (
            <>
              Iftarkar is a Web App which provides Iftar and Sahar timings
              during the Holy month of Ramadan for the regions of Jammu,
              Kashmir, Ladakh and Kargil. The Web App is available as a{" "}
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
                {
                  Timings.map((calendar,idx)=>
                    <li key={idx}><b>{calendar.name["en"]}:</b> {calendar.source["en"]}</li>
                  )
                }
              </ul>
              <hr />
              Special Thanks: <br/>
              <a href="https://muhammadfaysal.com/" target="_blank" rel="noopener noreferrer">Muhammad Faysal</a>
              <br/>
              <br/>
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
          {router.locale === "ur" && (
            <>
              افطارکر ایک ویب ایپ ہے جو رمضان کے مقّدس مہینے کے دوران جموں و
              کشمیر، لداخ اور کرگل کے علاقوں میں افطار اور سحری کے اوقات فراہم
              کرتی ہے۔ ویب ایپ ایک{" "}
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
              {
                  Timings.map((calendar,idx)=>
                    <li key={idx}>{calendar.name["ur"]}: {calendar.source["ur"]}</li>
                  )
                }
              </ul>
              <hr />
             {" "}
              خصوصی شکریہ:
              <a href="https://muhammadfaysal.com/" target="_blank" rel="noopener noreferrer">محمد فیصل</a>
              <br/>
              تیار کردہ:
              <a
                href="https://haideralipunjabi.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                حیدر علی پنجابی
              </a>
            </>
          )}
          {router.locale === "kmr" && (
            <>
              اِفطار کَر چھُ اکھ ویٚب ایپ یُس رَمضانَس منٛزٕ چھُ جموں و کشمیر، لداخ
              تہٕ کرگِل باپتھ سَحر تہٕ اِفطارِچ اوٚقات فراہم کران. یہ چھِ اکھ{" "}
              <a
                href="https://iftarkar.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                ویٚب سایٹ
              </a>{" "}
              کِس صورتس منٛزٕ دستیاب یُس تۄہیہِ ہر کنٛہـ پلیٹ فارمس پیٛٹھ ہیکِو اِنسٹال
              کرِتھ. یِہ چھِ{" "}
              <a
                href="https://play.google.com/store/apps/details?id=org.hackesta.iftarkar"
                target="_blank"
                rel="noopener noreferrer"
              >
                گوٗگل پلے اِسٹورس
              </a>{" "}
              پیٛٹھ تہِ دستیاب. <hr />
              أسؠ چھِ مُختَلِف اوٚقاتن باپتھ یِم وسٲیٔل استعمال کران:
              <ul>
              {
                  Timings.map((calendar,idx)=>
                    <li key={idx}>{calendar.name["kmr"]}: {calendar.source["kmr"]}</li>
                  )
                }
              </ul>
              <hr />
              خصوصی شُکریہ:
              <a href="https://muhammadfaysal.com/" target="_blank" rel="noopener noreferrer">محمد فیصل</a>
              <br/>
              پیش کش:
              <a
                href="https://haideralipunjabi.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                حیدر علی پنجابی{" "}
              </a>{" "}
              {" "}
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
          <br/>
          <a href="https://instagram.com/iftarkardotcom" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={["fab","instagram"]}/> iftarkardotcom</a>
        </p>
      </div>
    </>
  );
}
