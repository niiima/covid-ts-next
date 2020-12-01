import Head from 'next/head';
import Navbar from './Navbar';
import { createContext } from 'react'
interface LayoutProps {
  title?: string;
}

const themes = {
  light: {
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    foreground: "#ffffff",
    background: "#222222"
  }
};

const ThemeContext = createContext(themes.light);

const Layout: React.FunctionComponent<LayoutProps> = (props) => (
  <ThemeContext.Provider value={themes.dark}>
    <div>
      <Head>
        <title>Countries</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="stylesheet" href="https://bootswatch.com/4/slate/bootstrap.min.css" />
      </Head>
      <Navbar />
      <div className="container">
        {props.children}
      </div>
    </div>
  </ThemeContext.Provider>

);

export default Layout;