import type { AppProps } from 'next/app'
import Head from "next/head";
import { DefaultSeo } from 'next-seo';
import { Global } from "@emotion/react";
import config from "../config";
import globalStyles from "../styles/globals";
import Layout from "../components/Layouts";

export default function App({ Component, pageProps }: AppProps) {
  return(
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="shortcut icon" type="image/ico" href="/favicon.ico" />
      </Head>

      <DefaultSeo
        defaultTitle={config.meta.title[0]}
        description={config.meta.description[0]}
        openGraph={{
          title: config.meta.title[1] ?? config.meta.title[0],
          description: config.meta.description[1] ?? config.meta.description[0],
          images: [
            {
              url: config.meta.ogImg,
            }
          ],
          site_name: config.meta.siteName,
          url: config.meta.ogUrl,
          type: config.meta.ogType,
        }}
        twitter={{
          cardType: 'summary_large_image',
        }}
      />
      
      <Global styles={globalStyles} />

      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  ) 
}
