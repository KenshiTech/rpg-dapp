import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "Syabil";
    src: url("/fonts/Syabil-Regular.woff2") format("woff2"),
      url("/fonts/Syabil-Regular.woff") format("woff");
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: "Frank";
    src: url("/fonts/Frank-Regular.woff2") format("woff2"),
      url("/fonts/Frank-Regular.woff") format("woff");
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: "Syabil", sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #333;
    background-color: var(--secondary-lighten-4);
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: "Frank";
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
  }

  a {
    text-decoration: none;
  }

  :root {
    --primary-color: #ba3322;
    --secondary-color: #134841;
    --secondary-lighten-4: rgb(242, 244, 243);
  }
`;

const Container = styled.div`
  margin: 0 15%;
  width: 600px;
  margin: 1.5rem auto;
  border-radius: 8px;
  background-color: white;

  @media (max-width: 768px) {
    margin: 1.5rem;
    width: calc(100% - 3rem);
  }
`;

function App() {
  return (
    <EthProvider>
      <GlobalStyles />
      <div id="App">
        <Container>
          <Demo />
        </Container>
      </div>
    </EthProvider>
  );
}

export default App;
