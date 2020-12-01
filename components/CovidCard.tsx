import { Fragment } from 'react';
import styled from 'styled-components';
import { BiWorld } from 'react-icons/bi'
import millify from 'millify';
import { ICountryType } from "../interfaces/country.interface";
import { ICovidType } from "../interfaces/covid.interface";
import getFlagColors from '../utils/getFlagColors';
export interface ICovidCardProps {
    covidInfoList: ICovidType[];
    selected: ICountryType;
}

const CovidCard = (props: ICovidCardProps) => {

    const colors = getFlagColors(props.selected.colors)
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
                    //console.log(props.selected.colors[0])
                    return (
                        <Conteiner color={{ color: colors[4] ? colors[4] : "#000" }}>
                            <CovidInfo key={countryInfo._id}>
                                <Region style={{ color: colors[0] }}> <BiWorld size="30px" style={{ color: colors[1] ? colors[1] : colors[0], width: 35 }}></BiWorld>
                                    {props.selected.name} is a country inside of <span style={{ color: colors[1] }}>{continent}</span></Region>
                                <p className="scnd-font-color" style={{ color: colors[2] ? colors[2] : colors[1] ? colors[1] : colors[0] }}>Deaths per each million: {deathsPerOneMillion}</p>
                                <p className="scnd-font-color" >Total population {millify(population)}</p>
                                <p className="scnd-font-color">cases {millify(todayCases)} | Recovered: {millify(todayRecovered)} | Deaths:{millify(todayDeaths)}</p>
                            </CovidInfo>
                        </Conteiner>
                    );
                })
                : (<div className="covid-card-conteiner">
                    <p style={{ color: colors[0] }}>No data about {props.selected.name}</p>
                </div>)
        }
    </Fragment >)
}

const Conteiner = styled.div`
display: flex;
  width: 100px;
  height: 150px;
  border: 3px solid ${props => props.color};
  border-radius: 15px;
  justify-content: space-around;
  font-size: 2em;
  color: ${props => props.color};
  `

const Region = styled.p`
color:green;
`

const CovidInfo = styled.div`
font-size:2.2em;`
export default CovidCard;
