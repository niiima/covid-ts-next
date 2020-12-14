import { compareValues } from './sortCountries'
import { ICountryType, IFlagColorType } from '../interfaces/country.interface';
import { ICovidType } from '../interfaces/covid.interface';
const countries: ICountryType[] = require('../public/country-list.json');
const flagData: IFlagColorType[][] = require('../public/flag_data.json');
import { emptyColorList, sampleTotalInfo, sampleCovid } from '../interfaces/data.interface'
const getAppData = async () => {
    const covidDataPromise: Promise<ICovidType[]> = await fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=").then(response => {
        if (response.ok)
            return response.json()
        else
            return sampleCovid 
    }).then(data => data).catch(err => console.log(err));

    const colors: IFlagColorType[][] = [];
    Array.from(Object.values(flagData)).forEach(color => {
        //console.log(typeof color)
        if (color)
            colors.push(color.sort((a: IFlagColorType, b: IFlagColorType) => b.percentage - a.percentage));
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
                    covid: null
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

    const location = await fetch(`http://ip-api.com/json`)
        .then(r => {
            if (r.ok)
                return r.json();
            else
                return { countryCode: 'IR' }; // Return default country on fail to detect ip
        }).catch(err => console.log(err))//.then(data=>console.log(data));

    const total = await fetch('https://api.covid19api.com/world/total').then(r => {
        if (r.ok)
            return r.json();
        else return sampleTotalInfo;
    }).catch(err => console.log(err));

    return {
        data: data.slice().sort(compareValues('name', 'asc')),// sampleData,
        location: location.countryCode.toUpperCase(),
        total: total,
        options: data.map(getOption), //sampleData.map(getOption)
    };
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
