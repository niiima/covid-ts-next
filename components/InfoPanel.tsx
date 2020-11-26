import React from 'react';
import Flag from './Flag';
import { ICountryType } from '../interfaces/country.interface';
import { ICovidType } from '../interfaces/covid.interface';
import Pollution from './Pollution';
import CovidCard from './CovidCard';
interface IInfoPanelProps {
  selected: ICountryType
  covid: ICovidType[]
  countries: ICountryType[],//CountriesType[],
  updateSelectedCountry: (countryObject: ICountryType | undefined) => void
}

const InfoPanel: React.FunctionComponent<IInfoPanelProps> = (props) => {

  const handleCountryChange = (e) => {
    const selected = e.target.children[e.target.selectedIndex];
    const selectedObj = [...props.countries].find(({ iso2 }) => iso2 === selected.value);
    props.updateSelectedCountry(selectedObj);
  }

  const getCovidList: () => ICovidType[] = () => {
    let list: ICovidType[] = [];
    props.covid.forEach(countryInfo => {
      if (props.selected.iso2 === countryInfo.countryInfo.iso2)
        list.push(countryInfo);
    });
    return list;
  }

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <Flag country_code={props.selected.iso2} />
        </li>
      </ul>
      <br />

      <select defaultValue={props.selected.iso2} className="form-control"
        onChange={(e) => handleCountryChange(e)}
      >
        {
          props.countries.map((c) => {
            return (
              <option key={c.id}
                value={c.iso2}>{c.name} | ISO:{c.iso2}</option>)
          })
        }
      </select>

      <br />
      <CovidCard selected={props.selected} covidInfoList={getCovidList()}></CovidCard>
      <Pollution selected={props.selected.name} ></Pollution>
    </div>
  );
}
export default InfoPanel;
