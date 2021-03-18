import classNames from "classnames";
import { useState } from "react";
export default function Duas({settings}) {
    const [dua,setDua] = useState("");
  return (
    <>
      <div className="tabs is-centered">
        <ul>
          <li className={classNames(
              {
                "is-active": dua=="sahar"
              }
          )}>
            <a data-target="sahar" onClick={()=>{
                if(dua==="sahar") setDua();
                else setDua("sahar");
            }}>Dua Sahar</a>
          </li>
          <li className={classNames(
              {
                "is-active": dua=="iftar"
              }
          )}>
            <a data-target="iftar" onClick={()=>{
                if(dua==="iftar") setDua();
                else setDua("iftar");
            }}>Dua Iftar</a>
          </li>
        </ul>
      </div>
      <div className={classNames(
          "dua switchColor has-text-centered",
          {"is-hidden": dua!="sahar"}
      )} id="dua-sahar">
        <h1 className="dua-arabic arabic is-size-3">
          وَبِصَوْمِ غَدٍ نَّوَيْتُ مِنْ شَهْرِ رَمَضَانَ
        </h1>
        <h1 className="dua-roman  is-size-5">
          Wa bisawmi ghadinn nawaiytu min shahri ramadan
        </h1>
        <h1 className="dua-english  is-size-5">
          I intend to keep the fast for tomorrow in the month of Ramadan
        </h1>
      </div>
      <div className={classNames(
          "dua switchColor has-text-centered",
          {"is-hidden": dua!="iftar"}
      )} id="dua-iftar">
        <h1 className="dua-arabic arabic is-size-3">
          اللَّهُمَّ اِنِّى لَكَ صُمْتُ وَبِكَ امنْتُ وَعَليْكَ تَوَكّلتُ وَ
          عَلى رِزْقِكَ اَفْطَرْتُ
        </h1>
        <h1 className="dua-roman  is-size-5">
          Allahumma inni laka sumtu wa bika aamantu wa alayka tawakkaltu wa ala
          rizq-ika-aftartu
        </h1>
        <h1 className="dua-english  is-size-5">
          O Allah! I fasted for You and I believe in You and I put my trust in
          You and I break my fast with Your sustenance
        </h1>
      </div>
    </>
  );
}
