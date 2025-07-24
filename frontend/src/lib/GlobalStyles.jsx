import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #3373B0;
    --sub-color: #BED4E9;
    --sky-blue: #8CB8E3;
    --light-blue: #E7F1FB;
    --light-gray: #8B8B8B;

    --weight-semi-bold: 600;
    --weight-bold: 700;
    --weight-extra-bold: 800; 
  }
`
export default GlobalStyles;