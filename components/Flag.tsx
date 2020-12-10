// import {  useRef }from 'react'
//import { useState } from 'react'
import styled from 'styled-components'
import {IOptionType} from '../interfaces/data.interface'
//import  getRGB  from '../utils/getRGB';
interface Props {
    countryCode: IOptionType[];
}

const Flag = (props: Props) => {
 
    const flags =
        //if (props.countryCode) {
        props.countryCode.map(code => {
            console.log(code)
            return (
                <FlagContainer className="badge badge-primary"
                    key={code.value}
                    colors={code.color}
                    // onMouseEnter={logMouseEnter}
                    // onMouseLeave={logMouseLeave}
                // onClick={checkCountryHasPollutionInfo}
                >
                    {/* {!hover.isHover ? */}
                    <img
                       
                        src={"https://flagcdn.com/w40/" + code.value.toLowerCase() + `.png`}
                        width="40"

                        alt={code.name} />

                </FlagContainer>
            )
        })
    return (<>
        { flags.slice().reverse()}
    </>
    )
}

const FlagContainer = styled.span`
border:1px solid ${props => props.colors[0]}
transition : all 1s ease-in-out;
& img {
    filter: contrast(80%);
}
& img:hover{
    filter: contrast(100%);
        filter: saturate(110%);
}
`

export default Flag;
 // w20,w40,w80,w160,w320,w640,,w1280,w2560
   // const [hover, setHover] = useState(cs => ({ ...cs, isHover: false }));

    // // const imgFlag = useCallback(()=>{
    // //     getRGB(ref.current)
    // //     props.setrgb()
    // // },[]);
    // //useEffect(() => console.log("Effect Used"))
    // //const imgFlag = useRef<HTMLImageElement>(null);

    // //useEffect()
    // // (()=>{
    // //     //let rgb = getRGB(imgFlag.current.getContext('2d'));
    // //     console.log(imgFlag.current);
    // //     //props.setrgb(rgb)
    // // });

    // function logMouseEnter() {
    //     setHover({ isHover: true })
    // }
    // function logMouseLeave() {
    //     setHover({ isHover: false });
    // }
    // function checkCountryHasPollutionInfo() {
    //     console.log("checkCountryHasPollutionInfo")

    //     console.log(props);
    // }