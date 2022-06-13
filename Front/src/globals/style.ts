import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html {
    font: 15px 'Questrial', sans-serif;
}

body {
    text-decoration: none;
    min-height: 100vh;
}

`;