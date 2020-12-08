import React from 'react'
import { NextPageContext } from 'next'
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

  // static contextType = MyContext; 
  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    console.log("Client Agent is" + userAgent)

    const { data } = await getCountries();
    return {
      data: data,
      options: data.map((c) => {
        //console.log(c.iso2)
        if (c)
          return {
            index: c.index,
            value: c.iso2,
            label: c.name,
            color: c.colors
          }
      })
    };
  }

  updateSelectedCountry(country_code: string) {
    let selectedCovidInfo = this.state.data.find(c => c.iso2 === country_code);

    if (!selectedCovidInfo) {
      // this.setState({
      //   selected: this.state.countries[0]
      // });
      console.log("!selectedCovidInfo")
      return;
    }
    console.log(selectedCovidInfo)
    //let listArray = [...this.state.countryList.slice()];
    //if (selectedCovidInfoFull) {
    //console.log("selectedCovidInfoFull Exist")
    // this.setState({
    //   countryList: [selectedCovidInfo, ...listArray],
    //   selected: selectedCovidInfo ? selectedCovidInfo : this.state.selected
    // })
    //}
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

    return (<Layout>
      {this.state.initiated ?
        <div>
          {/* <h1>Welcome to Regions</h1>
          <p>Check random info about countries</p> */}
          <InfoPanel
            options={this.state.options}
            selected={this.state.selected}
            updateSelectedCountry={(country: string) => {
              if (this.state.selected.iso2 !== country)
                this.updateSelectedCountry(country);
            }
            }
            data={this.props.data}
          />
          {/* <CovidDraggableTable countries={this.props.covid}></CovidDraggableTable> */}
        </div>
        : <div> Loading... </div>} </Layout>
    )
  }
}

export default Index;