import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../utils/utils";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="footer has-text-primary-light">
      <div className="content has-text-centered">
        <a href="https://madeinkashmir.org" target="_blank" rel="noopener noreferrer">Made in Kashmir</a> | <a href="https://haideralipunjabi.com" target="_blank" rel="noopener noreferrer">Haider Ali Punjabi</a> | <a href="https://hackesta.org" target="_blank" rel="noopener noreferrer">Hackesta</a>
      </div>
    </footer>
  );
}
