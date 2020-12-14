import { IFlagColorType, ICountryType } from './country.interface'
import { ICovidType } from './covid.interface';
export interface IOptionType {
    index: number;
    value: string;
    name: string;
    color: IFlagColorType[]
}
export interface ISuperCountryType extends ICountryType {
    covid: ICovidType;
}

export const emptyColorList: IFlagColorType[] = [{ color: "#fff", percentage: 50 }, { color: "#999", percentage: 50 }];

export const sampleData: ISuperCountryType[] = [
    {
        iso2: "IR", name: "Iran", colors: emptyColorList,
        covid: { "updated": 1607638793544, "country": "Iran", "countryInfo": { "_id": 364, "iso2": "IR", "iso3": "IRN", "lat": 32, "long": 53, "flag": "https://disease.sh/assets/img/flags/ir.png" }, "cases": 1083023, "todayCases": 10403, "deaths": 51496, "todayDeaths": 284, "recovered": 778167, "todayRecovered": 12528, "active": 253360, "critical": 5768, "casesPerOneMillion": 12822, "deathsPerOneMillion": 610, "tests": 6568472, "testsPerOneMillion": 77766, "population": 84464781, "continent": "Asia", "oneCasePerPeople": 78, "oneDeathPerPeople": 1640, "oneTestPerPeople": 13, "activePerOneMillion": 2999.59, "recoveredPerOneMillion": 9212.92, "criticalPerOneMillion": 68.29 }
    }
]

export const sampleOptions: IOptionType[] = [
    {
        index: 0, value: "IR", name: "Iran", color: emptyColorList,
    }
];

export const sampleTotalInfo = { "TotalConfirmed": 69582029, "TotalDeaths": 1581758, "TotalRecovered": 44863011 };
export const sampleCovid: ICovidType[] = [{ "updated": 1607638793544, "country": "Iran", "countryInfo": { "_id": 364, "iso2": "IR", "iso3": "IRN", "lat": 32, "long": 53, "flag": "https://disease.sh/assets/img/flags/ir.png" }, "cases": 1083023, "todayCases": 10403, "deaths": 51496, "todayDeaths": 284, "recovered": 778167, "todayRecovered": 12528, "active": 253360, "critical": 5768, "casesPerOneMillion": 12822, "deathsPerOneMillion": 610, "tests": 6568472, "testsPerOneMillion": 77766, "population": 84464781, "continent": "Asia", "oneCasePerPeople": 78, "oneDeathPerPeople": 1640, "oneTestPerPeople": 13, "activePerOneMillion": 2999.59, "recoveredPerOneMillion": 9212.92, "criticalPerOneMillion": 68.29 }]