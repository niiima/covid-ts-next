import styled from 'styled-components';
//import { useState, createRef } from 'react';
import { ICountryType } from "../interfaces/country.interface";
import { ICovidTypeWithColors } from "../interfaces/covid.interface";
import CovidCardItem from './CovidCardItem'
export interface ICovidCardProps {
    covidInfoList: ICovidTypeWithColors[];
    selected: ICountryType;
}

const CovidCards = (props: ICovidCardProps) => {
    //console.log(props.covidInfoList)
    // const [state, setState] = useState({
    //     articles: props.covidInfoList.map(ci => {
    //         return {
    //             ...ci,
    //             ref: createRef() /* Ref per section */
    //         }
    //     })
    // });

    // /* Move into parent/header */
    // const handleNavigate = section => {

    //     /* 
    //     Access the "current element" of this sections ref. 
    //     Treat this as the element of the div for this section.
    //     */
    //     let el = section.ref.current;

    //     window.scrollTo({
    //         behavior: "smooth",
    //         left: 0,
    //         top: el.offsetTop
    //     });
    // };

    const Panels = [] as any;
    if (props.covidInfoList.length) {
        props.covidInfoList.forEach(cardInfo => {
            if (cardInfo) {
                Panels.push(<CovidCardItem cardInfo={cardInfo} key={cardInfo.countryInfo.iso2}></CovidCardItem>)
            }
        });
    }
    return (
        <CardsSection>
            {Panels.length ? Panels : (<p className="no-content" >No data about {props.selected.name}</p>)}
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
//padding: 1.5%;
box-sizing: border-box;
color: ${props => props.color};    

p.no-content{
    color: "#fff"
}
`


export default CovidCards;
