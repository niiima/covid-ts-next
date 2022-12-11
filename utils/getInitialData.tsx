import { compareValues } from './sortCountries'
import { ICountryType, IFlagColorType } from '../interfaces/country.interface';
import { ICovidType } from '../interfaces/covid.interface';
import { emptyColorList, sampleTotalInfo, sampleCovid, EmptyCovidObject, sampleData } from '../interfaces/data.interface'

const countries: ICountryType[] = require('../public/country-list.json');
const flagData: IFlagColorType[][] = require('../public/flag_data.json');
const userLocationPromise: () => Promise<any> = async () => {
    const defaultCountry = { country_code: "IR" };
    if (process.env.GEOIP_API_KEY)
        return await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${process.env.GEOIP_API_KEY}`)
            .then(r => {
                if (r.ok)
                    return r.json();
                else
                    return defaultCountry;
            }).catch(err => console.log(err));
    else
        return defaultCountry;
}

const totalCovidCasesPromise: () => Promise<any> = async () => await fetch('https://api.covid19api.com/world/total').then(r => {
    if (r.ok)
        return r.json();
    else return sampleTotalInfo;
}).catch(err => console.log(err));

const covidDataPromise: () => Promise<ICovidType[]> = async () => await fetch("https://disease.sh/v3/covid-19/countries?yesterday=&sort=")
    .then(async response => {
        if (response.ok) {
            const result = await response.json();
            // console.log(result)
            if (result.length)
                return result
            else
                return sampleCovid
        }
    }).catch(err => console.log(err));

const colors: IFlagColorType[][] = [];
Array.from(Object.values(flagData)).forEach(color => {
    if (color)
        colors.push(color.sort((a: IFlagColorType, b: IFlagColorType) => b.percentage - a.percentage));
});

const getAppData = async () => {

    const list = Object.keys(flagData).map((c, i) => {
        const row = countries.find(country => {
            if (country.iso2 === c.toUpperCase())
                return {
                    ...country,
                }
        });
        return {
            ...row ? row : countries[i],
            colors: colors[i] ? colors[i] : emptyColorList.slice()
        }
    });

    return (async () => {
        const [covidData, location, total] =
            await Promise.all([covidDataPromise(), userLocationPromise(), totalCovidCasesPromise()])
        const data = new Map();
        list.forEach((country) => {
            if (country) {
                let covidInfo: ICovidType | undefined = covidData.find(info => {
                    if (info.countryInfo.iso2 === country.iso2)
                        return info
                });
                if (covidInfo) {
                    if (!data.has(country.iso2)) {
                        data.set(country.iso2, {
                            ...country,
                            covid: covidInfo
                        })
                    }
                    else {
                        data.set(country.iso2, {
                            ...country,
                            covid: EmptyCovidObject
                        })
                    }
                }
            }
        });

        const superData = Array.from(data.values()).sort(compareValues('name', 'asc'));
        return {
            data: superData.length ? superData : sampleData,
            location: location.country_code.toUpperCase(),
            total: total,
            options: superData.map(getIndexedOption),
        };
    })();
}

function getIndexedOption(item, index) {
    if (item)
        return {
            index: index,
            value: item.iso2,
            label: item.name,
            color: item.colors
        }
}

export default getAppData;
