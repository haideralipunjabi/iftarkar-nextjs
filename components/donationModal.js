import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import Languages from "../data/languages.json";

export default function DonationModal(props) {
  const { isActive, handleClose } = props;
  const router = useRouter();
  const Language = Languages[router.locale];
  const CHARITIES = [
    {
      name: "Athrout",
      url: "https://www.athrout.org/bank-details/",
    },
    {
      name: "Help Poor Voluntary Trust",
      url: "http://hpvtrust.org/donate/",
    },
    {
      name: "Coronavirus Watch - J&K",
      url: "https://www.covidjk.com/donate",
    },
    {
      name: "MadadgaarJK",
      url: "https://twitter.com/MadadgaarJK",
    },
    {
      name: "Sahuliyat Kashmir",
      url: "https://linktr.ee/sahuliyatkashmir",
    },
    {
      name: "KASHMER",
      url: "https://www.kashmer.org/donate-now/",
    },
    {
      name: "Help Together Foundation",
      url: "http://helptogetherfoundation.org/donate.html",
    },
    {
      name: "Imdaad Foundation",
      url: "http://imdaadfoundation.org/",
    },
    {
      name: "Madad Charitable Trust",
      url: "https://twitter.com/madad_trust/status/1390325881382445059?s=20",
    },
  ];
  return (
    <div className={`modal ${isActive ? "is-active" : ""}`}>
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
        <section className="modal-card-body english">
          <ul>
            {CHARITIES.map((charity, idx) => (
              <li key={idx}>
                <a
                  className="is-size-4 underline"
                  key={idx}
                  href={charity.url + "?utm_source=covidkashmir"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {charity.name}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

export function Food4Kashmir(props) {
  const { isActive, handleClose } = props;
  return (
    <div className={`modal english ${isActive ? "is-active" : ""}`}>
      <div className="modal-background"></div>
      <div className="modal-card has-text-left">
        <header className="modal-card-head">
          <p className="modal-card-title">#Food4Kashmir</p>
          <button
            className="delete"
            aria-label="close"
            onClick={handleClose}
          ></button>
        </header>
        <section className="modal-card-body">
          <p>
            Food for Kashmir is an initiative by Tiffin Aaw, in which they
            invite people to give their charity to sponsor food for
            underprivileged and distressed COVID positive patients and their
            families, either in hospitals or in home quarantine.
          </p>
          <br />
          <p>
            They are a small start up / business initiative which provides
            affordable home cooked food at reasonable costs. Now, in addition,
            they want to extend this service to those who can't pay through your
            small donations.
          </p>
          <br />
          <p>
            COVID-19 has hit us bad socially and exonomically. At this time they
            have been receiving calls refarding food and they are doing in
            whatever they can but are helpless / incapable and are not able to
            cater all. Will you help #Food4Kashmir initiative to feed the
            patients and their distressed families this Ramadhan and receive
            their prayers? To sponsor a meal for a single person please donate
            Rs.120. Their one single meal costs Rs. 150 but they have deicded to
            keep it Rs. 120 only.
          </p>
          <br />
          <p>
            Those who want to support this #Food4Kashmir initiative, message
            them on their social media or call / Whatsapp them.
          </p>
          <br />
          <p className="has-text-centered">
            <a
              href="https://wa.me/919419444700"
              target="_blank"
              rel="noopener noreferrer"
              className="button is-primary is-rounded m-2"
            >
              <span className="icon">
                <FontAwesomeIcon icon={["fab", "whatsapp"]} />
              </span>
              <span>9419444700</span>
            </a>
            <a
              href="tel:+919419444700"
              className="button is-primary is-rounded m-2"
            >
              <span className="icon">
                <FontAwesomeIcon icon={["fas", "phone"]} />
              </span>
              <span>9419444700</span>
            </a>
          </p>
          <div
            className="is-flex is-justify-content-center is-size-3"
            style={{ gap: "20px" }}
          >
            <a
              href="https://www.facebook.com/tiffinaaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "facebook-f"]} />
            </a>
            <a
              href="https://twitter.com/tiffinaaw"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "twitter"]} />
            </a>
            <a
              href="https://www.instagram.com/tiffinaaw/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
