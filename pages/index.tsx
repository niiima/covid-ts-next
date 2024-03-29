import { useState } from 'react';
import { NextPage } from 'next';
import _ from 'lodash';
import InfoPanel from '../components/InfoPanel';
import getAppData from '../utils/getInitialData';
import IndexSkeleton from '../components/IndexSkeleton';
import useAsync from '../hooks/useAsync';
import { sampleData, sampleOptions } from '../interfaces/data.interface';
import { IOptionType, ISuperCountryType } from '../interfaces/data.interface';
import { ICovidSummary } from '../interfaces/covid.interface'

export interface IAppProps {
  data: ISuperCountryType[] | any;
  options: IOptionType[] | any;
  clientLocation: string;
  totalInfo: ICovidSummary;
}

const Index: NextPage<IAppProps> = (({ data, options, clientLocation, totalInfo }) => {
  const [selected, setSelected] = useState(data?.find((country => country.iso2 == clientLocation)));

  const handleSelectChange = (country_code: string) => {
    if (selected)
      if (country_code === selected.iso2)
        return false;

    let selectedCovidInfo = data?.find(country => country.iso2 === country_code);
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
    <>
      {status === 'pending' ? <IndexSkeleton />
        : status === 'success' || status === 'idle' ?
          <InfoPanel
            options={options ? options : sampleOptions}
            selected={selected}
            handleSelectChange={(country: string) =>
              handleSelectChange(country)
            }
            data={data ? data : sampleData}
            initiated={true}
            summaryInfo={totalInfo}
          />
          : status === 'error' ?
            <div>Error: {error}</div>
            : <div>Offline</div>
      }
    </>
  )
});

Index.getInitialProps = async (): Promise<IAppProps> => {
  const { data, options, location, total } = await getAppData();
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
  }, 1000);
});

export default Index;
