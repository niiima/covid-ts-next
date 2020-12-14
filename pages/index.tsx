import { useState } from 'react';
import { NextPage } from 'next';
import _ from 'lodash';
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getAppData from '../utils/fetchInitialData';
import { IAppProps } from '../interfaces/app.interface';
import IndexSkeleton from '../components/IndexSkeleton';
import useAsync from '../hooks/useAsync';
import { sampleData, sampleOptions } from '../interfaces/data.interface';

const Index: NextPage<IAppProps> = ((props) => {
  const [selected, setSelected] = useState(props.data?.find((country => country.iso2 == props.clientLocation)));

  const updateSelectedCountry = (country_code: string) => {
    if (selected)
      if (country_code === selected.iso2)
        return false;

    let selectedCovidInfo = props.data?.find(country => country.iso2 === country_code);
    if (selectedCovidInfo) {
      setSelected(selectedCovidInfo)
      return true;
    }
    if (!selectedCovidInfo) {
      return false;
    }
  }

  const {
    status, //,value, //,execute
    error
  } = useAsync<string>(customDelayOnLoad, true);

  return (
    <Layout>
      {status === 'success' || status === 'idle' ?
        <InfoPanel
          options={props.options ? props.options : sampleOptions}
          selected={selected}
          updateSelectedCountry={(country: string) =>
            updateSelectedCountry(country)
          }
          data={props.data ? props.data : sampleData}
          initiated={true}
          summaryInfo={props.totalInfo}
        />
        : status === 'pending' ? <IndexSkeleton /> : status === 'error' ? <div>Error: {error}</div> : <div>Offline</div>
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
