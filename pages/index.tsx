import { useState } from 'react';
import { NextPage } from 'next';
import _ from 'lodash';
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getAppData from '../utils/fetchInitialData';
import { IAppProps } from '../interfaces/app.interface';
import IndexSkeleton from '../components/IndexSkeleton';
import useAsync from '../hooks/useAsync';
import { sampleData } from '../interfaces/data.interface';


//class Index extends React.Component<IAppProps, IAppState> {
const Index: NextPage<IAppProps> = ((props) => {
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     ...props,
  //     initiated: false,
  //     selected: { ...props.data.find(c => c.iso2 === props.clientLocation.toUpperCase()) },
  //   }
  // }

  // static async getInitialProps() {
  //   const { data, location, total, options } = await getAppData();
  //   return {
  //     data: data,
  //     options: options,
  //     clientLocation: location,
  //     totalInfo: total
  //   };
  // }

  const [selected, setSelected] = useState(props.data?.find((country => country.iso2 == props.clientLocation)));

  const updateSelectedCountry = (country_code: string) => {
    if (selected)
      if (country_code === selected.iso2)
        return false;

    let selectedCovidInfo = props.data?.find(c => c.iso2 === country_code);
    if (selectedCovidInfo) {
      setSelected(selectedCovidInfo)
      return true;
    }
    if (!selectedCovidInfo) {
      return false;
    }
  }

  // componentDidMount() {
  //   setTimeout(() => this.setState({
  //     initiated: true,
  //   }), 2000);
  // }

  //render() {

  const {
    //execute, 
    status,
    //value, 
    error
  } = useAsync<string>(customDelayOnLoad, false);

  return (
    <Layout>
      {/* {this.state.initiated ? */}
      {status === 'success' ?
        <InfoPanel
          options={props.options}
          selected={selected}
          updateSelectedCountry={(country: string) =>
            updateSelectedCountry(country)
          }
          data={props.data}
          initiated={true}
          summaryInfo={props.totalInfo}
        />
        : status === 'pending' ? <IndexSkeleton /> : status === 'error' ? <div>Error: {error}</div> : <div>Error</div>
      }
    </Layout>
  )
});


Index.getInitialProps = async (): Promise<IAppProps> => {
  const { data, options, location, total } = await getAppData();
  //console.log(data, location, total, options )
  return {
    data: data ? data : sampleData,
    options: options,
    clientLocation: location,
    totalInfo: total
  };
}
const customDelayOnLoad = (): Promise<string> => new Promise((resolve, reject) => {
  setTimeout(() => {
    return true ? resolve('ok') : reject('no');
  }, 2000);
});


export default Index;
