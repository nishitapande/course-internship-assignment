import axios from "axios";
import { Container } from "react-bootstrap";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
const App = () => {
  return (
    <div className="App">
      <Container>
        <Header />
        <HomePage />
      </Container>
    </div>
  );
};

export default App;
