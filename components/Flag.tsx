// import {  useRef}from 'react'
//import { useState } from 'react'
//import  getRGB  from '../utils/getRGB';

interface Props {
    countryCode: string;
    //setrgb:SetRgbCallBackType
}

const Flag = (props: Props) => {
    //const [hover, setHover] = useState(cs => ({ ...cs, isHover: false }));

    // const imgFlag = useCallback(()=>{
    //     getRGB(ref.current)
    //     props.setrgb()
    // },[]);
    //useEffect(() => console.log("Effect Used"))
    //const imgFlag = useRef<HTMLImageElement>(null);

    //useEffect()
    // (()=>{
    //     //let rgb = getRGB(imgFlag.current.getContext('2d'));
    //     console.log(imgFlag.current);
    //     //props.setrgb(rgb)
    // });

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
    return (//<button data={selected} onClick={checkCountryHasPollutionInfo} > 
        <span className="badge badge-primary"
            // onMouseEnter={logMouseEnter}
            // onMouseLeave={logMouseLeave}
            // onClick={checkCountryHasPollutionInfo}
        >
            {/* {!hover.isHover ? */}
            <img
                // w20,w40,w80,w160,w320,w640,,w1280,w2560
                src={"https://flagcdn.com/w40/" + props.countryCode.toLowerCase() + `.png`}
                width="40"

                alt={props.countryCode} />
         
        </span>
        // </button>
    )
}

export default Flag;