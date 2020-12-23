import React from 'react';
import useDarkMode from 'use-dark-mode';
import styled from 'styled-components'
const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);
    return (
        <ToggleButton status={darkMode.value} onClick={darkMode.value ? darkMode.disable : darkMode.enable}>
            <svg viewBox="0 0 24 24" fill="none" >
                <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
            <input type="checkbox" checked={darkMode.value} onChange={darkMode.toggle} hidden />
        </ToggleButton>
    );
};

const ToggleButton = styled.span`
 width: 22px;
 height: 30px;
 flex-shrink: 0;
 border:none;
 & svg {
        stroke:silver !important;
        stroke-width:1.4px; 
        width: 30px;
        stroke-linecap:round;
        stroke-linejoin:round;
        transition: 0.5s;
        fill:${props=>props.status === true ? "gold" : "none" }
 }
`;
export default DarkModeToggle;