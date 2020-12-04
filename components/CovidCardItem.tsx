import styled from 'styled-components'
import { BiWorld } from 'react-icons/bi'
import millify from 'millify';
import getFlagColors from '../utils/getFlagColors';
import { EqualDivider, EDChild } from '../components/FlexDevider';


const CovidInfoContent = styled.article`
   	@media (max-width: 700px) {
		width: 100%;
	}
	position: relative;
	margin-bottom: 20px; 
	padding-bottom: 30px; 
    text-decoration: none;
    .card__image{
        position:absolute;
        max-height:110px;
        min-height:110px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: cover;
        // border-top-left-radius: 0.25rem;
        // border-top-right-radius: 0.25rem;
        filter: contrast(70%);
        filter: saturate(180%);
        overflow: hidden;
        position: relative;
        transition: filter 0.5s cubic-bezier(.43,.41,.22,.91);;
        &::before {
          content: "";
            display: block;
          padding-top: 56.25%; // 16:9 aspect ratio
        }
        @media(min-width: 40rem) {
          &::before {
            padding-top: 66.6%; // 3:2 aspect ratio
          }
        }
      }
`

const CovidInfoContainer = styled.section`
margin: 4px; 
list-style: none;
width: 300px;
height: 260px;
display: flex;
// padding: 2em;
border: 3px solid ${props => props.color};
//border-radius: 1.25rem;
justify-content: stretch;//space-around;
font-size: 1em;
transition:all 1s ease;
    &:hover{
            background-color:lightgray;
            border-color: #444;
    }
`
const CovidCardItem = (props) => {
    //console.log(cardInfo);
    const {
        countryInfo,
        continent,
        deathsPerOneMillion,
        population,
        todayCases,
        todayDeaths,
        todayRecovered,
        country,
        colors,
    } = props.cardInfo;
    const cardColors = getFlagColors(colors);
    return (
        <CovidInfoContainer key={countryInfo._id}>
            <CovidInfoContent>

                <EqualDivider vertical={true} style={{ color: cardColors[0] }}>
                    {/* <EDChild color={cardColors[3]}> */}
                        <img
                            // w20,w40,w80,w160,w320,w640,,w1280,w2560
                            src={"https://flagcdn.com/w160/" + countryInfo.iso2.toLowerCase() + `.png`}
                            width="160"
                            alt={country}
                            className="card__image" />
                    {/* </EDChild> */}
                    <EDChild color={cardColors[1]}>{country}</EDChild>
                    <EDChild color={cardColors[0]}><BiWorld size="30px" style={{ color: cardColors[1] ? cardColors[1] : cardColors[0], width: 35 }}></BiWorld>
                        <span style={{ color: cardColors[2] ? cardColors[2] : cardColors[1] }}>{continent}</span></EDChild>
                </EqualDivider>
                <EqualDivider>
                    <EDChild><li className="scnd-font-color" style={{ color: cardColors[2] ? cardColors[2] : cardColors[1] ? cardColors[1] : cardColors[0] }}>Deaths per each million: {deathsPerOneMillion}</li></EDChild>
                    <EDChild><li className="scnd-font-color" >Total population {millify(population)}</li></EDChild>
                    <EDChild><li className="scnd-font-color">cases {millify(todayCases)} | Recovered: {millify(todayRecovered)} | Deaths:{millify(todayDeaths)}</li></EDChild>
                </EqualDivider>
            </CovidInfoContent>
        </CovidInfoContainer>
    );
}

export default CovidCardItem;