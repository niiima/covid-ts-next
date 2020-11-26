import { useState } from 'react'

interface Props {
    country_code: string,
}

const Flag = (props: Props) => {
    const [hover, setHover] = useState(cs => ({ ...cs, isHover: false }))

    function logMouseEnter() {
        setHover({ isHover: true })
    }
    function logMouseLeave() {
        setHover({ isHover: false });
    }
    function checkCountryHasPollutionInfo() {
        console.log("checkCountryHasPollutionInfo")
        
        console.log(props);
    }
    return (//<button data={selected} onClick={checkCountryHasPollutionInfo} > 
        <span className="badge badge-primary"
            onMouseEnter={logMouseEnter}
            onMouseLeave={logMouseLeave}
            onClick={checkCountryHasPollutionInfo}
        >
            {!hover.isHover ?
                <img src={`https://www.countryflags.io/${props.country_code}/flat/64.png`} /> :
                <img src={`https://www.countryflags.io/${props.country_code}/shiny/64.png`} />}
        </span>
        // </button>
    )
}

export default Flag;