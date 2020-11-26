import React from 'react'
import { NextPageContext } from 'next'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { ICountryType } from '../interfaces/country.interface'
import { ObjectType } from '../interfaces/common.interface';
import { ICovidType } from '../interfaces/covid.interface';

interface IAppProps {
  covid: ICovidType[];
  countries: ICountryType[],
}

interface IAppState {
  countries: ObjectType[];
  covid: ICovidType[];
  initiated: boolean;
  selected: ICountryType;
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: props.countries.find(c => c.iso2 === "IR")
    }
  }

  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    console.log(userAgent)
    const countries = await getCountries();
    return {
      covid: countries.data,
      countries: countries.countries,
    };
  }

  updateSelectedCountry(countryObject) {
    this.setState({ selected: countryObject });
  }

  componentDidMount() {
    console.log("componentDidMount")
    this.setState({
      initiated: true
    });
  }

  render() {
    return (<Layout>{this.state.initiated ?
      <div>
        <h1>Welcome to Regions</h1>
        <p>Check random info about countries</p>
        <InfoPanel
          selected={this.state.selected}
          updateSelectedCountry={(co) => this.updateSelectedCountry(co)}
          countries={this.props.countries}
          covid={this.props.covid}
        />
      </div>
      : <div> Loading... </div>} </Layout>
    )
  }
}

export default Index;