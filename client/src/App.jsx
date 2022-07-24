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
`;

const Container = styled.div`
  margin: 0 auto;
  width: 800px;
  border-radius: 8px;
  background-color: white;
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
