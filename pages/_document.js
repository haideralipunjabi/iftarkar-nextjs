import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from 'next/script'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
            <Script
            src="https://www.googletagmanager.com/gtag/js?id=UA-83905982-7"
            strategy="afterInteractive"
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
    
                gtag('config', 'UA-83905982-7');
                `,
            }}
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
