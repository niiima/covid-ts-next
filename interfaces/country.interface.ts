export type ICountryType = {
    id: string;
    iso2: string;
    name: string;
    index: number;
    colors:CountryFlagColors[];
}

export type CountriesType = {
    [key: string]: string | string | null;
}

export type CountryType = {
    [key: string]: string | null;
}

export type CountryFlagColors = {
    color: string;
    percentage: number
}
   // [key: string]: string | null

