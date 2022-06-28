import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { Fragment } from "react";
import MessengerCustomerChat from 'react-messenger-customer-chat';
import { ThemeProvider } from "styled-components";
import { AppProvider } from "../contexts/app/AppContext";
import { GlobalStyles } from "../utils/globalStyles";
import MessengerChat from '../utils/MessengerChat';
import { theme } from "../utils/theme";

//Binding events.
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

NProgress.configure({ showSpinner: false });
const App = ({ Component, pageProps }: any) => {
  let Layout = Component.layout || Fragment;

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        
        {/* thumbnail And title for social media */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="CiTi Shop | Mỹ phẩm chính hãng" />
        
        

        {/* Google analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-SGG7GE7HZC"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-SGG7GE7HZC');
          `,
          }}
        ></script>
      </Head>
      
      <GlobalStyles />
      <AppProvider>
        <Layout>
          {/* <Component {...pageProps} /> */}
          <Component {...pageProps}>
          <MessengerCustomerChat
    pageId="893789904104597"
    appId="1072311093493076"
  />
          </Component>
          <MessengerChat
          pageId="893789904104597"
        />
        </Layout>
      </AppProvider>
    </ThemeProvider>
  );
};

export default App;