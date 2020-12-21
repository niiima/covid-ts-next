import styled from 'styled-components';
//import { useState, createRef } from 'react';
import { ICountryType } from "../interfaces/country.interface";
import { ISuperCountryType } from "../interfaces/data.interface";
import CovidCardItem from './CovidCardItem'
export interface ICovidCardProps {
    covidInfoList: ISuperCountryType[] | undefined;
    selected: ICountryType| undefined;
}

const CovidCards = (props: ICovidCardProps) => {
    const Panels = [] as any;
    if (props.covidInfoList)
        if (props.covidInfoList.length) {
            props.covidInfoList.forEach(cardInfo => {
                if (cardInfo) {
                    Panels.push(<CovidCardItem cardInfo={cardInfo} key={cardInfo.iso2}></CovidCardItem>)
                }
            });
        }
    return (
        <CardsSection>
            {Panels.length ? Panels.slice(0).reverse() : (<p className="no-content" >Select a country</p>)}
        </CardsSection>)
}

const CardsSection = styled.section`
display: -webkit-flex;
display: flex;
-webkit-justify-content: center;
justify-content: center;
-webkit-flex-wrap: wrap;
flex-wrap: wrap;
margin-top: 15px;
box-sizing: border-box;
color: ${props => props.color};    

p.no-content{
    color: var("--text-primary"); //#fff"
}
`

export default CovidCards;
