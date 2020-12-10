import fetch from 'isomorphic-unfetch';
import { v4 as uuidv4 } from 'uuid';
import { compareValues } from './sortCountries'
import { ICountryType, IFlagColorType } from '../interfaces/country.interface';

const countryList: ICountryType[] = require('../public/country-list.json');
const flagData = require('../public/flag_data.json');
const emptyColorList: IFlagColorType[] = [{ color: "#fff", percentage: 50 }, { color: "#999", percentage: 50 }];

const getCountries = async () => {
    const covidDataPromise = fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        return response.json()
    }).then(data => data).catch(err => console.log(err));

    const colors: IFlagColorType[] = Object.values(flagData);
    //const countryKeys = Object.keys(flagData);
    const list = Object.keys(flagData).map((c, i) => {
        const row = countryList.find(country => {
            if (country.iso2 === c.toUpperCase())
                return {
                    ...country,
                }
        });
        return row ? {
            ...row,
            id: uuidv4(),
            colors: colors[i]
        } :
            {
                ...countryList[i],
                id: uuidv4(),
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
    return {
        data: data.slice().sort(compareValues('name', 'asc'))
    };
}

export default getCountries;
