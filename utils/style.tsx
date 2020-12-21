import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
:root {
    color-scheme: light dark;
}


@media (prefers-color-scheme: light) {
    :root {
        --text-primary: #24292e;
        --background: white;
        --shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px;
    }
}

@media (prefers-color-scheme: dark) {
    :root {
        --text-primary: white;
        --background: #24292e;
        --shadow: rgba(0, 0, 0, 0.35) 0px 2px 5px 0px;
    }
}
  body {
    margin: 0;
    padding: 0;
    //background: teal;
    font-family: 'Saira Condensed','Open-Sans', Helvetica, Sans-Serif;
  }

  //useDarkMode hook consume this
  body.light-mode {
  background-color: #999;
  color: #333;
  transition: background-color 0.3s ease;
}
  body.dark-mode {
    background-color: #1a1919;
    color: #999;
  }

.select-menu-outer{top: auto; bottom: 100%}
.drop-up .Select-menu-outer {
top: auto;
bottom: 100%;
}
`;

export default GlobalStyle;