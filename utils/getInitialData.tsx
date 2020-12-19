import { compareValues } from './sortCountries'
import { ICountryType, IFlagColorType } from '../interfaces/country.interface';
import { ICovidType } from '../interfaces/covid.interface';
import { emptyColorList, sampleTotalInfo, sampleCovid, EmptyCovidObject, sampleData } from '../interfaces/data.interface'

const countries: ICountryType[] = require('../public/country-list.json');
const flagData: IFlagColorType[][] = require('../public/flag_data.json');
const userLocationPromise: () => Promise<any> = async () => await fetch(`http://ip-api.com/json`)
    .then(r => {
        if (r.ok)
            return r.json();
        else
            return { countryCode: 'IR' }; //
    }).catch(err => console.log(err))

const totalCovidCasesPromise: () => Promise<any> = async () => await fetch('https://api.covid19api.com/world/total').then(r => {
    if (r.ok)
        return r.json();
    else return sampleTotalInfo;
}).catch(err => console.log(err));

const covidDataPromise: () => Promise<ICovidType[]> = async () => await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=")
    .then(async response => {
        if (response.ok) {
            const result = await response.json()
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
        const data = list.map((country) => {
            if (country) {
                let covidInfo: ICovidType | undefined = covidData.find(info => {
                    if (info.countryInfo.iso2 === country.iso2)
                        return info
                });
                if (covidInfo)
                    return {
                        ...country,
                        covid: covidInfo
                    }
                else return {
                    ...country,
                    covid: EmptyCovidObject
                }
            }
        });

        const superData = data.slice().sort(compareValues('name', 'asc'))
        return {
            data: superData.length ? superData : sampleData,// sampleData,
            location: location.countryCode.toUpperCase(),
            total: total,
            options: data.map(getOption), //sampleData.map(getOption)
        };
    })();
}

function getOption(item, index) {
    if (item)
        return {
            index: index,
            value: item.iso2,
            label: item.name,
            color: item.colors
        }
}

export default getAppData;
