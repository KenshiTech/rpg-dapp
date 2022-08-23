import { EthProvider } from "./contexts/EthContext";
import Demo from "./components/Demo";
import styled, { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    color: #333;
    background-color: whitesmoke;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6, p {
    margin: 0;
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
