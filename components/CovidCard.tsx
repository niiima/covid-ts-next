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

const Card = (cardInfo, selectedCountry) => {
    //console.log(cardInfo);
    const colors = getFlagColors(selectedCountry.colors);
    const {
        countryInfo,
        continent,
        deathsPerOneMillion,
        population,
        todayCases,
        todayDeaths,
        todayRecovered,
        country
    } = cardInfo;
    //console.log(props.selected.colors[0])
    return (
        <CovidInfo key={countryInfo._id}>
            <CovidInfoContent>
                <Region style={{ color: colors[0] }}> <BiWorld size="30px" style={{ color: colors[1] ? colors[1] : colors[0], width: 35 }}></BiWorld>
                    {country} is a country inside of <span style={{ color: colors[1] }}>{continent}</span></Region>
                <p className="scnd-font-color" style={{ color: colors[2] ? colors[2] : colors[1] ? colors[1] : colors[0] }}>Deaths per each million: {deathsPerOneMillion}</p>
                <p className="scnd-font-color" >Total population {millify(population)}</p>
                <p className="scnd-font-color">cases {millify(todayCases)} | Recovered: {millify(todayRecovered)} | Deaths:{millify(todayDeaths)}</p>
            </CovidInfoContent>
        </CovidInfo>

    );
}

const CovidCards = (props: ICovidCardProps) => {
    //console.log(props.covidInfoList)
    const Panels = [] as any;
    if (props.covidInfoList.length) {
        props.covidInfoList.forEach(cardInfo => {
            if (cardInfo)
                Panels.push(Card(cardInfo, props.selected))
        });
    }
    return (Panels.length ? (<Container color={{ color: "#ccc" }}>
        {Panels}
    </Container>) :
        (<div className="covid-card-container">
            <p style={{ color: "#fff" }}>No data about {props.selected.name}</p>
        </div>)
    )
}


const Container = styled.div`
display: -webkit-flex;
display: flex;
-webkit-justify-content: center;
justify-content: center;
-webkit-flex-wrap: wrap;
flex-wrap: wrap;
margin-top: 15px;
padding: 1.5%;
-webkit-box-sizing: border-box;
-moz-box-sizing: border-box;
box-sizing: border-box;
color: ${props => props.color};    
`

const Region = styled.p`

`
const CovidInfoContent = styled.div`
   	@media (max-width: 700px) {
		width: 100%;
	}
	position: relative;
	margin-bottom: 20px; 
	padding-bottom: 30px; 
    text-decoration: none;
    
`

const CovidInfo = styled.li`
margin: 4px; 
list-style: none;
width: 300px;
height: 200px;
display: flex;
// padding: 2em;
border: 3px solid ${props => props.color};
border-radius: 1.25rem;
justify-content: stretch;//space-around;
font-size: 1em;
transition:all 1s ease;
    &:hover{
            background-color:lightgray;
            border-color: #444;
    }
`

export default CovidCards;
