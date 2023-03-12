import { useState } from "react";
import { useRouter } from "next/router";
import classNames from "classnames";
import styles from "./duas.module.scss";

export default function Duas() {
  const [duaIdx, setDuaIdx] = useState();
  const router = useRouter();
  const Duas = [
    {
      titles: {
        en: "Dua Sahar",
        ur: "دُعاِ سحر",
        kmr: "دُعاِ سحر",
      },
      arabic: "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
      english: "I intend to keep the fast for tomorrow in the month of Ramadan",
      roman: "Wa bisawmi ghadinn nawaiytu min shahri ramadan",
    },
    {
      titles: {
        en: "Dua Iftar - 1",
        ur: "دُعاِ اِفطار - ۱",
        kmr: "دُعاِ اِفطار - ۱",
      },
      arabic:
        "اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امنْتُ وَعَليْكَ تَوَكّلتُ وَعَلى رِزْقِكَ اَفْطَرْتُ",
      english:
        "O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
      roman:
        "Allahumma inni laka sumtu wa bika aamantu wa alayka tawakkaltu wa ala rizq-ika-aftartu",
    },
    {
      titles: {
        en: "Dua Iftar - 2",
        ur: "دُعاِ اِفطار - ۲",
        kmr: "دُعاِ اِفطار - ۲",
      },
      arabic:
        "ذَهَبَ الظَّمَأُ وَابْتَلَّتِ الْعُرُوقُ وَثَبَتَ الأَجْرُ إِنْ شَاءَ اللَّهُ ",
      english:
        "Thirst has gone, the arteries are moist, and the reward is sure, if Allah wills.",
      roman:
        "dhahabadh dhama-u wabtallatil ‘urooqu, wa tha-batal ajru insha Allah",
    },
  ];
  return (
    <>
      <div className="container">
        <div className={classNames("tabs is-centered")}>
          <ul>
            {Duas.map((dua, key) => (
              <li
                key={key}
                className={classNames({ "is-active": duaIdx === key })}
              >
                <a
                  className="is-size-4 is-size-5-mobile"
                  data-target={key}
                  onClick={() => {
                    if (duaIdx === key) setDuaIdx();
                    else setDuaIdx(key);
                  }}
                >
                  {dua.titles[router.locale]}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {Duas.map((dua, key) => (
          <div
            key={key}
            className={classNames("dua", "has-text-centered", "px-3", {
              "is-hidden": duaIdx != key,
            })}
          >
            <h2 className="amiri is-size-2 is-size-4-mobile">
              {dua["arabic"]}
            </h2>
            <hr className={styles.seperator} />
            <h2 className="is-size-4 is-size-6-mobile">{dua["roman"]}</h2>
            <hr className={styles.seperator} />
            <h2 className="is-size-4 is-size-6-mobile">{dua["english"]}</h2>
          </div>
        ))}
      </div>
    </>
  );
}
