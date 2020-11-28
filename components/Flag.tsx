import {  useEffect, useRef, useState } from 'react'
//import  getRGB  from '../utils/getRGB';

interface Props {
    country_code: string,
    setrgb:(rgb)=>void
}

const Flag = (props: Props) => {
    const [hover, setHover] = useState(cs => ({ ...cs, isHover: false }));
    
    // const imgFlag = useCallback(()=>{
    //     getRGB(ref.current)
    //     props.setrgb()
    // },[]);
    useEffect(()=>console.log("Effect Used"))
    const imgFlag = useRef<HTMLImageElement> (null);

    //useEffect()
    // (()=>{
    //     //let rgb = getRGB(imgFlag.current.getContext('2d'));
    //     console.log(imgFlag.current);
    //     //props.setrgb(rgb)
    // });

    function logMouseEnter() {
        setHover({ isHover: true })
    }
    function logMouseLeave() {
        setHover({ isHover: false });
    }
    function checkCountryHasPollutionInfo() {
        console.log("checkCountryHasPollutionInfo")

        console.log(imgFlag);
    }
    return (//<button data={selected} onClick={checkCountryHasPollutionInfo} > 
        <span className="badge badge-primary"
            onMouseEnter={logMouseEnter}
            onMouseLeave={logMouseLeave}
            onClick={checkCountryHasPollutionInfo}
        >
            {!hover.isHover ?
                <img ref={imgFlag} src={`https://www.countryflags.io/${props.country_code}/flat/64.png`} /> :
                <img src={`https://www.countryflags.io/${props.country_code}/shiny/64.png`} />}
        </span>
        // </button>
    )
}

export default Flag;