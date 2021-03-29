import { useSettingsContext } from "../context/settings";
import Head from "next/head";
import Languages from "../data/languages.json";
import { translate } from "../utils/utils";
export default function Home() {
  const { settings } = useSettingsContext();
  return (
    <>
    <Head>
      <title>{translate(settings.language,404) } | {Languages[settings.language].iftarkar}</title>
    </Head>

      <div>
        <h1 className="is-size-1 has-text-centered">{Languages[settings.language]["404"]}</h1>
      </div>
    </>
  );
}
