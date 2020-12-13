import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { IOptionType, ISuperCountryType } from '../interfaces/data.interface';
import { ICovidSummary } from '../interfaces/covid.interface'
import IndexSkeleton from '../components/IndexSkeleton';

interface IAppProps {
  data: ISuperCountryType[];
  options: IOptionType[];
  clientLocation: string;
  totalInfo: ICovidSummary;
}

interface IAppState {
  data: ISuperCountryType[];
  options: IOptionType[];
  initiated: boolean;
  selected: ISuperCountryType;
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: { ...props.data.find(c => c.iso2 === props.clientLocation.toUpperCase()) },
      options: props.options
    }
  }

  static async getInitialProps() {
    let location = await fetch(`http://ip-api.com/json`)
      .then(r => {
        if (r.ok)
          return r.json();
        else
          return { countryCode: 'IR' }; // Return default country on fail to detect ip
      }).catch(err => console.log(err))//.then(data=>console.log(data));

    const total = await fetch('https://api.covid19api.com/world/total').then(r => {
        return r.json();
    }).catch(err => console.log(err));

    const { data } = await getCountries();
    return {
      data: data,
      options: data.map((item, index) => {
        if (item)
          return {
            index: index,
            value: item.iso2,
            label: item.name,
            color: item.colors
          }
      }),
      clientLocation: location.countryCode,
      totalInfo: total
    };
  }

  updateSelectedCountry(country_code: string) {
    if (country_code === this.state.selected.iso2)
      return false
    let selectedCovidInfo = this.state.data.find(c => c.iso2 === country_code);
    if (selectedCovidInfo) {
      this.setState({ selected: selectedCovidInfo })
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
          : <IndexSkeleton />}
      </Layout>
    )
  }
}

export default Index;