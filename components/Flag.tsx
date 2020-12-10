// import {  useRef }from 'react'
//import { useState } from 'react'
import styled from 'styled-components'
import { IOptionType } from '../interfaces/data.interface'
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
        {flags.slice(0).reverse()}
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