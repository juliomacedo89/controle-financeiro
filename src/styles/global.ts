// arquivo para configurar estilo global da app

import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    :root{
        --background: #f0f2f5;
        --red: #E52E4D;
        --blue: #5429CC;
        --green: #33CC95;

        --blue-light: #6933FF;

        --text-title: #363F5F;
        --text-body: #969CB3;

        --shape: #FFFFFF; 
    }
    
    *{
       margin: 0;
       padding: 0;
       box-sizing: border-box ;
    }

    html{
        @media(max-width: 1080px){
            font-size: 93.75%;
        }

        @media(max-width: 720px){
            font-size: 87.5%;
        }
    }

    body{
        background: var(--background);
        -webkit-font-smoothing: antialiased; //deixa as fontes sejam mais detalhadas (menos "pixadas")
    }

    body, input, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h5, strong {
        font-weight: 600;
    }

    button{
        cursor: pointer;
    }

    [disabled] { //tudo que estiver desabilitado
        opacity: 0.6;
        cursor: not-allowed; // símbolo de proibido
    }
    
`