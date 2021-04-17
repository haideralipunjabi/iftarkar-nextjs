import { useRouter } from "next/router";
import Languages from "../data/languages.json";

export default function FilesModal(props) {
    const {isActive,handleClose} = props;
    const router = useRouter();
    const Language = Languages[router.locale];
    const FILES = [
        {
            "names":{
                "en": "Fiqah Hanfia - English",
                "ur":"فقہ حنفیہ - انگریزی",
                "kmr":"فقہ حنفیہ - انگریزی"
            },
            "url":"https://drive.google.com/file/d/16YLSHjEKOSiuGPybAuyho5qFbmdIJe6x/view?usp=sharing",
            "thumb": require("../public/images/pdf-1.png")
        },
        {
            "names":{
                "en": "Fiqah Jaffaria - English",
                "ur":"فقہ جعفریہ - انگریزی",
                "kmr":"فقہ جعفریہ - انگریزی"
            },
            "url":"https://drive.google.com/file/d/1TATP722gB5u5xS4i7l_0y4znzRXpxFFH/view?usp=sharing",
            "thumb": require("../public/images/pdf-2.png")
        },
        {
            "names":{
                "en": "Fiqah Hanfia - Urdu",
                "ur":"فقہ حنفیہ - اردو",
                "kmr":"فقہ حنفیہ - اردو"
            },
            "url":"https://drive.google.com/file/d/1MGS1pij5DQSRUsElQt2KOWwKld8_t6RS/view?usp=sharing",
            "thumb": require("../public/images/pdf-3.png")
        },
        {
            "names":{
                "en": "Fiqah Jaffaria - Urdu",
                "ur":"فقہ جعفریہ - اردو",
                "kmr":"فقہ جعفریہ - اردو"
            },
            "url":"https://drive.google.com/file/d/1qik6Xktj74hAo2JrF7KTHu0I0EvBLouu/view?usp=sharing",
            "thumb": require("../public/images/pdf-4.png")
        },
        {
            "names":{
                "en":"Kargil - English",
                "ur":"کرگل - انگریزی",
                "kmr":"کرگل - انگریزی",
            },
            "url":"https://drive.google.com/file/d/1y2DpJqsId22gMgrlAYOn_m6ZdbOz-YNv/view?usp=sharing",
            "thumb":require("../public/images/pdf-5.png")
        },
        {
            "names":{
                "en":"Kargil - Urdu",
                "ur":"کرگل - اردو",
                "kmr":"کرگل - اردو",
            },
            "url":"https://drive.google.com/file/d/1werVooZsj-fC5b3Rk2Sz30ykZ0GEgkny/view?usp=sharing",
            "thumb":require("../public/images/pdf-6.png")
        }
    ]
    return (
      <div className={`modal ${isActive?"is-active":""}`}>
          <div className="modal-background"></div>
            <div className="modal-card">
              <header className="modal-card-head">
                <p className="modal-card-title">{Language.downloadpdf}</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleClose}
                ></button>
              </header>
              <section className="modal-card-body">
                <div className="columns has-text-centered is-multiline">
                    {
                        FILES.map((file,idx)=>
                            <div key={idx} className="column is-full-mobile is-half-desktop">
                                <a className="is-size-5" href={file.url} target="_blank" rel="noopener noreferrer">
                                <img src={file.thumb} />
                                <p>
                                    {file.names[router.locale]}
                                </p>
                                    </a>
                            </div>
                        )
                    }
                </div>
              </section>
            </div>
        </div>
    );
  }