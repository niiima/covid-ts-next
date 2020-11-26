import type { AppProps /*, AppContext */ } from 'next/app'
//import getCountries from '../utils/fetchInitialData'
//import NextPageContext from 'next'
function MyApp({ Component, pageProps }: AppProps) { //The Component prop is the active page
    return <Component {...pageProps} /> //any props you send to Component will be received by the page.
}
// async function get({ req }: NextPageContext) {
//     const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
//     console.log(userAgent)
//     const countries = await getCountries();
//     return {
//         covid: countries.data,
//         countries: countries.countries,
//     };
// }
// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext: AppContext) => {
//     // calls page's `getInitialProps` and fills `appProps.pageProps`
//     const appProps = await App.getInitialProps(appContext);

//     return { ...appProps }
// }

export default MyApp