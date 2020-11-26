export type ICountryType = {
    id: string;
    iso2:string;
    name: string;
    index:number
}

export type CountriesType = {
    [key: string]: string | string | null
}

export type CountryType = {
    [key: string]: string | null
}
