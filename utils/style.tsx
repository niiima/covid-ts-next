import { createGlobalStyle } from 'styled-components';
 
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    //background: teal;
    font-family: Open-Sans, Helvetica, Sans-Serif;
  }

  .Select-menu-outer{top: auto; bottom: 100%}
  
  .drop-up .Select-menu-outer {
  top: auto;
  bottom: 100%;
}
`;
 
export default GlobalStyle;