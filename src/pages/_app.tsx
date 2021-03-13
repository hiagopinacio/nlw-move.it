import { ChallengesProvider } from "../contexts/ChallengesContext";
import styled,{ createGlobalStyle, ThemeProvider } from "styled-components";
import { useState } from "react";




export default function MyApp({ Component, pageProps }) {

const [theme, setTheme] = useState( {
  colors: {
    background: '#f2f3f5',
    text: '#666666',
    white: "#fff",
    title: "#2e384d"
  }
})


  function changeTheme(dark) {   
    if (dark) {
      setTheme( {
  
        colors: {
          background: '#111',
          text: '#fff',
          white: "#222",
          title: "#ddd"
        }
      })
    } else {
      setTheme( {

        colors: {
          background: '#f2f3f5',
          text: '#666',
          white: "#fff",
          title: "#2e384d"
        }
    })     
    }
  }

  return (
  <ThemeProvider theme={theme}>
      <GlobalStyle theme={theme} />
        <span>Dark Theme:  </span>
      <ToggleSwitch >
        <input type="checkbox" onChange={(event) =>changeTheme(event.target.checked)}/>
        <span ></span>
      </ToggleSwitch>
      <Component {...pageProps} />
  </ThemeProvider>
  )
}

const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --white: ${props => props.theme.colors.white};
  --background: ${props => props.theme.colors.background};
  --gray-line: #dcdde0;
  --text:  ${props =>props.theme.colors.text};
  --text-highlight: #b3b9ff;
  --title: ${props =>props.theme.colors.title};
  --red: #e83f5b;
  --green: #4cd62b;
  --blue: #5965e0;
  --blue-dark: #4953b8;
  --blue-twitter: #2AA9E0;
}

@media(max-width: 1080px) {
  html {
      font-size: 93.75%;
  }
}

@media(max-width: 720px) {
  html {
      font-size: 87.5%;
  }
}

body {
  background: var(--background);
  color: var(--text);

}

body,
input,
textarea,
button {
  font: 400 1rem "Inter", sans-serif;
}

button {
  cursor: pointer;
}

a {
  color: inherit;
  text-decoration: none;
}
`
const ToggleSwitch = styled.label`
position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  span  {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  span:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + span {
    background-color: #2196F3;
  }

  input:focus + span {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + span:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }

  span {
    border-radius: 34px;
  }
  span:before {
    border-radius: 50%;
  }
`
