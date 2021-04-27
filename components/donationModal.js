import { useRouter } from "next/router";
import Languages from "../data/languages.json";

export default function DonationModal(props) {
    const {isActive,handleClose} = props;
    const router = useRouter();
    const Language = Languages[router.locale];
    const CHARITIES = [
       {
           "name": "Athrout",
           "url": "https://www.athrout.org/bank-details/"
       },
       {
           "name": "Help Poor Voluntary Trust",
           "url": "http://hpvtrust.org/donate/"
       },
       {
           "name": "Coronavirus Watch - J&K",
           "url": "https://www.covidjk.com/donate"
       },
       {
           "name": "MadadgaarJK",
           "url":"https://twitter.com/MadadgaarJK"
       },
       {
           "name": "Sahuliyat Kashmir",
           "url": "https://linktr.ee/sahuliyatkashmir"
       },
       {
         "name": "KASHMER",
         "url":"https://www.kashmer.org/donate-now/"
       }, 
       {
         "name": "Help Together Foundation",
         "url": "http://helptogetherfoundation.org/donate.html"
       },
       {
         "name": "Imdaad Foundation",
         "url": "http://imdaadfoundation.org/"
       }
    ]
    return (
      <div className={`modal ${isActive?"is-active":""}`}>
          <div className="modal-background"></div>
            <div className="modal-card has-text-left">
              <header className="modal-card-head">
                <p className="modal-card-title">{Language.donate}</p>
                <button
                  className="delete"
                  aria-label="close"
                  onClick={handleClose}
                ></button>
              </header>
              <section className="modal-card-body">
                  <ul>

               {
                   CHARITIES.map((charity,idx)=>
                   <li><a className="is-size-4 underline" key={idx} href={charity.url+"?utm_source=covidkashmir"} target="_blank" rel="noopener noreferrer">{charity.name}</a></li>
                   )
                }
                </ul>
              </section>
            </div>
        </div>
    );
  }
