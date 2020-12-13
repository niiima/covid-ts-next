export interface ICountryType  {
    //id: string;
    iso2: string;
    name: string;
    colors:IFlagColorType[];
}

export interface IFlagColorType  {
    color: string;
    percentage: number;
}