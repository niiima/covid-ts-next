import styled from 'styled-components'
import { BiWorld } from 'react-icons/bi'
import millify from 'millify';
import { getFlagColors } from '../utils/getFlagColors';
import { EqualDivider, EDChild } from '../components/FlexDevider';
import { ISuperCountryType } from '../interfaces/data.interface';
import gsap from 'gsap';
import { useRef, useEffect } from 'react'
interface ICardItemProps {
  cardInfo: ISuperCountryType
}
const CovidCardItem = (props: ICardItemProps) => {
  //console.log(props.cardInfo);
  const { covid, colors } = props.cardInfo;
  const itemRef = useRef(null);
  useEffect(() => {
    gsap.from(itemRef.current, {
      autoAlpha: 0,
      ease: 'none',
      delay: 0.2,
      rotation: 10
    });
    gsap.to(itemRef.current, {
       x: -10, duration: 1, delay: 0,
    });
  }, []);

  const cardColors = getFlagColors(colors);
  if (covid) {
    const {
      continent,
      deathsPerOneMillion,
      population,
      todayCases,
      todayDeaths,
      todayRecovered,
      country,

    } = covid;


    return (

      <CovidInfoContent color={cardColors[1]} ref={itemRef}>
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
      </CovidInfoContent>

    )
  }
  else {
    let name = props.cardInfo.name;
    return (
      
      <CovidInfoContent color={cardColors[1]} ref={itemRef}>
        <EqualDivider style={{ color: cardColors[0] }}>
          <EDChild color={cardColors[0]}>
            <BiWorld size="30px" style={{ color: cardColors[1] ? cardColors[1] : cardColors[0], width: 35 }}></BiWorld>
          </EDChild>

          <EDChild color={cardColors[1]} className='font-weight-bold'>
            {name}
          </EDChild>
        </EqualDivider>
        <span className="text-center" >No recent Covid-19 data</span>
      </CovidInfoContent>

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
  text-decoration: none;
  list-style: none;
  transition:all 1s ease;
    .card__image{
        // position:absolute;
        // max-height:110px;
        // min-height:110px;
        background-position: center center;
        background-repeat: no-repeat;
        //background-size: cover;
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

       &:hover{
            background-color:${props => props.color ? props.color : "rgba(0,0,0,0.1)"};
            border-color: #444;
    }
`
const Info = styled.li`
color: rgba(256,256,256,0.8); 
// ${props => props.color ? props.color.length && typeof props.color === "string" ? props.color : props.color[1] : "rgba(0,0,0,0.9"};
`