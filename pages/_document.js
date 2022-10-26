import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
// import { CssBaseline } from "@nextui-org/react";

class MyDocument extends Document {
  // static async getInitialProps(ctx) {
  //   const initialProps = await Document.getInitialProps(ctx);
  //   return {
  //     ...initialProps,
  //     styles: React.Children.toArray([initialProps.styles]),
  //   };
  // }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/logo.svg" />
        </Head>
        <body className="page-wrapper dark:bg-black bg-slate-50 dark:text-gray-light">
          <Main />
          <NextScript className="container m-auto" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
