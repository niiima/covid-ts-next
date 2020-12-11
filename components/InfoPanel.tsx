import React, { useState } from 'react';
import Flag from './Flag';
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
  selected: ISuperCountryType;
  updateSelectedCountry: (country_code: string) => void;
  options: IOptionType[]
  data: ISuperCountryType[];
  initiated:boolean
}

const animatedComponents = makeAnimated();

const InfoPanel: React.FunctionComponent<IInfoPanelProps> = (props) => {
  const [selectedValue, setSelectedValue] = useState([props.selected.iso2]) as any;

  // handle onChange event of the Select passed to it's child component
  const handleChange = (e) => {
    setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : [props.selected.iso2]);
      console.log(e)
      //console.log(e[e.length - 1])
    //props.updateSelectedCountry([...e][e.length-1].iso2)//
    if(e.length)
    props.updateSelectedCountry(e[e.length - 1].value)
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
            ? data.color[1].color
              // ? 'green'
              // : 'black'
            : data.color[0].color ,
        cursor: isDisabled ? 'not-allowed' : 'default',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled || (isSelected ? data.color[1] ? data.color[1].color : data.color[0].color : "white")//alpha(data.color[1].color,1.2))//.alpha(0.3).css()),
          },
      };

    },
    multiValue: (styles, { data }) => ({
     
        ...styles,
        backgroundColor:  data.color[1] ? data.color[1].color :alpha(data.color[0].color, 1.8)
    
    }),
    multiValueLabel: (styles, { data }) => {
      return {
        ...styles,
        color: getColor(data.color,0,1,false)
      }
    },
    multiValueRemove: (styles, { data }) => {
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

  };

  const selectedValues = [...props.options.filter(obj => selectedValue.includes(obj.value))].slice(0).reverse();
  const selectedCountries = props.data.filter(obj => selectedValue.includes(obj.iso2));
  // if(!props.initiated)
  //   handleChange([props.selected])
  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item">
          <Flag countryCode={selectedValues} />
        </li>
      </ul>
      <br />
      <Select
        value={selectedValues}
        defaultValue={props.selected.iso2}
        onChange={e => handleChange(e)}
        options={props.options}
        closeMenuOnSelect={false}
        components={animatedComponents}
        styles={colourStyles}
        isMulti
        menuContainerStyle={{top: 'auto', bottom: '100%'}}
        menuPlacement = "top"
      />
      <br />
      <CovidCards selected={props.selected} covidInfoList={selectedCountries}></CovidCards>
      <Pollution selected={props.selected.name} ></Pollution>
    </div >
  );
}

export default InfoPanel;
