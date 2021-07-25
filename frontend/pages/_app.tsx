import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../lib/firebase";
import { RecoilRoot } from "recoil";
import { useAuthentication } from "../hooks/useAuthentication";
import { useEffect } from "react";
import Layout from "../components/Layout";
function AppInit() {
  const { listenStateChanged } = useAuthentication();
  useEffect(() => {
    listenStateChanged();
  }, []);

  return null;
}
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppInit />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}
export default MyApp;
