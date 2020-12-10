export type ICountryType = {
    id: string;
    iso2: string;
    name: string;
    colors:IFlagColorType[];
}

export type IFlagColorType = {
    color: string;
    percentage: number;
}