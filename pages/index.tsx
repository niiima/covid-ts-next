import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getCountries from '../utils/fetchInitialData';
import { IOptionType, ISuperCountryType } from '../interfaces/data.interface';
//import Loading from '../components/Loading'
import Skeleton from 'react-loading-skeleton'

interface IAppProps {
  data: ISuperCountryType[];
  options: IOptionType[];
}

interface IAppState {
  data: ISuperCountryType[];
  options: IOptionType[];
  initiated: boolean;
  selected: ISuperCountryType;
  //selectedCountries: ISuperCountryType[];
}

class Index extends React.Component<IAppProps, IAppState> {
  constructor(props) {
    super(props)
    this.state = {
      ...props,
      initiated: false,
      selected: { ...props.data.find(c => c.iso2 === "IR") },
      //selectedCountries: [],
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

  updateSelectedCountry(country_code: string = "IR") {
    console.log(country_code)
    if(country_code === this.state.selected.iso2)
      return false
    let selectedCovidInfo = this.state.data.find(c => c.iso2 === country_code);
    console.log(selectedCovidInfo)
    if (selectedCovidInfo) {
      this.setState({ selected: selectedCovidInfo })
       }
      if (!selectedCovidInfo) {
        return false;
      }
    }

    componentDidMount() {
      // if (this.props.data.length)
      setTimeout(() => this.setState({
        initiated: true,
      }), 2000);
    }

    render() {
      console.log("render")
      return (<Layout>
        {this.state.initiated ?
          <InfoPanel
            options={this.state.options}
            selected={this.state.selected}
            updateSelectedCountry={(country: string) =>
              this.updateSelectedCountry(country)
            }
            data={this.props.data}
            initiated={this.state.initiated}
          />
          : <>
            <Skeleton style={{ fontSize: 14, lineHeight: 1.52, backgroundColor: "#555", opacity: 0.7 }} />
            <hr />
            <Skeleton style={{ fontSize: 20, lineHeight: 2, backgroundColor: "#999", opacity: 0.7 }} />
            <hr />
            <Skeleton style={{ fontSize: 20, lineHeight: 9, backgroundColor: "transparent", border: "4px solid white", opacity: 0.7 }} />
          </>}
        {/* <Loading type="balls" color="teal" />} */}
      </Layout>
      )
    }
  }

  export default Index;