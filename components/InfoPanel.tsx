// import React, { useState } from 'react';
import Flag from './Flag';
import { ICountryType } from '../interfaces/country.interface';
import { ICovidType, ICovidTypeWithColors } from '../interfaces/covid.interface';
import Pollution from './Pollution';
import CovidCards from './CovidCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
interface IInfoPanelProps {
  selected: ICountryType;
  covid: ICovidType[];
  countries: ICountryType[];//CountriesType[],
  updateSelectedCountry: (country_code: string) => void;
  countryList: ICovidTypeWithColors[];
  options: any
}

const animatedComponents = makeAnimated();

const InfoPanel: React.FunctionComponent<IInfoPanelProps> = (props) => {
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <Flag country_code={props.selected.iso2} />
        </li>
      </ul>
      <br />
      <Select
        // defaultValue={props.countryList.map(c=>{
        //   return {
        //     value:c.countryInfo.iso2,
        //     label:c.country
        //   }
        // })}
        defaultValue={props.selected.iso2}
        onChange={e => props.updateSelectedCountry(e.value)}
        options={props.options}

        closeMenuOnSelect={false}
        components={animatedComponents}
        // defaultValue={[colourOptions[4], colourOptions[5]]}
        // isMulti
      />
      <br />
      <CovidCards selected={props.selected} covidInfoList={props.countryList}></CovidCards>
      <Pollution selected={props.selected.name} ></Pollution>
    </div>
  );
}

export default InfoPanel;
