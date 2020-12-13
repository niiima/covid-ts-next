import Head from 'next/head';
import Navbar from './Navbar';
import { createContext, Fragment } from 'react';
import GlobalStyle from '../utils/style'
interface LayoutProps {
  title?: string;
}

const themes = {
  light: {
    foreground: "#222222",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = createContext(themes.light);

const Layout: React.FunctionComponent<LayoutProps> = (props) => {
  console.log(props.children ? props.children["props"] : null)
  return (<ThemeContext.Provider value={themes.dark}>
    <Head>
      <title>Countries</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://bootswatch.com/4/slate/bootstrap.min.css" />
    </Head>
    <Fragment>
      <GlobalStyle />
      <Navbar />
      <div className="container">
        {props.children}
      </div>
    </Fragment>
  </ThemeContext.Provider>
  );
}
export default Layout;