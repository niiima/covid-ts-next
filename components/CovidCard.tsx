import { Fragment } from 'react';
import millify from 'millify';
import { ICountryType } from "../interfaces/country.interface";
import { ICovidType } from "../interfaces/covid.interface";
export interface ICovidCardProps {
    covidInfoList: ICovidType[];
    selected: ICountryType
}

const CovidCard = (props: ICovidCardProps) => {

    return (<Fragment>
        {
            props.covidInfoList.length ?
                props.covidInfoList.map(cardInfo => {
                    const {
                        countryInfo,
                        continent,
                        deathsPerOneMillion,
                        population,
                        todayCases,
                        todayDeaths,
                        todayRecovered,

                    } = cardInfo;
                    return (

                        <div key={countryInfo._id} className="covid-card-conteiner">
                            <p className="scnd-font-color">In {continent}</p>
                            <p className="scnd-font-color">Deaths per million {deathsPerOneMillion}</p>
                            <p className="scnd-font-color">Total population {millify(population)}</p>
                            <p className="scnd-font-color">cases {millify(todayCases)} | Recovered: {millify(todayRecovered)} | Deaths:{millify(todayDeaths)}</p>
                        </div>

                    );
                })
                : (<div className="covid-card-conteiner">
                    <p className="scnd-font-color">No data about {props.selected.name}</p>
                </div>)
        }
    </Fragment>)
}

export default CovidCard;
