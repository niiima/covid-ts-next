import React from 'react'
import _ from 'lodash'
import Layout from '../components/Layout';
import InfoPanel from '../components/InfoPanel';
import getAppData from '../utils/fetchInitialData';
import { IAppState, IAppProps } from '../interfaces/app.interface';
//import IndexSkeleton from '../components/IndexSkeleton';
import Skeleton from 'react-loading-skeleton'

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
          :  <>
          <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 20, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />
          <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 40, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />
          <Skeleton width={180} height={90} style={{ fontSize: 16, marginLeft: 40, lineHeight: 2, backgroundColor: "#555", opacity: 0.7 }} />
  
          <hr />
          <Skeleton width={"99%"} style={{ marginLeft: "0.5%", fontSize: 18, lineHeight: 3, backgroundColor: "#555", opacity: 0.7 }} />
          <hr />
          <Skeleton style={{ fontSize: 20, lineHeight: 2, backgroundColor: "#999", opacity: 0.7 }} />
          <hr />
          <Skeleton style={{ fontSize: 20, lineHeight: 9, backgroundColor: "transparent", border: "4px solid white", opacity: 0.7 }} />
      </>}
      </Layout>
    )
  }
}

export default Index;