import Head from "next/head";
import { useRouter } from "next/router";
import Timer from "../components/timer";
import Duas from "../components/duas";
import { useSettingsContext } from "../context/settings";
import Languages from "../data/languages.json";

export default function Home() {
  const { settings } = useSettingsContext();
  return (
    <>
      <Head>
        <title>{Languages[settings.language].iftarkar}</title>
      </Head>

      <div className="my-6">
        <Timer />
        <Duas />
      </div>
    </>
  );
}
