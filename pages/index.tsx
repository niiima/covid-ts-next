import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getAppData from '../utils/fetchInitialData';
import { IAppState, IAppProps } from '../interfaces/app.interface';
import IndexSkeleton from '../components/IndexSkeleton';
//import useAsync from '../hooks/useAsync';

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: { ...props.data.find(c => c.iso2 === props.clientLocation.toUpperCase()) },
    }
  }

  static async getInitialProps() {
    const { data, location, total, options } = await getAppData();
    return {
      data: data,
      options: options,
      clientLocation: location,
      totalInfo: total
    };
  }

  updateSelectedCountry(country_code: string) {
    if (country_code === this.state.selected.iso2)
      return false;

    let selectedCovidInfo = this.state.data.find(c => c.iso2 === country_code);
    if (selectedCovidInfo) {
      this.setState({ selected: selectedCovidInfo })
      return true;
    }
    if (!selectedCovidInfo) {
      return false;
    }
  }

  componentDidMount() {
    setTimeout(() => this.setState({
      initiated: true,
    }), 2000);
  }

  render() {
    //   const {
    //     //execute, 
    //     status,
    //     //value, 
    //     error
    //   } = useAsync<string>(customDelayOnLoad, false);

    return (
      <Layout>
        {this.state.initiated ?
          <InfoPanel
            options={this.state.options}
            selected={this.state.selected}
            updateSelectedCountry={(country: string) =>
              this.updateSelectedCountry(country)
            }
            data={this.props.data}
            initiated={this.state.initiated}
            summaryInfo={this.props.totalInfo}
          />
          : <IndexSkeleton />
        }
      </Layout>
    )
  }
}

export default Index;

const customDelayOnLoad = (): Promise<string> => new Promise((resolve, reject) => {
  setTimeout(() => {
    return true ? resolve('ok') : reject('no');
  }, 2000);
});
