import fetch from 'isomorphic-unfetch';
//import { v4 as uuidv4 } from 'uuid';
import { compareValues } from './sortCountries'
import { ICountryType, IFlagColorType,IColorProp } from '../interfaces/country.interface';

const countries :ICountryType[] = require('../public/country-list.json');
const flagData:IColorProp[][] = require('../public/flag_data.json');
const emptyColorList: IFlagColorType[] = [{ color: "#fff", percentage: 50 }, { color: "#999", percentage: 50 }];

const getCountries = async () => {
    const covidDataPromise = fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        return response.json()
    }).then(data => data).catch(err => console.log(err));

    const colors: IColorProp[][] = [];
    Array.from(Object.values(flagData)).forEach(color => {
        //console.log(typeof color)
        if (color)
            colors.push(color.sort((a:any,b:any) => b.percentage - a.percentage));
    });

    const list = Object.keys(flagData).map((c, i) => {
        const row = countries.find(country => {
            if (country.iso2 === c.toUpperCase())
                return {
                    ...country,
                }
        });

        return row ? {
            ...row,
            //id: uuidv4(),
            colors: colors[i]
        } :
            {
                ...countries[i],
                //id: uuidv4(),
                colors: emptyColorList.slice()
            }
    }
    );

    const DATUM = (async () => {
        const covidData = await covidDataPromise;
        return list.map((country) => {
            if (country) {
                let covidInfo = covidData.find(info => {
                    if (info.countryInfo.iso2 === country.iso2)
                        return info
                });
                return {
                    ...country,
                    covid: covidInfo ? covidInfo : null
                }
            }
        })
    })();

    const data = await DATUM;
    // var valueArr = data.map(function(item){ return item?.iso2 });
    // var isDuplicate = valueArr.some(function(item, idx){ 
    //     return valueArr.indexOf(item) != idx 
    // });
    // console.log(isDuplicate);

    return {
        data: data.slice().sort(compareValues('name', 'asc'))
    };
}

export default getCountries;
