import Timings from "../data/timings.json";
import classNames from "classnames";

export default function Settings(props) {
  const {active,setActive,settings,updateSettings} = props;

  const handleOnChange = (e) => {
    updateSettings(e.target.id,e.target.selectedOptions[0].text);
  }
  return (
    <div className={classNames("modal", { "is-active": active })}>
      <div className="modal-background"></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Settings</p>
            <button
              onClick={() => setActive(false)}
              className="delete"
              aria-label="close"
            ></button>
          </header>
          <section className="modal-card-body">
            <form>
              <div className="field">
                <label htmlFor="" className="label">Timings</label>
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
                        Timings.map((timing,idx)=><option key={idx} value={timing.name}>{timing.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              {
                Timings[settings.timingIndex]["offsets"].length > 0 &&
                <div className="field">
                <label htmlFor="" className="label">Area</label>
                <div className="control">
                  <div className="select">
                    <select id="offset" onChange={e=>{
                      updateSettings("offset",parseInt(e.target.selectedOptions[0].value))
                    }}
                    value={settings.offset}
                    >
                      {
                        Timings[settings.timingIndex]["offsets"].map(offset=><option value={offset.offset}>{offset.name}</option>)
                      }
                    </select>
                  </div>
                </div>
              </div>
              }
            </form>
          </section>
      </div>
    </div>
  );
}
