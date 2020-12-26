import { useEffect, useRef } from 'react';
import useDarkMode from 'use-dark-mode';
import styled from 'styled-components';

const DarkModeToggle = styled.span`
 width: 22px; 
 & svg {
     margin-top:10px;
        stroke:silver !important;
        stroke-width:1.4px; 
        width: 30px;
        stroke-linecap:round;
        stroke-linejoin:round;
        transition: 0.5s;
        &:hover{
            cursor:pointer
        }
 }`;

const Toggler = () => {
    const darkMode = useDarkMode(false);
    const togglerRef = useRef<SVGSVGElement>(null) as any;
    useEffect(() => {
        togglerRef.current.style.fill = darkMode.value ? "gold" : "none"
    }, [darkMode])

    return (
        <DarkModeToggle
            onClick={darkMode.value ? darkMode.disable : darkMode.enable}
        >
            <svg ref={togglerRef} viewBox="0 0 24 24" fill="none" >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
            </svg>
            <input type="checkbox"
                checked={darkMode.value}
                onChange={darkMode.toggle}
                hidden />
        </DarkModeToggle>
    );
};

export default Toggler;