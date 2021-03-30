import { useRouter } from "next/router";
import Head from "next/head";
import Languages from "../data/languages.json";
import { translate } from "../utils/utils";
export default function Home() {
  const router = useRouter();
  const Language = Languages[router.locale];
  return (
    <>
    <Head>
      <title>{translate(router.language,404) } | {Language.iftarkar}</title>
    </Head>

      <div>
        <h1 className="is-size-1 has-text-centered">{Language["404"]}</h1>
      </div>
    </>
  );
}
