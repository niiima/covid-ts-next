import { CountryFlagColors,ICountryType } from './country.interface'
import {ICovidType} from  './covid.interface';
export interface IOptionType {
    index:number;
    value: string;
    name: string;
    color: CountryFlagColors[]
}
export interface ISuperCountryType extends ICountryType {
    covid:ICovidType
}