import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ReactElement, ReactNode } from "react";
import Head from "next/head";
import { QueryContextProvider } from "../contexts/queryContext/queryContext";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
export const appVersion = "v0.0.1";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const title = `StackQL Playground - ${appVersion}`;

  return getLayout(
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <QueryContextProvider>
        <Component {...pageProps} />
      </QueryContextProvider>
    </>
  );
}

export default MyApp;
