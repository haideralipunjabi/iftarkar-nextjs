import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateTime } from "luxon";
import styles from "./wait.module.scss";
export default function Wait() {
  const daysLeft = DateTime.fromSeconds(1648966513);
  const icons = [
    {
      icon: ["fas", "chart-line"],
      title: "1.8 Lakh Views",
    },
    {
      icon: ["fas", "exclamation-triangle"],
      title: "Worked without Internet",
    },
    {
      icon: ["fas", "star"],
      title: "4.85 Rating on Play Store",
    },
    {
      icon: ["fas", "language"],
      title: "3 Languages - English, Urdu, Kashmiri",
    },
  ];
  return (
    <div className="container">
      <div className="is-flex is-flex-direction-column is-justify-content-center has-text-centered">
        <p className="my-2 has-text-weight-semi-bold">
          <span className={styles.title}>
            {daysLeft.diffNow(["days"]).toFormat("dd")} days left <br />
          </span>
          <span className={styles.subtitle}>for Ramzan 1444</span>
        </p>
        <hr />
        <span className={styles.subtitle}>In Ramzan 1442</span>
        <div className="is-flex is-flex-direction-row is-justify-content-space-around is-flex-wrap-wrap">
          {icons.map((icon, key) => (
            <div key={key} className={styles.iconContainer}>
              <FontAwesomeIcon className={styles.icon} icon={icon.icon} />
              <br />
              <span className={styles.title}>{icon.title}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
