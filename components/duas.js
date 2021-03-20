import classNames from "classnames";
import { useState } from "react";
export default function Duas({settings}) {
    const [dua,setDua] = useState("");

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
     <div>
     <div className="container tabs is-centered">
        <ul>
          {
            Object.keys(Duas).map(key=>(
              <li key={key} className={classNames({"is-active": dua===key})}>
                <a data-target={key} onClick={()=>{
                  if(dua===key) setDua();
                  else setDua(key);
                }}>Dua {key}</a>
              </li>
            ))
          }
        </ul>
      </div>
      {
        Object.keys(Duas).map(key=>(
          <div key={key} className={classNames("container","dua","switchColor","has-text-centered",{"is-hidden":dua!=key})}>
            <h2 className="arabic is-size-2">{Duas[key]["arabic"]}</h2>
            <hr className="seperator"/>
            <h2 className="is-size-4">{Duas[key]["roman"]}</h2>
            <hr className="seperator"/>
            <h2 className="is-size-4">{Duas[key]["english"]}</h2>
          </div>
        ))
      }
     </div>
    </>
  );
}