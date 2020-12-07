import React, { useState } from 'react';
import Flag from './Flag';
import { ICountryType } from '../interfaces/country.interface';
import { ICovidType, ICovidTypeWithColors } from '../interfaces/covid.interface';
import Pollution from './Pollution';
import CovidCards from './CovidCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import chroma from 'chroma-js';
import alpha from 'color-alpha'
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
  const [selectedValue, setSelectedValue] = useState(["IR"]) as any;
  props.updateSelectedCountry(selectedValue[selectedValue.length - 1])
  // handle onChange event of the dropdown
  const handleChange = (e) => {
    console.log(selectedValue)
    props.updateSelectedCountry(selectedValue[selectedValue.length - 1])
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    //console.log(selectedValue[selectedValue.length ?  - 1])
  }

  const dot = (color = '#ccc') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: 'block',
      marginRight: 8,
      height: 10,
      width: 10,
    },
  });

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {

      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? data.color[0].color
            : isFocused
              ? data.color[1] ? alpha(data.color[1], 0.7) : alpha(data.color[0], 0.7)//.alpha(0.1).css()
              : null,
        color: isDisabled
          ? 'yellow'
          : isSelected
            ? chroma.contrast(data.color[0].color, 'white') > 2
              ? 'green'
              : 'black'
            : data.color[1] ? data.color[1].color : "gray" ,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled || isSelected ? data.color[1] ? alpha(data.color[1].color, 0.7) : alpha(data.color[0].color, 0.7) : "red"//.alpha(0.3).css()),
          },
      };

    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: data.color[1] ? alpha(data.color[1].color, 0.5) : alpha(data.color[0].color, 0.5) //.alpha(0.1).css(),
      };

    },
    multiValueLabel: (styles, { data }) => {
      console.log(chroma.contrast(data.color[0].color, 'white'))

      return {
        ...styles,
        color: chroma.contrast(data.color[0].color, 'white') > 2 ? data.color[1] ? data.color[1] : "blaCK" : 'purple'//data.color
      }
    }

    ,
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        color: data.color[0],
        ':hover': {
          backgroundColor: alpha(data.color[1] ? data.color[1].color : data.color[0].color, 0.9),
          color: 'white',
        },
      }

    },

    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => {

      return { ...styles, ...dot(data.color[0].color) }

    },
  };


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
        value={props.options.filter(obj => selectedValue.includes(obj.value))}
        defaultValue={props.selected.iso2}
        onChange={e => handleChange(e)}
        options={props.options}

        closeMenuOnSelect={false}
        components={animatedComponents}
        styles={colourStyles}
        // defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
      />
      <br />
      <CovidCards selected={props.selected} covidInfoList={props.countryList}></CovidCards>
      <Pollution selected={props.selected.name} ></Pollution>
    </div >
  );
}

export default InfoPanel;
