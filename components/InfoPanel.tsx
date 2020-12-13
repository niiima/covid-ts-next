import React, { useState } from 'react';
import Flag from './Flag';
import { ISuperCountryType, IOptionType } from '../interfaces/data.interface';
import { ICovidSummary } from '../interfaces/covid.interface';
import Pollution from './Pollution';
import CovidCards from './CovidCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import {selectColorStyles as colorStyles} from './infoPanelColorStyle';
import CovidSummary from '../components/CovidSummary';
interface IInfoPanelProps {
  selected?: ISuperCountryType;
  updateSelectedCountry: (country_code: string) => void;
  options: IOptionType[];
  data: ISuperCountryType[];
  initiated: boolean;
  summaryInfo: ICovidSummary;
}

const animatedComponents = makeAnimated();

const InfoPanel: React.FunctionComponent<IInfoPanelProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState([props.selected?.iso2]) as any;

  // handle onChange event of the Select passed to it's child component
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : [props.selected?.iso2]);
    if (e)
      if (e.length !== 0)
        if (e[e.length - 1].hasOwnProperty("value"))
          props.updateSelectedCountry(e[e.length - 1].value);
  }

  const selectedValues = props.options.filter(obj => selectedValue.includes(obj.value));
  const selectedCountries = props.data.filter(obj => selectedValue.includes(obj.iso2));

  return (
    <div>
      <CovidSummary summaryInfo ={props.summaryInfo} ></CovidSummary>
      <ul className="list-group">
        <li className="list-group-item">
          <Flag countryCode={selectedValues} />
        </li>
      </ul>
      <br />
      <Select
        value={selectedValues}
        defaultValue={props.selected?.iso2}
        onChange={e => handleChange(e)}
        options={props.options}
        closeMenuOnSelect={false}
        components={animatedComponents}
        styles={colorStyles}
        isMulti
        menuContainerStyle={{ top: 'auto', bottom: '100%' }}
        menuPlacement="top"
      />
      <br />
      <CovidCards selected={props.selected} covidInfoList={selectedCountries}></CovidCards>
      <Pollution selected={props.selected?.name} ></Pollution>
    </div >
  );
}

export default InfoPanel;
