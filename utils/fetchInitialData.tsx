import fetch from 'isomorphic-unfetch';
import { v4 as uuidv4 } from 'uuid';
//import Posts from '../components/Posts';
import { ICountryType, CountryFlagColors } from '../interfaces/country.interface';

const countryList = require('../public/country-list.json');
const flagData = require('../public/flag_data.json');

const getCountries = async () => {

    const mutedCountryList: ICountryType[] = countryList.slice(0).sort(function (c1, c2) {
        const name1 = c1.name//.toLowerCase();
        const name2 = c2.name//.toLowerCase();
        if (name1 > name2) { return 1; }
        if (name1 < name2) { return -1; }
        return 0;
    })
        .map((c, i) => {
            return {
                ...c,
                //iso2:c.iso2.toLowerCase(),
                index: i,
                id: uuidv4(),
            }
        });

    const colors: CountryFlagColors[] = Object.values(flagData);
    //console.log(typeof colors)
    const counts = Object.keys(flagData);
    // console.log(colors[2])
    // console.log(counts[2])
    const list = counts.map((c, i) => {
        // console.log(c)
        const row = mutedCountryList.find(country => {
            //console.log(typeof c)
            if (country.iso2 === c.toUpperCase())
                return {
                    ...country,
                    //iso2: country.iso2.toLowerCase()
                }
        });

        if (row) {
            //console.log(row)
            return {
                ...row,
                colors: colors[i]
            }
        }
        else {
            console.log(c, i)
            return {
                
                
            }
        }
        // }
    });

    const covidData = await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        return response.json()
    }).then(data => data).catch(err => console.log(err));

    mutedCountryList.forEach((el, i) => {
        if (!el.iso2)
            console.log(el.iso2, i)
    })
    return {
        countries: list.map(c=>c),
        data: covidData
    };
}

export default getCountries;