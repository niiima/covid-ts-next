import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { IOptionType, ISuperCountryType } from '../interfaces/data.interface';
import Loading from '../components/Loading'
//import CovidDraggableTable from '../components/CovidDraggableTable'

interface IAppProps {
  options: IOptionType[];
  data: ISuperCountryType[];
}

interface IAppState {
  data: ISuperCountryType[];
  initiated: boolean;
  selected: ISuperCountryType;
  selectedCountries: ISuperCountryType[];
  options: IOptionType[];
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: props.data.find(c => c.iso2 === "IR"),
      selectedCountries: [],
      options: props.options
    }
  }

  static async getInitialProps() {
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
    (() => setTimeout(() => this.setState({
      initiated: true
    }), 2000))();
  }

  render() {
    console.log(this.state)
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
        : <Loading type="balls" color="teal" />} </Layout>
    )
  }
}

export default Index;