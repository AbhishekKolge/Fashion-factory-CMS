import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="icon" type="image/png" href="/favicon.ico" />
      </Head>
      <body className="min-vh-100">
        <Main />
        <div id="root-modal" />
        <NextScript />
      </body>
    </Html>
  );
}
