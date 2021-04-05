import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { translate } from "../utils/utils";

export default function Footer() {
  const router = useRouter();
  return (
    <footer className="footer has-text-primary-light">
      <div className="content has-text-centered">
        {router.locale == "en" && (
          <p className="is-size-5">
            Made with{" "}
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="mx-2"
              icon={["fas", "heart"]}
            />{" "}
            by{" "}
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Haider Ali Punjabi
            </a>{" "}
            | © {new Date().getFullYear()}
          </p>
        )}
        {router.locale == "ur" && (
          <p className="is-size-6">
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              حیدر علی پنجابی
            </a> نے
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="mx-2"
              icon={["fas", "heart"]}
            />{" "}
            سے بنایاہے{" "}
            | © {translate(router.locale,new Date().getFullYear())}
          </p>
        )}
        {router.locale == "kmr" && (
          <p className="is-size-6">
            <a
              href="https://haideralipunjabi.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              حیدر علی پنجابین 
            </a>{" "}چھُ
            <FontAwesomeIcon
              style={{ color: "red" }}
              className="mx-2"
              icon={["fas", "heart"]}
            />{" "}
            سأتی بنۄمُت{" "}
            | © {translate(router.locale,new Date().getFullYear())}
          </p>
        )}
      </div>
    </footer>
  );
}
