
import { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { BiWorld } from 'react-icons/bi'
import millify from 'millify';
import gsap from 'gsap';
import { getFlagColors } from '../utils/color.util';
import { EqualDivider, EDChild } from '../components/FlexDevider';
import { ISuperCountryType } from '../interfaces/data.interface';
import WithDraggable from '../components/WithDraggable';

interface ICardItemProps {
  cardInfo: ISuperCountryType
}

const CovidCardItem = (props: ICardItemProps) => {
  const { covid, colors } = props.cardInfo;
  const itemRef = useRef(null);
  const cardColors = getFlagColors(colors);
  // console.log(cardColors)

  useEffect(() => {
    let tl = gsap.timeline();
    //tl.set(itemRef, {opacity:0})
    tl.from(itemRef.current, {
      autoAlpha: 0,
      ease: 'none',
      delay: 0.1,
      rotation: 0,
      x: -20,
      duration: 1,
      //boxShadow: "0px 80px 100px 3px rgba(27,34,52,0.7)"
    })
    tl.to(itemRef.current, {
      x: 0,
      duration: 1,
      borderWidth: 5,
      borderColor: colors[0].color,
      border: "solid",
      borderTopLeftRadius: 20,
      borderBottomRightRadius: 20
    });
  }, []);


  if (covid) {
    const {
      continent,
      deathsPerOneMillion,
      population,
      todayCases,
      todayDeaths,
      todayRecovered,
      country,
      //countryInfo
    } = covid;

    return (

      <WithDraggable>
        <CovidInfoContent color={cardColors[0]} hoverColor={cardColors[1]} ref={itemRef}>
          {/* <div className="card-front"> */}
          <EqualDivider style={{ color: cardColors[0] }}>
            <EDChild color={cardColors[3] ? cardColors[3] : cardColors[2] ? cardColors[2] : cardColors[1]}
              className="text-left">
              <BiWorld size="30px" style={{ color: cardColors[0], width: 35 }}></BiWorld>
            </EDChild>
            <EDChild color={cardColors[1]} className='font-weight-bold text-center text-nowrap'>{country}</EDChild>
            <EDChild color={cardColors[0]} className='font-weight-light text-center text-nowrap'>
              <span style={{ color: cardColors[2] ? cardColors[2] : cardColors[1] }} >{continent}</span></EDChild>
          </EqualDivider>
          <EqualDivider vertical={true}>
            <EDChild><Info>Deaths per each million: {deathsPerOneMillion}</Info></EDChild>
            <EDChild><Info color={cardColors} colorIndex={2}>Total population {millify(population)}</Info></EDChild>
            <EDChild><Info color={"brown"}>Cases: {millify(todayCases)}</Info></EDChild>
            <EDChild><Info color={"green"}>Recovered: {millify(todayRecovered)}</Info></EDChild>
            <EDChild><Info color={"red"}>Deaths:{millify(todayDeaths)}</Info></EDChild>
          </EqualDivider>
          {/* </div>
          <div className="card-back">
          <img
                            // w20,w40,w80,w160,w320,w640,,w1280,w2560
                            src={"https://flagcdn.com/w160/" + countryInfo.iso2  + `.png`}
                            width="110"
                            alt={country}
                            className="card__image" />
            </div> */}
        </CovidInfoContent>
      </WithDraggable >
    )
  }
  else {
    // Cards with no Covid info
    let name = props.cardInfo.name;
    return (
      <WithDraggable>
        <CovidInfoContent color={cardColors[1]} ref={itemRef}>
          <EqualDivider style={{ color: cardColors[0] }}>
            <EDChild color={cardColors[0]}>
              <BiWorld size="30px" style={{ color: cardColors[1] ? cardColors[1] : cardColors[0], width: 35 }}></BiWorld>
            </EDChild>
            <EDChild color={cardColors[1]} className='font-weight-bold'>
              {name}
            </EDChild>
          </EqualDivider>
          <span className="text-center">No Covid-19 report</span>
        </CovidInfoContent>
      </WithDraggable>
    )
  }
}

export default CovidCardItem;

const CovidInfoContent = styled.article`
   	@media (max-width: 700px) {
		width: 100%;
	}
	position: relative;
	margin-bottom: 10px; 
	padding-bottom: 10px; 
  margin-left:2px;
  text-decoration: none;
  list-style: none;
  transition:all 1s ease;
  border-color:${props => props.hoverColor ? props.hoverColor : "#fff"} !important;
  background-color: transparent;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);  
  &:hover{
  border-color: ${props => props.color ? props.color : "#fff"} !important;
  background:${props => props.color ? props.color : "rgba(0,0,0,0.1)"};
  cursor:move;
}
`
const Info = styled.li`
 &:hover{
   text-decoration: underline;
 }
`