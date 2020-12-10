import React, { useState } from 'react';
import Flag from './Flag';
import { ICountryType } from '../interfaces/country.interface';
// import { ICovidType } from '../interfaces/covid.interface';
import { ISuperCountryType,IOptionType } from '../interfaces/data.interface';
import {getColor} from '../utils/getFlagColors';
import Pollution from './Pollution';
import CovidCards from './CovidCard';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//import chroma from 'chroma-js';
import alpha from 'color-alpha'
//import styled from 'styled-components'
interface IInfoPanelProps {
  selected: ICountryType;
  //covid: ICovidType[];
  //countries: ICountryType[];//CountriesType[],

  updateSelectedCountry: (country_code: string) => void;
  // countryList: ISuperCountryType[];
  options: IOptionType[]
  data: ISuperCountryType[];
}

const animatedComponents = makeAnimated();

const InfoPanel: React.FunctionComponent<IInfoPanelProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState([]) as any;
  //props.updateSelectedCountry(selectedValue[selectedValue.length - 1])
  // handle onChange event of the dropdown

  const handleChange = (e) => {
    console.log(e)
    console.log(selectedValue)
    props.updateSelectedCountry(selectedValue[selectedValue.length - 1])
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);
    //console.log(selectedValue[selectedValue.length ?  - 1])
  }

  const dot = (color = '#bbbbbb') => ({
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
    control: styles => ({ ...styles, backgroundColor: '#999' }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      //console.log(getColor(data.color,1))
      return {
        ...styles,
        backgroundColor: isDisabled
          ? null
          : isSelected
            ? getColor(data.color,1,1,false)
            : isFocused
              ? alpha(data.color[1] ? data.color[1].color : data.color[0].color,0.3)
              : data.color[1] ? data.color[1].color : "white" ,
        color: isDisabled
          ? 'lightgray'
          : isSelected
            ? data.color[1].color//chroma.contrast(data.color[0].color, 'white') > 2
              // ? 'green'
              // : 'black'
            : data.color[0].color ,//data.color[1] ? data.color[1].color : "gray" ,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled || (isSelected ? data.color[1] ? data.color[1].color : data.color[0].color : "white")//alpha(data.color[1].color,1.2))//.alpha(0.3).css()),
          },
      };

    },
    multiValue: (styles, { data }) => ({
     
        ...styles,
        backgroundColor:  data.color[1] ? data.color[1].color :alpha(data.color[0].color, 1.8)//.alpha(0.1).css(),
    
    }),
    multiValueLabel: (styles, { data }) => {
      //console.log(chroma.contrast(data.color[0].color, data.color[1] ? data.color[1].color : 'white'))
      return {
        ...styles,
        color: getColor(data.color,0,1,false)//data.color
      }
    },
    multiValueRemove: (styles, { data }) => {
      //console.log(getColor(data.color,0,1,false))
      return {
        ...styles,
        color: data.color[0].color,
        ':hover': {
          backgroundColor: alpha(data.color[1] ? data.color[1].color : data.color[0].color, 0.9),
          color: 'white',
        },
      }
    },

    input: styles => ({ ...styles, ...dot() }),
    placeholder: styles => ({ ...styles, ...dot() }),
    // singleValue: (styles) => {
    //   return { ...styles, 
    //   ...dot("#12ae89") }
    // },
  };


  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <Flag countryCode={props.selected.iso2} />
        </li>
      </ul>
      <br />
      <Select
        value={props.options.filter(obj => selectedValue.includes(obj.value)).slice().reverse()}
        //value={props.selected.iso2}
        defaultValue={props.selected.iso2}
        onChange={e => handleChange(e)}
        options={props.options}

        closeMenuOnSelect={false}
        components={animatedComponents}
        styles={colourStyles}
        // defaultValue={[colourOptions[4], colourOptions[5]]}
        isMulti
        menuContainerStyle={{top: 'auto', bottom: '100%'}}
        menuPlacement = "top"
      />
      <br />
      <CovidCards selected={props.selected} covidInfoList={props.data.filter(obj => selectedValue.includes(obj.iso2))}></CovidCards>
      <Pollution selected={props.selected.name} ></Pollution>
    </div >
  );
}

// styled(Select)`
// .drop-up .Select-menu-outer {
//   top: auto;
//   bottom: 100%;
// }
// `

export default InfoPanel;
