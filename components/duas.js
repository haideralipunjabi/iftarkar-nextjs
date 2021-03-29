import { useState } from "react";
import classNames from "classnames";
import Languages from "../data/languages.json";
import {useSettingsContext} from "../context/settings";
import styles from "./duas.module.scss";

export default function Duas() {
    const [dua,setDua] = useState("");
    const {settings}= useSettingsContext();
    
    const Duas = {
      "sahar": {
        "arabic": "وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ",
        "english":"I intend to keep the fast for tomorrow in the month of Ramadan",
        "roman":"Wa bisawmi ghadinn nawaiytu min shahri ramadan",
      },
      "iftar": {
        "arabic":"اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امنْتُ وَعَليْكَ تَوَكّلتُ وَعَلى رِزْقِكَ اَفْطَرْتُ",
        "english":"O Allah! I fasted for You and I believe in You and I put my trust in You and I break my fast with Your sustenance",
        "roman":"Allahumma inni laka sumtu wa bika aamantu wa alayka tawakkaltu wa ala rizq-ika-aftartu"
      }
    }
  return (
    <>
     <div className="container">
     <div className={classNames("tabs is-centered")}>
        <ul>
          {
            Object.keys(Duas).map(key=>(
              <li key={key} className={classNames({"is-active": dua===key})}>
                <a className="is-size-3 is-size-5-mobile" data-target={key} onClick={()=>{
                  if(dua===key) setDua();
                  else setDua(key);
                }}>{Languages[settings.language].dua} {Languages[settings.language][key]}</a>
              </li>
            ))
          }
        </ul>
      </div>
      {
        Object.keys(Duas).map(key=>(
          <div key={key} className={classNames("dua","has-text-centered","px-3",{"is-hidden":dua!=key})}>
            <h2 className="amiri is-size-2 is-size-4-mobile">{Duas[key]["arabic"]}</h2>
            <hr className={styles.seperator}/>
            <h2 className="is-size-4 is-size-6-mobile">{Duas[key]["roman"]}</h2>
            <hr className={styles.seperator}/>
            <h2 className="is-size-4 is-size-6-mobile">{Duas[key]["english"]}</h2>
          </div>
        ))
      }
     </div>
    </>
  );
}
