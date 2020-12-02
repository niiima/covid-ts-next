import React from 'react'
import { NextPageContext } from 'next'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { ICountryType } from '../interfaces/country.interface'
//import { ObjectType } from '../interfaces/common.interface';
import { ICovidType } from '../interfaces/covid.interface';
import CovidDraggableTable from '../components/CovidDraggableTable'

//import App from 'next/app'
interface IAppProps {
  covid: ICovidType[];
  countries: ICountryType[];
}

interface IAppState {
  countries: ICountryType[];
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

  // static contextType = MyContext; 
  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    console.log(userAgent)
    //     return req
    //     ? { userAgent: req.headers['user-agent'] }
    //     : { userAgent: navigator.userAgent }
    // }
    const countries = await getCountries();
    return {
      covid: countries.data,
      countries: countries.countries,
    };
  }

  updateSelectedCountry(countryObject: ICountryType) {
    this.setState({ selected: countryObject });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log(prevProps)
    console.log(prevState)
  }

  componentDidMount() {
    //render() will not be invoked if shouldComponentUpdate() returns false.
    console.log("componentDidMount");
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
          updateSelectedCountry={(country: ICountryType) => this.updateSelectedCountry(country)}
          countries={this.props.countries}
          covid={this.props.covid}
        />
        <CovidDraggableTable countries={this.props.covid}></CovidDraggableTable>
      </div>
      : <div> Loading... </div>} </Layout>
    )
  }
}

export default Index;