import styled from 'styled-components';

import { ICountryType } from "../interfaces/country.interface";
import { ICovidTypeWithColors } from "../interfaces/covid.interface";
import CovidCardItem from './CovidCardItem'
export interface ICovidCardProps {
    covidInfoList: ICovidTypeWithColors[];
    selected: ICountryType;
}



const CovidCards = (props: ICovidCardProps) => {
    //console.log(props.covidInfoList)
    const Panels = [] as any;
    if (props.covidInfoList.length) {
        props.covidInfoList.forEach(cardInfo => {
            if (cardInfo)
                Panels.push(<CovidCardItem cardInfo={cardInfo} ></CovidCardItem>)
        });
    }
    return (
        <CardsSection color={{ color: "#ccc" }}>
            {Panels.length ? Panels : (<p className="no-content" >No data about {props.selected.name}</p>)}
        </CardsSection>)
}

const CardsSection = styled.div`
display: -webkit-flex;
display: flex;
-webkit-justify-content: center;
justify-content: center;
-webkit-flex-wrap: wrap;
flex-wrap: wrap;
margin-top: 15px;
//padding: 1.5%;
box-sizing: border-box;
color: ${props => props.color};    

p.no-content{
    color: "#fff"
}
`


export default CovidCards;
