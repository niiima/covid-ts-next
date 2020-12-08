import fetch from 'isomorphic-unfetch';
import { v4 as uuidv4 } from 'uuid';
//import Posts from '../components/Posts';
import { ICountryType, CountryFlagColors } from '../interfaces/country.interface';

const countryList: ICountryType[]  = require('../public/country-list.json');
const flagData = require('../public/flag_data.json');

const getCountries = async () => {

    const mutedCountryList: ICountryType[] = countryList.slice(0).sort(function (c1, c2) {
        const name1 = c1.name;
        const name2 = c2.name;
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
    const countryKeys = Object.keys(flagData);
    const emptyColorList = [{ color: "#fff", percentage: 50 }, { color: "#999", percentage: 50 }]
    const list = countryKeys.map((c, i) => {
        const row = mutedCountryList.find(country => {
            if (country.iso2 === c.toUpperCase())
                return {
                    ...country,
                    colors:colors[i]
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
                ...mutedCountryList[i],
                colors: [...emptyColorList]
            }
        }
        // }
    });

    //console.log(list[141])
    const covidData = await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        return response.json()
    }).then(data => data).catch(err => console.log(err));

    // mutedCountryList.forEach((el, i) => {
    //     if (!el.iso2)
    //         console.log(el.iso2, i)
    // });
    //console.log(covidData)
    const data = list.map((c) => {
        if (c) {
            let covidInfo = covidData.find(data => {
                // if (!data.countryInfo)
                //     console.log(data)
                if (data.countryInfo.iso2 === c.iso2)
                    return data 
            });
            return {
                ...c,
                //colors:[...emptyColorList],
                covid: covidInfo ? covidInfo : null
            }
        }
    })
    //console.log(data)
    return {
        //countries:
        data: data
        //data: covidData
    };
}

export default getCountries;