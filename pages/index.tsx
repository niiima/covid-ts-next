import React from 'react'
import { NextPageContext } from 'next'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { ICountryType } from '../interfaces/country.interface'
import { ICovidType, ICovidTypeWithColors } from '../interfaces/covid.interface';
//import CovidDraggableTable from '../components/CovidDraggableTable'

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
  countryList: string[]//ICovidTypeWithColors[];
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: props.countries.find(c => c.iso2 === "IR"),
      countryList: []
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

  updateSelectedCountry(country_code: string) {
    let selectedCovidInfo = this.state.covid.find(c => c.countryInfo.iso2 === country_code);
    console.log(country_code)
    if (!selectedCovidInfo) {
      // this.setState({
      //   selected: this.state.countries[0]
      // });
      console.log("!selectedCovidInfo")
      return;
    }

    // let isOnDom = false;
    // this.state.countryList.forEach(country => {
    //   if (country === country_code)
    //     isOnDom = true;
    // });
    // //console.log(isOnDom);
    // if (isOnDom) {
    //   console.log("OnDom")

    //   // this.setState({
    //   //   selected: countryObject
    //   // });
    //   return;
    // }

    let countryObject = [...this.state.countries].find(({ iso2 }) => iso2 === country_code);
    console.log(selectedCovidInfo)
    let selectedCovidInfoFull: ICovidTypeWithColors = {
      ...selectedCovidInfo,
      colors: countryObject ? countryObject.colors : [{ color: "#fff", percentage: 100 }]
    }

    //let listArray = [...this.state.countryList.slice()];

    if (selectedCovidInfoFull) {
      console.log("selectedCovidInfoFull Exist")

      this.setState({

        //countryList: [selectedCovidInfoFull, ...listArray],
        selected: countryObject ? countryObject : this.state.selected

      })
    }
  }

  // updateSelectedCountryList(countryObject: ICountryType) {
  //   this.setState((cs => { return { countryList: [...cs.countryList, countryObject] } }));
  // }

  // getSnapshotBeforeUpdate(prevProps, prevState) {
  //   console.log(prevProps)
  //   console.log(prevState)
  // }

  componentDidMount() {
    //render() will not be invoked if shouldComponentUpdate() returns false.
    console.log("componentDidMount");
    this.setState({
      initiated: true
    });
  }

  render() {
    const options = this.state.countries.map(c => {
      //console.log(c.iso2)
      return {
        value: c.iso2,
        label: c.name,
        color:c.colors
      }
    });
    return (<Layout>
      {this.state.initiated ?
        <div>
          <h1>Welcome to Regions</h1>
          <p>Check random info about countries</p>
          <InfoPanel
            options={options}
            selected={this.state.selected}
            updateSelectedCountry={(country: string) => {
              this.updateSelectedCountry(country);
              //this.state.countryList.push(country)
            }
            }
            countries={this.props.countries}
            covid={this.props.covid}
            countryList={this.state.countryList}
          />
          {/* <CovidDraggableTable countries={this.props.covid}></CovidDraggableTable> */}
        </div>
        : <div> Loading... </div>} </Layout>
    )
  }
}

export default Index;