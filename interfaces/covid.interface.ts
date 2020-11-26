type ICountryInfo = {
    flag: string;
    iso2: string;
    iso3: string;
    lat: number;
    _id: number;
}
export interface ICovidType {
    active: number,
    activePerOneMillion: number,
    cases: number,
    casesPerOneMillion: number,
    continent: string,
    country: string,
    countryInfo: ICountryInfo,
    critical: number,
    criticalPerOneMillion: number,
    deaths: number,
    deathsPerOneMillion: number,
    oneCasePerPeople: number,
    oneDeathPerPeople: number,
    oneTestPerPeople: number,
    population: number,
    recovered: number,
    recoveredPerOneMillion: number,
    tests: number,
    testsPerOneMillion: number,
    todayCases: number,
    todayDeaths: number,
    todayRecovered: number,
    updated: string,
}