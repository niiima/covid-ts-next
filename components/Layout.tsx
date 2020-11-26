import Head from 'next/head';
import Navbar from './Navbar';

interface LayoutProps  {
  title?: string
}

const Layout: React.FunctionComponent<LayoutProps> = (props) => (
  <div>
    <Head>
      <title>Countries</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel="stylesheet" href="https://bootswatch.com/4/slate/bootstrap.min.css"/>
    </Head>
    <Navbar/>
    <div className="container">
      {props.children}
    </div>
  </div>
);

export default Layout;