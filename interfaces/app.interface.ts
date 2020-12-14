import { ICovidSummary } from './covid.interface'
import { IOptionType, ISuperCountryType } from './data.interface';

export interface IAppProps {
    data: ISuperCountryType[] | any;
    options: IOptionType[] | any;
    clientLocation: string;
    totalInfo: ICovidSummary;
}

export interface IAppState {
    data: ISuperCountryType[];
    options: IOptionType[];
    initiated: boolean;
    selected: ISuperCountryType;
}