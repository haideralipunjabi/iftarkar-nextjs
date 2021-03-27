import Timings from "../data/timings.json";
import Languages from "../data/languages.json";
import classNames from "classnames";
import {useSettingsContext} from "../context/settings";

export default function Settings(props) {
  const {settingsOpened,setSettingsOpened,settings,updateSettings} = useSettingsContext();
  const handleOnChange = (e) => {
    updateSettings(e.target.id,e.target.selectedOptions[0].text);
  }
  return (
    <div className={classNames("modal", { "is-active": settingsOpened })}>
      <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{Languages[settings.language].settings}</p>
            <button
              onClick={() => setSettingsOpened(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <form>
              <div className="field">
                <label htmlFor="" className="label">{Languages[settings.language].timings}</label>
                <div className="control">
                  <div className="select">
                    <select id="timing" onChange={e=>{
                      updateSettings("timing", e.target.selectedOptions[0].value)
                      updateSettings("timingIndex",e.target.selectedIndex)
                      updateSettings("offset",0)
                    }}
                    value={settings.timing}
                    > 
                      {
                        Timings.map((timing,idx)=><option key={idx} value={timing.name.en}>{timing.name.en}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              {
                Timings[settings.timingIndex]["offsets"].length > 0 &&
                <div className="field">
                <label htmlFor="" className="label">{Languages[settings.language].area}</label>
                <div className="control">
                  <div className="select">
                    <select id="offset" onChange={e=>{
                      updateSettings("offset",parseInt(e.target.selectedOptions[0].value))
                    }}
                    value={settings.offset}
                    >
                      {
                        Timings[settings.timingIndex]["offsets"].map((offset,key)=><option key={key} value={offset.offset}>{offset.name[settings.language]}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              }
              <div className="field">
                <label htmlFor="" className="label">{Languages[settings.language].theme}</label>
                <div className="control">
                  <div className="select">
                    <select name="" id="theme" onChange={e=>{
                      updateSettings("theme",e.target.selectedOptions[0].value)
                    }}
                    value={settings.theme}
                    >
                      <option value="light">{Languages[settings.language].light}</option>
                      <option value="dark">{Languages[settings.language].dark}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="field">
                <label htmlFor="" className="label">{Languages[settings.language].language}</label>
                <div className="control">
                  <div className="select">
                    <select name="" id="language" onChange={e=>{
                      updateSettings("language",e.target.selectedOptions[0].value)
                    }}
                    value={settings.language}>
                      {
                        Object.entries(Languages).map((entry,key)=><option key={key} value={entry[0]}>{Languages[settings.language][entry[0]]}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
            </form>
          </section>
      </div>
    </div>
  );
}
