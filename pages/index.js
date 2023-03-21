import Head from "next/head";
import { useRouter } from "next/router";
import Timer from "../components/timer";
import Duas from "../components/duas";
import Languages from "../data/languages.json";
import { useSettingsContext } from "../context/settings";
// import Wait from "../components/wait";

export default function Home() {
  const router = useRouter();
  const Language = Languages[router.locale];
  const { settings } = useSettingsContext();
  return (
    <>
      <Head>
        <title>{Language.iftarkar}</title>
      </Head>
      {settings && (
        <div className="my-6">
          {/* <Wait/> */}
          <Timer />
          <Duas />
        </div>
      )}
    </>
  );
}
