import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { IOptionType, ISuperCountryType } from '../interfaces/data.interface';
//import CovidDraggableTable from '../components/CovidDraggableTable'
//import App from 'next/app'
interface IAppProps {
  options: IOptionType[];
  data: ISuperCountryType[];
}

interface IAppState {
  data: ISuperCountryType[];
  initiated: boolean;
  selected: ISuperCountryType;
  countryList: ISuperCountryType[];
  options: IOptionType[];
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: props.data.find(c => c.iso2 === "IR"),
      countryList: [],
      options: props.options
    }
  }

  static async getInitialProps() {
        const { data } = await getCountries();
    return {
      data: data,
      options: data.map((item) => {
        if (item)
          return {
            index: item.index,
            value: item.iso2,
            label: item.name,
            color: item.colors
          }
      })
    };
  }

  updateSelectedCountry(country_code: string) {
    let selectedCovidInfo = this.state.data.find(c => c.iso2 === country_code);
    if (!selectedCovidInfo)
      return false;

    if (this.state.selected.iso2 === selectedCovidInfo.iso2)
      return false;
  }

  componentDidMount() {
    this.setState({
      initiated: true
    });
  }

  render() {
    return (<Layout>
      {this.state.initiated ?
          <InfoPanel
            options={this.state.options}
            selected={this.state.selected}
            updateSelectedCountry={(country: string) =>
              this.updateSelectedCountry(country)
            }
            data={this.props.data}
          />
        : <div> Loading... </div>} </Layout>
    )
  }
}

export default Index;